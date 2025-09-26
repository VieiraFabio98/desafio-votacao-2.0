import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-vote-page',
  imports: [MatCardModule, MatButtonModule, CommonModule, MatSlideToggleModule],
  templateUrl: './vote-page.html',
  styleUrl: './vote-page.scss'
})
export class VotePage implements OnInit, OnDestroy {

  subscriptions = new Subscription()
  id = ''

  agenda: any

  constructor(
    private restService: RestService,
    private route: ActivatedRoute,
    private renderer: Renderer2
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

  toggleLightDarkMode(event: any) {
    if(event.checked) {
      this.renderer.addClass(document.documentElement, 'dark-theme')
    } else {
      this.renderer.removeClass(document.documentElement, 'dark-theme')
    }
  }

  getData(){
    this.subscriptions.add(
      this.restService.get(`/get-agenda-by-session-id/${this.id}`).subscribe({
        next: (response) => {
          this.agenda = response.data
        },
        error: (error) => {
          console.log(error)
        }
      })
    )
  }

}
