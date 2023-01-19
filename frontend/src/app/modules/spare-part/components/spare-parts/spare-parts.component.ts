import { Component, OnInit, ViewChild } from '@angular/core';

import { SparePartService } from 'src/app/core/services/spare-part.service';

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
  totalSpareParts: number = 0;

  displayedColumns: string[] = ['SparePartCode', 'SparePartDescription', 'SparePartPrice', 'Stock', 'SparePartSupplier', 'Action'];
  paginator!: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(matPaginator: MatPaginator) {
    this.initializePaginator(matPaginator);
  }

  constructor(private sparePartService: SparePartService) {
    this.spareParts = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.loadSpareParts();
  }


  loadSpareParts() {
    this.sparePartService.getSpareParts().subscribe((response: SparePartsModel) => {
      this.spareParts.data = response.records;
      this.totalSpareParts = response.total;
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
    return sparePartStock <= 5;
  }
}
