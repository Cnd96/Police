import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatMenuModule,MatIconModule, MatExpansionModule,MatSelectModule,
   MatListModule, MatDatepickerModule, MatNativeDateModule, MatGridListModule, 
   MatTabsModule,MatAutocompleteModule,MatCheckboxModule,MatRadioModule
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
  MatTabsModule,
  MatAutocompleteModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatRadioModule
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
  MatTabsModule,
  MatAutocompleteModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatRadioModule
   ],
})
export class CustomMaterialModule { }