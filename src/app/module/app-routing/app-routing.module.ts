import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PatientListComponent} from "../../component/patient-list/patient-list.component";
import {PatientViewComponent} from "../../component/patient-view/patient-view.component";
import {DoctorListComponent} from "../../component/doctor-list/doctor-list.component";
import {PatientAddComponent} from "../../component/patient-add/patient-add.component";

const routes: Routes = [
  {path: '', redirectTo: '/patients', pathMatch: 'full'},
  // {path: '**', redirectTo: '/doctors', pathMatch: 'full'},
  {path: 'patients', component: PatientListComponent},
  {path: 'patients/detail/:id', component: PatientViewComponent},
  {path: 'doctors', component: DoctorListComponent},
  {path: 'patient/add', component: PatientAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
