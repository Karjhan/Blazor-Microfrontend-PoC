import { IBlazorAnimal } from "./blazorAnimal"

export interface IBlazorComponentPayload{
    animals: IBlazorAnimal[]; 
    customCarouselCss?: string; 
    customSlideCss?: string;
}