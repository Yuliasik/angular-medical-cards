import {Component, Input, OnInit} from '@angular/core';
import {Patient} from "../../model/patient";
import {PatientService} from "../../service/patient-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  patients: Patient[] = [];
  private deleteSubscription: Subscription;
  private updateSubscription: Subscription;
  private createSubscription: Subscription;
  @Input() deleteEvent: Observable<void>;
  @Input() updateEvent: Observable<void>;
  @Input() createEvent: Observable<void>;

  constructor(private patientService: PatientService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  async ngOnInit(): Promise<void> {

    await this.getAllPatients();
    if (this.patients.length > 0) {
      await this.redirect();
    } else {
      await this.router.navigate(['patient', 'add']);
    }

    this.route.params.subscribe(() => {
      this.getAllPatients();
    })

    if (this.deleteEvent) {
      this.deleteSubscription = this.deleteEvent.subscribe((id) => {
        this.getAllPatients();
        this.redirectToNotCurrentPatient(id);
      });
    }

    if (this.updateEvent) {
      this.updateSubscription = this.updateEvent.subscribe((id) => {
        this.getAllPatients();
        this.redirectToCurrentPatient(id);
      });
    }

    if (this.createEvent) {
      this.createSubscription = this.createEvent.subscribe((id) => {
        this.getAllPatients();
        this.redirectToCurrentPatient(id);
      });
    }
  }

  async getAllPatients() {
    this.patients = await this.patientService.findAll().toPromise();
  }

  async redirect() {
    await this.router.navigate(['patients', 'detail', (this.patients[0].id)]);
  }

  async redirectToCurrentPatient(id) {
    await this.router.navigate(['patients', 'detail', (id)]);
  }

  async redirectToNotCurrentPatient(id) {
    if (this.patients.length <= 1) {
      await this.router.navigate(['patient', 'add']);
    } else {
      let index = 0;
      if (id == this.patients[index].id) index++;
      await this.router.navigate(['patients', 'detail', this.patients[index].id]);
    }
  }
}
