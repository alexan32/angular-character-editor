import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AttributeComponent } from '../widgets/attribute/attribute.component';
import { CounterEditorComponent } from '../widgets/counter/counter-editor/counter-editor.component';
// import { CounterWidgetComponent } from '../widgets/counter/counter-widget/counter-widget.component';
import { CommonModule } from '@angular/common';
import { CharacterService } from '../../services/character.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-fifth-edition-editor',
  standalone: true,
  imports: [
    AttributeComponent,
    CommonModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './fifth-edition-editor.component.html',
  styleUrl: './fifth-edition-editor.component.scss'
})


export class FifthEditionEditorComponent implements OnInit, OnDestroy{

  characterLevel: number = 1;
  armorClass: number = 10;
  spellModifier: string = "cha";

  characterData: any;
  private characterDataSubscription: Subscription;

  constructor(private characterService:CharacterService){}

  ngOnInit(): void {
    this.characterDataSubscription = this.characterService.getCharacterObservable().subscribe((value:any)=>this.updateLocalVariables(value));
  }

  ngOnDestroy(): void {
    if(this.characterDataSubscription){
      this.characterDataSubscription.unsubscribe();
    }
  }

  exit(){
    this.characterService.publishCharacterEvent({name: "reset_editors"})
  }

  updateLocalVariables(characterData:any){
    this.characterData = characterData;
    this.characterLevel = characterData?.counters?.level?.total || 1;
    this.armorClass = Number(characterData?.roll?.armorclass) || 10;
    this.spellModifier = characterData?.composites?.spell_attack?.modifier || "cha";
  }

  setSpellModifier(event:any){
    this.updateRoll("spell_save", `8 + ${event} + prof`);
    this.updateComposite("spell_attack", {
      "base": "1d20",
      "modifier": event,
      "proficiency": "prof",
      "bonus": "0"
    })
  }

  updateCounter(key:string, total:number, max:number, min:number){
    this.characterService.characterHandler.addCounter(key, {
      max: max,
      min: min,
      total: total
    });
  }

  updateRoll(key:string, roll:any){
    this.characterService.characterHandler.addRoll(key, String(roll));
  }

  updateComposite(key:string, data:any){
    this.characterService.characterHandler.addComposite(key, data)
  }

}
