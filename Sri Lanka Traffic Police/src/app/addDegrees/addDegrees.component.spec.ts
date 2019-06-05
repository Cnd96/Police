/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddDegreesComponent } from './addDegrees.component';

describe('AddDegreesComponent', () => {
  let component: AddDegreesComponent;
  let fixture: ComponentFixture<AddDegreesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDegreesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDegreesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
