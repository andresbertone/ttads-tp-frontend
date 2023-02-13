import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SpinnerService } from 'src/app/core/services/common/spinner.service';
import { MechanicService } from 'src/app/core/services/mechanic.service';

import { MechanicModel } from 'src/app/core/models/mechanic/mechanic.model';

@Component({
  selector: 'app-mechanic-detail',
  templateUrl: './mechanic-detail.component.html',
  styleUrls: ['./mechanic-detail.component.scss']
})
export class MechanicDetailComponent {

  mechanicId!: string;
  mechanic!: MechanicModel

  constructor(
    private mechanicService: MechanicService,
    private spinnerService: SpinnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mechanicId = this.activatedRoute.snapshot.paramMap.get('mechanicId') as string;
    if (!this.mechanicId) return;

    this.loadMechanic();
  }

  loadMechanic() {
    this.mechanicService.getMechanicById(this.mechanicId)
      .subscribe((mechanic: MechanicModel) => {
        this.mechanic = mechanic;
      });
  }

  isLoading() {
    return this.spinnerService.isLoading();
  }

  editMechanic() {
    this.router.navigateByUrl(`home/mechanics/edit-mechanic/${this.mechanicId}`);
  }

  goBack() {
    this.router.navigateByUrl('home/mechanics');
  }
}
