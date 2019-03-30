import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule,MatSelectModule, MatListModule
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
  MatToolbarModule
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
  MatToolbarModule
   ],
})
export class CustomMaterialModule { }