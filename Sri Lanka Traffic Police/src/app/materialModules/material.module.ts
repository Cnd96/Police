import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule,MatSelectModule,
   MatListModule, MatDatepickerModule, MatNativeDateModule, MatGridListModule, MatTabsModule
} from '@angular/material';
@NgModule({
  imports: [
  CommonModule, 
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatSelectModule,
  MatListModule,
  MatDialogModule,
  MatToolbarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatGridListModule,
  MatTabsModule
  ],
  exports: [
  CommonModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatSelectModule,
  MatListModule,
  MatDialogModule,
  MatToolbarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatGridListModule,
  MatTabsModule
   ],
})
export class CustomMaterialModule { }