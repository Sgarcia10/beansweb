import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';

declare const FB:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private firebase: AngularFire) {

          FB.init({
            appId      : '1349766871702332',
            cookie     : true,  // enable cookies to allow the server to access
                                // the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.5' // use graph api version 2.5
          });
          this.firebase.auth.subscribe(
            user => this._changeState(user),
            error => console.trace(error)
          );
        }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    ngAfterViewInit() {
      gapi.load('auth2', function() {
        var auth2 = gapi.auth2.init({
          client_id: '625494241860-l1lgivghavp8hus8qrqrtl4ff5phnf83.apps.googleusercontent.com',
          // Scopes to request in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });
        // auth2.attachClickHandler(document.getElementById('customBtn'), {},
        // function(googleUser) {
        //   onSuccess(googleUser);
        // }, function(error) {
        //   alert(JSON.stringify(error, undefined, 2));
        // });
      });
      //
      // gapi.signin2.render('my-signin2', {
      //   'scope': 'profile email',
      //   'width': 240,
      //   'height': 50,
      //   'longtitle': true,
      //   'theme': 'light',
      //   'onsuccess': this.onSuccess,
      //   'onfailure': this.onFailure
      // });
    }

    loginG() {
      this.firebase.auth.login({
        provider: AuthProviders.Google,
        method: AuthMethods.Popup,
      });
    }

    loginF() {
      this.firebase.auth.login({
        provider: AuthProviders.Facebook,
        method: AuthMethods.Popup,
      });
    }

    onSuccess(googleUser) {
      console.log(googleUser);
        console.log(googleUser.uid);
    }

    onFailure(error) {
        console.log("ERROR: "+error);
    }

    private _changeState(user: any = null) {
      if(user) {
        this.onSuccess(user);
      }
      else {
        // this.user = {};
      }
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

}
