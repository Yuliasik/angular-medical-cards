import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {PatientListComponent} from './component/patient-list/patient-list.component';
import {AppRoutingModule} from "./module/app-routing/app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {PatientService} from "./service/patient-service.service";
import {CommentService} from "./service/comment-service.service";
import {PatientViewComponent} from './component/patient-view/patient-view.component';
import {CommentListComponent} from './component/comment-list/comment-list.component';
import {PatientSearchComponent} from './component/patient-search/patient-search.component';
import {CommentHandlerComponent} from './component/comment-handler/comment-handler.component';
import {DoctorListComponent} from './component/doctor-list/doctor-list.component';
import {DoctorService} from "./service/doctor-service.service";
import {FormsModule} from "@angular/forms";
import {DoctorAddComponent} from './component/doctor-add/doctor-add.component';
import {PatientAddComponent} from './component/patient-add/patient-add.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {PatientFormComponent} from './component/patient-form/patient-form.component';
import {environment} from "../environments/environment";
import {BaseUrlInterceptor} from "./BaseUrlInterceptor";

declare global {
  type unknown = any
}

@NgModule({
  declarations: [
    AppComponent,
    PatientListComponent,
    PatientViewComponent,
    CommentListComponent,
    PatientSearchComponent,
    CommentHandlerComponent,
    DoctorListComponent,
    DoctorAddComponent,
    PatientAddComponent,
    PatientFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
  ],
  providers: [PatientService,
    CommentService,
    DoctorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true,
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
