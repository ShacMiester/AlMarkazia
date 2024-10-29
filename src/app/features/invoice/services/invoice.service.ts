import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
interface Status {
    id: number;
    statusName: string;
}

interface Invoice {
    invoiceNumber: string;
    invoiceSeq: string | null;
    supplierName: string;
    invoiceDate: string;
    currencyId: number;
    exchangeRate: number;
    paymentWayId: number;
    statusId: number;
    amount: number;
    totalAmountJOD: number;
    userId: number;
}
@Injectable({ providedIn: 'root' })
export class CustomerService {


    constructor(private http: HttpClient) { }


    getUsers(): Observable<any> {
        return this.http.get('http://212.35.79.111/api/TaskInvoices/users')
    }


    getTaskInvoices(): Observable<any> {
        return this.http.get('http://212.35.79.111/api/TaskInvoices/invoices')
    }
    searchInvoices(invoiceNumber?: string, supplierName?: string, invoiceSeq?: string): Observable<Invoice[]> {
        let params = new HttpParams();

        if (invoiceNumber) {
            params = params.set('invoiceNumber', invoiceNumber);
        }
        if (supplierName) {
            params = params.set('supplierName', supplierName);
        }
        if (invoiceSeq) {
            params = params.set('invoiceSeq', invoiceSeq);
        }

        return this.http.get<any[]>(`${this.baseUrl}/search-invoices`, { params });
    }
    private baseUrl = 'http://212.35.79.111/api/TaskInvoices';

    getInvoicesWithStatuses(): Observable<{ invoicesWithStatusNames: any[], statuses: any[] }> {
        const invoicesRequest = this.http.get(`${this.baseUrl}/invoices`);
        const statusesRequest = this.http.get(`${this.baseUrl}/statuses`);
        const unknownStatus = { id: 0, statusName: 'Unknown' }; // Ensure the id is unique

        return forkJoin([invoicesRequest, statusesRequest]).pipe(
            map(([invoices, statuses]: [Invoice[], Status[]]) => {
                const invoicesWithStatusNames = invoices.map((invoice: Invoice) => {
                    const status = statuses.find((s: Status) => s.id === invoice.statusId);
                    return {
                        ...invoice,
                        statusName: status ? status.statusName : unknownStatus.statusName
                    };
                });

                return {
                    invoicesWithStatusNames,
                    statuses: [...statuses, unknownStatus]
                };
            })
        );
    }

}
