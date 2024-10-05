import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VueComponentComponent } from './vue-component.component';

describe('VueComponentComponent', () => {
  let component: VueComponentComponent;
  let fixture: ComponentFixture<VueComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VueComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VueComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
