import { Component } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from '@angular/router';
@Component({
  selector: 'almarkazia-navbar',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
