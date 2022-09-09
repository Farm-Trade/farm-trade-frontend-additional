import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public items: MenuItem[];

  constructor(
    private readonly authService: AuthService
  ) {
    this.items = [];
  }

  public ngOnInit(): void {
  }

  public logout(): void {
    this.authService.logout(true);
  }
}
