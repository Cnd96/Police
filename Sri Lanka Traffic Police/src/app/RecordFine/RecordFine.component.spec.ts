/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RecordFineComponent } from './RecordFine.component';

describe('RecordFineComponent', () => {
  let component: RecordFineComponent;
  let fixture: ComponentFixture<RecordFineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordFineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordFineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
