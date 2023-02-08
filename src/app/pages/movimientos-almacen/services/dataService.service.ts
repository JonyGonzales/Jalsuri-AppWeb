import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private selectedId: number;

  setSelectedId(id: number) {
    this.selectedId = id;
  }

  getSelectedId() {
    return this.selectedId;
  }
}