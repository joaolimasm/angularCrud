import { PeriodicElement } from '../../models/PeriodicElements';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.scss'],
})
export class ElementDialogComponent implements OnInit {
  //class
  element: PeriodicElement;
  isChange: boolean;
  //injeta o valor que vai dentro da modal
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: PeriodicElement,
    public dialogRef: MatDialogRef<ElementDialogComponent>
  ) {}
//verifica a posição da dado pra chamar no ngif
  ngOnInit(): void {
    if (this.data.position != null) {
      this.isChange = true;
    } else {
      this.isChange = false;
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
