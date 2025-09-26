import { Routes } from '@angular/router';
import { Default } from './default/default';
import { VotePage } from './pages/vote-page/vote-page';

export const routes: Routes = [
  {
    path: '',
    component: Default
  },
  {
    path: 'votacao/:id',
    component: VotePage
  }
];
