import {Component, OnInit} from '@angular/core';
import {Patient} from "../../model/patient";
import {Observable, Subject} from "rxjs";
import {PatientService} from "../../service/patient-service.service";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-patient-search',
  templateUrl: './patient-search.component.html',
  styleUrls: ['./patient-search.component.css']
})
export class PatientSearchComponent implements OnInit {

  patients$: Observable<Patient[]>;
  searchTerms = new Subject<string>();
  isVisible = false;

  constructor(private patientService: PatientService) {
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.patients$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.patientService.searchPatient(term)),
    );
  }

  show(): void {
    this.isVisible = true;
  }

  async hide() {
    await this.delay(200);
    this.isVisible = false;
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
