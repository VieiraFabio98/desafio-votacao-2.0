import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { RestService } from '../../services/rest.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-vote-modal',
  imports: [MatDividerModule, MatFormFieldModule, MatInputModule, MatSelect, MatOption, MatDatepickerModule, MatButtonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './vote-modal.html',
  styleUrl: './vote-modal.scss'
})
export class VoteModal {

  subscriptions = new Subscription()
  durationInMinutes: string = ''
  agendaId: string

  constructor(
    private restService: RestService,
    private dialogRef: MatDialogRef<VoteModal>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ){
    this.agendaId = data.id
  }

  openVoteSession() {
    const payload = {
      agendaId: this.agendaId,
      durationInMinutes: this.durationInMinutes
    }

    this.subscriptions.add(
      this.restService.post('/start-vote-sessions', payload).subscribe({
        next: (result) => {
          console.log(result)
          this.dialogRef.close(true)
        },
        error: (error) => {
          console.log(error)
        }
      })
    )
  }

}
