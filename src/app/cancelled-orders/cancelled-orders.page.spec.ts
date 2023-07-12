import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelledOrdersPage } from './cancelled-orders.page';

describe('CancelledOrdersPage', () => {
  let component: CancelledOrdersPage;
  let fixture: ComponentFixture<CancelledOrdersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelledOrdersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelledOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
