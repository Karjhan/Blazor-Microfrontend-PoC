import { Routes } from '@angular/router';
import { VueComponentComponent } from '../components/vue-component/vue-component.component';
import { RootComponentComponent } from '../components/root-component/root-component.component';

export const routes: Routes = [
    {
      path: '', 
      component: RootComponentComponent, 
    },
    {
      path: 'basket', 
      component: VueComponentComponent, 
    },
    {
      path: '**',
      redirectTo: '', 
    },
  ];
