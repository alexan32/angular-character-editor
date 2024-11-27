import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-fifth-edition-skill',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './fifth-edition-skill.component.html',
  styleUrl: './fifth-edition-skill.component.scss'
})
export class FifthEditionSkillComponent {

  state:string = "0" // 0 | prof | expert

  _characterData: any = {};
  _characterHandler: any = {};
  @Input() set characterHandler(characterHandler:any){
    this._characterHandler = characterHandler;
  }

  @Input() skillName:string = "";

  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();


  toggle(){
    switch (this.state){
      case "0": 
        this.state = "prof";
        break;
      case "prof":
        this.state = "expert";
        break;
      case "expert":
        this.state = "0";
        break;
      default:
        this.state = "0";
    }
    this.dataChange.emit({
      "name": this.skillName,
      "proficiencyLevel": this.state
    })
  }

}
