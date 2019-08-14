/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RecordCourtCaseComponent } from './recordCourtCase.component';

describe('RecordCourtCaseComponent', () => {
  let component: RecordCourtCaseComponent;
  let fixture: ComponentFixture<RecordCourtCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordCourtCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordCourtCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
