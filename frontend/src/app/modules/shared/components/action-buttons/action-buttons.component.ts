import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent {

  @Output() cancelFunction = new EventEmitter(); 

  cancel() {
    this.cancelFunction.emit();
  }

}
