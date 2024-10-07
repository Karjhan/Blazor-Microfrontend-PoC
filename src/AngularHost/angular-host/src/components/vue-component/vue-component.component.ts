import { Component, AfterViewInit, ViewChild, ElementRef, inject } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { createApp, h } from 'vue';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CustomNavbarComponent } from "../custom-navbar/custom-navbar.component";
import { DataService } from '../../services/data.service';
import { BootstrapVue3 } from 'bootstrap-vue-3';

@Component({
  selector: 'app-vue-component',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CustomNavbarComponent,
  ],
  templateUrl: './vue-component.component.html',
  styleUrls: ['./vue-component.component.css'],
})
export class VueComponentComponent implements AfterViewInit {
  @ViewChild('vueContainer', { static: true }) vueContainer!: ElementRef;
  private dataService = inject(DataService);

  async ngAfterViewInit(): Promise<void> {
    await this.loadVueComponent();
  }

  private async loadVueComponent(): Promise<void>{
    try {
      const VueComponentModule = await loadRemoteModule({
        remoteEntry: 'http://localhost:8080/remoteEntry.js',
        remoteName: 'vueMfe',
        exposedModule: './Component',
      });
      console.log('Vue Component Module Loaded:', VueComponentModule.default);
  
      const app = createApp({
        render: () => h(VueComponentModule.default, {
          basketItems: this.dataService.basketItems
        })
      });
      app.use(BootstrapVue3);
      app.mount(this.vueContainer.nativeElement);
    } catch (error) {
      console.error('Error loading Vue component:', error);
    }
  }
}