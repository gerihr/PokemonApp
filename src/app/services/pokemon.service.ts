import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of, zip } from 'rxjs';
import { IInfo, PokemonDTO } from '../store/entity/pokemon.entitiy';

@Injectable({
    providedIn: "root"
})
export class PekomonServices {
    private readonly BASE_URL = 'https://pokeapi.co/api/v2/';
    readonly pokemon = 'pokemon'
    constructor(
        private http: HttpClient
    ) { }

    getPokememon(limit_: number, offset: number = 0): Observable<any> {
        return this.http.get(
            `${this.BASE_URL}${this.pokemon}?limit=${limit_.toString()}&offset=${offset}`
        );
    }

    getPokemonInfo(pokemonId: number): Observable<any> {
        return this.http.get(
            `${this.BASE_URL}${this.pokemon}/${pokemonId}`
        )
    }

    getPokemonAndInfo(limit: number, offset: number = 0): Observable<any> {
        return new Observable(observer => {
            this.getPokememon(limit, offset).subscribe(
                (pokemons) => {
                    const apiCallZip: any[] = [];
                    const pokemon_: PokemonDTO[] = [];
                    pokemons.results.forEach((element, index) => {
                        pokemon_.push({
                            id: index + 1,
                            url: element.url,
                            name: element.name,
                            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`
                        })
                    });
                    console.log(pokemon_);
                    pokemon_.forEach((pok_:any) => {
                        apiCallZip.push(this.getPokemonInfo(pok_.id))
                    })
                    zip(...apiCallZip).subscribe((pokemonInfos_: any) => {
                        pokemonInfos_.forEach((_pokemonInfo: IInfo, index) => {
                            pokemon_[index].info = {
                                abilities:pokemonInfos_[index].abilities,
                                base_experience: pokemonInfos_[index].base_experience,
                                height: pokemonInfos_[index].height,
                                weight: pokemonInfos_[index].weight
                            };
                        });
                        observer.next(pokemon_);
                    })
                }
            )
        })

    }




}