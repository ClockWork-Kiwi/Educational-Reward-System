import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle-star',
  templateUrl: './toggle-star.component.html',
  styleUrls: ['./toggle-star.component.scss']
})
export class ToggleStarComponent implements OnInit {

  @Input() toggled: boolean;
  @Input() toggleable: boolean
  @Input() untoggleable: boolean
  @Output() toggleChanged = new EventEmitter<boolean>();

  constructor() { }

  toggleStar(newValue: boolean) {
    if ( (newValue === false && this.untoggleable) || (newValue === true && this.toggleable) ) {
      this.toggled = newValue;
      this.toggleChanged.emit(newValue);
    }
  }

  ngOnInit() {
  }

}
