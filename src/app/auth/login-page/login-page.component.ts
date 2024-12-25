import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {PasswordModule} from "primeng/password";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {AuthService} from "../data-access/auth.service";
import {noop, tap} from "rxjs";
import {onlogin} from "../store/ auth.actions";
import {User} from "../../shared/model/user.model";
import {provideStore, Store, StoreModule} from "@ngrx/store";
import {authReducer, AuthState} from "../store/ reducers";
import {EffectsModule, provideEffects} from "@ngrx/effects";
import {AuthEffects} from "../store/ auth.effects";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    CommonModule,
 ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private store: Store<AuthState>) {
    this.loginForm = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required],
      }
    );
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.logIn(this.loginForm.value).pipe(
        tap((dataToken: string) => {
          this.store.dispatch(onlogin({token: dataToken ,user: new User(null)}))
        })
      ).subscribe(
        noop, error => console.log('error', error)
      );

    }
  }
}
