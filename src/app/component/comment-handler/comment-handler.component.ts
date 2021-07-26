import {Component, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {Comment} from "../../model/comment";
import {ActivatedRoute} from "@angular/router";
import {CommentService} from "../../service/comment-service.service";
import {Doctor} from "../../model/doctor";
import {DoctorService} from "../../service/doctor-service.service";

@Component({
  selector: 'app-comment-handler',
  templateUrl: './comment-handler.component.html',
  styleUrls: ['./comment-handler.component.css']
})
export class CommentHandlerComponent implements OnInit {

  @Output() save: EventEmitter<any> = new EventEmitter();
  @Input() comment: Comment = new Comment();
  doctors: Doctor[] = [];
  isSaveDisabled: boolean = true;
  titleSave: string;

  constructor(private commentService: CommentService,
              private doctorService: DoctorService,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.cancelComment();
    });
    this.findAllDoctors();
  }

  findAllDoctors(): void {
    this.doctorService.findAllDoctors().subscribe(data => {
      this.doctors = data;
    });
  }

  async saveComment() {
    if (this.comment.id) {
      await this.commentService.updateComment(this.comment).subscribe(() => {
      });
    } else {
      this.comment.patient.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
      await this.commentService.addComment(this.comment)
        .subscribe((comment) => {
          this.save.emit(comment);
        });
    }
    this.cancelComment();
  }

  cancelComment() {
    this.comment = new Comment();
    this.isSaveDisabled = true;
    this.titleSave = 'Not all fields valid or inputted';

  }

  changeDoctor() {
    this.doctorService.getDoctor(this.comment.doctor.id).subscribe((data) =>
      this.comment.doctor = data
    );
  }

  changeForm() {
    if (!this.comment.text.match(/^\s*$/) && this.comment.doctor.id) {
      this.isSaveDisabled = false;
      this.titleSave = 'Save doctor';
    } else {
      this.isSaveDisabled = true;
      this.titleSave = 'Not all fields valid or inputted';
    }
  }
}
