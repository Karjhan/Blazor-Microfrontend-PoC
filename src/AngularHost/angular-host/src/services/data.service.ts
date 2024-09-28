import { Injectable } from '@angular/core';
import { IAnimal } from '../commonUtils/animalModel';
import { ICharity } from '../commonUtils/charityModel';
import { IToy } from '../commonUtils/toyModel';

import animalsData from '../assets/data/animals.json';
import charitiesData from '../assets/data/charities.json';
import toysData from '../assets/data/toys.json';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public animals: IAnimal[] = [];
  public charities: ICharity[] = [];
  public toys: IToy[] = [];
  public selectedAnimal: IAnimal | undefined;

  private intervalId: any;

  constructor() {
    this.loadData();
    this.selectedAnimal = this.animals[0];
    this.startLoggingSelectedAnimal();
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

  public selectAnimal(animalId: string) : void{
    console.log('Selecting animal...');
    this.selectedAnimal = this.animals.find(animal => animal.id === animalId);
    console.log('Selected animal:', this.selectedAnimal);
  }

  private startLoggingSelectedAnimal(): void {
    this.intervalId = setInterval(() => {
      console.log('Selected animal:', this.selectedAnimal);
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}