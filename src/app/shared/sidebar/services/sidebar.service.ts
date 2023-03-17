import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'nav-icon fas fa-tachometer-alt',
      submenu: [],
    },
    {
      titulo: 'Usuarios',
      icono: 'nav-icon fas fa-users',
      submenu: [{ titulo: 'Usuarios', url: 'usuarios', icono: 'fa fa-users' }],
    },
    {
      titulo: 'Insumos',
      icono: 'nav-icon fas fa-boxes',
      submenu: [
        { titulo: 'Listado de Insumos', url: 'insumos', icono: 'fa fa-list' },
        { titulo: 'Agregar Insumos', url: 'add-insumos', icono: 'fa fa-cubes' },
      ],
    },
    {
      titulo: 'Categorias',
      icono: 'nav-icon fas fa-list',
      submenu: [
        { titulo: 'Listar Categorias', url: 'categorias', icono: 'fa fa-list' },
        { titulo: 'Agregar Categoria',url: 'add-categorias',icono: 'fa fa-plus'},
      ],
    },
    {
      titulo: 'Productos',
      icono: 'nav-icon fas fa-boxes',
      submenu: [
        {titulo: 'Listado de Productos',url: 'productos',icono: 'fa fa-list'},
        // {titulo: 'Agregar Productos',url: 'add-productos',icono: 'fa fa-cubes'},
      ],
    },
    // {
    //   titulo: 'Empleados',
    //   icono: 'nav-icon fas fa-hard-hat ',
    //   submenu: [
    //     {titulo: 'Listado de Empleados',url: 'empleados',icono: 'fa fa-employe'},
    //   ],
    // },
    {
      titulo: 'Proveedores',
      icono: 'nav-icon fas fa-truck ',
      submenu: [
        {titulo: 'Listado de Proveedores',url: 'proveedores',icono: 'fa fa-truck'},
      ],
    },
    {
      titulo: 'Clientes',
      icono: 'nav-icon fas fa-user',
      submenu: [
        {titulo: 'Listado de Clientes',url: 'clientes',icono: 'fa fa-truck'},
      ],
    },
    {
      titulo: 'Movimientos',
      icono: 'nav-icon fas fa-list',
      submenu: [
        {titulo: 'Movimientos en Almacen',url: 'movimientos',icono: 'fa fa-truck'},
      ],
    },

  ];
  menuUser: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'nav-icon fas fa-tachometer-alt',
      submenu: [],
    },
    {
      titulo: 'Categorias',
      icono: 'nav-icon fas fa-list',
      submenu: [
        { titulo: 'Listar Categorias', url: 'categorias', icono: 'fa fa-list' },
        { titulo: 'Agregar Categoria',url: 'add-categorias',icono: 'fa fa-plus'},
      ],
    },
    {
      titulo: 'Productos',
      icono: 'nav-icon fas fa-boxes',
      submenu: [
        {titulo: 'Listado de Productos',url: 'productos',icono: 'fa fa-list'},
        // {titulo: 'Agregar Productos',url: 'add-productos',icono: 'fa fa-cubes'},
      ],
    },
    // {
    //   titulo: 'Empleados',
    //   icono: 'nav-icon fas fa-hard-hat ',
    //   submenu: [
    //     {titulo: 'Listado de Empleados',url: 'empleados',icono: 'fa fa-employe'},
    //   ],
    // },
    {
      titulo: 'Proveedores',
      icono: 'nav-icon fas fa-truck ',
      submenu: [
        {titulo: 'Listado de Proveedores',url: 'proveedores',icono: 'fa fa-truck'},
      ],
    },
    {
      titulo: 'Clientes',
      icono: 'nav-icon fas fa-user',
      submenu: [
        {titulo: 'Listado de Clientes',url: 'clientes',icono: 'fa fa-truck'},
      ],
    },
    {
      titulo: 'Movimientos',
      icono: 'nav-icon fas fa-list',
      submenu: [
        {titulo: 'Movimientos en Almacen',url: 'movimientos',icono: 'fa fa-truck'},
      ],
    },

  ];
  constructor() {}
}
