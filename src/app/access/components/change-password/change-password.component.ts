import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(){}
  ngOnInit(): void {
    console.log("fsfs")
 ;
    console.log("dkj")
  }


}
