import {Component, OnInit, Output, EventEmitter, Input, ViewEncapsulation} from '@angular/core';
@Component({
  selector: 'app-app-child-of-child',
  templateUrl: './app-child-of-child.component.html',
  styleUrls: ['./app-child-of-child.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppChildOfChildComponent implements OnInit {
  @Output() deleteSelf: EventEmitter<void> = new EventEmitter<void>();
  @Input() numberCreated: number;
  constructor() { }

  ngOnInit() {
  }

}
