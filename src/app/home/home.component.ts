import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonDTO } from '../store/entity/pokemon.entitiy';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { getPokemons } from '../store/actions/pokemon.actions';
import { selectAllPokemon } from '../store/selectors/pokemon.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  pokemen$!: Observable<PokemonDTO[]>;
  pokemenIds$
  limit: number = 10;
  offset: number = 0;
  constructor(
    private store: Store,
    private router: Router
  ) {
    
  }

  ngOnInit() {
    this.pokemen$ = this.store.pipe(select(selectAllPokemon))
  }

  onPokemon(pokemon: PokemonDTO) {
    this.router.navigate(['pokemon-info',pokemon.id]);
  }

}
