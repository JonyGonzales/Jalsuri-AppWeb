import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/Dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ProductosComponent } from './productos/productos.component';
import { ProveedorComponent } from './proveedor/proveedor.component';

    // En este Modulo colocamos todas las ventanas que se exportaran como hijas del Dashboard solo dentro del Dashboard
    const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,

        children: [
        {
             path: '',
             component: DashboardComponent,
             data: { titulo: 'Dashboard' },
         },
         {
             path: 'usuarios',
             component: UsuariosComponent,
             data: { titulo: 'Usuarios' },
         },
          {
            path: 'productos',
            component: ProductosComponent,
            data: { titulo: 'Productos' },
          },
           {
             path: 'categorias',
             component: CategoriaComponent,
             data: { titulo: 'Categorias' },
           },
          //  {
          //    path: 'edit-categoria/:id',
          //    component: EditCategoriaComponent,
          //    data: { titulo: 'Editar Categoria' },
          //  },
          {
            path: 'proveedores',
            component: ProveedorComponent,
            data: { titulo: 'Proveedores' },
          },
        //   {
        //     path: 'add-insumos',
        //     component: AddInsumosComponent,
        //     data: { titulo: 'Agregar Insumos' },
        //   },
        //   {
        //     path: 'edit-insumos/:id',
        //     component: EditInsumosComponent,
        //     data: { titulo: 'Editar Insumos' },
        //   }
        ],
    },
    ];

    @NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
    })
    export class PagesRoutingModule {}
