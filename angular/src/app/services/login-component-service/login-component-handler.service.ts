import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {LoginComponent} from '../../modules/authentication/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class LoginComponentHandlerService {

  public loginDialogObservable = new Subject<boolean>();
  public dialogRefObservable = new Subject<any>();
  dialogRef: MatDialogRef<LoginComponent>;

  constructor(public dialog: MatDialog) { }

  setDialogState(val: boolean): void {
    this.loginDialogObservable.next(val);
  }

  openDialog(): void {
    this.dialogRef = this.dialog.open(LoginComponent, {
      id: 'login-dialog',
      height: '400px',
      width: '400px',
    });

    // this.dialogRefObservable.next(dialogRef);

    this.dialogRef.afterClosed().subscribe(result => {
      // if (this.instanceOfResponseDialog(result)) {
      //   if (result.success) {
      //
      //   } else {
      //
      //   }
      // } else {
      //   this.myToastService.showFailed('Error occurred');
      // }
    });
  }

  closeDialog(): void {
    // this.dialogRefObservable.subscribe(event => {
    //   console.log(event);
      this.dialogRef.close();
    // });
  }

}
