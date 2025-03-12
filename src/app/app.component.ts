import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component'
import {MonsterDataComponent} from "../components/monster-data/monster-data.component";
import {FooterComponent} from "../components/footer/footer.component";

@Component({
  selector: 'app-root',
    imports: [RouterOutlet, NavbarComponent, MonsterDataComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MH-Wilds-Monster-Database';
}
