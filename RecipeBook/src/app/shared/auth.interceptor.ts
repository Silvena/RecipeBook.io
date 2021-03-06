import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
// import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store/src/store';
import 'rxjs/add/operator/switchMap';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private store: Store<fromApp.AppState>) {}

 intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const copiedReq = req.clone({headers: req.headers.append('', '')});
    // every time to work with clean req(copy of incoming req)
    // only can read data

    return this.store.select('auth')
    .take(1)
    .switchMap((authState: fromAuth.State) => {
         const copiedReq = req.clone({params: req.params.set
        ('auth', authState.token)});
     return next.handle(copiedReq);
    });
 }
}
