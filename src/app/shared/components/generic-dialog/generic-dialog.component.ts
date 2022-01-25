import {
  Component,
  Inject,
  OnInit,
} from "@angular/core";
import { Subject } from "rxjs/internal/Subject";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from '@angular/router';

@Component({
  templateUrl: "./generic-dialog.component.html",
  styleUrls: ["./generic-dialog.component.scss"],
})
export class GenericDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<GenericDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GenericDialogData,
    private router: Router
  ) {}

  ngOnInit() {}

  onOk() {
    this.dialogRef.close();
    if(this.data.redirect) {
      this.router.navigate([this.data.redirect]);
    }
  }

  onConfirm() {
    this.dialogRef.close();
    this.data.response.next(true);
    this.data.response.complete();
  }

  onCancel() {
    this.dialogRef.close();
    this.data.response.next(false);
    this.data.response.complete();
  }
}

export class GenericDialogData {
  constructor(
    public type: string,
    public title: string,
    public message: string,
    public response: Subject<any>,
    public redirect: string
  ) {}
}
