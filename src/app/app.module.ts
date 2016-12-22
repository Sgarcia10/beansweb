import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { appRoutes } from './app.routing';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './_directives/alert.component';

import { AuthGuard } from './_guards/auth.guard';

import { AlertService, AuthenticationService } from './_services/index';
import { BusinessLoginComponent } from './business-login/business-login.component';

const firebaseConfig = {
  apiKey: "AIzaSyBPpVLhYx4eFMibvhtN9JVQ1rbXSMa-HyY",
  authDomain: "beans-20825.firebaseapp.com",
  databaseURL: "https://beans-20825.firebaseio.com",
  storageBucket: "beans-20825.appspot.com",
  messagingSenderId: "625494241860"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertComponent,
    BusinessLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
