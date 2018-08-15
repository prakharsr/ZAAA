import { Component, OnInit } from '@angular/core';
import { ApiService, NotificationService } from 'app/services';
import { Router, NavigationEnd, Route } from '@angular/router';
import { SuperAdminApiService } from '../../super-admin/super-admin-api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isNavbarCollapsed = true;

  emailOrPhone: string;
  password: string;

  isRegister = false;
  isSuperAdmin = false;

  get showToolbar() {
    return !this.isSuperAdmin && this.api.isLoggedIn;
  }

  constructor(public api: ApiService,
    public superAdminApi: SuperAdminApiService,
    private router: Router,
    private notifications: NotificationService) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRegister = event.urlAfterRedirects == "/register";
        this.isSuperAdmin = event.urlAfterRedirects.startsWith("/superadmin");
      } 
    });
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
