import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from './services/sidebar.service';

declare var $:any;


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems?:any[];
  nombre = ""

  constructor(private sideBarServices: SidebarService, private router:Router) {
    this.menuItems= this.sideBarServices.menu;
    //console.log(this.menuItems);
 
   } 

  ngOnInit(): void {
    $('[data-widget="treeview"]').Treeview('init');
  this.nombre = localStorage.getItem('nombre')


  }

  logout(){
  this.router.navigateByUrl('/login');
  localStorage.removeItem('nombre')
  localStorage.removeItem('nombre')
  localStorage.removeItem('nombre')
  localStorage.removeItem('nombre')
  
  }

}
