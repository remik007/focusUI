import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { SubPageComponent } from './components/subpage/subpage.component';
import { ContactComponent } from './components/contact/contact.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { AppEffects } from './state/app.effects';
import { AppReducer } from './state/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import { CategoryComponent } from './components/category/category.component';
import { ItemComponent } from './components/item/item.component';
import { ModalModule } from './components/_modal';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    SubPageComponent,
    ContactComponent,
    CategoryComponent,
    ItemComponent
  ],
  imports: [
    ModalModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    NgbCollapseModule,
    StoreModule.forRoot({AppReducer}, {
      runtimeChecks: {
        strictActionImmutability: false,
        strictStateImmutability: false
      }
    }),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
