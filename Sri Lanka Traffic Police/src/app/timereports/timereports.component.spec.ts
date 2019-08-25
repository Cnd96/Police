/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TimereportsComponent } from './timereports.component';

describe('TimereportsComponent', () => {
  let component: TimereportsComponent;
  let fixture: ComponentFixture<TimereportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimereportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimereportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
