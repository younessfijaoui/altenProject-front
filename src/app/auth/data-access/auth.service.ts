import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Product} from "../../products/data-access/product.model";
import {environment} from "../../../environments/environment";
import {UserRegistration} from "./registration.model";
import {Observable, tap} from "rxjs";
import {Store} from "@ngrx/store";
import {onlogin} from "../store/ auth.actions";
import {User} from "../../shared/model/user.model";
import {AuthState} from "../store/ reducers";

export const INFO_USER = "INFO_USER";
export const TOKEN = "TOKEN";

export const getCurrentUser = () => {
  let user = localStorage.getItem(INFO_USER)
  if(user) return JSON.parse(user)
  else return null;
}
export const getCurrentToken = ()=>{
  let token = localStorage.getItem(TOKEN)
  if(token) return token
  else return null;
}
@Injectable({
  providedIn: "root"
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly path = "auth";
  private store = inject(Store<AuthState>)

   signInUser(userRegistration: UserRegistration) {
    return this.http.post<Product>(`${environment.url.products + this.path}/sign-in`, userRegistration);
  }
  // login(loginRequest: any) {
  //    return this.http.post<string>(`${environment.url.products + this.path}/login`, loginRequest)
  // }

  logIn(loginRequest: any): Observable<any> {
    return this.http.post<string>(`${environment.url.products + this.path}/login`, loginRequest).pipe(
      tap((dataToken: string) => {
        this.store.dispatch(onlogin({token: dataToken ,user: new User(null)}))
      })
    )
  }
  setStoreToken(token:any){
    localStorage.setItem(TOKEN, JSON.stringify(token))
  }
  setUser(user: User){
    localStorage.setItem(INFO_USER, JSON.stringify(user))
  }

}
