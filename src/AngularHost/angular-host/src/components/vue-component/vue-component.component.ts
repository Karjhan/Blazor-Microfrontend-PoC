import { Component, AfterViewInit, ViewChild, ElementRef, inject, OnDestroy } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { createApp, h, ref } from 'vue';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CustomNavbarComponent } from "../custom-navbar/custom-navbar.component";
import { DataService } from '../../services/data.service';
import { BootstrapVue3 } from 'bootstrap-vue-3';
import { Subscription } from 'rxjs';

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
export class VueComponentComponent implements AfterViewInit, OnDestroy  {
  @ViewChild('vueContainer', { static: true }) vueContainer!: ElementRef;
  private dataService = inject(DataService);
  private basketSubscription!: Subscription;
  private app: any;
  private basketItems = ref(this.dataService.basketItems);

  async ngAfterViewInit(): Promise<void> {
    await this.loadVueComponent();

    this.basketSubscription = this.dataService.basketTriggerSubject.subscribe(() => {
      this.updateVueComponent();
    });
  }

  private async loadVueComponent(): Promise<void>{
    try {
      const VueComponentModule = await loadRemoteModule({
        remoteEntry: 'http://localhost:8080/remoteEntry.js',
        remoteName: 'vueMfe',
        exposedModule: './Component',
      });
      console.log('Vue Component Module Loaded:', VueComponentModule.default);
  
      this.app = createApp({
        render: () => h(VueComponentModule.default, {
          basketItems: this.basketItems.value,
          onDeleteItem: this.deletePurchaseItem.bind(this),
        })
      });
      this.app.use(BootstrapVue3);
      this.app.mount(this.vueContainer.nativeElement);
    } catch (error) {
      console.error('Error loading Vue component:', error);
    }
  }

  private deletePurchaseItem(id: string): void{
    let basketItemIndex = this.dataService.basketItems.findIndex(basketItem => basketItem.id === id);
    let purchaseIndex = this.dataService.userPurchases.findIndex(purchase => purchase.id === id);
    let purchase = this.dataService.userPurchases[purchaseIndex];
    let charity = this.dataService.charities.find(charity => charity.listOfToyIds.includes(purchase.toyId!));
    let toy = this.dataService.toys.find(toy => toy.id === this.dataService.userPurchases[purchaseIndex].toyId);
    if(toy && charity){
      toy.quantity += purchase.count;
      charity.currentStage -= purchase.count * toy.price;
    }
    this.dataService.basketItems.splice(basketItemIndex, 1);
    this.dataService.userPurchases.splice(purchaseIndex, 1);
    this.dataService.basketTriggerSubject.next(!this.dataService.basketTriggerSubject.value);
    console.log(this.dataService.basketItems)
  }

  private updateVueComponent(): void {
    this.basketItems.value = [...this.dataService.basketItems];
  }

  ngOnDestroy(): void {
    if (this.basketSubscription) {
      this.basketSubscription.unsubscribe();
    }
  }
}