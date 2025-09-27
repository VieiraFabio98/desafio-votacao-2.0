import { Component, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarError } from '../../components/snack-bar-error/snack-bar-error';

@Component({
  selector: 'app-vote-page',
  imports: [MatCardModule, MatButtonModule, CommonModule, MatSlideToggleModule, MatFormFieldModule, MatInputModule],
  templateUrl: './vote-page.html',
  styleUrl: './vote-page.scss'
})
export class VotePage implements OnInit, OnDestroy {

  subscriptions = new Subscription()
  sessionId: string = ''
  cpf: string = ''

  agenda: any

  private _snackBar = inject(MatSnackBar)
  durationInSeconds = 10

  constructor(
    private restService: RestService,
    private route: ActivatedRoute,
    private renderer: Renderer2
  ){}

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.params.subscribe(params => {
        this.sessionId = params['id'];
      })
    )
    this.getData()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  toggleLightDarkMode(event: any) {
    if(event.checked) {
      this.renderer.addClass(document.documentElement, 'dark-theme')
    } else {
      this.renderer.removeClass(document.documentElement, 'dark-theme')
    }
  }

  getData(){
    this.subscriptions.add(
      this.restService.get(`/get-agenda-by-session-id/${this.sessionId}`).subscribe({
        next: (response) => {
          this.agenda = response.data
        },
        error: (error) => {
          console.log(error)
        }
      })
    )
  }

  submitVote(vote: boolean) {
    const payload = {
      cpf: this.cpf,
      vote: vote
    }

    this.subscriptions.add(
      this.restService.post(`/make-vote/${this.sessionId}`, payload).subscribe({
        next: (result) => {
          console.log(result)
        },
        error: (error) => {
          this.openSnackBarError(error)
          console.log(error)
        }
      })
    )
  }

  openSnackBarError(data: any) {
    this._snackBar.openFromComponent(SnackBarError, {
      duration: this.durationInSeconds * 1000,
      verticalPosition: 'top',
      data: {
        error: data.error.data.name,
        message: data.error.data.message
      }
    })
  }

}
