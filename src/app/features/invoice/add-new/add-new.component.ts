import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'AlMarkazia-add-invoice',
  standalone: true,
  imports: [DropdownModule, FormsModule, InputTextModule, CalendarModule, InputTextareaModule],
  templateUrl: './add-new.component.html',
  styleUrl: './add-new.component.scss'
})
export class AddInvoiceComponent {
  cities: any[];

  selectedCity: any;

  constructor() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }
}
