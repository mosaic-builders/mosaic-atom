# mosaic-atom

This package allows you to write Rabbit/Turtle code in your Atom editor, in sync
with the Rabbit tracer in your browser. Currently, it autocompletes tracer code
in Atom, and selects lines in Atom when the corresponding object is selected in
the tracer in the browser.

## Installation

1. First, make sure you have Atom installed. The `apm` package manager is required.
2. Then, make sure you `cd atom-rabbit`.
3. `apm link`
4. `apm install`
5. Now, reload the window (either `ctrl+option+cmd+L` or `cmd+shift+P` followed by `window:reload`).
6. Check that the package was installed by clicking on the `Packages` tab in
Atom, and verifying that `mosaic-rabbit-tracer-atom` exists.

Now, launch the server and open a trace file (ex: `casita.js`) in the browser
and in Atom, and enjoy!

## Calibration
In order for calibration to work, you need to have the trace file active (your cursor must be in that file).

## Debugging Tips
If nothing seems to happen when selecting a line or calibrating in the browser the first time you try it,
you might have to reload your Atom window (`ctrl+option+cmd+L`). Then refresh your browser, and hopefully
it should work. If not, create an Issue!

## Backlog

1. Testing
2. Update autocomplete with `customStud` commands
3. Toggle a window with instructions/useful commands/guide.
4. Check that the filename in the tracer matches the current file in the
workspace.
5. Rabbit/Turtle parser
