export interface ICharity{
    id: string,
    name: string,
    description: string,
    listOfAnimalIds: Array<string>,
    listOfToyIds: Array<string>,
    story: string,
    location: string,
    logoUrl: string,
    goalPrice: number,
    currentStage: number
}