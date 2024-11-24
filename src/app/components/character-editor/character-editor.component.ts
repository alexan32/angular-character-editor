import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
// import { TableComponent } from '../widgets/table/table.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CounterEditorComponent } from '../widgets/counter/counter-editor/counter-editor.component';
import { CharacterDataHandler } from '../../models/characterTemplates';
import { RollEditorComponent } from '../widgets/roll-editor/roll-editor.component';
import { CompositeEditorComponent } from '../widgets/composite/composite-editor/composite-editor.component';
import { CharacterOverviewComponent } from '../widgets/character/character-overview/character-overview.component';
import { characterMin, dnd5e } from '../../models/characterTemplates';
import { MatTooltip, TooltipPosition} from '@angular/material/tooltip';

@Component({
  selector: 'app-character-editor',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    // TableComponent,
    MatTabsModule,
    CounterEditorComponent,
    RollEditorComponent,
    CompositeEditorComponent,
    CharacterOverviewComponent,
    MatTooltip
  ],
  templateUrl: './character-editor.component.html',
  styleUrl: './character-editor.component.scss'
})
export class CharacterEditorComponent {

  // characterData
  templateSelected:boolean = false;
  characterHandler: CharacterDataHandler;
  _characterData: any = characterMin;
  tableData: any = {
    counters: [],
    composites: [],
    rolls: []
  }
  characterJson: string = "";
  combinedRolls: Array<any> = [];
  @Input() set characterData(data:any){
    this._characterData = JSON.parse(JSON.stringify(data));
    this.characterHandler = new CharacterDataHandler(this._characterData);
    this.refreshCharacterOverview()
  }

  // characterDataChange
  @Output() characterDataChange: EventEmitter<any> = new EventEmitter<any>();

  // counter editor
  showCounterEditor: boolean = false;
  counterName:string = "";
  counterData:any = {max: 10, min:0, total: 10};

  // roll editor
  showRollEditor: boolean = false;
  rollName: string = "";
  rollData: string = "";

  // composite editor
  showCompositeEditor: boolean = false;
  compositeName: string = "";
  compositeData: any = {};

  matTabIndex: number | null = 0;
  
  //

  constructor(){
    this.characterHandler = new CharacterDataHandler(this._characterData);
  }

  // TEMPLATE MANAGEMENT ==========================================

  loadFromFile(){
    var input:HTMLElement | null = document.getElementById('fileInput');
    if(input){
      input.addEventListener('change', (event:any)=>{
        const file = event.target.files[0];
        console.log(file);
        const reader = new FileReader();
        reader.onload = (e:any)=>{
          try{
            const jsonObject = JSON.parse(e.target.result);
            this.resetCharacterData(jsonObject);
          }catch(error){
            alert("Failed to process the file that you selected. Please make sure you uploaded the correct file.")
          }
        }
        reader.readAsText(file);
      })
      input.click();
    }
  }

  loadTemplate(template:string){
    if(template == "5e"){
      this.resetCharacterData(dnd5e)
    }else if(template == "characterMin"){
      this.resetCharacterData(characterMin)
    }
  }

  resetCharacterData(characterData:any){
    if(this.templateSelected){
      if (confirm("You have a character in progress. Do you wish to proceed? Doing so will undo your current progress.")){
        this.characterHandler.characterData = characterData;
        this.refreshCharacterOverview();
      }
    }else{
      this.characterHandler.characterData = characterData;
      this.refreshCharacterOverview();
    }
    this.templateSelected = true;
    this.matTabIndex = 1;
  }

  // EDITOR EVENT HANDLING ========================================

  compositeEditorEvent(event:any){
    console.log(event);

    if(event.action == "delete"){
      if(event.originalName !== ""){
        this.deleteDataStructure(event);
      }else{
        this.showCompositeEditor = false;
      }
    }
    
    if(event.action == "confirm"){
      if(event.originalName !== ""){
        this.characterHandler.deleteComposite(event.originalName);
      }
      this.characterHandler.addComposite(event.compositeName, event.compositeData);
      this.showCompositeEditor = false;
      this.refreshCharacterOverview();
    }

    if(event.action == "cancel"){
      this.showCompositeEditor = false;
    }
  }

  rollEditorEvent(event:any){
    console.log(event);

    if(event.action == "delete"){
      if(event.originalName !== ""){
        this.deleteDataStructure(event);
      }else{
        this.showRollEditor = false;
      }
    }
    
    if(event.action == "confirm"){
      if(event.originalName !== ""){
        this.characterHandler.deleteRoll(event.originalName);
      }
      this.characterHandler.addRoll(event.rollName, event.rollData);
      this.showRollEditor = false;
      this.refreshCharacterOverview();
    }

    if(event.action == "cancel"){
      this.showRollEditor = false;
    }
  }

  counterEditorEvent(event:any){
    console.log(event);

    if(event.action == "delete"){
      if(event.originalName !== ""){
        this.deleteDataStructure(event);
      }else{
        this.showCounterEditor = false;
      }
    }
    
    if(event.action == "confirm"){
      if(event.originalName !== ""){
        this.characterHandler.deleteCounter(event.originalName);
      }
      this.characterHandler.addCounter(event.counterName, event.counterData);
      this.showCounterEditor = false;
      this.refreshCharacterOverview();
    }

    if(event.action == "cancel"){
      this.showCounterEditor = false;
    }
  }

  // CREATE DATA STRUCTURE =========================================

  newCounter(){
    this.counterName = "";
    this.counterData = {max: 10, min:0, total: 10};
    this.showCounterEditor = true;
  }

  newRoll(){
    this.showRollEditor = true;
    this.rollName = "";
    this.rollData = "";
  }

  newComposite(){
    this.showCompositeEditor = true;
    this.compositeName = "";
    this.compositeData = {}; 

  }

  // OTHER ===========================================================

  deleteDataStructure(event:any){
    console.log("delete prompt for: ", event);
    if(confirm(`Are you sure that you want to delete ${event.type} "${event.originalName}"?`)){
      switch(event.type){
        case "roll":
          this.characterHandler.deleteRoll(event.originalName);
          this.showRollEditor = false;
          break;
        case "counter":
          this.characterHandler.deleteCounter(event.originalName);
          this.showCounterEditor = false;
          break;
        case "composite":
          this.characterHandler.deleteComposite(event.originalName);
          this.showCompositeEditor = false;
          break;
      }
      this.refreshCharacterOverview();
    }
  }

  editValue(event:any){
    console.log(event);
    this.resetEditors();
    this.matTabIndex = 1;
    switch(event.type){
      case "roll":
        this.rollName = event.value.name;
        this.rollData = this.characterHandler.getRoll(this.rollName);
        this.showRollEditor = true;
        break;
      case "counter":
        this.counterName = event.value.name;
        this.counterData = this.characterHandler.getCounter(this.counterName);
        this.showCounterEditor = true;
        break;
      case "composite":
        this.compositeName = event.value.name;
        this.compositeData = this.characterHandler.getComposite(this.compositeName);
        this.showCompositeEditor = true;
        break;
    }
  }

  refreshCharacterOverview(){
    this.characterJson = JSON.stringify(this.characterHandler.characterData, null, 4);
    this._characterData = JSON.parse(this.characterJson);
  }

  resetEditors(){
    // counter editor
    this.showCounterEditor = false;
    this.counterName = "";
    this.counterData = {max: 10, min:0, total: 10};

    // roll editor
    this.showRollEditor = false;
    this.rollName = "";
    this.rollData = "";

    // composite editor
    this.showCompositeEditor = false;
    this.compositeName = "";
    this.compositeData = {};
  }

  validateFirstName(){
    // if(this.characterHandler.characterData.firstName in ["", null]){
    //   return false;
    // }
    // return this.characterService.nameIsUnique(this.characterHandler.characterData.firstName);
    return true;
  }

  downloadCharacter(){
    // this.characterService.saveCharacter(this.characterHandler.characterData);
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.characterHandler.characterData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    const first = this.characterHandler.characterData.first;
    const last = this.characterHandler.characterData.last;
    downloadAnchorNode.setAttribute("download", `${first}-${last}` + ".json");
    document.body.appendChild(downloadAnchorNode); // Required for Firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove(); // Remove the element after download
  }

}
