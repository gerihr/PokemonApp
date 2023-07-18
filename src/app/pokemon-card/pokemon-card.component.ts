import { Component, Input, OnInit } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { PokemonDTO } from '../store/entity/pokemon.entitiy';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})

export class PokemonCardComponent implements OnInit{
  @Input("data")
  data!: PokemonDTO;

  constructor(private router: Router){}

  ngOnInit(): void {
  }

  seeDetails(pokemon: PokemonDTO){
      this.router.navigate(['details',pokemon.id]);
  }

}
