'use babel';

export default class MosaicAtomView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('mosaic-atom');

    // Create message element
    const message = document.createElement('div');
    message.textContent = 'The MosaicAtom package is Alive! It\'s ALIVE!';
    message.classList.add('message');
    this.element.appendChild(message);

    message.innerHTML = `
    <div>
      <h1>🐶•🐇•🐢</h1>
      <h2>Helpful Commands</h2>
      <p> Since this plugin is still in development, make sure you toggle trace mode when you start, and then toggle it again once you are done tracing.
      <ul>
        <li><code>&#8963&#8997T</code>: Toggle Trace Mode</li>
        <li><code>&#8963&#8997O</code>: Toggle Helper</li>
        <li><code>&#8963&#8997D</code>: Toggle Debugger</li>
      </ul>
      <h2>Documentation</h2>
      <ul>
        <li><code>t.left(distance, {distanceMode, cornerMode, prevCornerMode})</code></li>
        <li>TODO...</li>
        <li><a href="https://docs.google.com/document/d/11jqqCW_xIeMX7jQs4E_2d3jFCdTUkRBvgYKKBQFDbrE/edit#heading=h.t7xvnb9ezuez">Full Documentation</a></li>
      </ul>
    </div>
    `
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {
    return {
      // string used to look up deserializer function, which must be unique
      // across all packages
      deserializer: 'mosaic-atom/MosaicAtomView'
    };
  }

  getTitle() {
    // used by Atom for tab text
    return 'Mosaic Helper'
  }

  getURI() {
    // used by Atom to identify the view when toggling
    return 'atom://mosaic-atom'
  }

  getDefaultLocation() {
    return 'right';
  }

  getAllowedLocations() {
    return ['left', 'right', 'bottom'];
  }

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
