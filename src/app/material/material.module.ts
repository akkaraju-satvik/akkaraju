import { NgModule } from '@angular/core';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
        imports: [
                MatCheckboxModule,
                MatNativeDateModule,
                MatDatepickerModule,
                MatSelectModule,
                MatFormFieldModule,
                MatInputModule,
                MatIconModule,
                MatExpansionModule,
                MatButtonModule,
                MatPaginatorModule,
                MatDialogModule,
                MatTooltipModule,
                MatChipsModule,
                MatTableModule,
                MatSortModule,
                MatTooltipModule,
                MatMenuModule,
                MatRadioModule
        ],
        exports: [
                MatCheckboxModule,
                MatNativeDateModule,
                MatDatepickerModule,
                MatSelectModule,
                MatFormFieldModule,
                MatInputModule,
                MatIconModule,
                MatExpansionModule,
                MatButtonModule,
                MatPaginatorModule,
                MatDialogModule,
                MatTooltipModule,
                MatChipsModule,
                MatTableModule,
                MatSortModule,
                MatTooltipModule,
                MatMenuModule,
                MatRadioModule
        ]
})
export class MaterialModule { }
