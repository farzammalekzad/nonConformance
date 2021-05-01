import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {NgxMapboxGLModule} from 'mapir-angular-component';
import {Interceptor} from './pages/auth/Interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxMapboxGLModule,
    IonicModule.forRoot(),
    AppRoutingModule
    ],
  providers: [{
    provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy,
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
