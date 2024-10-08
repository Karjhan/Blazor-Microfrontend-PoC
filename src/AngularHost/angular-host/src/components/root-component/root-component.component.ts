import { Component, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DataService } from '../../services/data.service';
import { cssFileToSingleLineString } from '../../commonUtils/utils'
import { IBlazorComponentPayload } from '../../blazorUtils/blazorComponentPayload';
import { IBlazorAnimal } from '../../blazorUtils/blazorAnimal';
import { setBlazorPayloadParameters } from '../../blazorUtils/blazorParameters';
import { CustomNavbarComponent } from "../custom-navbar/custom-navbar.component";
import { ReactComponentComponent } from "../react-component/react-component.component";
import { AngularComponentComponent } from "../angular-component/angular-component.component";

@Component({
  selector: 'app-root-component',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CustomNavbarComponent,
    ReactComponentComponent,
    AngularComponentComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  templateUrl: './root-component.component.html',
  styleUrl: './root-component.component.css'
})
export class RootComponentComponent implements OnInit{
  constructor(private dataService: DataService, private zone: NgZone) {}

  async ngOnInit(): Promise<void> {
    let blazorPayload: IBlazorComponentPayload | undefined;

    const blazorAnimals: IBlazorAnimal[] = this.dataService.animals.map(animal => ({
      id: animal.id,
      name: animal.name,
      imageUrl: animal.imageUrl
    }));

    const customCarouselCss = await cssFileToSingleLineString('../../assets/blazorCss/blazorCarousel.css');
    const customSlideCss = await cssFileToSingleLineString('../../assets/blazorCss/blazorCarouselSlider.css');

    blazorPayload = {
      animals: blazorAnimals,
      customCarouselCss: customCarouselCss || '', 
      customSlideCss: customSlideCss || '',
    };

    setBlazorPayloadParameters(blazorPayload);

    window.angularComponentRef = {
      zone: this.zone,
      selectAnimal: (animalId: string) => this.dataService.selectAnimal(animalId),
    };
  }
}
