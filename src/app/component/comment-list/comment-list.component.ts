import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Comment} from "../../model/comment";
import {CommentService} from "../../service/comment-service.service";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  comments: Comment[];
  commentEdit: Comment;

  constructor(private commentService: CommentService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.getAllByPatientId();
    })
  }

  getAllByPatientId(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.commentService.getCommentByPatientId(id).subscribe(data => {
      this.comments = data;
    });
  }

  async save(commentToSave) {
    commentToSave.dateCreating = new Date();
    this.comments.push(commentToSave);
  }
}
