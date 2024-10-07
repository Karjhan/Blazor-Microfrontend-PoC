import { IToy } from "./toyModel";

export interface IBasketItem{
    id: string | undefined,
    recipientName: string | undefined,
    dedicationMessage: string | undefined,
    toy: IToy | undefined,
    count: number | undefined
}