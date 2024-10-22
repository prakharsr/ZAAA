import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService, NotificationService } from 'app/services';
import { Router, NavigationEnd } from '@angular/router';
import { SuperAdminApiService } from 'app/super-admin/super-admin-api.service';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { NotificationsComponent } from '../notifications/notifications.component';

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

  @ViewChild('notifyBtn', {read: ElementRef}) notifyBtn: ElementRef;

  get showToolbar() {
    return !this.isSuperAdmin && this.api.isLoggedIn;
  }

  constructor(public api: ApiService,
    public superAdminApi: SuperAdminApiService,
    private router: Router,
    private notifications: NotificationService,
    private overlay: Overlay) { }

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

  overlayRef: OverlayRef;

  openNotifications() {
    if (this.overlayRef) {
      this.closeNotifications();
    }
    else {
      this.overlayRef = this.overlay.create({
        width: '300px',
        height: '450px',
        hasBackdrop: true,
        backdropClass: 'mat-overlay-transparent-backdrop',
        panelClass: ['mat-elevation-z8', 'bg-light'],
        positionStrategy: this.overlay.position()
          .connectedTo(this.notifyBtn,
            { originX: 'start', originY: 'bottom' },
            { overlayX: 'start', overlayY: 'top' }
          ).withDirection('rtl')
      });
      let portal = new ComponentPortal(NotificationsComponent);
      this.overlayRef.attach(portal);

      this.overlayRef.backdropClick().subscribe(() => this.closeNotifications());
    }
  }

  closeNotifications() {
    this.overlayRef.dispose();

    this.overlayRef = null;
  }
}
