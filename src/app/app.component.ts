import {Component, ViewChild, OnInit, AfterViewInit} from '@angular/core';
import { NgxWheelComponent } from 'ngx-wheel';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('fileBrowser', {static: false}) fileBrowser;
  @ViewChild(NgxWheelComponent, {static: false}) wheel;

  public title = 'Educational-Reward-System';
  public studentData = [];
  public fileName;

  public items = [
    {fillStyle : '#eae56f', text : 'Prize 1'},
    {fillStyle : '#89f26e', text : 'Prize 2'},
    {fillStyle : '#7de6ef', text : 'Prize 3'},
    {fillStyle : '#e7706f', text : 'Prize 4'}
  ];

  constructor() {}

  /* Runs when user selects file for student data */
  public fileSelected(studentFile) {
    this.fileName = studentFile.name;
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

  /* Runs when user decides to save current data back to the file it was read from */ 
  public saveData() {
    // Create the string to save with the column headers already inserted
    let writeData = 'Name,Stars,Rewards\r\n';
    // For each student
    this.studentData.forEach(student => {
      // Create a formatted string for the current student
      const studentRow = student.name + ',' + student.stars + ',' + student.rewards + '\n';
      // Append the formatted student row onto the write data
      writeData += studentRow;
    });
    // Split the write data back up into rows
    const splitWrite = writeData.split('\n');
    // Delete the last (empty) row
    splitWrite.splice(splitWrite.length - 1, 1);
    // Re-join the split data
    writeData = splitWrite.join('\n');
    // Create an object to save with containing the write data
    const saveObject = new Blob([writeData], {type: 'text/csv' });
    // Save using the original file's name (Since we can't overwrite I'm thinking we add date to the end of the file name)
    saveAs(saveObject, this.fileName);
  }

  /* Runs when a student has a star added or removed */
  public starToggled(index, student, toggled) {
    // Get the new total of stars using the index of the togged star (not a perfect solution but it works for now)
    const newTotal = toggled ? index + 1 : index;
    // Find the student's data row in the studentData object
    const targetStudent = this.studentData.find(currentStudent => currentStudent.name === student.name);
    // If a student was found
    if (!!targetStudent) {
      // Set the new total of stars
      targetStudent.stars = newTotal;
    }
  }

  public spinWheel() {
    this.wheel.reset();
    this.wheel.spin();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.wheel.spin();
  }

}
