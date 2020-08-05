import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Educational-Reward-System';

  public items = [
    {fillStyle : '#eae56f', text : 'Prize 1'},
    {fillStyle : '#89f26e', text : 'Prize 2'},
    {fillStyle : '#7de6ef', text : 'Prize 3'},
    {fillStyle : '#e7706f', text : 'Prize 4'}
  ];

}
