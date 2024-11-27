import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterWidgetComponent } from '../counter/counter-widget/counter-widget.component';
import { FifthEditionSkillComponent } from "../composite/fifth-edition-skill/fifth-edition-skill.component";
import { CharacterService } from '../../../services/character.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-attribute',
  standalone: true,
  imports: [
    CounterWidgetComponent, 
    FifthEditionSkillComponent,
    CommonModule
  ],
  templateUrl: './attribute.component.html',
  styleUrl: './attribute.component.scss'
})
export class AttributeComponent implements OnInit, OnDestroy {

  counterData = {
    max: 20,
    min: 0,
    total: 8
  }

  modifierMap:any = {
    "strength": "str",
    "dexterity": "dex",
    "constitution": "con",
    "intelligence": "int",
    "wisdom": "wis",
    "charisma": "cha"
  }

  _attributeName: string = "";
  @Input() set attributeName(value:string){
    this._attributeName = value;
  }

  
  _skills:Array<string> = [];
  @Input() set skills(skillList:Array<string>){
    this._skills = skillList;
  }

  characterData: any;
  characterDataSubscription:Subscription;

  constructor(private characterService:CharacterService){}

  ngOnInit(): void {
    this.characterDataSubscription = this.characterService.getCharacterObservable().subscribe((value:any)=>this.updateLocalVariables(value));
  }

  ngOnDestroy(): void {
    if(this.characterDataSubscription){
      this.characterDataSubscription.unsubscribe();
    }
  }

  updateLocalVariables(value:any){
    this.characterData = value;
    let counters = this.characterData?.counters || {};
    if(counters.hasOwnProperty(this._attributeName)){
      this.counterData = counters[this._attributeName];
    }
  }

  updateAttribute(event:any){
    console.log("update character attribute: ", this._attributeName)
    this.characterService.characterHandler.addCounter(event.counterName, event.counterData);
  }

  updateComposite(name:string, event:any){
    const composite = {
      "base": "1d20",
      "modifier": this.modifierMap[this._attributeName],
      "proficiency": event.proficiencyLevel,
      "bonus": "0"
    }
    this.characterService.characterHandler.addComposite(name, composite);
  }


}
