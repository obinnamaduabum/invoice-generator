import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {NavigationCancel, NavigationEnd, NavigationStart, Router} from "@angular/router";
import {SidebarService} from "../../../services/sidebar-service/sidebar.service";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  mode = 'side';
  private desktopWidth = 800;
  @ViewChild('leftSidenav', { static: true })
  public leftSideNav: MatSidenav;

  currentWidth: number;
  isSidebarOpen = false;

  constructor(private adminLeftSidebarService: SidebarService,
              private router: Router) {}

  ngOnInit() {

    this.adminLeftSidebarService.setSidenav(this.leftSideNav);

    this.adminLeftSidebarService.getSidebarStatus().subscribe(data => {
      if (data) {
        this.isSidebarOpen = this.mode === 'over';
      } else {
        this.isSidebarOpen = false;
      }
    }, error1 => {});

    this.currentWidth = window.innerWidth;
    this.checkWidthAndSetMode();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.currentWidth < 800) {
          this.adminLeftSidebarService.close();
        }
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        if (this.currentWidth < 800) {
          this.adminLeftSidebarService.close();
        }
      }
    });
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.currentWidth = event.target.innerWidth;
    this.checkWidthAndSetMode();
  }

  checkWidthAndSetMode() {
    if (this.currentWidth > this.desktopWidth) {
      this.setAsSideMode();
    } else {
      this.setAsOverMode();
    }
  }
  setAsSideMode() {
    this.mode = 'side';
    this.adminLeftSidebarService.open();
  }
  setAsOverMode() {
    this.mode = 'over';
    this.adminLeftSidebarService.close();
  }

  closeSidebar() {
    this.adminLeftSidebarService.close();
  }

}
