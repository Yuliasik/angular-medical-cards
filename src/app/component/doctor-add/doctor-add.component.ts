import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Doctor} from "../../model/doctor";
import {DoctorService} from "../../service/doctor-service.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-doctor-add',
  templateUrl: './doctor-add.component.html',
  styleUrls: ['./doctor-add.component.css']
})
export class DoctorAddComponent implements OnInit {

  @Output() save: EventEmitter<any> = new EventEmitter();
  @Input() doctor: Doctor = new Doctor();
  isSaveDisabled: boolean = true;

  titleSave: string;

  constructor(private doctorService: DoctorService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.cancelDoctor();
  }

  addNewDoctor() {
    this.save.emit(this.doctor);
    this.cancelDoctor();
  }

  cancelDoctor() {
    this.doctor = new Doctor();
    this.isSaveDisabled = true;
    this.titleSave = 'Not all fields valid or inputted';
  }

  changeForm() {
    if (this.doctor.firstName.match(/^[A-Z][a-z]+(-[A-Z][a-z]+)?$/) &&
      this.doctor.lastName.match(/^[A-Z][a-z]+(-[A-Z][a-z]+)?$/)) {
      this.isSaveDisabled = false;
      this.titleSave = 'Save doctor';
    } else {
      this.isSaveDisabled = true;
      this.titleSave = 'Not all fields valid or inputted';
    }
  }
}
