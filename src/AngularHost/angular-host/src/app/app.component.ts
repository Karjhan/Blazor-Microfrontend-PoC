import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CustomNavbarComponent } from "../components/custom-navbar/custom-navbar.component";
import { ReactComponentComponent } from "../components/react-component/react-component.component";
import { AngularComponentComponent } from "../components/angular-component/angular-component.component";
import { VueComponentComponent } from '../components/vue-component/vue-component.component';

declare global {
  interface Window {
    angularComponentRef: any;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CustomNavbarComponent,
    ReactComponentComponent,
    AngularComponentComponent,
    VueComponentComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppComponent implements OnInit {
  title = 'angular-host';

  async ngOnInit(): Promise<void> {

  }
}
