import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAnimal } from '../commonUtils/animalModel';
import { ICharity } from '../commonUtils/charityModel';
import { IToy } from '../commonUtils/toyModel';

import animalsData from '../assets/data/animals.json';
import charitiesData from '../assets/data/charities.json';
import toysData from '../assets/data/toys.json';
import { IPurchase } from '../commonUtils/purchaseModel';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public animals: IAnimal[] = [];
  public charities: ICharity[] = [];
  public toys: IToy[] = [];
  public userPurchases: IPurchase[] = [];

  public selectedAnimalSubject = new BehaviorSubject<IAnimal | undefined>(undefined);
  public selectedCharitySubject = new BehaviorSubject<ICharity | undefined>(undefined);
  public selectedToySubject = new BehaviorSubject<IToy | undefined>(undefined);

  public toysModalTriggerSubject = new BehaviorSubject<boolean | undefined>(false);

  constructor() {
    this.loadData();
    this.selectedAnimalSubject.next(this.animals[0]);
    this.selectedCharitySubject.next(this.charities.find((charity) => charity.id === this.animals[0].charityId));
    this.selectedToySubject.next(this.toys.find((toyItem) => toyItem.id === this.animals[0].toyId));
  }

  private loadData(): void {
    console.log('Data loading started...');
    this.loadAnimals();
    this.loadCharities();
    this.loadToys();
  }

  private loadAnimals(): void {
    console.log('Loading animals...');
    this.animals = animalsData;
    console.log('Animals loaded:', this.animals);
  }

  private loadCharities(): void {
    console.log('Loading charities...');
    this.charities = charitiesData;
    console.log('Charities loaded:', this.charities);
  }

  private loadToys(): void {
    console.log('Loading toys...');
    this.toys = toysData;
    console.log('Toys loaded:', this.toys);
  }

  public selectAnimal(animalId: string): void {
    console.log('Selecting animal...');
    const animal = this.animals.find((animal) => animal.id === animalId);
    const charity = this.charities.find((charity) => charity.id === animal?.charityId);
    const toy = this.toys.find((toyItem) => toyItem.id === animal?.toyId);
    this.selectedAnimalSubject.next(animal); 
    this.selectedCharitySubject.next(charity);
    this.selectedToySubject.next(toy);
    console.log('Selected animal:', animal);
  }

  public toggleToysModalTrigger(): void {
    const currentValue = this.toysModalTriggerSubject.value;
    this.toysModalTriggerSubject.next(!currentValue);
    console.log('Toys modal trigger toggled:', !currentValue);
  }

  public getToyById(toyId: string | undefined): IToy | undefined {
    const toy = this.toys.find(toy => toy.id === toyId);
    console.log('Found toy: ' + JSON.stringify(toy));
    return toy;
  }
}