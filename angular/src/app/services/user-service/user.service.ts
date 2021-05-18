import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable()
export class UserService {

  serverAuthenticationApi = '';
  constructor(private httpClient: HttpClient) {


    if (environment.production) {
      this.serverAuthenticationApi = environment.serverAuthenticationApi;
    } else {
      this.serverAuthenticationApi =  environment.serverAuthenticationApi;
    }
  }


  createUser(value: any): Observable<any> {
    return this.httpClient.post(this.serverAuthenticationApi +
      `/v1/api/public/auth/portal-user/create`, value, httpOptions).pipe(map((data: any) => {
      return data;
    }));
  }


  forgotPassword(value: any): Observable<any> {
    return this.httpClient.post(this.serverAuthenticationApi +
      `/v1/api/public/users/password/forgot`, value, httpOptions).pipe(map((data: any) => {
      return data;
    }));
  }


  forgotPasswordTokenVerification(value: any): Observable<any> {
    return this.httpClient.post(this.serverAuthenticationApi +
      `/v1/api/public/users/password/forgot-password-token-verification`, value, httpOptions).pipe(map((data: any) => {
      return data;
    }));
  }


  forgotPasswordChange(value: any): Observable<any> {
    return this.httpClient.post(this.serverAuthenticationApi +
      `/v1/api/public/users/password/forgot-password-change`, value, httpOptions).pipe(map((data: any) => {
      return data;
    }));
  }


  addEmployee(body: any) {
    return this.httpClient.post(this.serverAuthenticationApi +
      `/v1/api/protected/users/employee/add`, body, httpOptions).pipe(map((data: any) => {
      return data;
    }));
  }

  updateEmployee(body: any) {
    return this.httpClient.post(this.serverAuthenticationApi +
      `/v1/api/protected/users/employee/update`, body, httpOptions).pipe(map((data: any) => {
      return data;
    }));
  }


  resendEmployeeSms(employeeId: any) {
    return this.httpClient.post(this.serverAuthenticationApi +
      `/v1/api/protected/users/employee/resend-sms`, employeeId, httpOptions).pipe(map((data: any) => {
      return data;
    }));
  }


  userAccountBlockedReset(user: any) {
    return this.httpClient.post(this.serverAuthenticationApi +
      `/v1/api/protected/users/unblock-user`, user, httpOptions).pipe(map((data: any) => {
      return data;
    }));
  }


  sendContactUsEmail(value: any): Observable<any> {
    return this.httpClient.post(this.serverAuthenticationApi +
      `/v1/api/public/default/contact-us/send`, value, httpOptions).pipe(map((data: any) => {
      return data;
    }));
  }
  fetchPortalUser(): Observable<any> {
    return this.httpClient.get(this.serverAuthenticationApi +
      `/v1/api/protected/auth/portal_user/profile/update`, httpOptions).pipe(map((data: any) => {
      return data;
    }));
  }


  updatePortalUser(value: any): Observable<any> {
    return this.httpClient.post(this.serverAuthenticationApi +
      `/v1/api/protected/auth/portal_user/profile/update`, value, httpOptions).pipe(map((data: any) => {
      return data;
    }));
  }


  deactivateUser(value: any): Observable<any> {
    return this.httpClient.post(this.serverAuthenticationApi +
      `/v1/api/protected/auth/portal_user/deactivate`, value, httpOptions).pipe(map((data: any) => {
      return data;
    }));
  }



  checkIfUserEmailExists(email: string): Observable<any> {
    return this.httpClient.get(this.serverAuthenticationApi +
      `/v1/api/public/users/check/email/exists?email=` + email, httpOptions)
      .pipe(map((data: any) => {
        return data;
      }));
  }


  checkIfUsernameExists(username: string): Observable<any> {
    return this.httpClient.get(this.serverAuthenticationApi + `/v1/api/public/auth/portal-user/username/exists?username=`
      + username, httpOptions)
      .pipe(map((data: any) => {
        return data;
      }));
  }


  checkIfOrganisationExists(name: string): Observable<any> {
    return this.httpClient.get(this.serverAuthenticationApi + `/v1/api/public/auth/portal-account/name/exists?name=` + name, httpOptions)
      .pipe(map((data: any) => {
      return data;
    }));
  }


  resendVerificationEmail(email: string): Observable<any> {
    return this.httpClient.get(this.serverAuthenticationApi +
      `/v1/api/public/auth/portal-user/resend-email-verification?email=` + email, httpOptions)
      .pipe(map((data: any) => {
        return data;
      }));
  }

  verifyToken(token: any, userCode: any): Observable<any> {
    return this.httpClient.get(this.serverAuthenticationApi +
      `/v1/api/public/auth/portal-user/verify-email?token=` + token + `&userCode=` + userCode, httpOptions).pipe(map((data: any) => {
      return data;
    }));
  }

  updateUserProfile(value: any): Observable<any> {
    return this.httpClient.put(this.serverAuthenticationApi + `/v1/api/protected/auth/portal_user/update`, value, httpOptions)
      .pipe(map((data: any) => {
        return data;
      }));
  }

  postUserProfileImage(fileCode: string, profileImageType: string): Observable<any> {
    return this.httpClient.post(this.serverAuthenticationApi + `/v1/api/protected/auth/portal_user/image/update?file_code=`
      + fileCode + `&profile_image_type=` + profileImageType, httpOptions)
      .pipe(map((data: any) => {
        return data;
      }));
  }


  getPortalAccountCode() {
    return this.httpClient.get(this.serverAuthenticationApi + `/v1/api/protected/auth/portal_account/code`).pipe(map((data: any) => {
      return data;
    }));
  }


  getAllEmployees(request: any, size: any, pageNumber: any) {
    return this.httpClient.post(this.serverAuthenticationApi +
      `/v1/api/protected/auth/portal_user/employee/view-all?page=` + pageNumber + '&size=' + size, request).pipe(map((data: any) => {
      return data;
    }));
  }


  changePassword(request: any) {
    return this.httpClient.post(this.serverAuthenticationApi +
      `/v1/api/protected/users/password/change-password`, request).pipe(map((data: any) => {
      return data;
    }));
  }


  checkIfOldPasswordMatches(request: any) {
    return this.httpClient.post(this.serverAuthenticationApi +
      `/v1/api/protected/users/password/verify`, request).pipe(map((data: any) => {
      return data;
    }));
  }


  getPortalUserRoles(): Observable<any> {
    return this.httpClient.get(this.serverAuthenticationApi +
      `/v1/api/public/default/portal-user/roles`, httpOptions).pipe(map((data: any) => {
      return data;
    }));
  }

  getPortalUserById(id: any): Observable<any> {
    return this.httpClient.get(this.serverAuthenticationApi +
      `/v1/api/protected/auth/portal_user/` + id, httpOptions).pipe(map((data: any) => {
      return data;
    }));
  }


  fetchAllMyMessages(pageSize: number, pageNumber: number): Observable<any> {
    return this.httpClient.get(this.serverAuthenticationApi +
      `/v1/api/protected/users/messages/read?page=${pageNumber}&limit=${pageSize}`, httpOptions).pipe(map((data: any) => {
      return data;
    }));
  }


  setMessageAsRead(postCode: string): Observable<any> {
    return this.httpClient.get(this.serverAuthenticationApi +
      `/v1/api/protected/users/messages/read/update?post_code=${postCode}`, httpOptions).pipe(map((data: any) => {
      return data;
    }));
  }


  readMessageCount(): Observable<any> {
    return this.httpClient.get(this.serverAuthenticationApi +
      `/v1/api/protected/users/messages/read/count`, httpOptions).pipe(map((data: any) => {
      return data;
    }));
  }


  subscribeToPushNotification(token: any): Observable<any> {
    const inputData  = {registrationToken:  token};
    return this.httpClient.post(this.serverAuthenticationApi +
      `/v1/api/protected/user_and_push_notification/add-user-device`, inputData, httpOptions).pipe(map((data: any) => {
      return data;
    }));
  }


  subscribeToAdminPushNotification(token: any): Observable<any> {
    const inputData  = {registrationToken:  token};
    return this.httpClient.post(this.serverAuthenticationApi +
      `/v1/api/protected/user_and_push_notification/add-admin-user-device`, inputData, httpOptions).pipe(map((data: any) => {
      return data;
    }));
  }
}
