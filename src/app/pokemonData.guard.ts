import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { selectAllPokemon } from './store/selectors/pokemon.selector';

@Injectable({
  providedIn: 'root',
})
export class PokemonDataGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.pipe(
      select(selectAllPokemon),
      map((data) => {
        if (data.length==0) {
          this.router.navigateByUrl('/start');
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
