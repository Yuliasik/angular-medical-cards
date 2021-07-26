import {Component, OnInit} from '@angular/core';
import {Doctor} from "../../model/doctor";
import {ActivatedRoute, Router} from "@angular/router";
import {DoctorService} from "../../service/doctor-service.service";

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {

  doctors: Doctor[];
  doctorAdd: Doctor;

  constructor(private doctorService: DoctorService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.getAllDoctors();
    });
  }

  getAllDoctors(): void {
    this.doctorService.findAllDoctors().subscribe(data => {
      this.doctors = data;
    });
  }

  save(doctorToAdd) {
    this.doctors.push(doctorToAdd);
    this.doctorService.addNewDoctor(doctorToAdd).subscribe(() => {
    });
  }
}
