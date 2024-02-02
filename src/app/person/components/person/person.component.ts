
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomValidators } from 'src/app/utils/custom-validators';
import { GeneralService } from 'src/app/general/service/general.service';
import { DocumentTypeDto } from 'src/app/general/dto/response/document-type-dto';
import Swal from 'sweetalert2';
import { DepartmentResponseDto } from 'src/app/general/dto/response/department-response-dto';
import { MunicipalityResponseDto } from 'src/app/general/dto/response/municipality-response-dto';
import { PersonService } from '../../service/person.service';
import { PersonRequestDto } from '../../dto/request/person-request-dto';
import { UserRequestDto } from 'src/app/access/dto/request/user-request-dto';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [CommonModule, FormsModule,MatIconModule,ReactiveFormsModule ],
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements  OnInit {
  formRegister: FormGroup;
  msg = "El campo es requerido";

  extractedErrorMessage: string = '';

  private generalService:GeneralService;

  private personService:PersonService;

  public  listdocumentTypeDto: DocumentTypeDto [] = [];

  public departmentResponseDto:DepartmentResponseDto [] = [];

  public municipalityList: MunicipalityResponseDto[] = [];

  private personRequestDto: PersonRequestDto = new PersonRequestDto;
  private  userRequestDto: UserRequestDto = new UserRequestDto;



  constructor(private fb: FormBuilder,generalService:GeneralService,personService:PersonService){
    this.generalService = generalService;
    this.personService = personService;
    this.formRegister = this.fb.group({
      documentType: ['', [ CustomValidators.spaceValidator]],
      document: ['',  [ CustomValidators.spaceValidator]],
      department: ['',  [ CustomValidators.spaceValidator]],
      municipality: ['', [ CustomValidators.spaceValidator]],
      name: ['', [ CustomValidators.spaceValidator]],
      lastname: ['', [ CustomValidators.spaceValidator]],
      phone: ['',  [ CustomValidators.spaceValidator]],
      email: ['', [CustomValidators.spaceValidator, Validators.email]],
      password: ['', [ CustomValidators.spaceValidator]],
      passwordConfirm: ['',  [ CustomValidators.spaceValidator]],

    });
  }
  ngOnInit(): void {
    this.getListDocumentType();
    this.getListDepartment();
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
    this.userRequestDto.rolUser = 1;
    this.userRequestDto.email =  this.formRegister.get("email")?.value;
    this.userRequestDto.password = this.formRegister.get("password")?.value;
    this.userRequestDto.passwordConfirm = this.formRegister.get("passwordConfirm")?.value;
    this.personRequestDto.userRequestDto = this.userRequestDto;
    this.personRequestDto.name = this.formRegister.get("name")?.value;
    this.personRequestDto.lastName = this.formRegister.get("lastname")?.value;
    this.personRequestDto.documentTypeId = this.formRegister.get("documentType")?.value;
    this.personRequestDto.nroDni = this.formRegister.get("document")?.value;
    this.personRequestDto.municipalityId = this.formRegister.get("municipality")?.value;
    this.personRequestDto.phoneNumber = this.formRegister.get("phone")?.value;


    if (this.formRegister.valid) {
      this.personService.registerPerson(this.personRequestDto).subscribe({
        next:(data)=>{
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: "Usted sea registrado con éxito, le hemos enviado un mensaje de confirmación a  su correo electrónico",
          });
        },
        error: (e)=>{


          let parts = e.error.split(':');
          this.extractedErrorMessage = parts[1] ? parts[1].trim() : '';
          Swal.fire({
            title: "Error",
            icon: "error",
            text:  this.extractedErrorMessage,

            confirmButtonText: "Aceptar",

            showCloseButton: true,
          });
        }

      })

    } else {

      this.markFieldsAsTouched(this.formRegister);
    }
  }


getListDocumentType(){

  this.generalService.getListDocumentType().subscribe({
    next:(data)=>{
      this.listdocumentTypeDto = data;

    },
    error:(e)=>{
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Error en obtener el listado de tipos de documentos",
        confirmButtonText: "Aceptar",

        showCloseButton: true,
      });
    }
  })

}



getListDepartment(){

  this.generalService.getListDepartment().subscribe({
    next:(data)=>{
      this.departmentResponseDto = data;

    },
    error:(e)=>{
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Error en obtener el listado  de departamentos",
        confirmButtonText: "Aceptar",

        showCloseButton: true,
      });
    }
  })

}


getMunicipalityList(departmentId: number){

  this.generalService.getMunicipalityList(departmentId).subscribe({
    next:(data)=>{
      this.municipalityList = data;

    },
    error:(e)=>{
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Error en obtener el listado  de municipios",
        confirmButtonText: "Aceptar",

        showCloseButton: true,
      });
    }
  })

}

handleDeparmetChange(event: any): void {
  const departmentId: number = event.target.value;
  this.getMunicipalityList(departmentId);
}

}
