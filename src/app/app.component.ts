import {Component} from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;
  deleteSubject: Subject<void> = new Subject<void>();
  updateSubject: Subject<void> = new Subject<void>();
  createSubject: Subject<void> = new Subject<void>();

  constructor() {
    this.title = 'MedicalCards';
  }

  onActivate(reference): void {
    if (reference.delete) {
      reference.delete.subscribe((param) => {
        this.deleteSubject.next(param);
      });
    }
    if (reference.update) {
      reference.update.subscribe((param) => {
        this.updateSubject.next(param);
      });
    }
    if (reference.create) {
      reference.create.subscribe((param) => {
        this.createSubject.next(param);
      });
    }
  }
}
