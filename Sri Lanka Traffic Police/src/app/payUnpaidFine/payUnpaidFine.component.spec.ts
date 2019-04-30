/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PayUnpaidFineComponent } from './payUnpaidFine.component';

describe('PayUnpaidFineComponent', () => {
  let component: PayUnpaidFineComponent;
  let fixture: ComponentFixture<PayUnpaidFineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayUnpaidFineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayUnpaidFineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
