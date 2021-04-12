import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {LoginComponentHandlerService} from '../../services/login-component-handler.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {GoogleLoginProvider, SocialAuthService, SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    SocialLoginModule
  ],
  providers: [LoginComponentHandlerService,
    SocialAuthService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              'Google-Client-ID-Goes-Here'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  exports: [LoginComponent]
})
export class AuthenticationModule { }
