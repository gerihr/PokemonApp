import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getPokemons } from '../store/actions/pokemon.actions';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {
  limit: number = 10;
  offset: number = 0;

  constructor(private store: Store){}

  getPokemons(){
    this.store.dispatch(getPokemons({payload: {limit:this.limit, offset: this.offset}}));
  }
}
