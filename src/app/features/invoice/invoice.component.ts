import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Table, TableModule } from 'primeng/table';
import { CustomerService } from './services/invoice.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule } from 'primeng/calendar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'almarkazia-invoice',
  standalone: true,
  imports: [MatIconModule, RouterModule, TableModule, CalendarModule, DropdownModule, FormsModule, ReactiveFormsModule, CommonModule, TagModule, IconFieldModule, InputIconModule, InputTextModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss',
  providers: [CustomerService, HttpClientModule]
})
export class InvoiceComponent implements OnInit {
  showAdvancedFilters: boolean = false;

  selectedDate: Date;

  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];
  selectedRows: any[] = [];
  invoices: any[] = [];
  selectedStatusId: null;
  users: any[] = [];
  invoiceSeq: string = '';
  constructor(private customerService: CustomerService) { }


  selectedInvoices: any[] = [];
  invoicesWithStatusNames: any[] = [];
  ngOnInit() {

    this.customerService.getUsers().subscribe(users => {
      this.users = users;
    })
    this.customerService.getInvoicesWithStatuses().subscribe(
      data => {
        this.loading = false;
        this.invoices = data.invoicesWithStatusNames;
        this.statuses = data.statuses;
        this.invoices.forEach(invoice => invoice.invoiceDate = new Date(invoice.invoiceDate));
      },
      error => {
        console.error('Error fetching invoices and statuses:', error);
      }
    );
  }
  searchInvoices(invoiceNumber: string, supplierName?: string, invoiceSeq: string = this.invoiceSeq,): void {
    this.customerService.searchInvoices(invoiceNumber, supplierName, invoiceSeq)
      .subscribe(
        data => {
          this.invoices = data;
        },
        error => {
          console.error('Error fetching invoices', error);
        }
      );
  }
  toggleAdvancedFilter() {
    this.showAdvancedFilters = !this.showAdvancedFilters;
  }
  clear(table: Table) {
    table.clear();
    this.selectedStatusId = null;
  }

  getSeverity(status: string): any {
    switch (status) {
      case 'Created':
        return 'success';
      case 'Draft':
        return 'info';
      case 'Unknown':
        return 'warning';
    }
  }
}