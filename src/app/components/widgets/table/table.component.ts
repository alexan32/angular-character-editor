import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';



@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    FormsModule,
    MatSortModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements AfterViewInit {

  // tableData
  tableFilter:string = "";
  _tableData: Array<any> = [];
  dataSource = new MatTableDataSource<any>(this._tableData);
  @Input() set tableData(data:Array<any>){
    this.updateTableData(data);
  }

  // edit
  _edit:boolean = false;
  @Input() set edit(edit:boolean){
    this._edit = edit;
    this.updateKeys(this.columns);
  }
  // editTitle
  @Input() editTitle: string = "Edit";

  // search
  @Input() search: boolean = false
  
  @Input() set searchTerm(searchterm:string){
    this.tableFilter = searchterm;
    this.filter();
  }

  // columnConfig
  /** config: {
   *    key1: {sort: false, title: "Name"},
   *    key2: {}
   *  }
   */
  columns:Array<string> = [];
  _keys:Array<string> = [];
  _columnConfig:any = {}
  @Input() set columnConfig(config:any){
    this.columns = Object.keys(config);
    this.updateKeys(this.columns);
    this.columns.forEach(key=>{
      let obj = {
        sort: false,
        title: key
      }
      this._columnConfig[key] = Object.assign(obj, config[key]);
    });
  }

  @Output() event: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;


  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  updateTableData(data:Array<any>){
    this._tableData = JSON.parse(JSON.stringify(data));
    this.dataSource = new MatTableDataSource(this._tableData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this._tableData);
    this.filter();
  }

  updateKeys(columns:Array<string>){
    this._keys = columns;
    if(this._edit){
      this._keys.push("_edit");
    }
  }

  clearSearch(){
    this.tableFilter = "";
    this.filter();
  }

  filter(){
    this.dataSource.filter = this.tableFilter;
  }

  editEvent(element:any){
    this.event.emit({
      action: "edit",
      "element": element
    });
  }

  del(element:any){
    this.event.emit({
      action: "delete",
      "element": element
    })
  }

}
