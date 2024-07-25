import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'testing';

  formOptions = [
    'option 1',
    'option 2',
    'option 3',
    'option 4',
  ]

  formInitialValues = {
    select: 'option 3'
  }
}
