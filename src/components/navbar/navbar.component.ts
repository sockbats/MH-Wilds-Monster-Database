import { Component } from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";

@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbar,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
