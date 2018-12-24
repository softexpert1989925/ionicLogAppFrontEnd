import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController, AlertController } from 'ionic-angular';
import { MyprovidorProvider } from "../../providers/myprovidor/myprovidor";
import  { GlobalData} from '../../utils/globalData';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})


export class LoginPage {

  password : any='';
  email: any ='';
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public servehttp:MyprovidorProvider,
    public loadingCtrl: LoadingController,    
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onClickLogin(){
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

    

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

   let body={password:this.password, email:this.email};
   this.servehttp.login(body).subscribe(
    res=>{
       loading.dismiss();
       console.log(res);
       if(res.result=="success"){
         if(res.doc.password!=this.password){
           
          this.showAlert("Warning", "password incorrect!");
          return ;
         }
         else{
          GlobalData.Log_user.email=res.doc.email;
          GlobalData.Log_user.firstname=res.doc.firstname;
          GlobalData.Log_user.lastname=res.doc.lastname;
          GlobalData.Log_user.password=res.doc.password;
          GlobalData.Log_user.telnumber=res.doc.telnumber;
         this.navCtrl.push("UserlistPage");
         }       
       }
        
       else if(res.result=="failed"){
        this.showAlert("Warning", "You are not user registerd !");
        this.email="";
        this.password="";
       }
       else {
        this.showAlert("Warning", "server error occured!");
        this.email="";
        this.password="";
       }
       }, 
     error=>{
        loading.dismiss();
        console.log(error);
    });    
    
  }
  onClicktoRegister(){
    this.navCtrl.push("RegisterPage");
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
