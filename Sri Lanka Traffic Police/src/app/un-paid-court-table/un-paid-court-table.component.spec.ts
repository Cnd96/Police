import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';

import { UnPaidCourtTableComponent } from './un-paid-court-table.component';

describe('UnPaidCourtTableComponent', () => {
  let component: UnPaidCourtTableComponent;
  let fixture: ComponentFixture<UnPaidCourtTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnPaidCourtTableComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnPaidCourtTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
