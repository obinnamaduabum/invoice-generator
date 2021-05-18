import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MatDrawerMode, MatSidenav} from "@angular/material/sidenav";
import {NavigationCancel, NavigationEnd, NavigationStart, Router} from "@angular/router";
import {SidebarService} from "../../../services/sidebar-service/sidebar.service";
import {HamburgerNotifierService} from "../../../services/hamburger-notifier-service/hamburger-notifier-service";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  mode: MatDrawerMode = 'side';
  private desktopWidth = 800;
  @ViewChild('leftSidenav', { static: true })
  public leftSideNav: MatSidenav;

  currentWidth: number;
  isSidebarOpen = false;

  constructor(private leftSidebarService: SidebarService,
              private hamburgerNotifierService: HamburgerNotifierService,
              private router: Router) {}

  ngOnInit() {

    this.currentWidth = window.innerWidth;
    this.leftSidebarService.setSidenav(this.leftSideNav);

    console.log(this.router.url);

    // if(this.router.url === '/invoice-builder') {
    //   this.setAsOverMode();
    // } else {
    //   this.setAsSideMode();
    // }


    this.leftSidebarService.getSidebarStatus().subscribe(data => {
      if (data) {
        this.isSidebarOpen = this.mode === 'over';
      } else {
        this.isSidebarOpen = false;
      }
    }, error1 => {});

    this.checkWidthAndSetMode();
    this.router.events.subscribe((event) => {

      if (event instanceof NavigationStart) {
        if (this.currentWidth < 800) {
          this.leftSidebarService.close();
        } else {
          this.leftSidebarService.open();
        }
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        if (this.currentWidth < 800) {
          this.leftSidebarService.close();
        } else {
          this.leftSidebarService.open();
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
      console.log("currentWidth");
      this.setAsSideMode();
    } else {
      console.log("xxxxx");
      this.setAsOverMode();
    }
  }
  setAsSideMode() {
    this.mode = 'side';
    this.leftSidebarService.open();
  }
  setAsOverMode() {
    this.mode = 'over';
    this.leftSidebarService.close();
  }

  closeSidebar() {
    this.hamburgerNotifierService.setToggle(false);
    this.leftSidebarService.close();
  }

}
