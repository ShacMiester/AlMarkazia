import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { SidebarComponent } from "../shared/components/sidebar/sidebar.component";
import { LayoutComponent } from "../shared/components/layout/layout.component";

@Component({
  selector: 'almarkazia-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidebarComponent, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AlMarkazia';
}
