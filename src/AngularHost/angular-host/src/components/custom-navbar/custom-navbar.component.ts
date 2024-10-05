import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-custom-navbar',
  standalone: true,
  imports: [],
  templateUrl: './custom-navbar.component.html',
  styleUrl: './custom-navbar.component.css'
})
export class CustomNavbarComponent {
  constructor(public dataService: DataService) {}

  public getTotalPurchasesCount(): number{
    return this.dataService.userPurchases.reduce(function (acc, obj) { return acc + obj.count; }, 0);
  }
}
