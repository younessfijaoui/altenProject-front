import {createAction, props} from "@ngrx/store";
import {User} from "../../shared/model/user.model";

export const onlogin = createAction(
  "[onLogin Page] User Login is done",
  props<{user: User,token: string}>()
);
export const logout = createAction('[User] Logout');
