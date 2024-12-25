export class User {
  fullName: String;
  userName: String;
  email: string;

  constructor(user?: any){
    user = user || {}
    this.fullName = user.fullName || '';
    this.userName = user.userName || '';
    this.email = user.email || '';
  }
}
