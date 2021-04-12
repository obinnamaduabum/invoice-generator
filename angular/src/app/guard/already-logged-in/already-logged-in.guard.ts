import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree} from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {AuthenticationService} from '../../services/authentication-service';
import {MyRoutes} from '../../utils/my-routes';

@Injectable()
export class AlreadyLoggedInGuard implements CanActivate {

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean |
    UrlTree> | boolean | UrlTree {

    return this.authenticationService.fetchUser().pipe(map(data => {
      if (data) {
          this.router.navigate([MyRoutes.protectedRoutes.authLandingPage], {queryParams: {returnUrl: state.url}});
        }
      return false;
        }), catchError((error, caught) => {
          return of(true);
        })
    );
  }
}






