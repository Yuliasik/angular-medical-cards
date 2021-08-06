import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Patient} from "../../model/patient";
import {PatientService} from "../../service/patient-service.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {

  @Input() previousPatient: Patient;
  @Output() savePatient: EventEmitter<any> = new EventEmitter();

  isSaveDisabled: boolean = true;
  titleSave: string;
  isFemale = false;
  patient: Patient;
  patternFirstName = false;
  patternLastName = false;
  patternBirthday = false;
  patternCountry = false;
  patternState = false;
  patternAddress = false;

  constructor(private patientService: PatientService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.cancelPatient();
  }

  funcCheckSex() {
    if (this.isFemale) {
      this.patient.sex = "FEMALE";
    } else {
      this.patient.sex = "MALE";
    }
  }

  funcIsFemale() {
    if (this.patient.sex === "FEMALE") {
      this.isFemale = true;
    } else {
      this.isFemale = false;
    }
  }

  clonePatient(oldPatient: Patient): Patient {
    let newPatient = new Patient();
    for (var attribut in oldPatient) {
      newPatient[attribut] = oldPatient[attribut];
    }
    return newPatient;
  }

  cancelPatient() {
    this.patient = this.clonePatient(this.previousPatient);
    this.isSaveDisabled = true;
    this.titleSave = 'Not all fields valid or inputted';
    this.funcIsFemale();
    this.checkAllFields();
  }

  changeForm() {
    this.funcCheckSex();
    console.log(this.patternFirstName);
    if (this.patternFirstName && this.patternLastName &&
      this.patient.sex && this.patternBirthday &&
      this.patternCountry && this.patternState && this.patternAddress) {
      this.isSaveDisabled = false;
      this.titleSave = 'Save patient';
    } else {
      this.isSaveDisabled = true;
      this.titleSave = 'Not all fields valid or inputted';
    }
  }

  checkPatternFirstName() {
    if (this.patient.firstName.match(/^[A-Z][a-z]+(-[A-Z][a-z]+)?$/)) {
      this.patternFirstName = true;
    } else {
      this.patternFirstName = false;
    }
    this.changeForm();
  };

  checkPatternLastName() {
    if (this.patient.lastName.match(/^[A-Z][a-z]+(-[A-Z][a-z]+)?$/)) {
      this.patternLastName = true;
    } else {
      this.patternLastName = false;
    }
    this.changeForm();
  };

  checkPatternBirthday() {
    if (this.patient.birthday) {
      this.patternBirthday = true;
    } else {
      this.patternBirthday = false;
    }
    this.changeForm();
  }

  checkPatternCountry() {
    if (this.patient.country.match(/^[A-Z](([A-Z]+)|([a-z])+)([ -][A-Z](([A-Z]+)|([a-z])+))*$/)) {
      this.patternCountry = true;
    } else {
      this.patternCountry = false;
    }
    this.changeForm();
  }

  checkPatternState() {
    if (this.patient.state.match(/^[A-Z](([A-Z]+)|([a-z])+)([ -][A-Z](([A-Z]+)|([a-z])+))*$/)) {
      this.patternState = true;
    } else {
      this.patternState = false;
    }
    this.changeForm();
  }

  checkPatternAddress() {
    if (this.patient.address) {
      this.patternAddress = true;
    } else {
      this.patternAddress = false;
    }
    this.changeForm();
  }

  checkAllFields() {
    this.checkPatternFirstName();
    this.checkPatternLastName();
    this.checkPatternBirthday();
    this.checkPatternCountry();
    this.checkPatternState();
    this.checkPatternAddress();
  }
}
