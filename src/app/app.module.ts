import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HomePageModule } from './home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { GestBibComponent } from './gest-bib/gest-bib.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore' ;
import {provideAuth ,getAuth} from '@angular/fire/auth';
import {provideStorage ,getStorage} from '@angular/fire/storage';

@NgModule({
  declarations: [AppComponent,
    GestBibComponent],
  imports: [HttpClientModule,HomePageModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    provideFirebaseApp(()=> initializeApp(environment. firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
    bootstrap: [AppComponent],
})
export class AppModule {}
