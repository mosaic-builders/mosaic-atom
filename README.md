# mosaic-atom

This package allows you to write Rabbit/Turtle code in your Atom editor, in sync
with the Rabbit tracer in your browser. Currently, it autocompletes tracer code
in Atom, and selects lines in Atom when the corresponding object is selected in
the tracer in the browser.

## Installation

1. First, make sure you have Atom installed. The `apm` package manager is required.
2. Then, in Atom, install `mosaic-atom` (Atom > Preferences > Install > Search for `mosaic-atom`)
3. If you previously had `mosaic-rabbit-tracer-atom` installed, then make sure you disable and uninstall it. (Atom > Preferences > Packages > Search for the package, and disable/uninstall it)
4. Make sure you have the latest version of `construction-projects`, with all your dependencies up to date!

Now, launch the server and open a trace file (ex: `casita.js`) in the browser
and in Atom, and enjoy!

## Calibration
In order for calibration to work, you need to have the trace file active (your cursor must be in that file).

## Debugging Tips
If nothing seems to happen when selecting a line or calibrating in the browser the first time you try it,
you might have to reload your Atom window (`ctrl+option+cmd+L`). Then refresh your browser, and hopefully
it should work. If not, create an Issue!
