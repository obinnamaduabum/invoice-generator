// import {Injectable} from '@angular/core';
// import {
//   CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route,
//   CanActivateChild
// } from '@angular/router';
// import {Observable, of} from 'rxjs';
// import {catchError, map} from 'rxjs/operators';
// import {AuthenticationService} from '../../services/authentication-service';
// import {ResponseModel} from '../../model/response-model';
// import {PortalUserModel} from '../../model/portal-user-model';
// import {PortalAccountTypeConstant} from '../../lh-enum/portal-account-type';
//
// @Injectable()
// export class AdminLoggedInGuardCanActivateChild implements CanActivateChild {
//
//
//   constructor(private router: Router,
//               private authenticationService: AuthenticationService) {
//   }
//
//   canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//
//     return this.authenticationService.fetchUser().pipe(map(data => {
//       const responseModel: ResponseModel = data;
//
//       //  console.log(data);
//       if (data) {
//         const portalUser: PortalUserModel = responseModel.data;
//         // console.log(portalUser);
//         const result = this.checkPortalAccountType(portalUser);
//         if (result.portalAccountTypeConstant === PortalAccountTypeConstant.LAB.toString()) {
//           //  console.log('labs');
//           this.router.navigate(['/admin']);
//           // return false;
//         } else if (result.portalAccountTypeConstant === PortalAccountTypeConstant.PATIENT.toString()) {
//           return false;
//         } else if (result.portalAccountTypeConstant === PortalAccountTypeConstant.INSTITUTION.toString()) {
//           return true;
//         }
//       } else {
//         this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
//         return false;
//       }
//     }), catchError((error, caught) => {
//       this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
//       return of(false);
//     }));
//   }
//
//
//   checkPortalAccountType(portalUser: PortalUserModel) {
//
//     let userData: any;
//     const result = portalUser.portalAccountDescriptionDtoList.filter(value => {
//       if (value.portalAccountTypeConstant === PortalAccountTypeConstant.LAB.toString()) {
//         userData = value;
//       } else if (value.portalAccountTypeConstant === PortalAccountTypeConstant.PATIENT.toString()) {
//         userData = value;
//       } else if (value.portalAccountTypeConstant === PortalAccountTypeConstant.INSTITUTION.toString()) {
//         userData = value;
//       }
//     });
//     if (userData) {
//       return userData;
//     }
//     return null;
//   }
// }
