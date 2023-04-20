import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';

import { RepairService } from 'src/app/core/services/repair.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import { VehicleService } from 'src/app/core/services/vehicle.service';
import { SparePartService } from 'src/app/core/services/spare-part.service';
import { FormValidationService } from 'src/app/core/services/common/form-validation.service';
import { DialogService } from 'src/app/core/services/common/dialog.service';
import { AlertService } from 'src/app/core/services/common/alert.service';

import { RepairModel } from 'src/app/core/models/repair/repair.model';
import { CustomerModel } from 'src/app/core/models/customer/customer.model';
import { CustomersModel } from 'src/app/core/models/customer/customers.model';
import { VehicleModel } from 'src/app/core/models/vehicle/vehicle.model';
import { VehiclesModel } from 'src/app/core/models/vehicle/vehicles.model';
import { Strategy } from 'src/app/core/strategies/strategy';
import { NewRepairStrategy } from 'src/app/core/strategies/repair/new-repair-strategy';
import { EditRepairStrategy } from 'src/app/core/strategies/repair/edit-repair-strategy';
import { RepairSettings } from 'src/app/core/utils/repairSettings';
import { MechanicModel } from 'src/app/core/models/mechanic/mechanic.model';
import { SparePartModel } from 'src/app/core/models/spare-part/spare-part.model';
import { SparePartsModel } from 'src/app/core/models/spare-part/spare-parts.model';
import { CustomValidations } from 'src/app/core/custom-validations/custom-validations';

@Component({
  selector: 'app-new-repair',
  templateUrl: './new-repair.component.html',
  styleUrls: ['./new-repair.component.scss']
})
export class NewRepairComponent implements OnInit {
  
  repairId! : string;
  repairStrategy! : Strategy;
  repairSettings = RepairSettings;
  
  customers: CustomerModel[] = [];
  filteredCustomers!: Observable<CustomerModel[]>;
  
  spareParts: SparePartModel[] = [];
  filteredSpareParts!: Observable<SparePartModel[]>;
  
  vehicles: VehicleModel[] = [];

  displayedColumns: string[] = ['Description', 'Quantity', 'Action'];
  insufficientStock: boolean = false;
  isPanelExpanded: boolean = false;

  @ViewChild('formDirective') formDirective!: NgForm;
  
  repairForm = this.formBuilder.group({
    entryDateTime: new FormControl<string | null>(null),
    startDateTime: new FormControl<string | null>(null),
    endDateTime: new FormControl<string | null>(null),
    deliveryDateTime: new FormControl<string | null>(null),
    status: new FormControl<string | null>(null),
    initialDetail: new FormControl<string | null>(null),
    comments: new FormControl<string | null>(null),
    finalDescription: new FormControl<string | null>(null),
    laborPrice: new FormControl<string | null>(null, [Validators.pattern(/^[0-9]+([.][0-9]+)?$/), Validators.min(-1)]),
    vehicle: new FormControl<string | VehicleModel>('', [Validators.required]),
    vehicleId: [''],
    mechanic: new FormControl<string | MechanicModel>(''),
    mechanicId: new FormControl(),
    spare_parts: new FormControl<SparePartModel[]>([]),
    customer: new FormControl<string | CustomerModel>('', [Validators.required]),
    customerId: new FormControl()
  });
  
  addSparePartForm = this.formBuilder.group({
    sparePart: new FormControl<string | SparePartModel>('', Validators.required),
    quantity: new FormControl<number | null>(null, [Validators.required, CustomValidations.isNumber, Validators.min(1)])
  });


  constructor(
    private formBuilder: FormBuilder, 
    private repairService: RepairService,
    private customerService: CustomerService,
    private vehicleService: VehicleService,
    private sparePartService: SparePartService,
    private formValidationService: FormValidationService,
    private dialogService: DialogService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.repairId = this.activatedRoute.snapshot.paramMap.get('repairId') as string;

    if (this.repairId) {
      this.repairStrategy = new EditRepairStrategy(this.repairService, this.dialogService, this.alertService);
      this.getRepair();
    } else {
      this.repairStrategy = new NewRepairStrategy(this.repairService, this.dialogService, this.alertService);
      this.repairForm.get('vehicle')?.disable();
      this.getCustomers();
    }
  }

  getRepair() {
    this.repairService.getRepairById(this.repairId).subscribe(
      (repair: RepairModel) => {
        this.initializeRepairFormForEdit(repair);
      }
    );
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe((response: CustomersModel) => {
      this.customers = response.records;
      this.filteredCustomers = this.getFilteredCustomers();
    });
  }

  getSpareParts() {
    this.sparePartService.getSpareParts().subscribe((response: SparePartsModel) => {
      this.isPanelExpanded = true;
      this.spareParts = response.records;
      this.filteredSpareParts = this.getFilteredSpareParts();
    });
  }

  getVehiclesFromCustomer() {
    const customerId = (this.repairForm.value.customer as CustomerModel).customerId;
    this.vehicleService.getVehiclesFromCustomer(customerId).subscribe(
      (response: VehiclesModel) => {
        this.vehicles = response.records;
        this.repairForm.controls.vehicle.reset();
        this.repairForm.get('vehicle')?.enable();
      }
    );
  }

  initializeRepairFormForEdit(repair: RepairModel) {
    this.repairForm.patchValue(repair);

    const vehicle = `${repair.vehicle.make} ${repair.vehicle.model}`;
    this.repairForm.controls.vehicle.setValue(vehicle);
    this.repairForm.controls.customer.setValue(repair.vehicle.customer);
    this.repairForm.controls.spare_parts.setValue(repair.spare_parts);

    this.repairForm.get('vehicle')?.disable();
    this.repairForm.get('customer')?.disable();
  }

  removeSparePart(sparePartToDelete : SparePartModel) {
    const usedSpareParts = this.repairForm.controls.spare_parts.value!;
    const newSpareParts = usedSpareParts.filter(usedSparePart => usedSparePart.sparePartId !== sparePartToDelete.sparePartId);
    const quantityToRemove = sparePartToDelete.repair_spare.numberOfSpareParts;
    this.updateStock(sparePartToDelete, quantityToRemove, false);
    this.repairForm.controls.spare_parts.setValue(newSpareParts);
  }

  addOrAttachSparePart() {
    if (!this.addSparePartForm.valid) return;

    if (typeof this.addSparePartForm.value.sparePart !== 'string') {
      const newSparePart = this.addSparePartForm.controls.sparePart.value as SparePartModel;
      const actualSpareParts = this.repairForm.controls.spare_parts.value as SparePartModel[];

      const duplicatedSparePart = this.checkForDuplicateSpareParts(newSparePart, actualSpareParts);
      
      if (duplicatedSparePart) {
        this.attachSparePart(duplicatedSparePart);
      } else {
        this.addSparePart(newSparePart);
      }

      if (!this.insufficientStock) this.resetAddSparePartForm();
    } else {
      return this.addSparePartForm.controls.sparePart.setErrors({ 'invalidSparePartSelection': true });
    }
  }

  attachSparePart(duplicatedSparePart: SparePartModel) {
    const quantity = this.addSparePartForm.controls.quantity.value!;
    const isStockAvailable = this.checkStock(duplicatedSparePart, quantity);
    if (isStockAvailable) {
      this.editSparePart(duplicatedSparePart, quantity);
      this.insufficientStock = false;
    } else {
      this.insufficientStock = true;
      this.addSparePartForm.controls.quantity.setErrors({ 'insufficientStock': true });
    }
  }

  editSparePart(duplicatedSparePart: SparePartModel, quantity: number) {
    duplicatedSparePart.repair_spare.numberOfSpareParts += quantity;
    this.updateStock(duplicatedSparePart, quantity, true);
  }

  addSparePart(newSparePart: SparePartModel) {
    const quantity = this.addSparePartForm.controls.quantity.value!;
    const isStockAvailable = this.checkStock(newSparePart, quantity);
    if (isStockAvailable) {
      this.setRepairSpareToNewSparePart(newSparePart);
      this.updateStock(newSparePart, quantity, true);
      const usedSpareParts = this.repairForm.controls.spare_parts.value!;
      this.repairForm.controls.spare_parts.setValue([...usedSpareParts, newSparePart]);
      this.insufficientStock = false;
    } else {
      this.insufficientStock = true;
      this.addSparePartForm.controls.quantity.setErrors({ 'insufficientStock': true });
    }
  }

  setRepairSpareToNewSparePart(newSparePart: SparePartModel) {
    const quantity = this.addSparePartForm.controls.quantity.value!;
    const repair_spare = {
      repairId: this.repairId,
      sparePartId: newSparePart.sparePartId,
      numberOfSpareParts: quantity
    };
    newSparePart.repair_spare = repair_spare;
  }

  checkForDuplicateSpareParts(newSparePart: SparePartModel, actualSpareParts: SparePartModel[]) {
    const newSparePartId = newSparePart.sparePartId;
    const duplicatedSparePart = actualSpareParts.find(sparePart => sparePart.sparePartId === newSparePartId);
    return duplicatedSparePart;
  }

  checkStock(sparePart: SparePartModel, quantity: number): boolean {
    return sparePart.stock >= quantity;
  }

  updateStock(sparePartToEdit: SparePartModel, quantity: number, isAddingSparePart: boolean) {
    const sparePart = this.spareParts.find(sparePart => sparePart.sparePartId === sparePartToEdit.sparePartId);
    if (!sparePart) return;
    if (isAddingSparePart) {
      sparePart.stock = sparePart.stock - quantity;
    } else {
      sparePart.stock += quantity;
    }
  }

  onSubmit() {
    if (!this.repairForm.valid) return;

    if (typeof this.repairForm.value.customer !== 'string') {
      const dialogRef$ = this.repairStrategy.getDialogRef(this.repairForm.value);
    
      dialogRef$.subscribe((result) => {
        if (!result) return;

        if (!this.isEditing()) {
          this.repairForm.controls.vehicleId.setValue((this.repairForm.value.vehicle as VehicleModel).vehicleId)
          this.repairForm.controls.customerId.setValue((this.repairForm.value.customer as CustomerModel).customerId);
        }

        this.repairStrategy.sendRequest(this.repairForm.value, this.repairId)
          .subscribe((repair: RepairModel) => {
              this.repairStrategy.showSnackBarMessage(repair);
              this.router.navigate([this.repairStrategy.route]);
            }
          )
      })
    } else {
      return this.repairForm.controls.customer.setErrors({ 'invalidCustomerSelection': true });
    }
  };

  cancel() {
    if (!this.repairForm.pristine) {
      this.dialogService.showWarning(
        'Cancel operation',
        [this.dialogService.getDialogWarningMessage()],
        'No',
        'Yes',
        true
      ).afterClosed().subscribe((result) => {
        if (result) {
          this.router.navigate([this.repairStrategy.route]);
        }
      });
    } else {
      this.router.navigate([this.repairStrategy.route]);
    }
  }

  getFilteredCustomers(): Observable<CustomerModel[]> {
    return this.repairForm.get('customer')!.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : `${value?.firstName} ${value?.lastName}`;
        
        return name ? this.filterCustomers(name as string) : this.customers.slice();
      })
    );
  }
  
  filterCustomers(name: string): CustomerModel[] {
    const filterValue = name.toLowerCase();
    
    return this.customers.filter(
      customer => customer.firstName.toLowerCase().includes(filterValue) || 
      customer.lastName.toLowerCase().includes(filterValue)
    );
  }

  displayCustomerFn(customer: CustomerModel): string {
    return customer ? `${customer.firstName} ${customer.lastName}` : '';
  }

  getFilteredSpareParts(): Observable<SparePartModel[]> {
    return this.addSparePartForm.get('sparePart')!.valueChanges.pipe(
      startWith(''),
      map(value => {
        const description = typeof value === 'string' ? value : value?.sparePartDescription;
        
        return description ? this.filterSpareParts(description as string) : this.spareParts.slice();
      })
    );
  }
  
  filterSpareParts(description: string): SparePartModel[] {
    const filterValue = description.toLowerCase();

    return this.spareParts.filter(
      sparePart => sparePart.sparePartDescription.toLowerCase().includes(filterValue)
    );
  }

  displaySparePartFn(sparePart: SparePartModel): string {
    return sparePart ? `${sparePart.sparePartDescription}` : '';
  }

  getMechanicName() {
    const mechanic = this.repairForm.controls.mechanic.value as MechanicModel;
    return `${mechanic.firstName} ${mechanic.lastName}`;
  }

  getAccordionDescription() {
    if (this.repairForm.controls.spare_parts.value?.length === 0) {
      return 'There are no used spare parts yet.';
    } else if (this.repairForm.controls.spare_parts.value?.length === 1) {
      return `There is ${this.repairForm.controls.spare_parts.value.length} spare part.`;
    } else {
      return `There are ${this.repairForm.controls.spare_parts.value?.length} spare parts.`;
    }
  }

  resetAddSparePartForm() {
    this.formDirective.resetForm();
  }

  disableTooltip() {
    return this.isEditing() || this.repairForm.controls.vehicle.enabled;
  }

  isEditing() {
    return this.repairStrategy instanceof EditRepairStrategy;
  }

  isRepairInProgress() {
    return this.repairForm.controls.status.value === this.repairSettings.IN_PROGRESS_REPAIR;
  }

  isFieldValid(form: any, field: string) {
    return this.formValidationService.isFieldValid(form, field);
  }

  getFieldHint() {
    if (!this.addSparePartForm.controls.sparePart.value || 
        typeof this.addSparePartForm.controls.sparePart.value === 'string') return;
    return `Available stock: ${this.getAvailableStock()}`;
  }

  getAvailableStock() {
    const selectedSparePart = this.addSparePartForm.controls.sparePart.value as SparePartModel;
    return selectedSparePart.stock;
  }

  getFieldErrorMessage(form: any, field: string) {
    return this.formValidationService.getFieldErrorMessage(form, field);
  }
}