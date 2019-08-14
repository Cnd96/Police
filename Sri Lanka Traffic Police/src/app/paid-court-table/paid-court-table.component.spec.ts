import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';

import { PaidCourtTableComponent } from './paid-court-table.component';

describe('PaidCourtTableComponent', () => {
  let component: PaidCourtTableComponent;
  let fixture: ComponentFixture<PaidCourtTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaidCourtTableComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidCourtTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
