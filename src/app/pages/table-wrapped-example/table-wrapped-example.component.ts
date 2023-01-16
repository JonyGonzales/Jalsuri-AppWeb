import { DataSource } from '@angular/cdk/collections';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  AfterViewInit,
  QueryList,
  ViewChild,
  ContentChild,
  OnInit,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import {
  MatColumnDef,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { Categoria } from '../categoria/models/categoria';
import { CategoriaService } from '../categoria/services/categoria.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

/**
 * @title Table example that shows how to wrap a table component for definition and behavior reuse.
 */
@Component({
  selector: 'table-wrapped-example',
  styleUrls: ['table-wrapped-example.component.css'],
  templateUrl: 'table-wrapped-example.component.html',
})
export class TableWrappedExample implements  OnInit {
  ELEMENT_DATA: Categoria[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'estado'];
  dataSource = new MatTableDataSource<Categoria>(this.ELEMENT_DATA);

  constructor(private categoriaService: CategoriaService) {}
  ngOnInit(): void {
    this.addData();
    this.dataSource.sort = this.sort;

  }

  @ViewChild('sort') sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  obtenerCategoria() {
    this.categoriaService.obtenerCategorias().subscribe((dato: any) => {
      this.ELEMENT_DATA = dato;
    });
  }
  clearTable() {
    this.dataSource.data = [];
  }

  addData() {
    this.obtenerCategoria();
    this.dataSource.data = this.ELEMENT_DATA;
  }
}

/**
 * Table component that accepts column and row definitions in its content to be registered to the
 * table.
 */
@Component({
  selector: 'wrapper-table',
  templateUrl: 'wrapper-table.html',
  styles: [
    `
      table {
        width: 100%;
      }
    `,
  ],
})
export class WrapperTable<T> implements OnInit {
  ngOnInit(): void {
    this.columnDefs.forEach((columnDef) => this.table.addColumnDef(columnDef));
    this.rowDefs.forEach((rowDef) => this.table.addRowDef(rowDef));
    this.headerRowDefs.forEach((headerRowDef) =>
      this.table.addHeaderRowDef(headerRowDef)
    );
    this.table.setNoDataRow(this.noDataRow);
  }
  @ContentChildren(MatHeaderRowDef) headerRowDefs: QueryList<MatHeaderRowDef>;
  @ContentChildren(MatRowDef) rowDefs: QueryList<MatRowDef<T>>;
  @ContentChildren(MatColumnDef) columnDefs: QueryList<MatColumnDef>;
  @ContentChild(MatNoDataRow) noDataRow: MatNoDataRow;

  @ViewChild(MatTable, { static: true }) table: MatTable<T>;

  @Input() columns: string[];

  @Input() dataSource: DataSource<T>;

  ngAfterContentInit() {
    this.columnDefs.forEach((columnDef) => this.table.addColumnDef(columnDef));
    this.rowDefs.forEach((rowDef) => this.table.addRowDef(rowDef));
    this.headerRowDefs.forEach((headerRowDef) =>
      this.table.addHeaderRowDef(headerRowDef)
    );
    this.table.setNoDataRow(this.noDataRow);
  }
}

/**  Copyright 2023 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
