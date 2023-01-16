import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { CategoriaComponent } from './categoria/categoria.component';
import { ProductosComponent } from './productos/productos.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { InsumosComponent } from './insumos/insumos.component';
import { MaterialModule } from 'material.module';
import { TableWrappedExample, WrapperTable } from './table-wrapped-example/table-wrapped-example.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    DataTablesModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [PagesComponent, UsuariosComponent, CategoriaComponent, ProductosComponent, ProveedorComponent, InsumosComponent, TableWrappedExample,WrapperTable]
  ,
  providers: [],
  bootstrap: [InsumosComponent],
})
export class PagesModule { }
