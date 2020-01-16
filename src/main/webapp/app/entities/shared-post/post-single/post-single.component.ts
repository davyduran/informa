import { Component, Input } from '@angular/core';
import { IPost } from 'app/shared/model/post.interface';
import {PostPublicaDialogComponent} from 'app/entities/shared-post/post-publica-dialog.component';
import {PostDeleteDialogComponent} from 'app/entities/post/post-delete-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-post-single',
  templateUrl: './post-single.component.html',
  styleUrls: ['./post-single.component.scss']
})
export class PostSingleComponent {
@Input() post?: IPost;
@Input() account?: Account;

  constructor(protected modalService: NgbModal) { }
  publica(post: IPost): void {
    const modalRef = this.modalService.open(PostPublicaDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.post = post;
  }

  delete(post: IPost): void {
    const modalRef = this.modalService.open(PostDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.post = post;
  }

  postAutorId(): string {
    return this.post ? ( this.post.autorId ? this.post.autorId.toString() : "" ) : "";
  }
  accountId(): string {
    return this.account ? this.account.id  : "";
  }

  autorEUser():boolean {
    return this.postAutorId() === this.accountId();
  }

}
