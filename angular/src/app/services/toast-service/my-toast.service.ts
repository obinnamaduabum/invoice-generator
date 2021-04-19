import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MyToastService {

  constructor(private toastr: ToastrService) { }

  showFailed(message: string) {
    this.toastr.error(message, 'Error!');
  }


  showServerError() {
    this.toastr.error("Server error occurred", 'Error!');
  }

  showInvalidFormError() {
    this.toastr.error("Form invalid", 'Error!');
  }

  showSuccess(message: string) {
    this.toastr.success(message, 'Success!');
  }
}
