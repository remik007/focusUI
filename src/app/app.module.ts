import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SubPageComponent } from './components/subpage/subpage.component';
import { ContactComponent } from './components/contact/contact.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppEffects } from './state/app.effects';
import { AppReducer } from './state/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import { CategoryComponent } from './components/category/category.component';
import { ItemComponent } from './components/item/item.component';
import { ModalModule } from './components/_modal';
import { EditorModule } from '@tinymce/tinymce-angular';
import { JwtInterceptor } from './services/jwt.interceptor';
import { AdminLoginComponent } from './components/_admin/adminlogin/adminlogin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminHomeComponent } from './components/_admin/adminhome/adminhome.component';

@NgModule({
  declarations: [
    AdminHomeComponent,
    AdminLoginComponent,
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SubPageComponent,
    ContactComponent,
    CategoryComponent,
    ItemComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    EditorModule,
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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
