import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer } from 'src/app/models/Customer.model';
import { Utility } from 'src/app/models/Utility.model';

@Injectable({
  providedIn: 'root',
})
export class UserGuardGuard implements CanActivate {
  constructor(private afs: AngularFirestore, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.afs
      .collection<Customer>(Utility.firestoreName)
      .doc(route.params['restaurantId'])
      .valueChanges()
      .pipe(
        map((data) => {
          if (typeof data !== 'undefined' && data.customerId) {
            return true;
          }
          return this.router.createUrlTree(['/error']);
        })
      );
  }
}
