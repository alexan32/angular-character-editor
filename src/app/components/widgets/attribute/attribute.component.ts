import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterWidgetComponent } from '../counter/counter-widget/counter-widget.component';
import { FifthEditionSkillComponent } from "../composite/fifth-edition-skill/fifth-edition-skill.component";

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
export class AttributeComponent {

  counterData = {
    max: 20,
    min: 0,
    total: 8
  }
  _characterData: any = {};
  _characterHandler: any = {};
  @Input() set characterHandler(characterHandler:any){
    this._characterHandler = characterHandler;
  }

  @Input() attributeName:string = "";
  
  _skills:Array<string> = [];
  @Input() set skills(skillList:Array<string>){
    this._skills = skillList;
  }

}
