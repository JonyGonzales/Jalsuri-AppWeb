import { Component } from '@angular/core';
import { DataService } from '../movimientos-almacen/services/dataService.service';

@Component({
  selector: 'app-detalle-movimiento',
  templateUrl: './detalle-movimiento.component.html',
  styleUrls: ['./detalle-movimiento.component.css']
})
export class DetalleMovimientoComponent {
id: any;


  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.id = this.dataService.getSelectedId();
    // Use id to retrieve record data from API.
  }

  
}
