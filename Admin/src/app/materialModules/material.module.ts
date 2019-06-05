import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule,MatSelectModule,
   MatListModule, MatPaginatorModule, MatSortModule, MatCheckboxModule
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
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatCheckboxModule
  
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
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatCheckboxModule,
  
  
   ],
})
export class CustomMaterialModule { }