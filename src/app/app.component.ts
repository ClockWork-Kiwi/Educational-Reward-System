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
  public randomID = Math.round(Math.random() * 20);
  public font = 'Alatsi'
  public fileName;
  public wheelSize = window.innerWidth * 0.4;
  public wheelTextSize = window.innerWidth * 0.0175;
  public starTilt = 0;
  public tiltDirection = 'clockwise';

  public items = [
    {fillStyle : '#ff000c', text : 'Add to Drawing', id: 1, textFontFamily: this.font, textFontSize: this.wheelTextSize}, // RED
    {fillStyle : '#e46c1b', text : 'Funny Picture', id: 2, textFontFamily: this.font, textFontSize: this.wheelTextSize}, // ORANGE
    {fillStyle : '#fff600', text : 'Choose a Game', id: 3, textFontFamily: this.font, textFontSize: this.wheelTextSize}, // YELLOW
    {fillStyle : '#19e622', text : 'Be the teacher', id: 4, textFontFamily: this.font, textFontSize: this.wheelTextSize}, // GREEN
    {fillStyle : '#00b2ff', text : 'Change name', id: 5, textFontFamily: this.font, textFontSize: this.wheelTextSize}, // LIGHT BLUE
    {fillStyle : '#7538c7', text : 'Dance Party', id: 6, textFontFamily: this.font, textFontSize: this.wheelTextSize}, // PURPLE
    {fillStyle : '#f00fdd', text : 'Your Choice', id: 7, textFontFamily: this.font, textFontSize: this.wheelTextSize}, // PINK
    {fillStyle : '#ff000c', text : 'Add to Drawing', id: 8, textFontFamily: this.font, textFontSize: this.wheelTextSize}, // RED
    {fillStyle : '#e46c1b', text : 'Funny Picture', id: 9, textFontFamily: this.font, textFontSize: this.wheelTextSize}, // ORANGE
    {fillStyle : '#fff600', text : 'Choose a Game', id: 10, textFontFamily: this.font, textFontSize: this.wheelTextSize}, // YELLOW
    {fillStyle : '#19e622', text : 'Be the teacher', id: 11, textFontFamily: this.font, textFontSize: this.wheelTextSize}, // GREEN
    {fillStyle : '#00b2ff', text : 'Change name', id: 12, textFontFamily: this.font, textFontSize: this.wheelTextSize}, // LIGHT BLUE
    {fillStyle : '#7538c7', text : 'Dance Party', id: 13, textFontFamily: this.font, textFontSize: this.wheelTextSize}, // PURPLE
    {fillStyle : '#f00fdd', text : 'Your Choice', id: 14, textFontFamily: this.font, textFontSize: this.wheelTextSize}, // PINK
    {fillStyle : '#ff000c', text : 'Add to Drawing', id: 15, textFontFamily: this.font, textFontSize: this.wheelTextSize}, // RED
    {fillStyle : '#e46c1b', text : 'Funny Picture', id: 16, textFontFamily: this.font, textFontSize: this.wheelTextSize}, // ORANGE
    {fillStyle : '#fff600', text : 'Choose a Game', id: 17, textFontFamily: this.font, textFontSize: this.wheelTextSize}, // YELLOW
    {fillStyle : '#19e622', text : 'Be the teacher', id: 18, textFontFamily: this.font, textFontSize: this.wheelTextSize}, // GREEN
    {fillStyle : '#00b2ff', text : 'Change name', id: 19, textFontFamily: this.font, textFontSize: this.wheelTextSize}, // LIGHT BLUE
    {fillStyle : '#7538c7', text : 'Dance Party', id: 20, textFontFamily: this.font, textFontSize: this.wheelTextSize}, // PURPLE
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

  /* Runs when the user clicks the spin wheel button */
  public spinWheel() {
    // Reset the wheel (doesn't seem to spin otherwise)
    this.wheel.reset();
    // Randomly decide which segment the wheel is going to land on
    this.randomID = Math.round(Math.random() * 20);
    // Spin the wheel
    this.wheel.spin();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setInterval(() => {
      this.tiltDirection === 'clockwise' ? this.starTilt++ : this.starTilt--;
      if (this.starTilt >= 10) { this.tiltDirection = 'counter-clockwise' }
      if (this.starTilt <= -10) { this.tiltDirection = 'clockwise' }
    }, 35)
  }

}
