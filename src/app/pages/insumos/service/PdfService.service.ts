import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  exportToPdf(data: any[], columns: string[]) {
    const doc = new jsPDF();
    const tableData = [];

    data.forEach(element => {
      const row = [];
      columns.forEach(col => {
        row.push(element[col]);
      });
      tableData.push(row);
    });

doc.autoTable({
  head: [columns],
  body: tableData,
  styles: {
    fontSize: 10
  },
  columnStyles: {
    0: {
      columnWidth: 'auto'
    },
    1: {
      columnWidth: 'auto'
    },
    2: {
      columnWidth: 'auto'
    }
  }
});

    doc.save('table.pdf');
  }
}
