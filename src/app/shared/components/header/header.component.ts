import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public items: MenuItem[];

  constructor() {
    this.items = [];
  }

  public ngOnInit(): void {
  }

  public logout(): void {
  }
}
