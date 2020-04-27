'use babel';

const set = `t.set('\${1}', \${2})`;

const start = `t.start()`;

const boilerplate = `const c = require('mosaic-core')
const t = c.createTracer()
const d = c.dist
module.exports = t\n`;

const defaults = `t.default('\${1}', \${2})\n`;

const left = `t.left(d(\${1}), {
	distanceMode: \${2:/* TODO */},
	cornerMode: \${3:/* TODO */},
	\${4:prevCornerMode: \${5:/* TODO */},}
})`;

const leftOptions = `t.left(d(\${1}), {\${2}}})`;

const leftD = `t.left(d(\${1}))`;

const right = `t.right(d(\${1}), {
	distanceMode: \${2:/* TODO */},
	cornerMode: \${3:/* TODO */},
	\${4:prevCornerMode: \${5:/* TODO */},}
})`;

const rightOptions = `t.right(d(\${1}), {\${2}}})`;

const rightD = `t.right(d(\${1}))`;

const up = `t.up(d(\${1}), {
	distanceMode: \${2:/* TODO */},
	cornerMode: \${3:/* TODO */},
	\${4:prevCornerMode: \${5:/* TODO */},}
})`;

const upOptions = `t.up(d(\${1}), {\${2}}})`;

const upD = `t.up(d(\${1}))`;

const down = `t.down(d(\${1}), {
	distanceMode: \${2:/* TODO */},
	cornerMode: \${3:/* TODO */},
	\${4:prevCornerMode: \${5:/* TODO */},}
})`;

const downOptions = `t.down(d(\${1}), {\${2}}})`;

const downD = `t.down(d(\${1}))`;

const splitLeft = `t.splitLeft(d(\${1}), () => {
	\${2:/* TODO */}
})`;

const splitLeftD = `t.splitLeft(d(\${1}))`;

const splitRight = `t.splitRight(d(\${1}), () => {
	\${2:/* TODO */}
})`;

const splitRightD = `t.splitRight(d(\${1}))`;

const splitUp = `t.splitUp(d(\${1}), () => {
	\${2:/* TODO */}
})`;

const splitUpD = `t.splitUp(d(\${1}))`;

const splitDown = `t.splitDown(d(\${1}), () => {
	\${2:/* TODO */}
})`;

const splitDownD = `t.splitDown(d(\${1}))`;

const opening = `t.opening(d(\${1}), {
	centerLocation: \${2:/* TODO */},
	width: \${3:/* TODO */},
	height: \${4:/* TODO */},
	bottomHeight: \${5:/* TODO */},
})`;

const suggestions = [
  {
		title: "t.set",
    snippet: set,
    displayText: "t.set(name, value)",
		leftLabel: "Turtle Command",
    type: "snippet",
    description: "Set a property"
  },
  {
		title: "t.start",
    snippet: start,
    displayText: "t.start({options})",
		leftLabel: "Turtle Command",
    type: "snippet",
    description: "Start tracing a floorplan"
  },
  {
		title: "t.default",
    snippet: defaults,
    displayText: "t.default(path, value)",
		leftLabel: "Turtle Command",
    type: "snippet",
    description: "Set defaults"
  },
  {
		title: "boilerplate",
    snippet: boilerplate,
		leftLabel: "Turtle Command",
    type: "snippet",
    description: "Boilerplate code to get started on a trace"
  },
  {
		title: "t.left",
    snippet: left,
    displayText: "t.left(distance, {distanceMode, cornerMode, prevCornerMode})",
		leftLabel: "Framing command",
    type: "snippet",
    description: "Trace a wall going left"
  },
	{
		title: "t.left",
		snippet: leftOptions,
		displayText: "t.left(distance, options)",
		leftLabel: "Framing command",
		type: "snippet",
		description: "Trace a wall going left"
	},
	{
		title: "t.left",
		snippet: leftD,
		displayText: "t.left(distance)",
		leftLabel: "Framing command",
		type: "snippet",
		description: "Trace a wall going left"
	},
  {
		title: "t.right",
    snippet: right,
    displayText: "t.right(distance, {distanceMode, cornerMode, prevCornerMode})",
		leftLabel: "Framing command",
    type: "snippet",
    description: "Trace a wall going right"
  },
	{
		title: "t.right",
		snippet: rightOptions,
		displayText: "t.right(distance, {options})",
		leftLabel: "Framing command",
		type: "snippet",
		description: "Trace a wall going right"
	},
	{
		title: "t.right",
		snippet: rightD,
		displayText: "t.right(distance)",
		leftLabel: "Framing command",
		type: "snippet",
		description: "Trace a wall going right"
	},
  {
		title: "t.up",
    snippet: up,
    displayText: "t.up(distance, {distanceMode, cornerMode, prevCornerMode})",
		leftLabel: "Framing command",
    type: "snippet",
    description: "Trace a wall going up"
  },
	{
		title: "t.up",
		snippet: upOptions,
		displayText: "t.up(distance, {options})",
		leftLabel: "Framing command",
		type: "snippet",
		description: "Trace a wall going up"
	},
	{
		title: "t.up",
		snippet: upD,
		displayText: "t.up(distance)",
		leftLabel: "Framing command",
		type: "snippet",
		description: "Trace a wall going up"
	},
	{
		title: "t.down",
		snippet: down,
		displayText: "t.down(distance, {distanceMode, cornerMode, prevCornerMode})",
		leftLabel: "Framing command",
		type: "snippet",
		description: "Trace a wall going down"
	},
	{
		title: "t.down",
		snippet: downOptions,
		displayText: "t.down(distance, {options})",
		leftLabel: "Framing command",
		type: "snippet",
		description: "Trace a wall going down"
	},
	{
		title: "t.down",
		snippet: downD,
		displayText: "t.down(distance)",
		leftLabel: "Framing command",
		type: "snippet",
		description: "Trace a wall going down"
	},
  {
		title: "t.splitLeft",
    snippet: splitLeft,
    displayText: "t.splitLeft(distance, {options}, createSplitWalls)",
		leftLabel: "Framing command",
    type: "snippet",
    description: "Start tracing an interior wall from this wall going left"
  },
	{
		title: "t.splitLeft",
		snippet: splitLeftD,
		displayText: "t.splitLeft(distance)",
		leftLabel: "Framing command",
		type: "snippet",
		description: "Start tracing an interior wall from this wall going left"
	},
  {
		title: "t.splitRight",
    snippet: splitRight,
    displayText: "t.splitRight(distance, {options}, createSplitWalls)",
		leftLabel: "Framing command",
    type: "snippet",
    description: "Start tracing an interior wall from this wall going right"
  },
	{
		title: "t.splitRight",
		snippet: splitRightD,
		displayText: "t.splitRight(distance)",
		leftLabel: "Framing command",
		type: "snippet",
		description: "Start tracing an interior wall from this wall going right"
	},
  {
		title: "t.splitDown",
    snippet: splitDown,
    displayText: "t.splitDown(distance, {options}, createSplitWalls)",
		leftLabel: "Framing command",
    type: "snippet",
    description: "Start tracing an interior wall from this wall going down"
  },
	{
		title: "t.splitDown",
		snippet: splitDownD,
		displayText: "t.splitDown(distance)",
		leftLabel: "Framing command",
		type: "snippet",
		description: "Start tracing an interior wall from this wall going down"
	},
  {
		title: "t.splitUp",
    snippet: splitUp,
    displayText: "t.splitUp(distance, {options}, createSplitWalls)",
		leftLabel: "Framing command",
    type: "snippet",
    description: "Start tracing an interior wall from this wall going up"
  },
	{
		title: "t.splitUp",
		snippet: splitUpD,
		displayText: "t.splitUp(distance)",
		leftLabel: "Framing command",
		type: "snippet",
		description: "Start tracing an interior wall from this wall going up"
	},
  {
		title: "t.opening",
    snippet: opening,
    displayText: "t.opening(distance, centerLocation, width, height, bottomHeight)",
		leftLabel: "Framing command",
    type: "snippet",
    description: "Trace an opening"
  }
]

export default suggestions;
