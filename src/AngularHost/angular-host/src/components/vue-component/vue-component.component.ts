import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { createApp, h } from 'vue';

@Component({
  selector: 'app-vue-component',
  standalone: true,
  imports: [],
  templateUrl: './vue-component.component.html',
  styleUrls: ['./vue-component.component.css'],
})
export class VueComponentComponent implements AfterViewInit {
  @ViewChild('vueContainer', { static: true }) vueContainer!: ElementRef;

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
        render: () => h(VueComponentModule.default)
      });
      app.mount(this.vueContainer.nativeElement);
    } catch (error) {
      console.error('Error loading Vue component:', error);
    }
  }
}