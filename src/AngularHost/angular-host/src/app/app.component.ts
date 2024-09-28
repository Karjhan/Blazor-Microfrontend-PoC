import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DataService } from '../services/data.service';
import { cssFileToSingleLineString } from '../commonUtils/utils'
import { IBlazorComponentPayload } from '../blazorUtils/blazorComponentPayload';
import { IBlazorAnimal } from '../blazorUtils/blazorAnimal';
import { setBlazorPayloadParameters } from '../blazorUtils/blazorParameters';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppComponent implements OnInit {
  title = 'angular-host';

  constructor(private dataService: DataService) {}

  async ngOnInit(): Promise<void> {
    let blazorPayload: IBlazorComponentPayload | undefined;

    const blazorAnimals: IBlazorAnimal[] = this.dataService.animals.map(animal => ({
      id: animal.id,
      name: animal.name,
      imageUrl: animal.imageUrl
    }));

    const customCarouselCss = await cssFileToSingleLineString('../assets/blazorCss/blazorCarousel.css');
    const customSlideCss = await cssFileToSingleLineString('../assets/blazorCss/blazorCarouselSlider.css');

    const onAnimalSelected = this.dataService.selectAnimal;

    blazorPayload = {
      animals: blazorAnimals,
      customCarouselCss: customCarouselCss || '', 
      customSlideCss: customSlideCss || '',
      onAnimalSelected
    };

    setBlazorPayloadParameters(blazorPayload);
  }
}
