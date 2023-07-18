import { createEntityAdapter } from '@ngrx/entity';
import { EntityAdapter, EntityState } from '@ngrx/entity/src/models';
import { Action, createReducer, on } from '@ngrx/store';
import * as Actions from "../actions/pokemon.actions";
import { PokemonDTO } from '../entity/pokemon.entitiy';

export interface IPokemon extends EntityState<PokemonDTO> {
    loading: boolean;
    error: any
}
export function selectId(a: PokemonDTO) {
    return a.id
}

export const adapter : EntityAdapter<PokemonDTO> = createEntityAdapter<PokemonDTO>({
    selectId: selectId
});

export const initialState: IPokemon = adapter.getInitialState({
    loading: false,
    error: null
});




const reducer = createReducer(
    initialState,
    on(Actions.getPokemons, state => ({ ...state, loading: true })),
    on(Actions.getPokemonsSuccess, (state, props) => {
        return adapter.setAll(props.payload, {...state, loading: false});
    }),
    on(Actions.getPokemonsFail, (state, props) => ({ ...state, pokemons: [], error: props.error, loading: false })),
    on(Actions.editPokemons, (state, props) =>  {
                return {
                    ...state,
                    entities: {
                      ...state.entities,
                      [props.payload.id]: props.payload.pokemon
                    }
                
                 };
      }),
);

export function pokemonReducer(state: IPokemon | undefined, action: Action) {
    return reducer(state, action);
}


// get the selectors
const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = adapter.getSelectors();
   // select the array of user ids
export const selectPokemonIds = selectIds;
 
// select the dictionary of user entities
export const selectPokemonEntities = selectEntities;
 
// select the array of users
export const selectAllPokemon = selectAll;
 
// select the total user count
export const selectPokemonTotal = selectTotal;