import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'invoices', pathMatch: 'full' },
    {
        path: 'invoices',
        loadComponent: () => import('./features/invoice/invoice.component').then(m => m.InvoiceComponent),

    },
    {
        path: 'add-invoice',
        loadComponent: () => import('./features/invoice/add-new/add-new.component').then(m => m.AddInvoiceComponent),
    }
];
