import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { EmailComposer } from '@ionic-native/email-composer';
import { HttpModule }    from '@angular/http';

import { MyApp } from './app.component';
import { MyprovidorProvider } from '../providers/myprovidor/myprovidor';

//import { LoginPage } from '../pages/login/login';

@NgModule({
  declarations: [
    MyApp,
 //   LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  //  LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MyprovidorProvider,
    EmailComposer
  ]
})
export class AppModule {}
