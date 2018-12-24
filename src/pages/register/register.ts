import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import {MyprovidorProvider} from '../../providers/myprovidor/myprovidor'

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  firstname = "";
  lastname = "";
  email = "";
  password = "";
  telnumber = "";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
     public alertCtrl: AlertController,
     public service:MyprovidorProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  onClickSignUp(){
    if (this.firstname.length == 0) {
      this.showAlert("Warning", "Please input first name");
      return;
    }

    if (this.lastname.length == 0) {
      this.showAlert("Warning", "Please input last name");
      return;
    }

    if (this.email.length == 0) {
      this.showAlert("Warning", "Please input email");
      return;
    }

    if (!this.isValid(this.email)) {
      this.showAlert("Warning", "Invalid email");
      return;
    } 

    if (this.password.length == 0) {
      this.showAlert("Warning", "Please input password");
      return;
    }

    if (this.password.length < 6) {
      this.showAlert("Warning", "Password should be 6 minimum charaters");
      return;
    }

    if (this.telnumber.length == 0) {
      this.showAlert("Warning", "Please input phone number");
      return;
    }
    let user={firstname: this.firstname,
               lastname: this.lastname,
              email:this.email,
              telnumber:this.telnumber,
             password:this.password};  

    this.service.registerUser(user).subscribe(
      res=>{
        if(res.result=='ok'){
          this.showAlert('ok!', "success register");
          this.firstname='';
          this.lastname='';
          this.email='';
          this.password='';

          this.navCtrl.setRoot('LoginPage');
        }
        else{      //server error
            this.showAlert('warning','failed register!');            
        }
      },
      error=>{}
    );
    
  }

  showAlert(title, msg) {    
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['Ok']
    });
    alert.present();    
  }

  isValid(email){
 
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let result = re.test(email);
    return result;
  }
  

}
