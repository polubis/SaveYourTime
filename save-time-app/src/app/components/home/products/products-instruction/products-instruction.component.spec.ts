import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsInstructionComponent } from './products-instruction.component';

describe('ProductsInstructionComponent', () => {
  let component: ProductsInstructionComponent;
  let fixture: ComponentFixture<ProductsInstructionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsInstructionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
