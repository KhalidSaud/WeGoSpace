import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsByCategoryPage } from './products-by-category.page';

describe('ProductsByCategoryPage', () => {
  let component: ProductsByCategoryPage;
  let fixture: ComponentFixture<ProductsByCategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsByCategoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsByCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
