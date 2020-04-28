'use babel';

import MosaicAtomView from './mosaic-atom-view';
import provider from './provider';

import { CompositeDisposable, Disposable } from 'atom';
import openSocket from 'socket.io-client';

const calibrationRegex = /t.set\(\s*\'plan\.calibration\'\s*\,\s*\`(\s*[0-9]+\.?[0-9]*\s*){3}\$\{\s*d\((\s*[0-9]*\.?[0-9]*\s*\,?\s*){3}\)\s*\}\s*\`\s*\)(\s*\/*\s*([a-z]+\s*){3}width)?/g;

export default {
  traceMode: false,
  subscriptions: null,
  socket: null,
  currentCalibration: null,
  store: '',
  fileName: null,
  absoluteFilePath: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable(
      // Add an opener for the helper view
      atom.workspace.addOpener(uri => {
        if (uri === 'atom://mosaic-atom') {
          return new MosaicAtomView();
        }
      }),

      //TODO: subscribe to trace file and build automatically

      // Register command that toggles helper view
      atom.commands.add('atom-workspace', {
        'mosaic-atom:toggleHelpPanel': () => this.toggleHelpPanel()
      }),

      // Register command that toggles debugger view
      atom.commands.add('atom-workspace', {
        'mosaic-atom:toggleDebugger': () => this.toggleDebugger()
      }),

      // Register command that toggles debugger view
      atom.commands.add('atom-workspace', {
        'mosaic-atom:toggleTraceMode': () => this.toggleTraceMode()
      }),

      // Destroy any MosaicRabbitTracerAtomViews when the package is deactivated
      new Disposable(() => {
        atom.workspace.getPaneItems().forEach(item => {
          if (item instanceof MosaicAtomView) {
            item.destroy();
          }
        })
      })
    );

    // connect to server
    try{
      this.socket = openSocket(`http://localhost:5000/atom`);
    } catch(e){
      atom.notifications.addError('Could not connect to http://localhost:5000');
    }

    // listen to line selection
    this.socket.on('line', update => {
      if (this.traceMode && update) this.selectLine(update);
    })

    this.socket.on('calibrate', update => {
      if (this.traceMode && update) this.updateCalibration(update);
    });

    this.socket.on('data', update => {
      if (this.traceMode && update) this.updateBuild(update);
    });
  },

  selectLine(update) {
    if (update.lineNumber && update.fileName) {
      const { lineNumber, fileName, absoluteFilePath } = update;
      this.absoluteFilePath = absoluteFilePath;
      this.fileName = fileName;
      const editor = atom.workspace.getActiveTextEditor();
      if (editor.getPath().includes(this.absoluteFilePath)) {
        const { row, column } = editor.getCursorScreenPosition();
        const difference = lineNumber - row - 1;
        editor.moveDown(difference);
        editor.moveToFirstCharacterOfLine();
        editor.scrollToCursorPosition({ center: true });
      }
    }
  },

  getCurrentCalibration() {
    this.currentCalibration = this.findCalibration();
  },

  findCalibration() {
    const editor = atom.workspace.getActiveTextEditor();
    //Ex: t.set('plan.calibration', `2265.660400390625 1792.539306640625 0.19556395212809244 ${d(40,0,0)}`)

    let currentCalibration = '';
    editor.scan(calibrationRegex, {}, object => {
      currentCalibration = object.matchText;
    });

    return currentCalibration;
  },

  updateCalibration(update) {
    if (update.fileName && update.calibrationCommand) {
      const editor = atom.workspace.getActiveTextEditor();

      this.getCurrentCalibration();

      if (editor.getPath().includes(this.absoluteFilePath)) {
        // replace currentCalibration
        if (this.currentCalibration && update.calibrationCommand) {
          editor.scan(calibrationRegex, {}, object => {
            object.replace(update.calibrationCommand);
          });
          this.currentCalibration = update.calibrationCommand;
        }
      }
    }
  },

  getProvider() {
    return provider;
  },

  deactivate() {
    // Release all resources and subscriptions
    this.socket.close();
    this.subscriptions.dispose();
  },

  deserializeMosaicAtomView(serialized) {
    return new MosaicAtomView();
  },

  toggle() {
    if (this.modalPanel.isVisible()) {
      this.modalPanel.hide();
    } else {
      const editor = atom.workspace.getActiveTextEditor();
      this.modalPanel.show();
    }
  },

  toggleTraceMode() {
    this.traceMode = !this.traceMode;
  },

  toggleHelpPanel() {
    atom.workspace.toggle('atom://mosaic-atom');
  },

  getActiveDebugger() {
    if (this.store) {
      const textEditors = atom.workspace.getTextEditors();
      const activeDebugger = textEditors.filter(e => {
        return e.getText().includes(this.store);
      });
      return activeDebugger[0] || false;
    } else {
      return false;
    }
  },

  toggleDebugger() {
    let displayData;

    if (!this.store) {
      displayData = 'No build received';
    } else {
      displayData = this.store;
    }

    const title = '🐇 Debugger: ' + this.fileName;

    const activeDebugger = this.getActiveDebugger();

    // check if a debugger already exists. If so, don't launch a new instance
    if (!activeDebugger) {
      atom.workspace
        .open("", { split: 'right', location: 'right' })
        .then(debuggerEditor => {
          debuggerEditor.insertText(displayData);
          debuggerEditor.foldAllAtIndentLevel(0);
          debuggerEditor.moveToTop();

          //TODO: move this logic to activate() such that it always updates
          const activeEditor = atom.workspace.getActiveTextEditor().getTitle();

          let queryCSS;

          if (activeEditor === 'untitled') {
            queryCSS =
              'atom-pane.pane.active > ul.list-inline.tab-bar.inset-panel';
          } else {
            queryCSS = 'atom-pane.pane > ul.list-inline.tab-bar.inset-panel';
          }

          let tabList = [].slice.call(document.querySelectorAll(queryCSS));
          let activeTab = tabList[0].children[0];
          let activeTabTitle = activeTab.children[0].innerText;

          // set text
          if (activeTabTitle === 'untitled') {
            activeTab.children[0].innerText = title;
          }
        });
    }
  },

  updateBuild(update) {
    if (update.data.store) {
      const latestBuild = JSON.stringify(update.data.store, null, 2);

      const activeDebugger = this.getActiveDebugger();

      if (activeDebugger) {
        activeDebugger.setText(latestBuild);
        activeDebugger.foldAllAtIndentLevel(0);
        activeDebugger.moveToTop();
      }

      this.store = latestBuild;
    }
  }
};
