import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from './services/sidebar.service';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  menuItems?: any[];
  nombre = '';
  rol = '';

  constructor(private sideBarServices: SidebarService, private router: Router) {
    //console.log(this.menuItems);
  }

  ngOnInit(): void {
    this.rol = localStorage.getItem('rol');
    this.nombre = localStorage.getItem('nombre');
    if ('admin' == this.rol) {
      $('[data-widget="treeview"]').Treeview('init');
      this.menuItems = this.sideBarServices.menu;
    } else if ('user' == this.rol) {
      $('[data-widget="treeview"]').Treeview('init');
      this.menuItems = this.sideBarServices.menuUser;
    } else {
      this.logout();
    }
  }

  logout() {
    this.router.navigateByUrl('/login');
    localStorage.clear();
  }
}
