import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap, createSelector } from '@ngrx/store';
import {pokemonReducer} from './reducers/pokemon.reducers';

export interface IAppState{
    pokemon: any;
    router: any
}
export const reducers: ActionReducerMap<IAppState> = {
    pokemon: pokemonReducer,
    router: routerReducer,
}