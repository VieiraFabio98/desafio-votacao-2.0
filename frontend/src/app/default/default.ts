import { Component, Renderer2 } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Vote } from '../pages/vote/vote';
import { Create } from '../pages/create/create';
import { List } from '../pages/list/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-default',
  imports: [MatTabsModule, Vote, Create, List, MatSlideToggleModule],
  templateUrl: './default.html',
  styleUrl: './default.scss'
})
export class Default {

  constructor(
    private renderer: Renderer2
  ){}

  toggleLightDarkMode(event: any) {
    if(event.checked) {
      this.renderer.addClass(document.documentElement, 'dark-theme')
    } else {
      this.renderer.removeClass(document.documentElement, 'dark-theme')
    }
  }

}
