import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { CharacterOverviewComponent } from '../widgets/character/character-overview/character-overview.component';
import { characterMin, dnd5e } from '../../models/characterTemplates';
import { MatTooltip, TooltipPosition} from '@angular/material/tooltip';
import { CharacterService } from '../../services/character.service';
import { Subscription } from 'rxjs';
import { EditorTabComponent } from '../editor-tab/editor-tab.component';

@Component({
  selector: 'app-character-editor',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    MatTabsModule,
    CharacterOverviewComponent,
    MatTooltip,
    EditorTabComponent
  ],
  templateUrl: './character-editor.component.html',
  styleUrl: './character-editor.component.scss'
})
export class CharacterEditorComponent implements OnInit, OnDestroy{

  // characterData
  templateSelected:boolean = false;
  templateName:string|null = null;

  matTabIndex: number | null = 0;

  first:string = "";
  last:string = "";
  nameValid:boolean = false;

  characterData: any;
  private characterDataSubscription: Subscription;

  constructor(private characterService:CharacterService){}

  ngOnInit(): void {
    this.characterDataSubscription = this.characterService.getCharacterObservable().subscribe((value:any)=>{
      this.characterData = value;
      this.first = this.characterData?.first;
      this.last = this.characterData?.last;
      this.nameValid = (/^[a-z0-9]+$/i.test(this.first) && /^[a-z0-9]+$/i.test(this.last))
    });
  }

  ngOnDestroy(): void {
    if(this.characterDataSubscription){
      this.characterDataSubscription.unsubscribe();
    }
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
    this.templateName = template;
    if(template == "5e"){
      this.resetCharacterData(dnd5e)
    }else if(template == "characterMin"){
      this.resetCharacterData(characterMin)
    }
  }

  resetCharacterData(character:any){
    if(this.templateSelected){
      if (confirm("You have a character in progress. Do you wish to proceed? Doing so will undo your current progress.")){
        this.characterService.characterHandler.overwriteData(character);
      }
    }else{
      this.characterService.characterHandler.overwriteData(character);
    }
    this.templateSelected = true;
    this.matTabIndex = 1;
  }

  updateCharacterName(){
    this.characterData["first"] = this.first;
    this.characterData["last"] = this.last;
    this.characterService.characterHandler.overwriteData(this.characterData);
  
    this.nameValid = (/^[a-z0-9]+$/i.test(this.first) && /^[a-z0-9]+$/i.test(this.last))
  }

  downloadCharacter(){
    // this.characterService.saveCharacter(this.characterService.characterHandler.characterData);
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.characterService.characterHandler.characterData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    const first = this.characterService.characterHandler.characterData.first;
    const last = this.characterService.characterHandler.characterData.last;
    downloadAnchorNode.setAttribute("download", `${first}-${last}` + ".json");
    document.body.appendChild(downloadAnchorNode); // Required for Firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove(); // Remove the element after download
  }

}
