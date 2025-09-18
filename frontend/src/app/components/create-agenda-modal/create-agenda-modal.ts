import { Component } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';

interface ICategory {
  value: string
  viewValue: string
}

@Component({
  selector: 'app-create-agenda-modal',
  imports: [MatFormFieldModule, MatInputModule, MatSelect, MatOption, MatDatepickerModule],
  templateUrl: './create-agenda-modal.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './create-agenda-modal.scss'
})
export class CreateAgendaModal {
  categories: ICategory[] = [
    {value: 'category-1', viewValue: 'Category 1'},
    {value: 'category-2', viewValue: 'Category 2'},
    {value: 'category-3', viewValue: 'Category 3'}
  ]

}
