import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-link-snack-bar',
  imports: [MatIconModule],
  templateUrl: './link-snack-bar.html',
  styleUrl: './link-snack-bar.scss'
})
export class LinkSnackBar {
  linkForVote: string

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ){
    this.linkForVote = data.linkForVote
  }

  copyToClipboard(){
    navigator.clipboard.writeText(this.linkForVote)
  }

}
