// import {Injectable} from '@angular/core';
// import {Router, CanLoad, Route, UrlSegment} from '@angular/router';
// import {Observable, of} from 'rxjs';
// import {AuthenticationService} from '../../services/authentication-service';
// import {catchError, map} from 'rxjs/operators';
// import {ResponseModel} from '../../model/response-model';
// import {FullUserAccountInterface} from '../../interface/full-user-account_interface';
// import {AccountTypeConstant} from '../../lh-enum/account_type';
// import {RoleTypeConstant} from '../../lh-enum/role_type';
//
// @Injectable()
// export class LoggedInAdminCanLoadGuard implements CanLoad {
//
//   constructor(private router: Router,
//               private authenticationService: AuthenticationService) {
//   }
//
//   canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
//     return this.authenticationService.fetchUser().pipe(map(data => {
//      // console.log(data);
//       const responseModel: ResponseModel = data;
//      // console.log(responseModel);
//       if (data) {
//         const userAccount: FullUserAccountInterface = responseModel.data;
//         const result = this.checkPortalAccountType(userAccount);
//         return result;
//       } else {
//         this.router.navigate(['/login']);
//         return false;
//       }
//     }), catchError((error, caught) => {
//       return of(false);
//     }));
//   }
//
//   checkPortalAccountType(userAccount: FullUserAccountInterface) {
//     let isUserAllowedToView = false;
//     if (AccountTypeConstant[userAccount.account.type] === AccountTypeConstant.TRADE_CRAFT) {
//       if (userAccount.roles) {
//         userAccount.roles.filter((role: any) => {
//           if (RoleTypeConstant[role.role_type] === RoleTypeConstant.SUPER_ADMIN || RoleTypeConstant.SUPER_ADMIN) {
//             isUserAllowedToView = true;
//           }
//         });
//       }
//     }
//
//     return isUserAllowedToView;
//   }
// }
