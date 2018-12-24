import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import {Constants} from '../../utils/Constants';
import 'rxjs/add/operator/map';
/*
  Generated class for the MyprovidorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MyprovidorProvider {
 
  constructor(public http: Http) {
    console.log('Hello MyprovidorProvider Provider');
  }
  login(body){
    let url=Constants.BASE_URL+'/';
    return this.http.post(url,body).map(res=>res.json());
  }
  getUserList(){
    let url=Constants.BASE_URL+'/all';
    return this.http.get(url).map(res=>res.json());
  }
  registerUser(user){
    let url=Constants.BASE_URL+'/add_user';
    return this.http.post(url,user).map(res=>res.json());
  }
}
