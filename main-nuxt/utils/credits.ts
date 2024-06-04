
export type CrowdsourcingCredit = {
    title: "Module Crowdsourcing";
    name: string;
    specific: string;
}

export type OtherCredit = {
    title: "Feedback" | "Data";
    name: string[];
}

export type Credit = CrowdsourcingCredit | OtherCredit;

export const credits: Credit[] = [{
    title: "Module Crowdsourcing",
    name: "Windserpent",
    specific: "Over 90% of all modules"
}, {
    title: "Module Crowdsourcing",
    name: "LunatiCorp",
    specific: "Eternal Heavens A2"
}, {
    title: "Module Crowdsourcing",
    name: "Spy Shark",
    specific: "Eternal Heavens B1"
}, {
    title: "Module Crowdsourcing",
    name: "Toir",
    specific: "Ediacaran D2, C1"
}, {
    title: "Module Crowdsourcing",
    name: "kitty7hell",
    specific: "Marshal Crux C3, Ediacaran B2"
}, {
    title: "Module Crowdsourcing",
    name: "Ultix",
    specific: "Eternal Heavens A3"
}, {
    title: "Feedback",
    name: ["Black Rangers", "Bullet", "g3t", "HOSTILE", "Toir"]
}, {
    title: "Data",
    name: ["NullPointer"]
}];