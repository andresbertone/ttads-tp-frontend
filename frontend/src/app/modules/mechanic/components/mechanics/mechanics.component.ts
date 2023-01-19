import { Component, OnInit, ViewChild } from '@angular/core';

import { MechanicService } from 'src/app/core/services/mechanic.service';

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

  constructor(private mechanicService: MechanicService) {
    this.mechanics = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.loadMechanics();
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
}
