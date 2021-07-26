import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Doctor} from "../model/doctor";
import {environment} from "../../environments/environment";

@Injectable()
export class DoctorService {

  private doctorsUrl: string;

  constructor(private http: HttpClient) {
    this.doctorsUrl = 'doctors';
  }

  public findAllDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.doctorsUrl);
  }

  public getDoctor(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.doctorsUrl}/${id}`);
  }

  public addNewDoctor(doctor: Doctor) {
    return this.http.post(`${this.doctorsUrl}`, doctor);
  }

}
