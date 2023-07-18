export interface PokemonDTO {
    id: number;
    name: string;
    url: string;
    image: string;
    info?: IInfo
}

export interface IInfo {
    abilities: Abilities[];
    base_experience: number;
    height: number;
    weight: number;
}

export interface Abilities {
    ability: Ability;
    is_hidden: boolean;
    slot: number;
}

export interface Ability {
    name: string;
    url: string;
}

export interface EntityState<V> {
    ids: string[] | number[];
    entities: { [id: number]: V };
}