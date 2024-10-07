import { AfterViewInit, Component, Injector, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { AngularComponentInstance } from '../../angularUtils/angularProps';
import { IPurchase } from '../../commonUtils/purchaseModel';
import { IBasketItem } from '../../commonUtils/basketModel';

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
    private injector: Injector
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

      let basketItem: IBasketItem | undefined;
  
      const instance = componentRef.instance as AngularComponentInstance;
      instance.data = { 
        toy: this.dataService.getToyById(selectedAnimal.toyId), 
        toggle: this.dataService.toysModalTriggerSubject.value,
        onModalClose: () => this.dataService.toysModalTriggerSubject.next(false),
        addPurchase: (purchase: IPurchase) => {
          this.dataService.userPurchases.push(purchase); 
          let charity = this.dataService.selectedCharitySubject.value;
          let purchasedToy = this.dataService.selectedToySubject.value;
          if(charity?.currentStage && purchasedToy?.price){
            charity.currentStage += purchase.count*purchasedToy?.price;
            purchasedToy.quantity -= purchase.count;
          }
          this.dataService.selectedCharitySubject.next(charity);
          this.dataService.selectedToySubject.next(purchasedToy);
          basketItem = {
            id: purchase.id,
            recipientName: purchase.recipientName,
            dedicationMessage: purchase.dedicationMessage,
            toy: purchasedToy,
            count: purchase.count
          };
          this.dataService.basketItems.push(basketItem);
          console.log(this.dataService.userPurchases);} 
      };
  
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
