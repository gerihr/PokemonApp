import { Injectable } from '@angular/core';
import { EMPTY, zip } from 'rxjs';
import { map, mergeMap, catchError, switchMap, zipAll } from 'rxjs';
import * as ActionPokemon from '../actions/pokemon.actions';
import { PekomonServices } from 'src/app/services/pokemon.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Route, Router } from '@angular/router';

@Injectable()
export class PokemonEffects {

  loadPokemon$ = createEffect(() => this.actions$.pipe(
    ofType(ActionPokemon.GET_POKEMON_START),
    switchMap(({ payload }: any) => this.pokemonSrv.getPokemonAndInfo(payload.limit, payload.offset)
      .pipe(
        map((pokemon) => {
          this.router.navigateByUrl('/home')
          return ActionPokemon.getPokemonsSuccess({ payload: pokemon });
        }),
        
        catchError(() => EMPTY)
      )),
  )
    , { dispatch: true });


    loadByPokemon$ = createEffect(() => this.actions$.pipe(
      ofType(ActionPokemon.GET_POKEMON_BY_ID_START),
      switchMap(({ payload }: any) => this.pokemonSrv.getPokemonInfo(payload.id)
        .pipe(
          map((pokemon) => {
            return ActionPokemon.getPokemonsByIdSuccess({ payload: pokemon });
          }),
          
          catchError(() => EMPTY)
        )),
    )
      , { dispatch: true });

  constructor(
    private actions$: Actions,
    private pokemonSrv: PekomonServices,
    private router: Router
  ) { }
}
