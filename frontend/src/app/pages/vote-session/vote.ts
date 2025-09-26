import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RestService } from '../../services/rest.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VoteModal } from '../../components/vote-modal/vote-modal';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LinkSnackBar } from '../../components/link-snack-bar/link-snack-bar';

@Component({
  selector: 'app-vote',
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './vote.html',
  styleUrl: './vote.scss',
  standalone: true
})
export class Vote implements OnInit , OnDestroy {

  private subscriptions = new Subscription()

  voteCards: any[] = []

  readonly dialog = inject(MatDialog)
  dialogRef!: MatDialogRef<VoteModal>

  private _snackBar = inject(MatSnackBar)
  durationInSeconds = 10
  
  linkForVote: string = ''

  constructor(
    private restService: RestService
  ){}

  ngOnInit(): void {
    this.getData()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getData() {
    this.subscriptions.add(
      this.restService.post('/agendas/list', {}).subscribe({
        next: (response: any) => {
          this.populateCards(response.data)
        },
        error: (error) => {
          console.log(error)
        }
      })
    )
  }

  populateCards(data: any) {
    this.voteCards = data
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'AGUARDANDO': return 'status-pending'
      case 'APROVADO': return 'status-approved'
      case 'EMPATE': return 'status-tie'
      case 'RECUSADO': return 'status-rejected'
      default: return ''
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, id: string): void {
    this.dialogRef = this.dialog.open(VoteModal, {
      width: '150px',
      height: '150px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { id }
    })
    
    this.dialogRef.afterClosed().subscribe(result => {
      this.openSnackBar(result.data.voteLink)
    })
  }

  openSnackBar(link: string) {
    this._snackBar.openFromComponent(LinkSnackBar, {
      duration: this.durationInSeconds * 1000,
      data: {linkForVote: link}
    });
  }

}
