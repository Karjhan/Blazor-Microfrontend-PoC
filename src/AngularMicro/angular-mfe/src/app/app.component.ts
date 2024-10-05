import { AfterViewInit, Component, inject, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbCarouselModule, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { AngularComponentData } from '../models/angularComponentProps';
import { CommonModule } from '@angular/common';
import { IPurchase } from '../models/purchaseModel';
import { v4 as uuidv4 } from 'uuid';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, NgbCarouselModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'angular-mfe';
  @Input() data: AngularComponentData | undefined;
  @ViewChild('content') content!: TemplateRef<any>;

  public purchaseForm: FormGroup;
  public purchase : IPurchase = { id: '', recipientName: '', dedicationMessage: '', toyId: '', count: 1 };
  public formStatusText: string = "";

  constructor(private _fb: FormBuilder, private modalService: NgbModal) {
    this.purchaseForm = this._fb.group({
      recipientName: [ this.purchase.recipientName, Validators.required ],
      dedicationMessage: [ this.purchase.dedicationMessage ],
      count: [ this.purchase.count, Validators.required ]
    });
  }

	open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.handleModalClose(result);
			},
			(reason) => {
				this.handleModalClose(reason);
			},
		);
	}

  ngOnInit() {

  }

  ngAfterViewInit() {
    if (this.data?.toggle) {
      this.purchase = {
        id: uuidv4(), 
        recipientName: "",
        dedicationMessage: "",
        toyId: this.data.toy?.id,
        count: 1 
      };
      this.open(this.content);
    }
  }

  public submitPurchase(): void {
    if (this.purchaseForm.valid) {
      console.log('Form submitted successfully:', this.purchase);
      this.data?.addPurchase(this.purchase);
      this.modalService.dismissAll('Form submitted');
    } else {
      this.formStatusText = "Invalid purchase";
    }
  }

  private handleModalClose(argument : any): void {
    if (this.data && typeof this.data.onModalClose === 'function') {
      console.log(`Closed modal on angular mfe because of ${argument}`);
      this.data.onModalClose();
    }
  }

  public trackByFn(index: number, item: any): number {
    return item; 
  }

  public increaseCount(): void {
    if (this.purchase && this.data?.toy?.quantity && this.purchase.count < this.data?.toy?.quantity) {
      this.purchase.count++;
      console.log(this.purchase);
    }
  }
  
  public decreaseCount(): void {
    if (this.purchase && this.purchase.count > 1) {
      this.purchase.count--;
      console.log(this.purchase);
    }
  }

  public getModalFooterText(): string{
    if(this.data?.toy?.price){
      return `Price: ${this.purchase.count*this.data?.toy?.price} $`;
    }
    return "";
  }
}
