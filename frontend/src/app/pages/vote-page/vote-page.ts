import { Component, OnDestroy, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vote-page',
  imports: [],
  templateUrl: './vote-page.html',
  styleUrl: './vote-page.scss'
})
export class VotePage implements OnInit, OnDestroy {

  subscriptions = new Subscription()
  id = ''

  constructor(
    private restService: RestService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.params.subscribe(params => {
        this.id = params['id'];
      })
    )
    this.getData()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getData(){
    this.subscriptions.add(
      this.restService.get(`/get-agenda-by-session-id/${this.id}`).subscribe({
        next: (response) => {
          console.log(response)
        },
        error: (error) => {
          console.log(error)
        }
      })
    )
  }

}
