
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginDto } from '../../dto/request/login-dto';
import { TokenDto } from '../../dto/response/token-dto';
import { AccessService } from '../../service/access.service';
import Swal from 'sweetalert2';
import { RecoveryPasswordComponent } from '../recovery-password/recovery-password.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/utils/custom-validators';
import { PersonComponent } from 'src/app/person/components/person/person.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent   {

  private dto: LoginDto = new LoginDto;
  private token:TokenDto = new TokenDto;

  private accessService:AccessService;

  formLogin: FormGroup;

  constructor(private fb: FormBuilder,accessService:AccessService, public dialog: MatDialog,public dialogRef: MatDialogRef<LoginComponent>){
    this.accessService = accessService;
    this.formLogin = this.fb.group({
      pass: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],

    });
  }


  openRecovery(): void {
    this.dialogRef.close();
    this.dialog.open(RecoveryPasswordComponent, { width: '400px',  });
  }

  openRegister(): void {
    this.dialogRef.close();
    this.dialog.open(PersonComponent, { width: '500px',  });
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

    if (this.formLogin.valid) {

    this.dto.username = this.formLogin.get("username")?.value;
    this.dto.password =  this.formLogin.get("pass")?.value;
    this.accessService.login(this.dto).subscribe({

      next: (response)=>{

        this.token = response;
        console.log(this.token);
      },
      error: (e) => {
        console.log(e)
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Credenciales incorrectas",
          confirmButtonText: "Aceptar",

          showCloseButton: true,
        });
      }
    });
    } else {

      this.markFieldsAsTouched(this.formLogin);
    }
  }


}

