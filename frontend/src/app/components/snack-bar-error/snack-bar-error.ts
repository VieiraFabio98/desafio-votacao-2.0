import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-error',
  imports: [],
  templateUrl: './snack-bar-error.html',
  styleUrl: './snack-bar-error.scss'
})
export class SnackBarError {
  error: string
  message: string

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ){
    this.error = data.error
    this.message = data.message
  }

}
