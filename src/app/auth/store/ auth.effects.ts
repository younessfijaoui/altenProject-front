import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {onlogin} from "./ auth.actions";
import {AuthService} from "../data-access/auth.service";


@Injectable()
export class AuthEffects {

  login$ = createEffect(() =>
      this.actions$
        .pipe(
          ofType(onlogin),
          tap(action =>
            {
              this.authService.setStoreToken(action.token) ;
              this.authService.setUser(action.user);
            }
          )
        )
    ,
    {dispatch: false});

  constructor(private actions$: Actions,
              private authService:AuthService,) {

  }

}
