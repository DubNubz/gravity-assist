
type AllColors = "New Color" | "Multi-Color Gradient" | "Single Color Gradient" | "Fade Gradient" | "Other";

interface Color {
    type: ("New Color" | "Multi-Color Gradient" | "Single Color Gradient" | "Fade Gradient" | "Other")[];
    name: string;
    color1: string;
    color2: string;
    colorPalette: string[];
}

interface OtherColor extends Color {
    displayName: string;
}

const colorTypes = ["New Color", "Multi-Color Gradient", "Single Color Gradient", "Fade Gradient", "Other"];

const colors: (Color | OtherColor)[] = [{
    type: ["Multi-Color Gradient"],
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
    type: ["Multi-Color Gradient"],
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
    type: ["Multi-Color Gradient"],
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
    colorPalette: ["#cd029fa", "#cc434fa", "#cb93ef9", "#cad49f9", "#ca253f9", "#c965ef9", "#c8b69f8", "#c7f73f8", "#c747ef8", "#c6888f8", "#c5d93f7",
    "#c519ef7", "#c46a8f7", "#c3ab3f7", "#c2fbdf6", "#c23c8f6"]
}, {
    type: ["New Color", "Multi-Color Gradient"],
    name: "pinkToGreen",
    color1: "pink",
    color2: "green",
    colorPalette: ["#cfd81ff", "#ce678fd", "#ccd70fb", "#cb367f9", "#c965ff7", "#c7756f5", "#c564df3", "#c4557f1", "#c3c6bee", "#c3480ec", "#c2b98ea",
    "#c22b2e8", "#c1acee6", "#c11e4dc", "#c09e2b8", "#c00e092"]
}, {
    type: ["Multi-Color Gradient"],
    name: "pinkToYellow",
    color1: "pink",
    color2: "yellow",
    colorPalette: ["#cf957ff", "#cff57f7", "#cff57e9", "#cff57db", "#cff57cd", "#cff57b3", "#cff579d", "#cff5781", "#cff5a57", "#cff6d57", "#cff7e57", 
    "#cff8c57", "#cffa057", "#cffae57", "#cffbc57", "#cffc94d"]
}, {
    type: ["New Color", "Single Color Gradient"],
    name: "orangeToOrange",
    color1: "orange",
    color2: "orange",
    colorPalette: ["#cff5b0f", "#cff6017", "#cff651e", "#cff6a26", "#cff702d", "#cff7535", "#cff7a3d", "#cff7f44", "#cfe844c", "#cfe8953", "#cfe8e5b",
    "#cfe9363", "#cfe996a", "#cfe9e72", "#cfea379", "#cfea881"]
}, {
    type: ["Single Color Gradient"],
    name: "goldToGold",
    color1: "gold",
    color2: "gold",
    colorPalette: ["#cffff00", "#cffff00", "#cfff300", "#cfff300", "#cffea00", "#cffea00", "#cffe100", "#cffe100", "#cffd900", "#cffd900", "#cffd000",
    "#cffd000", "#cffcc00", "#cffcc00", "#cffc400", "#cffc400"]
}, {
    type: ["Single Color Gradient"],
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
    colorPalette: ["#cff0000", "#cff0e0e", "#cff1c1c", "#cff2a2a", "#cff3838", "#cff4646", "#cff5454", "#cff6262", "#cff6f6f", "#cff7d7d", "#cff8b8b",
    "#cff9999", "#cffa7a7", "#cffb5b5", "#cffc3c3", "#cffd1d1"]
}, {
    type: ["Fade Gradient"],
    name: "yellowToWhite",
    color1: "yellow",
    color2: "white",
    colorPalette: ["#cffe600", "#cffe70e", "#cffe91c", "#cffea2a", "#cffeb38", "#cffed46", "#cffee54", "#cffef62", "#cfff16f", "#cfff27d", "#cfff38b",
    "#cfff599", "#cfff6a7", "#cfff7b5", "#cfff9c3", "#cfffad1"]
}, {
    type: ["Fade Gradient"],
    name: "greenToWhite",
    color1: "green",
    color2: "white",
    colorPalette: ["#c05ff00", "#c13ff0e", "#c20ff1c", "#c2eff2a", "#c3cff38", "#c49ff46", "#c57ff54", "#c65ff62", "#c72ff6f", "#c80ff7d", "#c8eff8b",
    "#c9bff99", "#ca9ffa7", "#cb7ffb5", "#cc4ffc3", "#cd2ffd1"]
}, {
    type: ["Fade Gradient"],
    name: "blueToWhite",
    color1: "blue",
    color2: "white",
    colorPalette: ["#c00b3ff", "#c0eb8ff", "#c1cbdff", "#c2ac2fe", "#c38c7fe", "#c46ccfe", "#c54d1fe", "#c62d6fe", "#c6fdcfd", "#c7de1fd", "#c8be6fd",
    "#c99ebfd", "#ca7f0fd", "#cb5f5fc", "#cc3fafc", "#cd1fffc"]
}, {
    type: ["Fade Gradient"],
    name: "purpleToWhite",
    color1: "purple",
    color2: "white",
    colorPalette: ["#ceb00ff", "#cec0eff", "#ced1cff", "#cee2aff", "#cef38ff", "#cf046ff", "#cf154ff", "#cf262ff", "#cf46fff", "#cf57dff", "#cf68bff",
    "#cf799ff", "#cf8a7ff", "#cf9b5ff", "#cfac3ff", "#cfbd1ff"]
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
    colorPalette: ["#cffcf24", "#cfec027", "#cfbb22b", "#cf7a42f", "#cf29633", "#cec8937", "#ce47c3a", "#cdc703d", "#cd3643f", "#cc95941", "#cbe4e42",
    "#cb24543", "#ca63b43", "#c993342", "#c8c2b41", "#c7f243f"]
    /* ["#cfb8333", "#cf87e3d", "#cf57c48", "#cf27954", "#cef765e", "#ced746b", "#cea7175", "#ce76e81", "#ce36b8d", "#cdf669c", "#cdb63ab",
    "#cd860b8", "#cd45bc8", "#ccf58d8", "#ccd55e2", "#cc74ff7"] */
}];

export { colorTypes, colors }
