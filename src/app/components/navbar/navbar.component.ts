import { Component, OnInit } from '@angular/core';
import { ApiService, NotificationService } from 'app/services';
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
  pageUrl="";
  expectedUrl = "/register";

  emailOrPhone: string;
  password: string;

  hidePassword = true;

  constructor(public api: ApiService, private router: Router, private route: ActivatedRoute, private notifications: NotificationService) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.pageUrl = event.urlAfterRedirects;
      } 
    });
    console.log(this.pageUrl);
  }

  collapseNavbar() {
    this.isNavbarCollapsed = true;
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  loginSubmit() {
    this.api.login(this.emailOrPhone, this.password).subscribe(
      data => {
        if (data.success) {
          this.router.navigateByUrl('dashboard');
        }
        else {
          console.log(data);

          this.notifications.show(data.msg);
        }
      }
    );
  }
}
