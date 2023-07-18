import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppState } from '../index';
import { IPokemon } from '../reducers/pokemon.reducers';
import * as pokemonFrom from "../reducers/pokemon.reducers";

export const selectPokemon_ = (state: IAppState) => state.pokemon;

export const selectPokemon = createSelector(
    selectPokemon_,
    (state: IPokemon) => state
)

export const selectPokemoneState = createFeatureSelector<pokemonFrom.IPokemon>('pokemon');

export const selectPokemonEntities = createSelector(
    selectPokemoneState,
    pokemonFrom.selectPokemonEntities
);

export const selectPokemonIds = createSelector(
    selectPokemoneState,
    pokemonFrom.selectPokemonIds
);

export const selectAllPokemon = createSelector(
    selectPokemoneState,
    pokemonFrom.selectAllPokemon
  );

  export const selectByIdPokemon = createSelector(
    selectPokemoneState,
    (pokemonEntitys, props) =>  pokemonEntitys.entities[props.id]
  );