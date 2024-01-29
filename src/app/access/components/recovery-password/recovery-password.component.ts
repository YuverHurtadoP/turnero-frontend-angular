import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { RecoveryPasswordRequestDto } from '../../dto/request/recovery-password-request-dto';
import { Message } from '../../dto/response/message';
import { AccessService } from '../../service/access.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-recovery-password',
  standalone: true,
  imports: [CommonModule, FormsModule,MatIconModule,ReactiveFormsModule ],
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css'],

})
export class RecoveryPasswordComponent {
  username: string = '';
  dni: string = '';
  formRecovery: FormGroup;

  private dtoRecovery:RecoveryPasswordRequestDto = new RecoveryPasswordRequestDto;
  private dtoMessage:Message = new Message;

  private accessService:AccessService;

  constructor(private fb: FormBuilder,accessService:AccessService) {
    this.accessService = accessService;

    this.formRecovery = this.fb.group({
      dni: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],

    });


  }


  private markFieldsAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup) {
        this.markFieldsAsTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

  onSubmit() {

    if (this.formRecovery.valid) {

    this.dtoRecovery.email = this.formRecovery.get("username")?.value;
    this.dtoRecovery.dni =  this.formRecovery.get("dni")?.value;
    this.accessService.recoveryPassword(this.dtoRecovery).subscribe({
      next: (response)=>{
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: response.message,
        });
      },
      error: (e) => {

        Swal.fire({
          title: "Error",
          icon: "error",
          text: e.error,

          confirmButtonText: "Aceptar",

          showCloseButton: true,
        });
      }
    });
    } else {

      this.markFieldsAsTouched(this.formRecovery);
    }
  }
}
