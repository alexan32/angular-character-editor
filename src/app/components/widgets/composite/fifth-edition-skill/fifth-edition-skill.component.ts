import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CharacterService } from '../../../../services/character.service';
import { Subscription } from 'rxjs';

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

  characterData: any;
  characterDataSubscription:Subscription;

  constructor(private characterService:CharacterService){}

  ngOnInit(): void {
    this.characterDataSubscription = this.characterService.getCharacterObservable().subscribe((value:any)=>{
      this.characterData = value;
      let composites = this.characterData?.composites;
      if(composites.hasOwnProperty(this.skillName)){
        let skill = composites[this.skillName];
        this.state = skill?.proficiency || this.state;
      }
    });
  }

  ngOnDestroy(): void {
    if(this.characterDataSubscription){
      this.characterDataSubscription.unsubscribe();
    }
  }

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
