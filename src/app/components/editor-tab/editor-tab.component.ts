import { Component, OnDestroy, OnInit } from '@angular/core';
import { CounterEditorComponent } from '../widgets/counter/counter-editor/counter-editor.component';
import { RollEditorComponent } from '../widgets/roll-editor/roll-editor.component';
import { CompositeEditorComponent } from '../widgets/composite/composite-editor/composite-editor.component';
// import { FifthEditionEditorComponent } from '../fifth-edition-editor/fifth-edition-editor.component';
import { CharacterService } from '../../services/character.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-editor-tab',
  imports: [
    CommonModule,
    MatButtonModule,
    CounterEditorComponent,
    RollEditorComponent,
    CompositeEditorComponent,
    // FifthEditionEditorComponent
  ],
  templateUrl: './editor-tab.component.html',
  styleUrl: './editor-tab.component.scss'
})
export class EditorTabComponent implements OnInit, OnDestroy {

  //composite
  showCompositeEditor:boolean = false;
  compositeName: string = "";
  compositeData: any = {};

  //roll
  showRollEditor:boolean = false;
  rollName:string = "";
  rollData:string = "";

  //counter
  showCounterEditor:boolean = false;
  counterName:string = "";
  counterData:any = {};

  //special editors
  showFifthEditionEditor:boolean = false;

  //character 
  private characterDataSubscription:Subscription;
  characterData:any;

  constructor(private characterService:CharacterService){}

  ngOnInit(): void {
    this.characterDataSubscription = this.characterService.getCharacterObservable().subscribe((value:any)=>{
      this.characterData = value;
    })
  }

  ngOnDestroy(): void {
    if(this.characterDataSubscription){
      this.characterDataSubscription.unsubscribe();
    }
  }

  newComposite(){
    this.showCompositeEditor = true;
    this.compositeName = "";
    this.compositeData = {}; 

  }

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
        this.characterService.characterHandler.deleteComposite(event.originalName);
      }
      this.characterService.characterHandler.addComposite(event.compositeName, event.compositeData);
      this.showCompositeEditor = false;
    }

    if(event.action == "cancel"){
      this.showCompositeEditor = false;
    }
  }

  newCounter(){
    this.counterName = "";
    this.counterData = {max: 10, min:0, total: 10};
    this.showCounterEditor = true;
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
        this.characterService.characterHandler.deleteCounter(event.originalName);
      }
      this.characterService.characterHandler.addCounter(event.counterName, event.counterData);
      this.showCounterEditor = false;
    }

    if(event.action == "cancel"){
      this.showCounterEditor = false;
    }
  }

  newRoll(){
    this.showRollEditor = true;
    this.rollName = "";
    this.rollData = "";
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
        this.characterService.characterHandler.deleteRoll(event.originalName);
      }
      this.characterService.characterHandler.addRoll(event.rollName, event.rollData);
      this.showRollEditor = false;
    }

    if(event.action == "cancel"){
      this.showRollEditor = false;
    }
  }

  deleteDataStructure(event:any){
    console.log("delete prompt for: ", event);
    if(confirm(`Are you sure that you want to delete ${event.type} "${event.originalName}"?`)){
      switch(event.type){
        case "roll":
          this.characterService.characterHandler.deleteRoll(event.originalName);
          this.showRollEditor = false;
          break;
        case "counter":
          this.characterService.characterHandler.deleteCounter(event.originalName);
          this.showCounterEditor = false;
          break;
        case "composite":
          this.characterService.characterHandler.deleteComposite(event.originalName);
          this.showCompositeEditor = false;
          break;
      }
    }
  }

}