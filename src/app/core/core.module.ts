import {AuthGuard} from './auth/auth.guard';
import {AppState, reducers, metaReducers} from './core.state';
import {selectTheme} from './settings/settings.selectors';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {TokenInterceptor} from './http-interceptors/token.interceptor';
import {NgModule, ErrorHandler} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthCallbackComponent} from './auth/auth-callback/auth-callback.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpErrorInterceptor} from './http-interceptors/http-error.interceptor';
import {StoreModule} from '@ngrx/store';
import {environment} from '@env/environment';
import {EffectsModule} from '@ngrx/effects';
import {NgOidcClientModule} from 'ng-oidc-client';
import {AppErrorHandler} from './error-handler/app-error-handler.service';
import {LocalStorageService} from './local-storage/local-storage.service';
import {SettingsEffects} from './settings/settings.effects';
import {AuthEffects} from './auth/auth.effects';
import {ToastModule} from 'primeng/toast';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {MessageService} from 'primeng/api';
import {login as actionOidcLogin, register as actionOidcRegister} from './auth/auth.actions';
import {logValue} from './rxjs/logValue';

export {AppState, LocalStorageService, AuthGuard, logValue, selectTheme, actionOidcLogin, actionOidcRegister};

@NgModule({
  declarations: [AuthCallbackComponent],
  imports: [
    // angular
    CommonModule,
    ToastModule,
    ProgressSpinnerModule,
    HttpClientModule,

    // ngrx
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([AuthEffects, SettingsEffects]),
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
          name: environment.appName
        }),

    NgOidcClientModule.forRoot({
      /* eslint-disable @typescript-eslint/camelcase */
      oidc_config: {
        authority: environment.authServerUri,
        client_id: environment.appName,
        response_type: 'code',
        scope: 'openid profile email api.read',
        filterProtocolClaims: true,
        loadUserInfo: true,
        automaticSilentRenew: true,
        redirect_uri: `${environment.thisUri}/login-callback`,
        post_logout_redirect_uri: `${environment.thisUri}/`,
        silent_redirect_uri: `${environment.thisUri}/silent-refresh`
      }
    })
  ],
  providers: [
    MessageService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: ErrorHandler, useClass: AppErrorHandler}
  ],
  exports: [AuthCallbackComponent, HttpClientModule]
})
export class CoreModule {}
