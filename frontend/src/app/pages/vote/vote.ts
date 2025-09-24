import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RestService } from '../../services/rest.service';
import { Subscription } from 'rxjs';
import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-vote',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './vote.html',
  styleUrl: './vote.scss',
  standalone: true
})
export class Vote implements OnInit , OnDestroy {

  private subscriptions = new Subscription()

  voteCards: any[] = []

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
  

}
