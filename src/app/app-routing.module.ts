import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { StartComponent } from './start/start.component';
import { PokemonDataGuard } from './pokemonData.guard';

const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full'},
  { path: 'start', component: StartComponent },
  { path: 'home', component: HomeComponent, canActivate: [PokemonDataGuard] },
  { path: 'details/:id', component: DetailsComponent, canActivate: [PokemonDataGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
