import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  templates = ['one', 'two', 'three'];
  constructor() { }

  ngOnInit(): void {
  }

}
