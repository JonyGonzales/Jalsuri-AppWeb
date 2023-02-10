import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../movimientos-almacen/services/dataService.service';
import { Subject } from 'rxjs';
import { Producto } from '../productos/models/producto';
import { ProductoService } from '../productos/services/producto.service';
import { Detalle_mov_almacenService } from './services/detalleMovAlmacen.service';
import { Detalle_Mov_almacen } from './models/detalle_Mov_Almacen';
import Swal from 'sweetalert2';
import { filter } from 'jszip';

@Component({
  selector: 'app-detalle-movimiento',
  templateUrl: './detalle-movimiento.component.html',
  styleUrls: ['./detalle-movimiento.component.css'],
})
export class DetalleMovimientoComponent implements OnDestroy, OnInit {
  id: any;

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  producto: Producto[] = [];
  detMovimientos: Detalle_Mov_almacen[] = [];
  detMovs: Detalle_Mov_almacen[] = [];

  formSubmitted = false;

  reloadComponent() {
    this.router
      .navigateByUrl('./dashboard/movimientos', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['./dashboard/movimientos']);
      });
  }

  public registerForm = this.fb.group(
    {
      observaciones: [''],
      id_producto: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      numero_documento: ['', [Validators.required]],
      id_mov_almacen:['', [Validators.required]]
    },
    {
      Validators,
    }
  );


  constructor(
    private dataService: DataService,
    private productoService: ProductoService,
    private detalleMovService: Detalle_mov_almacenService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit() {
    // Use id to retrieve record data from API.
    this.id = this.dataService.getSelectedId();

    this.dtOptions = {
      destroy: true,
      pageLength: 10,
      searching: true,
      responsive: true,
      info: true,
      language: { url: '//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json' },
      dom: 'Bfrtip',
      //buttons: ['colvis', 'copy', 'print', 'excel'],
    };
    this.obtenerMovimientos();
    this.obtenerProductos();
  }


  obtenerMovimientos() {
  this.detalleMovService.listarXid(this.id).subscribe((dato: any) => {
    this.detMovimientos = dato;
    this.dtTrigger.next(this.dtOptions);
  });


}

obtenerProductos() {
  this.productoService.listarProductos().subscribe((dato: any) => {
    this.producto = dato;
  });
}

get productoGet() {
  return this.registerForm.get('id_producto');
}

ProductoSeleccionado(evento) {
  this.productoGet.setValue(evento.target.value, {
    onlySelf: true,
  });
}


crearMovimiento() {
  if (this.registerForm.invalid) {
    return;
  }

  console.log(this.registerForm.value);
  //Realizar posteo
  this.detalleMovService.agregar(this.registerForm.value).subscribe(
    (res) => {
      Swal.fire({
        icon: 'success',
        title: 'Exito',
        text: 'Producto Agregado correctamente',
        showConfirmButton: true,
      }).then((result) => {
        //location.reload();
        this.reloadComponent();
      });
    },
    (err) => {
      const errorServer = JSON.parse(err.error);
      Swal.fire('Error', errorServer.message + ' Revisar la Informacion', 'error');
    }
  );
}

}
