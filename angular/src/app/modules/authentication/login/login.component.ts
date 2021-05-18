import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MyToastService} from '../../../services/toast-service/my-toast.service';
import {MyErrorStateMatcher} from '../../../utils/error_state_matcher';
import {ResponseModel} from '../../../models/response-model';
import {CustomEmailValidator} from '../../../validators/custom-email-validator';
import {AuthenticationService} from '../../../services/authentication-service/authentication-service';
import {UserService} from '../../../services/user-service/user.service';
import {LoginInterface} from '../../../interfaces/login-interface';
import {ErrorCatcherService} from '../../../services/error-service/error-catcher.service';
import {MyRoutes} from '../../../utils/my-routes';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {LoginNotifierService} from "../../../services/logged-notifier-service/login-notifier-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  loginFormGroup: FormGroup;
  loggingIn = false;
  socialUser: SocialUser;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router,
              private myToastrService: MyToastService,
              private authenticationService: AuthenticationService,
              private errorCatcherService: ErrorCatcherService,
              public dialog: MatDialog,
              private socialAuthService: SocialAuthService,
              private loginNotifierService: LoginNotifierService) {
  }

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        CustomEmailValidator
      ]),
      password: new FormControl('', [Validators.required])
    });


    this.errorCatcherService.getErrors().subscribe((data: ResponseModel) => {

      if (data) {
        if (!data.success) {
          this.myToastrService.showFailed(data.message);
          this.errorCatcherService.setError(null);
        }
      }
      // console.log(data);

    }, error1 => {} );
  }


  login(): void {
    if (this.loginFormGroup.valid) {
      this.loggingIn = true;
      const userCredentials: LoginInterface = {
        email: this.loginFormGroup.get('email').value,
        password: this.loginFormGroup.get('password').value
      };

      this.authenticationService.login(userCredentials).subscribe(data => {
        const responseModel: ResponseModel = data;
        this.loggingIn = false;
        if (responseModel.success) {
          this.fetchMe();
        }
      }, error1 => {
        this.loggingIn = false;
        this.myToastrService.showFailed('Login failed');
      });

    } else {
      this.myToastrService.showFailed('Kindly fill required fields');
    }

  }

  fetchMe(): void  {
    this.authenticationService.me().subscribe(data => {
      const responseModel: ResponseModel = data;
      if (responseModel.success) {
        console.log(responseModel);

        this.authenticationService.setUserInfo(responseModel);
        this.loginNotifierService.setLoggedInStatus(true);
        // Close dialog box
        this.dialog.getDialogById('login-dialog').close();
        this.router.navigate([MyRoutes.protectedRoutes.authLandingPage]);
      } else {
        this.myToastrService.showFailed('Login failed');
      }
    }, error1 => {
      this.myToastrService.showFailed('Login failed');
    });
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

}
