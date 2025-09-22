import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { CreateAgendaModal } from '../../components/create-agenda-modal/create-agenda-modal';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  test: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', test: 'teste'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', test: 'teste'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', test: 'teste'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', test: 'teste'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', test: 'teste'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', test: 'teste'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', test: 'teste'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', test: 'teste'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', test: 'teste'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', test: 'teste'},
];

@Component({
  selector: 'app-list',
  imports: [MatButtonModule, MatTableModule],
  templateUrl: './list.html',
  styleUrl: './list.scss',
  standalone: true
})
export class List {
  readonly dialog = inject(MatDialog)
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'test']
  dataSource = ELEMENT_DATA

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CreateAgendaModal, {
      width: '600px',
      height: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
