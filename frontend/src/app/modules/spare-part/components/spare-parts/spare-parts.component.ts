import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { SparePartService } from 'src/app/core/services/spare-part.service';
import { SpinnerService } from 'src/app/core/services/common/spinner.service';
import { DialogService } from 'src/app/core/services/common/dialog.service';
import { AlertService } from 'src/app/core/services/common/alert.service';

import { SparePartsModel } from 'src/app/core/models/spare-part/spare-parts.model';
import { SparePartModel } from 'src/app/core/models/spare-part/spare-part.model';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-spare-parts',
  templateUrl: './spare-parts.component.html',
  styleUrls: ['./spare-parts.component.scss']
})
export class SparePartsComponent implements OnInit {

  spareParts!: MatTableDataSource<SparePartModel>;

  displayedColumns: string[] = ['SparePartCode', 'SparePartDescription', 'SparePartPrice', 'Stock', 'SparePartSupplier', 'Action'];
  paginator!: MatPaginator;

  LOW_STOCK: number = 5;

  @ViewChild(MatPaginator) set matPaginator(matPaginator: MatPaginator) {
    this.initializePaginator(matPaginator);
  }

  constructor(
    private sparePartService: SparePartService, 
    private spinnerService: SpinnerService,
    private dialogService: DialogService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.spareParts = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.loadSpareParts();
  }

  isLoading() {
    return this.spinnerService.isLoading();
  }

  loadSpareParts() {
    this.sparePartService.getSpareParts().subscribe((response: SparePartsModel) => {
      this.spareParts.data = response.records;
    });
  }


  initializePaginator(matPaginator: MatPaginator) {
    this.paginator = matPaginator;
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = 'Spare parts per page:';
      this.spareParts.paginator = this.paginator;
    }
  }


  searchSparePart(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.spareParts.filter = filterValue.trim().toLowerCase();

    if (this.spareParts.paginator) {
      this.spareParts.paginator.firstPage();
    }
  }

  isLowStock(sparePartStock: number) {
    return sparePartStock <= this.LOW_STOCK;
  }

  newSparePart() {
    this.router.navigateByUrl('home/spare-parts/new-spare-part');
  }

  editSparePart(sparePart: SparePartModel) {
    this.router.navigateByUrl(`home/spare-parts/edit-spare-part/${sparePart.sparePartId}`);
  }

  seeSparePartDetail(sparePart: SparePartModel) {
    this.router.navigateByUrl(`home/spare-parts/detail/${sparePart.sparePartId}`);
  }

  deleteSparePart(sparePart: SparePartModel) {
    this.dialogService.showWarning(
      'Delete spare part',
      [this.dialogService.getDialogWarningMessage(sparePart, 'spare part', 'delete')],
      'No',
      'Delete',
      true
    ).afterClosed().subscribe((result) => {
      if (result) {
        this.sparePartService.deleteSparePart(sparePart.sparePartId).subscribe(
          (sparePart: SparePartModel) => {
            this.alertService.openSnackBar(`The spare part "${sparePart.sparePartDescription}" was successfully deleted.`);
            this.loadSpareParts();
          }
        );
      }
    });
  }
}
