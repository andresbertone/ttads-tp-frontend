import { Component, OnInit, ViewChild } from '@angular/core';

import { MechanicService } from 'src/app/core/services/mechanic.service';
import { SpinnerService } from 'src/app/core/services/common/spinner.service';
import { DialogService } from 'src/app/core/services/common/dialog.service';
import { AlertService } from 'src/app/core/services/common/alert.service';

import { MechanicsModel } from 'src/app/core/models/mechanic/mechanics.model';
import { MechanicModel } from 'src/app/core/models/mechanic/mechanic.model';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-mechanics',
  templateUrl: './mechanics.component.html',
  styleUrls: ['./mechanics.component.scss']
})
export class MechanicsComponent implements OnInit {

  mechanics!: MatTableDataSource<MechanicModel>;
  totalMechanics: number = 0;

  displayedColumns: string[] = ['RegistrationNumber', 'FirstName', 'LastName', 'Email', 'PhoneNumber', 'Action'];
  paginator!: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(matPaginator: MatPaginator) {
    this.initializePaginator(matPaginator);
  }

  constructor(
    private mechanicService: MechanicService, 
    private spinnerService: SpinnerService,
    private dialogService: DialogService,
    private alertService: AlertService) {
    this.mechanics = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.loadMechanics();
  }

  isLoading() {
    return this.spinnerService.isLoading();
  }

  loadMechanics() {
    this.mechanicService.getMechanics().subscribe((response: MechanicsModel) => {
      this.mechanics.data = response.records;
      this.totalMechanics = response.total;
    });
  }


  initializePaginator(matPaginator: MatPaginator) {
    this.paginator = matPaginator;
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = 'Mechanics per page:';
      this.mechanics.paginator = this.paginator;
    }
  }


  searchMechanic(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.mechanics.filter = filterValue.trim().toLowerCase();

    if (this.mechanics.paginator) {
      this.mechanics.paginator.firstPage();
    }
  }

  deleteMechanic(mechanic: MechanicModel) {
    this.dialogService.showWarning(
      'Delete mechanic',
      `Are you sure you want to delete mechanic ${mechanic.firstName} ${mechanic.lastName}?`,
      'No',
      'Delete',
      true
    ).afterClosed().subscribe((result) => {
      if (result) {
        this.mechanicService.deleteMechanic(mechanic.mechanicId).subscribe(
          (mechanic: MechanicModel) => {
            this.alertService.openSnackBar(`The mechanic ${mechanic.firstName} ${mechanic.lastName} was successfully deleted.`);
            this.loadMechanics();
          }
        );
      }
    });
  }
}
