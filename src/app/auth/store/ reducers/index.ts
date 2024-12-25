import {User} from "../../../shared/model/user.model";
import {getCurrentToken, getCurrentUser} from "../../data-access/auth.service";
import {createReducer, on} from "@ngrx/store";
import {logout, onlogin} from "../ auth.actions";

export interface AuthState {
  user: User
  token: string | null
}

export const initialAuthState: AuthState = {
  user: getCurrentUser(),
  token: getCurrentToken()
};

export const authReducer = createReducer(
  initialAuthState,
  on(onlogin, (state, action) => {
    return {
      user:state.user,
      token: action.token
    }
  }),

  on(logout, (state, action) => {
    return {
      token: null,
      user: new User(null)
    }
  })
);
