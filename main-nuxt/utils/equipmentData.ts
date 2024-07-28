
export type EquipmentClass = "Information" | "Logistics" | "Engineering" | "Engage" | "Efficiency";
export type TechnicalBlueprintClass = "Strategy" | "Supply" | "Communicate" | "Command";

export type Equipment = {
    displayImg: string;
    type: "Equipment",
    displayName: string;
    effectName: string;
    effectDescription: string[];
    loadWeight: number;
    class: EquipmentClass;
}

export type TechnicalBlueprint = {
    displayImg: string;
    type: "Technical Blueprint";
    displayName: string;
    effectName: string;
    effectDescription: string[];
    deliveryTarget: "Range" | "Single";
    itemMass: "Light" | "Heavy";
    activeService: number;
    productionInterval: string;
    class: TechnicalBlueprintClass;
}
