import {Component, ViewChild, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('fileBrowser', {static: false}) fileBrowser;

  public title = 'Educational-Reward-System';
  public studentData = [];

  public items = [
    {fillStyle : '#eae56f', text : 'Prize 1'},
    {fillStyle : '#89f26e', text : 'Prize 2'},
    {fillStyle : '#7de6ef', text : 'Prize 3'},
    {fillStyle : '#e7706f', text : 'Prize 4'}
  ];

  constructor() {}

  /* Runs when user selects file for student data */
  public fileSelected(studentFile) {
    // Initialize a new file reader
    const reader: FileReader = new FileReader();
    // Get the content of the file
    reader.readAsText(studentFile);
    // When reader is finished loading
    reader.onload = ((e: any) => {
      // Split the data up into rows
      const studentData = e.target.result.split('\n');
      // Delete the first row (It's just the column names)
      studentData.splice(0, 1);
      const formattedData = [];
      studentData.forEach(student => {
        const splitLine = student.split(',');
        formattedData.push({name: splitLine[0], stars: splitLine[1], rewards: splitLine[2]});
      })
      this.studentData = formattedData;
    });
  }

  public starToggled(index, student) {
    console.log(index, student);
  }

  ngOnInit() {
  }

}
