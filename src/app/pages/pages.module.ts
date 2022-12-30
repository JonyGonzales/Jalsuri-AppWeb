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

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    DataTablesModule,
    HttpClientModule,
    ReactiveFormsModule,
    
  ],
  declarations: [PagesComponent, UsuariosComponent, CategoriaComponent]
})
export class PagesModule { }
