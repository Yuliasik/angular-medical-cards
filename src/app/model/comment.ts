import {Doctor} from "./doctor";
import {Patient} from "./patient";

export class Comment {
  id: number;
  text: string;
  dateCreating: Date;
  doctor: Doctor;
  patient: Patient;

  constructor() {
    this.doctor = new Doctor();
    this.text = '';
    this.patient = new Patient();
  }
}

