import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { CustomerService } from 'src/app/core/services/customer.service';
import { SpinnerService } from 'src/app/core/services/common/spinner.service';
import { DialogService } from 'src/app/core/services/common/dialog.service';
import { AlertService } from 'src/app/core/services/common/alert.service';

import { CustomersModel } from 'src/app/core/models/customer/customers.model';
import { CustomerModel } from 'src/app/core/models/customer/customer.model';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  customers!: MatTableDataSource<CustomerModel>;
  totalCustomers: number = 0;

  displayedColumns: string[] = ['Dni', 'FirstName', 'LastName', 'Email', 'PhoneNumber', 'Action'];
  paginator!: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(matPaginator: MatPaginator) {
    this.initializePaginator(matPaginator);
  }

  constructor(
    private customerService: CustomerService, 
    private spinnerService: SpinnerService,
    private dialogService: DialogService,
    private alertService: AlertService,
    private router: Router) {
    this.customers = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.loadCustomers();
  }

  isLoading() {
    return this.spinnerService.isLoading();
  }

  loadCustomers() {
    this.customerService.getCustomers().subscribe((response: CustomersModel) => {
      this.customers.data = response.records;
      this.totalCustomers = response.total;
    });
  }


  initializePaginator(matPaginator: MatPaginator) {
    this.paginator = matPaginator;
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = 'Customers per page:';
      this.customers.paginator = this.paginator;
    }
  }


  searchCustomer(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.customers.filter = filterValue.trim().toLowerCase();

    if (this.customers.paginator) {
      this.customers.paginator.firstPage();
    }
  }

  goToNewCustomer() {
    this.router.navigateByUrl('home/customers/new-customer');
  }

  deleteCustomer(customer: CustomerModel) {
    this.dialogService.showWarning(
      'Delete customer',
      [this.dialogService.getModalWarningMessage(customer, 'customer', 'delete')],
      'No',
      'Delete',
      true
    ).afterClosed().subscribe((result) => {
      if (result) {
        this.customerService.deleteCustomer(customer.customerId).subscribe(
          (customer: CustomerModel) => {
            this.alertService.openSnackBar(`The customer ${customer.firstName} ${customer.lastName} was successfully deleted.`);
            this.loadCustomers();
          }
        );
      }
    });
  }
}
