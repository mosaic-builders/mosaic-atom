'use babel';

import suggestions from '../data/suggestions';

class TurtleProvider {
  constructor() {
    this.selector = '.source.js';
    this.disableForSelector = '.source.js .comment';
    this.suggestionPriority = 2;
  }

  getSuggestions(options) {
    const { editor, bufferPosition } = options;

    let prefix = this.getPrefix(editor, bufferPosition);

    // only look for suggestions after certain prefixes have been typed
		if (prefix.startsWith('t.') || prefix.startsWith('b')) {
			return this.findMatchingSuggestions(prefix);
		}
  }

  getPrefix(editor, bufferPosition) {
		// this expands the prefix back until a whitespace character is met
		let line = editor.getTextInRange([[bufferPosition.row, 0], bufferPosition]);
		let match = line.match(/\S+$/);
		return match ? match[0] : '';
	}

  findMatchingSuggestions(prefix) {
    // filter list of suggestions to those matching the prefix, case insensitive
    let prefixLower = prefix.toLowerCase();
		let matchingSuggestions = suggestions.filter((suggestion) => {
			let textLower = suggestion.title.toLowerCase();
			return textLower.startsWith(prefixLower);
		});

		// run each matching suggestion through inflateSuggestion() and return
    let inflateSuggestion = this.inflateSuggestion.bind(this, prefix);
		let inflatedSuggestions = matchingSuggestions.map(inflateSuggestion);
    return inflatedSuggestions;
  }

  // clones a suggestion object to a new object with some shared additions
  // cloning also fixes an issue where selecting a suggestion won't insert it
  inflateSuggestion(replacementPrefix, suggestion) {
    return {
      ...suggestion,
      replacementPrefix: replacementPrefix
    };
  }
}

export default new TurtleProvider();
