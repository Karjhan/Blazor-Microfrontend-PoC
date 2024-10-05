import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { DataService } from '../../services/data.service';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-react-component',
  standalone: true,
  imports: [],
  templateUrl: './react-component.component.html',
  styleUrls: ['./react-component.component.css'],
})
export class ReactComponentComponent implements AfterViewInit, OnDestroy {
  @ViewChild('reactComponent', { static: true }) componentContainer!: ElementRef;
  private subscription!: Subscription;
  private reactRoot: ReactDOM.Root | null = null;

  constructor(private dataService: DataService) {}

  async ngAfterViewInit(): Promise<void> {
    this.subscription = combineLatest([
      this.dataService.selectedAnimalSubject,
      this.dataService.selectedCharitySubject,
      this.dataService.selectedToySubject
    ]).subscribe(async ([selectedAnimal, selectedCharity, selectedToy]) => {
      await this.renderReactComponent(selectedAnimal, selectedCharity);
    });
  }

  private async renderReactComponent(selectedAnimal: any, selectedCharity: any): Promise<void> {
    const ReactComponentModule = await loadRemoteModule({
      remoteEntry: 'http://localhost:3000/remoteEntry.js',
      remoteName: 'reactMfe',
      exposedModule: './Component',
    });

    const ReactComponent = ReactComponentModule.default;

    const reactElement = React.createElement(ReactComponent, {
      animal: selectedAnimal,
      charity: selectedCharity,
      toggleModal: () => this.dataService.toggleToysModalTrigger(),
    });

    const container = this.componentContainer.nativeElement;
    if (!this.reactRoot) {
      this.reactRoot = ReactDOM.createRoot(container); 
    }

    this.reactRoot.render(reactElement);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe(); 
    }

    if (this.reactRoot) {
      this.reactRoot.unmount(); 
    }
  }
}