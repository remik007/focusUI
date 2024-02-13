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
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './services/auth.guard';
import { AddTripComponent } from './components/_admin/addTrip/addTrip.component';
import { CheckboxSelectorComponent } from './components/_shared/checkbox-selector/checkbox-selector.component';
import { DateSelectorComponent } from './components/_shared/date-selector/date-selector.component';
import { EmailFieldComponent } from './components/_shared/email-field/email-field.component';
import { NumberTextFieldComponent } from './components/_shared/number-text-field/number-text-field.component';
import { TextFieldComponent } from './components/_shared/text-field/text-field.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AdminGuard } from './services/admin.guard';
import { SelectFieldComponent } from './components/_shared/select-field/select-field.component';
import { FileUploadFieldComponent } from './components/_shared/file-upload-field/file-upload-field.component';
import { MatIconModule } from '@angular/material/icon';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { AddSubPageComponent } from './components/_admin/addSubPage/addSubPage.component';
import { SanitizeHtmlPipe } from './services/sanitizehtml.pipe';
import { AddCategoryComponent } from './components/_admin/addCategory/addCategory.component';
import { EditContactComponent } from './components/_admin/editContact/editContact.component';

@NgModule({
  declarations: [
    EditContactComponent,
    AddSubPageComponent,
    AddTripComponent,
    LoginComponent,
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SubPageComponent,
    ContactComponent,
    CategoryComponent,
    ItemComponent,
    CheckboxSelectorComponent,
    DateSelectorComponent,
    EmailFieldComponent,
    NumberTextFieldComponent,
    TextFieldComponent,
    SelectFieldComponent,
    FileUploadFieldComponent,
    SanitizeHtmlPipe,
    AddCategoryComponent
  ],
  imports: [
    ButtonModule,
    CarouselModule,
    MatIconModule,
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
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    MatAutocompleteModule
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
