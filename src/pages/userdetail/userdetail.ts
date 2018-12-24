import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import {GlobalData}  from '../../utils/globalData';


/**
 * Generated class for the UserdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userdetail',
  templateUrl: 'userdetail.html',
})
export class UserdetailPage {
  user:any; 
  email:any;
  name:any;
  telnumber:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public emailcomposer: EmailComposer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserdetailPage');
    this.user=this.navParams.data;
    this.email=this.user.email;
    this.telnumber=this.user.telnumber;
    this.name=this.user.firstname+" "+this.user.lastname;
  }
  onClickSendEmail(){
    console.log(GlobalData.Log_user.lastname);
    let email = {
      to: this.email,
      cc: null,
      bcc: null,
      attachments: null,
      subject: 'Mail subject',
      body: null,
      isHtml: false
   };
   this.emailcomposer.open(email);
  }

}
