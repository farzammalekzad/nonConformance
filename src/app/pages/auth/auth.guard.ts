import { Injectable } from '@angular/core';
import {UrlTree, CanLoad, Route, UrlSegment, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from './auth.service';
import {switchMap, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private route: Router) {
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.userIsAuthenticated
      .pipe(
        take(1),
        tap(isAuthenticated => {
          if (!isAuthenticated) {
            this.route.navigateByUrl('/auth');
          }
          return true;
        }));

  }

}
