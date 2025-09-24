import { Component, Renderer2, ViewChild } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Vote } from '../pages/vote/vote';
import { List } from '../pages/list/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-default',
  imports: [MatTabsModule, Vote, List, MatSlideToggleModule],
  templateUrl: './default.html',
  styleUrl: './default.scss'
})
export class Default {

  @ViewChild(List) listInstance?: List

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

  onTabChange(index: number) {
    if (index !== 0 && this.listInstance) {
      this.listInstance.ngOnDestroy();
    }
  }

}
