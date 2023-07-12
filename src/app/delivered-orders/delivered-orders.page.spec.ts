import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveredOrdersPage } from './delivered-orders.page';

describe('DeliveredOrdersPage', () => {
  let component: DeliveredOrdersPage;
  let fixture: ComponentFixture<DeliveredOrdersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveredOrdersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveredOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
