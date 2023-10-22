import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { HistoryComponent } from './components/history/history.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'search' , component : SearchPageComponent,
  },
  {
    path : 'history' , component : HistoryComponent
  },
  {
    path : 'dashboard' , component : DashboardComponent
  },
  {
    path : '**' , redirectTo : 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
