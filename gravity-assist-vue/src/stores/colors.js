
const colors = [{
    name: "rainbowToRainbow",
    color1: "rainbow",
    color2: "rainbow",
    colorPalette: ["#cf6004e", "#cfa084d", "#cfb1851", "#cfc2950", "#cfd3d53", "#cfe5552", "#cfd5552", "#cff6d50", "#cff844f", "#cff9645", "#cffac3f",
    "#cffbd38", "#cffcf30", "#cfdd927", "#cf8e622", "#ce5ea22", "#cbfee23", "#c99ec26", "#c6aea33", "#c41e541", "#c26de6d", "#c23d694", "#c25d0b1", "#c31bee1",
    "#c40abf7", "#c588aff", "#c735efe", "#c8a43fb", "#c932ff7", "#ca619f8", "#cb209f5", "#cbb02f3"]
}, {
    name: "pinkToYellow",
    color1: "pink",
    color2: "yellow",
    colorPalette: ["#cf957ff", "#cff57f7", "#cff57e9", "#cff57db", "#cff57cd", "#cff57b3", "#cff579d", "#cff5781", "#cff5a57", "#cff6d57", "#cff7e57", 
    "#cff8c57", "#cffa057", "#cffae57", "#cffbc57", "#cffc94d"]
}, {
    name: "redToYellow",
    color1: "red",
    color2: "yellow",
    colorPalette: ["#cff0f00", "#cff1d00", "#cff2b00", "#cff3900", "#cff4600", "#cff5300", "#cff6000", "#cff7000", "#cff8000", "#cff9000", "#cffa000",
    "#cffb000", "#cffc000", "#cffd000", "#cffe000", "#cfff000"]
}, {
    name: "yellowToBlue",
    color1: "yellow",
    color2: "blue",
    colorPalette: ["#cfff47a", "#cfffb8a", "#cf2ffa1", "#cdeffad", "#cceffbf", "#cbfffc7", "#cb5ffda", "#ca6ffef", "#c94f8ff", "#c96f6ff", "#c96ecff",
    "#c91deff", "#c8fceff", "#c8ac0ff", "#c85b8ff", "#c85abff"]
}, {
    name: "greenToBlue",
    color1: "green",
    color2: "blue",
    colorPalette: ["#c00fe90", "#c00f899", "#c00f1a1", "#c00eba5", "#c00e5ae", "#c00ddb8", "#c00d6c0", "#c00d0c6", "#c00c8cf", "#c00c4d6", "#c00bcdd",
    "#c00b6e4", "#c00b1ec", "#c00adf2", "#c00a8f8", "#c00a1ff"]
}, {
    name: "blueToPurple",
    color1: "blue",
    color2: "purple",
    colorPalette: ["#c6ea3ff", "#c6e99ff", "#c6e95ff", "#c6e8dff", "#c6e7dff", "#c736eff", "#c736eff", "#c8b6eff", "#c976eff", "#ca66eff", "#cb46eff",
    "#cc06eff", "#cc76eff", "#ccc6eff", "#cd16eff", "#cd16eff"]
}, {
    name: "blueToPink",
    color1: "blue",
    color2: "pink",
    colorPalette: ["#c11dee5", "#c0adcdc", "#c5fdbcf", "#c8ddac2", "#cb5d8b3", "#ce6d6a0", "#cfdd39f", "#cffd0b5", "#cfecdc7", "#cffc6d5", "#cfdaed2",
    "#cfe92cd", "#cff80c8", "#cfc79c8", "#cf870cc", "#cec67cf"]
}, {
    name: "pinkToPink",
    color1: "pink",
    color2: "pink",
    colorPalette: ["#cdc6bff", "#ce16bff", "#ce16bff", "#ce66bff", "#ceb6bff", "#cf06bff", "#cf56bff", "#cfa6bff", "#cff6bff", "#cff6bfa", "#cff6bf3",
    "#cff6bee", "#cff6be6", "#cff6bdf", "#cff6bda", "#cff6bd3"]
}, {
    name: "goldToGold",
    color1: "gold",
    color2: "gold",
    colorPalette: ["#cffff00", "#cffff00", "#cfff300", "#cfff300", "#cffea00", "#cffea00", "#cffe100", "#cffe100", "#cffd900", "#cffd900", "#cffd000",
    "#cffd000", "#cffcc00", "#cffcc00", "#cffc400", "#cffc400"]
}, {
    name: "blueToBlue",
    color1: "blue",
    color2: "blue",
    colorPalette: ["#c6bffff", "#c6bfaff", "#c6bfaff", "#c6bf3ff", "#c6beeff", "#c6be6ff", "#c6bdfff", "#c6bd8ff", "#c6bd0ff", "#c6bc9ff", "#c6bc4ff",
    "#c6bbfff", "#c6bbaff", "#c6bb5ff", "#c6bb0ff", "#c6babff"]
}, {
    name: "redToWhite",
    color1: "red",
    color2: "white",
    colorPalette: ["#cff0000", "#cff1111", "#cff2222", "#cff3333", "#cff4444", "#cff5555", "#cff6666", "#cff7777", "#cff8888", "#cff9999", "#cffaaaa",
    "#cffbbbb", "#cffcccc", "#cffdddd", "#cffeeee", "#cffffff"]
}, {
    name: "yellowToWhite",
    color1: "yellow",
    color2: "white",
    colorPalette: ["#cffff00", "#cffff11", "#cffff22", "#cffff33", "#cffff44", "#cffff55", "#cffff66", "#cffff77", "#cffff88", "#cffff99", "#cffffaa",
    "#cffffbb", "#cffffcc", "#cffffdd", "#cffffee", "#cffffff"]
}, {
    name: "greenToWhite",
    color1: "green",
    color2: "white",
    colorPalette: ["#c00ff00", "#c11ff11", "#c22ff22", "#c33ff33", "#c44ff44", "#c55ff55", "#c66ff66", "#c77ff77", "#c88ff88", "#c99ff99", "#caaffaa",
    "#cbbffbb", "#cccffcc", "#cddffdd", "#ceeffee", "#cffffff"]
}, {
    name: "blueToWhite",
    color1: "blue",
    color2: "white",
    colorPalette: ["#c00d7ff", "#c13daff", "#c23ddff", "#c35e0ff", "#c49e4ff", "#c5ee7ff", "#c6feaff", "#c7decff", "#c92efff", "#ca5f2ff", "#cb4f4ff",
    "#cc2f6ff", "#ccef8ff", "#cd9faff", "#ce9fbff", "#cffffff"]
}, {
    name: "purpleToWhite",
    color1: "purple",
    color2: "white",
    colorPalette: ["#ce100ff", "#ce313ff", "#ce735ff", "#ce946ff", "#ceb56ff", "#ced65ff", "#cee72ff", "#cef7eff", "#cf18bff", "#cf299ff", "#cf4a2ff",
    "#cf6b1ff", "#cf8c0ff", "#cfaccff", "#cfde1ff", "#cffffff"]
}, {
    name: "redToBlack",
    color1: "red",
    color2: "dark",
    colorPalette: ["#cdc0101", "#cd40101", "#ccc0303", "#cc30303", "#cb90404", "#caf0505", "#ca40707", "#c990707", "#c8f0909", "#c820a0a", "#c770b0b",
    "#c6c0d0d", "#c620d0d", "#c590f0f", "#c4c1010"]
    /* ["#cfb4545", "#cf64141", "#cf13d3d", "#cec3939", "#ce73535", "#ce02f2f", "#cda2a2a", "#cda2a2a", "#cce2020", "#cc61a1a", "#cbf1414",
    "#cb91010", "#cb30b0b", "#cad0606", "#ca70101"] */
}];

export { colors }
