import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/access/components/login/login.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  constructor(public dialog: MatDialog) {}

  openLogin(): void {
    this.dialog.open(LoginComponent, { width: '400px',  });
  }


}
