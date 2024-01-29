
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomValidators } from 'src/app/utils/custom-validators';
@Component({
  selector: 'app-person',
  standalone: true,
  imports: [CommonModule, FormsModule,MatIconModule,ReactiveFormsModule ],
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent {
  formRegister: FormGroup;
  msg = "El campo es requerido";


  constructor(private fb: FormBuilder){
    this.formRegister = this.fb.group({
      documentType: ['', [ CustomValidators.spaceValidator]],
      document: ['',  [ CustomValidators.spaceValidator]],
      department: ['',  [ CustomValidators.spaceValidator]],
      municipality: ['', [ CustomValidators.spaceValidator]],
      name: ['', [ CustomValidators.spaceValidator]],
      lasname: ['', [ CustomValidators.spaceValidator]],
      phone: ['',  [ CustomValidators.spaceValidator]],
      email: ['', [CustomValidators.spaceValidator, Validators.email]],
      password: ['', [ CustomValidators.spaceValidator]],
      passwordConfirm: ['',  [ CustomValidators.spaceValidator]],

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

    if (this.formRegister.valid) {
      console.log("todo correcto")

    } else {

      this.markFieldsAsTouched(this.formRegister);
    }
  }



}
