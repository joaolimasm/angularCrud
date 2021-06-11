import { MatTable, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ElementDialogComponent } from './../../shared/element-dialog/element-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PeriodicElement } from 'src/app/models/PeriodicElements';

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  //busca o id filho do html para buscar o resultado
  @ViewChild(MatTable)
  table: MatTable<any>;
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'action',
  ];
  // vai os dados de todos os elementos da tabela
  dataSource = ELEMENT_DATA;
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}
  // abre a da modal passando como parametro os elementos que estão na tabela
  //se o elemento tiver null, ele volta tudo vazio, senao ele volta os parametros do elemento
  //ou seja, se estiver vázio é porque está sendo criado na hora.
  //caso nao seja um novo valor, o elemento passa os dados para edição
  openDialog(element: PeriodicElement | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data:
        element === null
          ? {
              position: null,
              name: '',
              weight: null,
              symbol: '',
            }
          : {
              position: element.position,
              name: element.name,
              weight: element.weight,
              symbol: element.symbol,
            },
    });

    //verifica a promise, se voltar vázio ele mapeia a posição e inclui o resultado e no fim renderiza tudo
    //se no datasource ja conter a posição do valor do resultado ele mapeia e devolve apenas a posições do array, e verifica se o novo valor ta sendo passado ta dentro do novo array
    //caso tenha, pega os dados do resutado e passa um novo resultado
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        if (this.dataSource.map((p) => p.position).includes(result.position)) {
          this.dataSource[result.position - 1] = result;
          this.table.renderRows();
        } else {
          this.dataSource.push(result);
          this.table.renderRows();
        }
      }
    });
  }

  edit(element: PeriodicElement): void {
    this.openDialog(element);
  }
  //retorna todos os elementos da posição diferente da excluida
  delete(position: number): void {
    this.dataSource = this.dataSource.filter((p) => p.position !== position);
  }
}
