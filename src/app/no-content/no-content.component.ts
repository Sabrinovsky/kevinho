import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-content',
  templateUrl: './no-content.component.html',
  styleUrl: './no-content.component.css'
})
export class NoContentComponent implements OnInit {
  ngOnInit() {
    console.log('NoContentComponent initialized')
  }
}
