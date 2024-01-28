import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent   {

  constructor(){}


  username: string = '';
  password: string = '';

  login() {
    // Aquí puedes agregar la lógica para manejar el inicio de sesión
    console.log('Usuario:', this.username);
    console.log('Contraseña:', this.password);
    // Puedes llamar a tu servicio de autenticación o realizar otras acciones según tus necesidades
  }


}
