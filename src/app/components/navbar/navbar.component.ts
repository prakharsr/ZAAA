import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { UserProfile } from '../../models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isNavbarCollapsed = true;
  admin : boolean;
  pageUrl;
  expectedUrl = "/register";

  constructor(public api: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.pageUrl = event.urlAfterRedirects;
      } 
    });
  }

  collapseNavbar() {
    this.isNavbarCollapsed = true;
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
}
