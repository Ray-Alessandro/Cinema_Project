import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/public/home/home.component';
import { PeliculasComponent } from './components/business/peliculas/peliculas.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'peliculas', component: PeliculasComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', redirectTo: 'home' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
