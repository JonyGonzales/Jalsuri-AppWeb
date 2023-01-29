import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Categoria } from './models/categoria';
import { CategoriaService } from './services/categoria.service';


declare var $: any;

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit, OnDestroy{

  categorias: Categoria[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  formSubmitted = false;
  Estados: any = ['Activo', 'Inactivo'];
  public registerForm = this.fb.group(
    {
      nombre: ['', [Validators.required]],
    },
    {
      Validators
    }
  );

   constructor(
    private categoriaService: CategoriaService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      destroy: true,
      pageLength: 10,
      searching: true,
      responsive: true,
      info: true,
      language: { url: '//cdn.datatables.net/plug-ins/1.13.1/i18n/es-MX.json' },
      dom: 'Bfrtip'
    };   
    this.obtenerCategoria();
 
    
  }

  obtenerCategoria() {
    this.categoriaService.obtenerCategorias().subscribe((dato: any) => {
      this.categorias = dato;
      this.dtTrigger.next(this.dtOptions);
    });
  }

  get estados() {
    return this.registerForm.get('est');
  }

  changeStatus(evento) {
    this.estados.setValue(evento.target.value, {
      onlySelf: true,
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  crearCategorias() {
    console.log(this.registerForm.value)
    this.formSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    //Realizar posteo
    this.categoriaService.newCategoria(this.registerForm.value).subscribe(
      (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: 'Categoria creado correctamente',
          showConfirmButton: true,
        }).then((result) => {

          $('#agregarCategoria').modal('toggle');
          $('#agregarCategoria').modal('hide');
        });
      },
      (err) => {
        const errorServer = JSON.parse(err.error);
        Swal.fire('Error', errorServer.message, 'error');
      }
    );
  }

  llenarForm(id: number) {
    this.categoriaService.obtenerIdCategoria(id).subscribe((res) => {
      this.registerForm.setValue({
        nombre: res['nombre']
        });

      $('#editarCategoria').modal('toggle');
      $('#editarCategoria').modal('show');

      localStorage.setItem('idCat', res['id']);
    });
  }

  editarCategoria() {
    this.categoriaService
      .editarCategoria(
        parseInt(localStorage.getItem('idCat')),
        this.registerForm.value
      )
      .subscribe(
        (res) => {
          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: 'El categoria se actualizo correctamente',
            confirmButtonText: 'Ok',
          }).then((result) => {
            if (result) {
              this.ngOnDestroy();
              this.obtenerCategoria();
              localStorage.removeItem('idCat');
              //location.reload();
            }
          });
        },
        (err) => {
          Swal.fire('Error', err.error.message, 'error');
        }
      );
  }

  eliminarCategoria(id: number) {
      Swal.fire({
        icon: 'question',
        title: 'Desea eliminar este categoria?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.categoriaService.deleteCategoria(id).subscribe(
            (res: any) => {
              Swal.fire({
                icon: 'success',
                title: 'Categoria eliminado correctamente',
                confirmButtonText: 'Ok',
              }).then((result) => {
                if (result) {
                  location.reload();
                }
              });
            },
            (err) => {
              Swal.fire('Error', err.error.message, 'error');
            }
          );
        }
      });
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  cambiaEstado(id: number, est: String) {
    if (est == 'Inactivo') {
      var dato = { estado: 'Activo' };
    }
    if (est == 'Activo') {
      var dato = { estado: 'Inactivo' };
    }
      Swal.fire({
        icon: 'question',
        title: 'Desea Modificar el estado de este categoria?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(dato)
          this.categoriaService.actualizaEstadoCategoria(id, dato).subscribe(
            (res) => {
              Swal.fire({
                icon: 'success',
                title: 'Categoria Actualizado correctamente',
                confirmButtonText: 'Ok',
              }).then((result) => {
                if (result) {
                  this.categoriaService.obtenerCategorias().subscribe((dato: any) => {this.categorias = dato;});
                  //location.reload();
                  //this.ngOnDestroy();
                }
              });
            },
            (err) => {
              Swal.fire('Error', err.error.message, 'error');
            }
          );
        }
      });
    }
}
