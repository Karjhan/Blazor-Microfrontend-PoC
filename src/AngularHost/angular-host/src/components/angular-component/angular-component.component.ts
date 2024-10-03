import { AfterViewInit, ApplicationRef, Component, ElementRef, Injector, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { AngularComponentInstance } from '../../angularUtils/angularProps';

@Component({
  selector: 'app-angular-component',
  standalone: true,
  imports: [],
  templateUrl: './angular-component.component.html',
  styleUrl: './angular-component.component.css'
})
export class AngularComponentComponent implements AfterViewInit, OnDestroy{
  @ViewChild('angularComponent', { read: ViewContainerRef, static: true }) componentContainer!: ViewContainerRef;
  private subscription!: Subscription;
  private componentRef: any;

  constructor(
    private dataService: DataService,
    private injector: Injector,
    private appRef: ApplicationRef,
  ) {}

  async ngAfterViewInit(): Promise<void> {
    this.subscription = this.dataService.toysModalTriggerSubject.subscribe(
      async (isToysModalOpen) => {
        if (isToysModalOpen) {
          await this.loadAngularComponent();
        }
      }
    );
  }

  private async loadAngularComponent(): Promise<void> {
    const selectedAnimal = this.dataService.selectedAnimalSubject.value;
    if (!selectedAnimal){
      return;
    }

    loadRemoteModule({
      remoteEntry: 'http://localhost:4300/remoteEntry.js',
      remoteName: 'angularMfe',
      exposedModule: './Component',
    }).then((AngularComponentModule) => {
      this.componentContainer.clear();
  
      const componentRef = this.componentContainer.createComponent(AngularComponentModule.AppComponent, {
        injector: this.injector,
      });
  
      const instance = componentRef.instance as AngularComponentInstance;
      instance.data = { toy: this.dataService.getToyById(selectedAnimal.toyId), toggle: this.dataService.toysModalTriggerSubject.value };
  
      this.componentRef = componentRef;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
