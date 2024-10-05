import { IPurchase } from "./purchaseModel";
import { IToy } from "./toyModel";

export interface AngularComponentInstance {
    data: AngularComponentData; 
}

export interface AngularComponentData {
    toy: IToy | undefined,
    toggle: boolean | undefined,
    onModalClose: () => void,
    addPurchase: (purchase: IPurchase) => void
}