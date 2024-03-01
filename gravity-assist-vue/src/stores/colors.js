
const colorTypes = ["New Color", "Multi-Color Gradient", "Single Color Gradient", "Fade Gradient", "Other"]

const colors = [{
    type: ["Multi-Color Gradient"],
    name: "pinkToYellow",
    color1: "pink",
    color2: "yellow",
    colorPalette: ["#cf957ff", "#cff57f7", "#cff57e9", "#cff57db", "#cff57cd", "#cff57b3", "#cff579d", "#cff5781", "#cff5a57", "#cff6d57", "#cff7e57", 
    "#cff8c57", "#cffa057", "#cffae57", "#cffbc57", "#cffc94d"]
}, {
    type: ["New Color", "Multi-Color Gradient"],
    name: "redToOrange",
    color1: "red",
    color2: "orange",
    colorPalette: ["#ce32b2b", "#ce5362b", "#ce8402b", "#cea492b", "#cec512b", "#cee592c", "#cf0602c", "#cf2672d", "#cf46e2e", "#cf6752f", "#cf77b31",
    "#cf98232", "#cfb8834", "#cfc8f37", "#cfe9539", "#cff9b3c"]
}, {
    type: ["Multi-Color Gradient"],
    name: "redToYellow",
    color1: "red",
    color2: "yellow",
    colorPalette: ["#cff0f00", "#cff1d00", "#cff2b00", "#cff3900", "#cff4600", "#cff5300", "#cff6000", "#cff7000", "#cff8000", "#cff9000", "#cffa000",
    "#cffb000", "#cffc000", "#cffd000", "#cffe000", "#cfff000"]
}, {
    type: ["New Color", "Multi-Color Gradient"],
    name: "blueToOrange",
    color1: "blue",
    color2: "orange",
    colorPalette: ["#c3dcfff", "#c61cef2", "#c79cde5", "#c8cccd8", "#c9bcbcc", "#ca9cabf", "#cb5c8b2", "#cc0c7a5", "#cc9c698", "#cd3c58b", "#cdbc47d",
    "#ce3c270", "#cebc161", "#cf2c052", "#cf8be41", "#cffbd2c"]
}, {
    type: ["Multi-Color Gradient"],
    name: "blueToYellow",
    color1: "blue",
    color2: "yellow",
    colorPalette: ["#c85abff", "#c85b8ff", "#c8ac0ff", "#c8fceff", "#c91deff", "#c96ecff", "#c96f6ff", "#c94f8ff", "#ca6ffef", "#cb5ffda", "#cbfffc7",
    "#cceffbf", "#cdeffad", "#cf2ffa1", "#cfffb8a", "#cfff47a"]
}, {
    type: ["Multi-Color Gradient"],
    name: "blueToGreen",
    color1: "blue",
    color2: "green",
    colorPalette: ["#c00a1ff", "#c00a8f8", "#c00adf2", "#c00b1ec", "#c00b6e4", "#c00bcdd", "#c00c4d6", "#c00c8cf", "#c00d0c6", "#c00d6c0", "#c00ddb8",
    "#c00e5ae", "#c00eba5", "#c00f1a1", "#c00f899", "#c00fe90"]
}, {
    type: ["New Color", "Multi-Color Gradient"],
    name: "purpleToMint",
    color1: "purple",
    color2: "mint",
    colorPalette: ["#c8e2ff7", "#c893ff2", "#c8749ef", "#c8255ec", "#c8161e9", "#c7e6ee6", "#c7b79e2", "#c7884e0", "#c7592dc", "#c729bd9", "#c6ea8d5",
    "#c6bb5d2", "#c69c0cf", "#c66cacc", "#c64d3ca", "#c62debd"]
}, {
    type: ["New Color", "Multi-Color Gradient"],
    name: "purpleToBlue",
    color1: "purple",
    color2: "blue",
    colorPalette: ["#cbd40ff", "#cbd40ff", "#cbd40ff", "#cb043ea", "#ca443eb", "#c9943ed", "#c8d43ee", "#c8043f0", "#c6743f2", "#c4943f4", "#c4254f5",
    "#c4285f8", "#c42a1f9", "#c42a5fb", "#c49aaeb", "#c519ccf"]
}, {
    type: ["Single Color Gradient"],
    name: "goldToGold",
    color1: "gold",
    color2: "gold",
    colorPalette: ["#cffff00", "#cffff00", "#cfff300", "#cfff300", "#cffea00", "#cffea00", "#cffe100", "#cffe100", "#cffd900", "#cffd900", "#cffd000",
    "#cffd000", "#cffcc00", "#cffcc00", "#cffc400", "#cffc400"]
}, {
    type: ["New Color", "Single Color Gradient"],
    name: "greenToGreen",
    color1: "green",
    color2: "green",
    colorPalette: ["#ca9ff38", "#ca0ff45", "#c97ff50", "#c8eff5b", "#c85ff65", "#c7cff6f", "#c73ff78", "#c6aff81", "#c61ff8a", "#c58ff92", "#c50ff9a",
    "#c47ffa2", "#c3fffaa", "#c37ffb1", "#c2fffb8", "#c29ffbf"]
}, {
    type: ["Single Color Gradient"],
    name: "blueToBlue",
    color1: "blue",
    color2: "blue",
    colorPalette: ["#c6bffff", "#c6bfaff", "#c6bfaff", "#c6bf3ff", "#c6beeff", "#c6be6ff", "#c6bdfff", "#c6bd8ff", "#c6bd0ff", "#c6bc9ff", "#c6bc4ff",
    "#c6bbfff", "#c6bbaff", "#c6bb5ff", "#c6bb0ff", "#c6babff"]
}, {
    type: ["Single Color Gradient"],
    name: "purpleToPurple",
    color1: "purple",
    color2: "purple",
    colorPalette: ["#c6ea3ff", "#c6e99ff", "#c6e95ff", "#c6e8dff", "#c6e7dff", "#c736eff", "#c736eff", "#c8b6eff", "#c976eff", "#ca66eff", "#cb46eff",
    "#cc06eff", "#cc76eff", "#ccc6eff", "#cd16eff", "#cd16eff"]
}, {
    type: ["Single Color Gradient"],
    name: "pinkToPink",
    color1: "pink",
    color2: "pink",
    colorPalette: ["#cdc6bff", "#ce16bff", "#ce16bff", "#ce66bff", "#ceb6bff", "#cf06bff", "#cf56bff", "#cfa6bff", "#cff6bff", "#cff6bfa", "#cff6bf3",
    "#cff6bee", "#cff6be6", "#cff6bdf", "#cff6bda", "#cff6bd3"]
}, {
    type: ["Fade Gradient"],
    name: "redToWhite",
    color1: "red",
    color2: "white",
    colorPalette: ["#cff0000", "#cff1111", "#cff2222", "#cff3333", "#cff4444", "#cff5555", "#cff6666", "#cff7777", "#cff8888", "#cff9999", "#cffaaaa",
    "#cffbbbb", "#cffcccc", "#cffdddd", "#cffeeee", "#cffffff"]
}, {
    type: ["Fade Gradient"],
    name: "yellowToWhite",
    color1: "yellow",
    color2: "white",
    colorPalette: ["#cffff00", "#cffff11", "#cffff22", "#cffff33", "#cffff44", "#cffff55", "#cffff66", "#cffff77", "#cffff88", "#cffff99", "#cffffaa",
    "#cffffbb", "#cffffcc", "#cffffdd", "#cffffee", "#cffffff"]
}, {
    type: ["Fade Gradient"],
    name: "greenToWhite",
    color1: "green",
    color2: "white",
    colorPalette: ["#c00ff00", "#c11ff11", "#c22ff22", "#c33ff33", "#c44ff44", "#c55ff55", "#c66ff66", "#c77ff77", "#c88ff88", "#c99ff99", "#caaffaa",
    "#cbbffbb", "#cccffcc", "#cddffdd", "#ceeffee", "#cffffff"]
}, {
    type: ["Fade Gradient"],
    name: "blueToWhite",
    color1: "blue",
    color2: "white",
    colorPalette: ["#c00d7ff", "#c13daff", "#c23ddff", "#c35e0ff", "#c49e4ff", "#c5ee7ff", "#c6feaff", "#c7decff", "#c92efff", "#ca5f2ff", "#cb4f4ff",
    "#cc2f6ff", "#ccef8ff", "#cd9faff", "#ce9fbff", "#cffffff"]
}, {
    type: ["Fade Gradient"],
    name: "purpleToWhite",
    color1: "purple",
    color2: "white",
    colorPalette: ["#ce100ff", "#ce313ff", "#ce735ff", "#ce946ff", "#ceb56ff", "#ced65ff", "#cee72ff", "#cef7eff", "#cf18bff", "#cf299ff", "#cf4a2ff",
    "#cf6b1ff", "#cf8c0ff", "#cfaccff", "#cfde1ff", "#cffffff"]
}, {
    type: ["Fade Gradient"],
    name: "redToDark",
    color1: "red",
    color2: "dark",
    colorPalette: ["#cdc0101", "#cd40101", "#ccc0303", "#cc30303", "#cb90404", "#caf0505", "#ca40707", "#c990707", "#c8f0909", "#c820a0a", "#c770b0b",
    "#c6c0d0d", "#c620d0d", "#c590f0f", "#c4c1010"]
    /* ["#cfb4545", "#cf64141", "#cf13d3d", "#cec3939", "#ce73535", "#ce02f2f", "#cda2a2a", "#cda2a2a", "#cce2020", "#cc61a1a", "#cbf1414",
    "#cb91010", "#cb30b0b", "#cad0606", "#ca70101"] */
}, {
    type: ["Other"],
    name: "rainbowToRainbow",
    color1: "rainbow",
    color2: "rainbow",
    displayName: "Rainbow",
    colorPalette: ["#cf6004e", "#cfa084d", "#cfb1851", "#cfc2950", "#cfd3d53", "#cfe5552", "#cfd5552", "#cff6d50", "#cff844f", "#cff9645", "#cffac3f",
    "#cffbd38", "#cffcf30", "#cfdd927", "#cf8e622", "#ce5ea22", "#cbfee23", "#c99ec26", "#c6aea33", "#c41e541", "#c26de6d", "#c23d694", "#c25d0b1", "#c31bee1",
    "#c40abf7", "#c588aff", "#c735efe", "#c8a43fb", "#c932ff7", "#ca619f8", "#cb209f5", "#cbb02f3"]
}, {
    type: ["Other"],
    name: "blueToPink",
    color1: "blue",
    color2: "pink",
    displayName: "Cotton Candy",
    colorPalette: ["#c11dee5", "#c0adcdc", "#c5fdbcf", "#c8ddac2", "#cb5d8b3", "#ce6d6a0", "#cfdd39f", "#cffd0b5", "#cfecdc7", "#cffc6d5", "#cfdaed2",
    "#cfe92cd", "#cff80c8", "#cfc79c8", "#cf870cc", "#cec67cf"]
}, {
    type: ["New Color", "Other"],
    name: "orangeToPink",
    color1: "orange",
    color2: "pink",
    displayName: "Sunset",
    colorPalette: ["#cfb8333", "#cf87e3d", "#cf57c48", "#cf27954", "#cef765e", "#ced746b", "#cea7175", "#ce76e81", "#ce36b8d", "#cdf669c", "#cdb63ab",
    "#cd860b8", "#cd45bc8", "#ccf58d8", "#ccd55e2", "#cc74ff7"]
}];

export { colorTypes, colors }
