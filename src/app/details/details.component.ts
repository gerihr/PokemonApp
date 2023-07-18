import { Component, OnInit, inject } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { map } from 'rxjs';
import { IInfo, PokemonDTO } from '../store/entity/pokemon.entitiy';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { PekomonServices } from '../services/pokemon.service';
import { selectByIdPokemon } from '../store/selectors/pokemon.selector';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { editPokemons } from '../store/actions/pokemon.actions';
import { IPokemon } from '../store/reducers/pokemon.reducers';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
  pokemonId;
  pokemonSelected: IInfo | undefined;
  image: string | undefined;
  pokemonData!: PokemonDTO;
  isEditing:boolean = true;
  pokemonDetailsForm: FormGroup | undefined;
  
  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(){
    this.pokemonId = Number(this.route.snapshot.params['id']);
     this.store.pipe(select(selectByIdPokemon, {id: this.pokemonId})).subscribe((pokemon) => {this.pokemonData = pokemon })
     this.pokemonDetailsForm = new FormGroup({
      abilities: new FormControl(this.pokemonData.info?.abilities),
      base_experience: new FormControl(this.pokemonData.info?.base_experience, Validators.required),
      height : new FormControl(this.pokemonData.info?.height, Validators.required),
      weight : new FormControl(this.pokemonData.info?.weight, Validators.required)
    });
  }

  editDetails(){
    this.isEditing=true;
  }

  saveDetails(){
    this.isEditing=false;
    let editedPokemon: PokemonDTO = {
      id: this.pokemonData.id,
      name: this.pokemonData.name,
      url: this.pokemonData.url,
      image: this.pokemonData.image,
      info: this.pokemonDetailsForm?.value    
    }
    this.store.dispatch(editPokemons({payload: {id:this.pokemonData.id, pokemon: editedPokemon}}));
  }

  goBack(){
    this.router.navigate(['/home']);
  }

}
