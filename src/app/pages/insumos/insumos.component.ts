import {
  AfterViewInit,
  Component,
  ViewChild,
  OnInit,
  ElementRef,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Movimiento_almacenService } from '../movimientos-almacen/services/movimientoAlmacen.service';
import { ExcelService } from './service/ExcelService.service';
import { PdfService } from './service/PdfService.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { TipoDocumentoService } from '../movimientos-almacen/services/tipoDocumento.service';
import { ProveedorService } from '../proveedor/service/proveedor.service';
import { ClienteService } from '../cliente/service/cliente.service';
import { TipoMovimientoService } from '../movimientos-almacen/services/tipoMovimiento.service';
import { Tipo_documento } from '../movimientos-almacen/models/tipo_documento';
import { Tipo_movimiento } from '../movimientos-almacen/models/tipo_movimiento';
import { Usuario } from 'src/app/models/usuario';
import { Proveedor } from '../proveedor/model/proveedor';
import { Cliente } from '../cliente/model/cliente';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DataService } from '../movimientos-almacen/services/dataService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.css'],
})
export class InsumosComponent implements OnInit {
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any>;

  tipoDoc: Tipo_documento[] = [];
  tipoMov: Tipo_movimiento[] = [];
  usuarios: Usuario[] = [];
  proveedores: Proveedor[] = [];
  clientes: Cliente[] = [];
  movSelec: Tipo_movimiento[] = [];
  selectedId = 0 ;
  tiposeleccionado:string ;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private movAlmService: Movimiento_almacenService,
    private excelService: ExcelService,
    private pdfService: PdfService,
    private breakpointObserver: BreakpointObserver,

    private tipoDocumentoService: TipoDocumentoService,
    private proveedorService: ProveedorService,
    private clienteService: ClienteService,
    private usuarioService: UsuarioService,
    private tipoMovimientoService: TipoMovimientoService,

    private fb: FormBuilder,

    // Para la ventana de Detalles.
    private dataService: DataService,
    private router: Router,


  ) {}

  ngOnInit() {
    this.llenarSelects();
    this.cargar_Lista();

    this.breakpointObserver
      .observe(['(max-width: 600px)'])
      .subscribe((result) => {
        this.displayedColumns = result.matches
          ? ['id', 'tipo_movimiento', 'numero_documento', 'acciones']
          : [
              'id',
              'tipo_movimiento',
              'tipo_documento',
              'numero_documento',
              'proveedor',
              'cliente',
              'fecha_movimiento',
              'observaciones',
              'usuario',
              'acciones',
            ];
      });
  }

  cargar_Lista(){
    this.movAlmService.listar().subscribe((data) => {
    this.dataSource = new MatTableDataSource(data as any[]);
    this.dataSource.paginator = this.paginator;
  });}

  public registerForm = this.fb.group(
    {
      observaciones: [''],
      tipo_movimiento: ['', [Validators.required]],
      tipo_documento: ['', [Validators.required]],
      numero_documento: ['', [Validators.required]],
      proveedor: [''],
      cliente: [''],
      usuario: ['', [Validators.required]],
    },
    {
      Validators,
    }
  );

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  exportAsExcel() {
    this.excelService.exportAsExcelFile(
      this.dataSource.filteredData,
      'JALSURI - Movimientos de Almacen'
    );
  }

  exportAsPdf() {
    this.pdfService.exportToPdf(
      this.dataSource.filteredData,
      this.displayedColumns
    );
  }

  // Proveniente del Mvimiento
  llenarSelects() {
    this.obtenerTipoMov(),
      this.obtenerTipoDoc(),
      this.obtenerUsuarios(),
      this.obtenerCliente(),
      this.obtenerProveedor();
  }
  obtenerTipoMov() {
    this.tipoMovimientoService.listar().subscribe((dato: any) => {
      this.tipoMov = dato;
    });
  }

  obtenerTipoDoc() {
    this.tipoDocumentoService.listar().subscribe((dato: any) => {
      this.tipoDoc = dato;
    });
  }

  obtenerUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe((dato: any) => {
      this.usuarios = dato;
    });
  }
  obtenerProveedor() {
    this.proveedorService.obtenerProveedor().subscribe((dato: any) => {
      this.proveedores = dato;
    });
  }

  obtenerCliente() {
    this.clienteService.obtenerCliente().subscribe((dato: any) => {
      this.clientes = dato;
    });
  }

  crearMovimiento() {
    if (this.registerForm.invalid) {
      return;
    }

    console.log(this.registerForm.value);
    //Realizar posteo
    this.movAlmService.agregar(this.registerForm.value).subscribe(
      (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: 'Movimiento creado correctamente',
          showConfirmButton: true,
        }).then((result) => {
          //location.reload();
          //this.reloadComponent();
          this.cargar_Lista();
        });
      },
      (err) => {
        const errorServer = JSON.parse(err.error);
        Swal.fire('Error', errorServer.message, 'error');
      }
    );
  }

  get usuarioGet() {
    return this.registerForm.get('usuario');
  }

  usuarioSeleccionado(evento) {
    this.usuarioGet.setValue(evento.target.value, {
      onlySelf: true,
    });
  }

  get tipoDocGet() {
    return this.registerForm.get('tipo_documento');
  }

  tipoDocSeleccionado(evento) {
    this.tipoDocGet.setValue(evento.target.value, {
      onlySelf: true,
    });
  }

  get tipoMovGet() {
    return this.registerForm.get('tipo_movimiento');
  }

  tipoMovSeleccionado(event) {
    this.tipoMovGet.setValue(event.target.value, {
      onlySelf: true,
    });
    const selectedValueControl = this.registerForm.get('tipo_movimiento');
    selectedValueControl.setValue(event.target.value);
    const val = selectedValueControl.value;
    if (parseInt(val) > 0) {
      this.selectedId = parseInt(val);
      this.datoTipoMov();
      // this.updateContent();
    } else {
      console.log('error en el tipo de movimiento');
    }
    // this.updateContent();
    // console.log(this.tiposeleccionado);
  }

  get proveedorGet() {
    return this.registerForm.get('proveedor');
  }
  proveedorSeleccionado(evento) {
    this.proveedorGet.setValue(evento.target.value, {
      onlySelf: true,
    });
  }

  get clienteGet() {
    return this.registerForm.get('cliente');
  }
  clienteSeleccionado(evento) {
    this.clienteGet.setValue(evento.target.value, {
      onlySelf: true,
    });
  }

  datoTipoMov() {
    const selectedObject = this.tipoMov.filter(
      (obj) => obj.id === this.selectedId
    )[0];
    const val =selectedObject.tipo;
    //const val =JSON.stringify(selectedObject.tipo);
    this.tiposeleccionado =val.toString();
  }





  // para la ventana emergente

  editRecord(id: number) {
    this.dataService.setSelectedId(id);

    this.router
    .navigateByUrl('./dashboard/detalleMovimientos', { skipLocationChange: true })
    .then(() => {
      this.router.navigate(['./dashboard/detalleMovimientos']);
    });
    
  }
}
