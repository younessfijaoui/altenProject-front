import {Routes} from "@angular/router";
import {LoginPageComponent} from "./login-page/login-page.component";
import {SignInPageComponent} from "./sign-in-page/sign-in-page.component";

export const AUTH_ROUTES: Routes = [
  {
    path: "log-in",
    component: LoginPageComponent,
  },
  {
    path: "sign-in",
    component: SignInPageComponent,
  },
  { path: "**", redirectTo: "log-in" },
];
