import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Observable, map, startWith } from 'rxjs';

import { MechanicService } from 'src/app/core/services/mechanic.service';
import { FormValidationService } from 'src/app/core/services/common/form-validation.service';

import { MechanicModel } from 'src/app/core/models/mechanic/mechanic.model';
import { MechanicsModel } from 'src/app/core/models/mechanic/mechanics.model';

@Component({
  selector: 'app-search-repair',
  templateUrl: './search-repair.component.html',
  styleUrls: ['./search-repair.component.scss']
})
export class SearchRepairComponent implements OnInit {
  
  @Output() searchRepairsEvent = new EventEmitter<any>();

  statusList: string[] = ['In progress', 'Entered', 'Completed', 'Delivered'];
  mechanics: MechanicModel[] = [];
  filteredMechanics!: Observable<MechanicModel[]>;

  searchRepairsForm = new FormGroup({
    status: new FormControl(''),
    mechanic: new FormControl<string | MechanicModel>('')
  });


  constructor( 
    private mechanicService: MechanicService,
    private formValidationService: FormValidationService
  ) { }

  ngOnInit(): void {
    this.loadMechanics();
  }

  loadMechanics() {
    this.mechanicService.getMechanics().subscribe((response: MechanicsModel) => {
      this.mechanics = response.records;
      this.filteredMechanics = this.getFilteredMechanics();
    });
  }

  searchRepairs() {
    const filters: any = { 
      status: this.searchRepairsForm.value.status
    };

    if (this.searchRepairsForm.value.mechanic) {
      if (typeof this.searchRepairsForm.value.mechanic !== 'string') {
        filters.mechanicId = this.searchRepairsForm.value.mechanic?.mechanicId;
      } else {
        return this.searchRepairsForm.controls.mechanic.setErrors({ 'invalidMechanicSelection': true });
      }
    }

    return this.searchRepairsEvent.emit(filters);
  }

  getFilteredMechanics(): Observable<MechanicModel[]> {
    return this.searchRepairsForm.get('mechanic')!.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : `${value?.firstName} ${value?.lastName}`;
        
        return name ? this.filterMechanics(name as string) : this.mechanics.slice();
      }),
    );
  }
  
  filterMechanics(name: string): MechanicModel[] {
    const filterValue = name.toLowerCase();
    return this.mechanics.filter(
      mechanic => mechanic.firstName.toLowerCase().includes(filterValue) || 
      mechanic.lastName.toLowerCase().includes(filterValue)
    );
  }

  displayFn(mechanic: MechanicModel): string {
    return mechanic ? `${mechanic.firstName} ${mechanic.lastName}` : '';
  }

  isFieldValid(field: string) {
    return this.formValidationService.isFieldValid(this.searchRepairsForm, field);
  }

  getFieldErrorMessage(field: string) {
    return this.formValidationService.getFieldErrorMessage(this.searchRepairsForm, field);
  }

  clearInput() {
    this.searchRepairsForm.controls.mechanic.reset();
  }
}
