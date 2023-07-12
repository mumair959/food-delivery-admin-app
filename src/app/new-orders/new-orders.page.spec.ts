import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrdersPage } from './new-orders.page';

describe('NewOrdersPage', () => {
  let component: NewOrdersPage;
  let fixture: ComponentFixture<NewOrdersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOrdersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
