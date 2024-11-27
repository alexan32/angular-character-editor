import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { characterToTableData } from '../../../../utils';
import { MatIconModule } from '@angular/material/icon';
import { ExpandableComponent } from '../../expandable/expandable.component';
import { MatTooltip } from '@angular/material/tooltip';
import { CharacterService } from '../../../../services/character.service';
import { Subscription } from 'rxjs';
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

export class CharacterOverviewComponent implements OnInit, OnDestroy{

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

  @Output() rowSelect:EventEmitter<any> = new EventEmitter();

  characterDataSubscription:Subscription;
  characterData:any;

  constructor(private characterService:CharacterService){}

  ngOnInit(): void {
    this.characterDataSubscription = this.characterService.getCharacterObservable().subscribe((value:any)=>{
      this.characterData = value;
      this.tableData = characterToTableData(this.characterData);
      this.filteredTableData = JSON.parse(JSON.stringify(this.tableData));
      console.info("character-overview component refreshed character data");
      
      this.filter(this.rollSearch, "rolls");
      this.filter(this.counterSearch, "counters");
      this.filter(this.compositeSearch, "composites");
    })
  }

  ngOnDestroy(): void {
    if(this.characterDataSubscription){
      this.characterDataSubscription.unsubscribe();
    }
  }

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
    // this.rowSelect.emit({"type": type, "value": value});
    this.characterService.publishCharacterEvent({
      name: "roll_selected",
      payload: {
        roll_type: type,
        value: value
      }
    })
  }

}
