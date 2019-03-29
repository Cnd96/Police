/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OffencesComponent } from './offences.component';

describe('OffencesComponent', () => {
  let component: OffencesComponent;
  let fixture: ComponentFixture<OffencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
