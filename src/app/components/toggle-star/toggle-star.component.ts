import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle-star',
  templateUrl: './toggle-star.component.html',
  styleUrls: ['./toggle-star.component.scss']
})
export class ToggleStarComponent implements OnInit {

  @Input() toggled: boolean;
  @Output() toggleChanged = new EventEmitter<boolean>();

  constructor() { }

  toggleStar(newValue: boolean) {
    this.toggled = newValue;
    this.toggleChanged.emit(newValue);
  }

  ngOnInit() {
  }

}
