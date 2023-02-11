import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CustomerService } from 'src/app/core/services/customer.service';
import { SpinnerService } from 'src/app/core/services/common/spinner.service';

import { CustomerModel } from 'src/app/core/models/customer/customer.model';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

  customerId!: string;
  customer!: CustomerModel

  constructor(
    private customerService: CustomerService,
    private spinnerService: SpinnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.customerId = this.activatedRoute.snapshot.paramMap.get('customerId') as string;
    if (!this.customerId) return;

    this.loadCustomer();
  }

  loadCustomer() {
    this.customerService.getCustomerById(this.customerId)
      .subscribe((customer: CustomerModel) => {
        this.customer = customer;
      });
  }

  isLoading() {
    return this.spinnerService.isLoading();
  }

  editCustomer() {
    this.router.navigateByUrl(`home/customers/edit-customer/${this.customerId}`);
  }

  goBack() {
    this.router.navigateByUrl('home/customers');
  }
}
