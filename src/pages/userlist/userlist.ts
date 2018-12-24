import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { getUrlScheme } from '@angular/compiler';
import { MyprovidorProvider } from "../../providers/myprovidor/myprovidor";

/**
 * Generated class for the UserlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userlist',
  templateUrl: 'userlist.html',
})
export class UserlistPage {

  users:[any];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public servehttp:MyprovidorProvider,
    public alert: AlertController) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserlistPage');
    this.getUser();
  }
  getUser(){
    this.servehttp.getUserList().subscribe(
    res=>{
        if(res.result=="success"){ // success
         this.users=res.users;
        }    
        else { //server error
          this.showAlert("Warning", "error occured!");         
        }
    }, 
    error=>{

    });
  }

  showAlert(title, msg) {    
    let alert = this.alert.create({
      title: title,
      subTitle: msg,
      buttons: ['Ok']
    });
    alert.present();    
  }
  onItem(user){
    this.navCtrl.push('UserdetailPage', user);
  }
}
