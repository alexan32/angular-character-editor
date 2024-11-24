import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { characterToTableData } from '../../../../utils';
import { MatIconModule } from '@angular/material/icon';
import { ExpandableComponent } from '../../expandable/expandable.component';
import { MatTooltip } from '@angular/material/tooltip';
@Component({
  selector: 'app-character-overview',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatIconModule, 
    ExpandableComponent,
    MatTooltip
  ],
  templateUrl: './character-overview.component.html',
  styleUrl: './character-overview.component.css'
})

export class CharacterOverviewComponent {

  tableData: any = {
    counters: [],
    composites: [],
    rolls: []
  }

  filteredTableData: any = JSON.parse(JSON.stringify(this.tableData));

  counterSearch: string = "";
  compositeSearch: string = "";
  rollSearch: string = "";

  counterIndex: number = -1;
  compositeIndex: number = -1;
  rollIndex: number = -1;

  _characterData: any = {};

  @Input() set characterData(data:any){
    this.tableData = characterToTableData(data);
    this.filteredTableData = JSON.parse(JSON.stringify(this.tableData));
    this._characterData = data;
    console.info("character-overview component refreshed character data");
    
    this.filter(this.rollSearch, "rolls");
    this.filter(this.counterSearch, "counters");
    this.filter(this.compositeSearch, "composites");
  }

  @Output() rowSelect:EventEmitter<any> = new EventEmitter();

  filter(searchString:string, dataKey:string){
    let data = this.tableData[dataKey];
    let output:Array<any> = [];
    data.forEach((element:any) =>{
      if(element.name.toLowerCase().includes(searchString)){
        output.push(element);
      }
    });
    output.sort((a:any, b:any)=>{
      if(a["name"] < b["name"]){ return -1; }
      if(a["name"] > b["name"]){ return 1; }
      return 0;
    })

    this.filteredTableData[dataKey] = output;
  }

  editRow(type:string, value:any){
    this.rowSelect.emit({"type": type, "value": value});
  }

}
