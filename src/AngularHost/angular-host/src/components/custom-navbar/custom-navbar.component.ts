import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-custom-navbar',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './custom-navbar.component.html',
  styleUrl: './custom-navbar.component.css'
})
export class CustomNavbarComponent {
  constructor(public dataService: DataService) {}

  public getTotalPurchasesCount(): number{
    return this.dataService.userPurchases.reduce(function (acc, obj) { return acc + obj.count; }, 0);
  }
}
