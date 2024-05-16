
export type Changelog = {
    type: "release" | "minor release" | "bugfix";
    version: string;
    release: string;
    notes: string[];
}

const changelog: Changelog[] = [{
    type: "release",
    version: "0.1.0",
    release: "January 13, 2024",
    notes: ["Initial release"]
}, {
    type: "release",
    version: "0.2.0",
    release: "January 14, 2024",
    notes: ["Added header and footer", "Added fade when changing theme", "Added light mode colors", 
    "Optimized font sizes for mobile users", "Made theme button bigger", 
    "Fixed character counter in Color Generator", "Added Research Agreement Helper"]
}, {
    type: "release",
    version: "0.3.0",
    release: "January 15, 2024",
    notes: ["Added Changelog", "Removed theme button image", "Moved theme button to header buttons", 
    "Added active and hover effects to header buttons"]
}, {
    type: "release",
    version: "0.3.1",
    release: "January 16, 2024",
    notes: ["Changed the information displayed in Research Agreement Helper", "Version number in footer is now dynamic", 
    "Optimized how information is displayed in Research Agreement Helper for mobile users", "Added images to Research Agreement Helper"]
}, {
    type: "bugfix",
    version: "0.3.2",
    release: "January 16, 2024",
    notes: ["Optimized Research Agreement Helper for mobile users further"]
}, {
    type: "release",
    version: "0.3.3",
    release: "January 17, 2024",
    notes: ["Changed how Color Generator operates", "Color Generator is now based on text-based markers rather than highlighting text",
    "Removed the Underline option in Color Generator", "Changed tutorial text of Color Generator to match the other changes",
    "Fixed the character counters in Color Generator"]
}, {
    type: "bugfix",
    version: "0.3.4",
    release: "January 20, 2024",
    notes: ["Fixed a bug where Color Generator output not updating when a color marker was placed in the input"]
}, {
    type: "release",
    version: "0.4.0",
    release: "January 28, 2024",
    notes: ["Added Module Library", "Fixed ST59 and Spear of Uranus being misplaced in the Research Agreement Helper ship order",
    "Changed the size of active buttons to better fit mobile devices"]
}, {
    type: "release",
    version: "0.4.1",
    release: "January 29, 2024",
    notes: ["Renamed Changelog to Home", "Changed Research Agreement Helper and Module Library to save progress if you switch Gravity Assist tools",
    "Significantly changed the display of data in Module Library", "Changed Gravity Assist to default to displaying Home on load",
    "Added alternative Navigation Bar buttons to the Home Page", "Fixed some module data"]
}, {
    type: "release",
    version: "0.4.2",
    release: "January 30, 2024",
    notes: ["Added a search by ship feature for Research Agreement Helper", "Optimized Module Library buttons for mobile devices",
    "Removed the Theme button", "Fixed wrong results for Hayreddin's Loyal and Thunderbolt Star in Research Agreement Helper"]
}, {
    type: "release",
    version: "1.0.0",
    release: "February 17, 2024",
    notes: ["Reworked all of Color Generator", "Reworked display of Research Agreement Helper", "Added Color Generator gradients",
    "Color Generator now allows for copy to clipboard", "Improved the RA Finder algorithm", "Changed display of information in Research Agreement Helper",
    "Changed display of information in Module Library", "Changed display of information in Changelog", "Changed display of header buttons",
    "Optimized every display for mobile users", "Changed display of information in Module Library for desktop users",
    "Gravity Assist tool links are now routed", "Added Eternal Heavens to Research Agreement Helper and Module Library",
    "Disabled double-click to zoom on buttons for mobile users"]
}, {
    type: "bugfix",
    version: "1.0.1",
    release: "February 18, 2024",
    notes: ["Added an animation for copying text in Color Generator", "Fixed the Color Generator character counter not working above 1,000 characters",
    "Fixed a bug where the Color Generator reverse button wouldn't work on Chrome for iOS", "Fixed a bug where RA Finder algorithm wouldn't work",
    "Optimized display of information for mobile users in Mod Library"]
}, {
    type: "release",
    version: "1.0.2",
    release: "February 19, 2024",
    notes: ["Added a time estimate for research agreement paths in RA Helper", "Added animations to popup windows in Color Generator and RA Helper",
    "Replaced Mod Library and RA Helper ship images with higher quality ones", "Fixed AT021-B and AT021-C appearing under the wrong filters in RA Helper"]
}, {
    type: "release",
    version: "1.1.0",
    release: "February 20, 2024",
    notes: ["Added Equipment Encyclopedia", "Added a color compression option in Color Generator to create longer text", "Edited home tab text"]
}, {
    type: "release",
    version: "1.1.1",
    release: "February 21, 2024",
    notes: ["Color Generator character counters now update automatically after switching compression",
    "Added more images to Equipment Encyclopedia", "Added 2 new colors to Color Generator", "Made red buttons more vibrant",
    "Added a credits button to Home page", "Optimized the detail cards in Equipment Encyclopedia for mobile users",
    "Fixed some data in Equipment Encylcopedia", "Added missing technical blueprints to Equipment Encyclopedia", "Full changelog is now a window"]
}, {
    type: "minor release",
    version: "1.1.2",
    release: "February 22, 2024",
    notes: ["Finished adding all images to Eqquipment Encyclopedia", "Changed the display of information in the changelog"]
}, {
    type: "bugfix",
    version: "1.1.3",
    release: "February 25, 2024",
    notes: ["Optimized display of information in Equipment Encyclopedia further for mobile users"]
}, {
    type: "release",
    version: "1.1.4",
    release: "February 29, 2024",
    notes: ["Added 3 new colors to Color Generator: Rainbow, Blue/Pink, and Red/Dark"]
}, {
    type: "release",
    version: "1.1.5",
    release: "March 1, 2024",
    notes: ["Reworked the display of colors when choosing a color in Color Generator", "Changed Blue/Purple to Purple/Purple in Color Generator",
    "Added 5 new colors to Color Generator: Red/Orange, Blue/Orange, Purple/Mint, Green/Green, and Sunset", "Colors are now separated into categories"]
}, {
    type: "minor release",
    version: "1.1.5.1",
    release: "March 1, 2024",
    notes: ["Revamped the color pallete of Blue/Purple in Color Generator"]
}, {
    type: "release",
    version: "1.1.6",
    release: "March 2, 2024",
    notes: ["Added the ability to share links for Gravity Assist page options", "Added Eternal Heavens A2 to Module Library"]
}, {
    type: "release",
    version: "1.2.0",
    release: "March 8, 2024",
    notes: ["Added Fleet Builder", "Damage and armor bar representations in Module Library now animate dynamically",
    "Some images in Module Library are now high quality SVG files", "Research Agreement Helper now displays minutes if there is a remainder",
    "Gravity Assist icon is now a high quality SVG", "Clarified the share buttons", "Added onscreen animations when clicking share buttons"]
}, {
    type: "bugfix",
    version: "1.2.1",
    release: "March 24, 2024",
    notes: ["Added Eternal Heavens B1 module", "Fixed flagship choices not changing after removing a flagship ship in Fleet Builder",
    "Edited credits"]
}, {
    type: "release",
    version: "1.2.2",
    release: "April 7, 2024",
    notes: ["Changed copy text and share link buttons to icons", "Added instructions to RA Helper ship search text when no ship is selected",
    "Revamped the color palettes of Blue/Purple and Sunset in Color Generator", "Added 2 new colors to Color Generator: Pink/Green and Orange/Orange",
    "Fixed the display of information in Equipment Encyclopedia for mobile users (for real this time)", "Optimized home menu buttons and added icons",
    "Condensed some credits for better readability", "Added random fun facts to the home page", "Optimized display of information in Module Library",
    "Changed the name of \"Credits\" to \"Contributors\"", "Fixed the close button on the credits screen being too small for mobile users"]
}, {
    type: "minor release",
    version: "1.2.3",
    release: "April 11, 2024",
    notes: ["Added some new home screen tips"]
}, {
    type: "bugfix",
    version: "1.2.4",
    release: "April 16, 2024",
    notes: ["Edited module names for Spear of Uranus for A1, A2, and A3 to match the new ingame names."]
}, {
    type: "minor release",
    version: "1.2.5",
    release: "April 27, 2024",
    notes: ["Added Ranger A and B to Research Agreement Helper", "Added Ediacaran D2 and Marshal Crux C3 to Module Library", "Edited Contributors list"]
}, {
    type: "release",
    version: "1.2.6",
    release: "May 16, 2024",
    notes: ["Added Ediacaran A2, B2, and C1 to Module Library", "Made some major changes behind the scenes", "Removed Fleet Builder temporarily"]
}];

export { changelog };
