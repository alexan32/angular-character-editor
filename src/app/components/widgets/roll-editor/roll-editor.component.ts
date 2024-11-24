import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-roll-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './roll-editor.component.html',
  styleUrl: './roll-editor.component.css'
})
export class RollEditorComponent {

  _originalRollData: string = "";
  _rollData: string = "";
  @Input() set rollData(rollData:string){
    this._originalRollData = rollData;
    this._rollData = rollData;
  }

  _originalRollName: string = "";
  _rollName: string = "";
  @Input() set rollName(rollName:string){
    this._originalRollName = rollName;
    this._rollName = rollName;
  }

  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();


  confirmChanges(){
    this.dataChange.emit({
      action: "confirm", 
      type: "roll",
      originalName: this._originalRollName,
      rollName: this._rollName, 
      rollData: this._rollData
    });
  }

  cancelChanges(){
    this.dataChange.emit({
      action: "cancel", 
      type: "roll",
      originalName: this._originalRollName,
      rollName: this._originalRollName, 
      rollData: this._originalRollData
    });
  }

  deleteRoll(){
    this.dataChange.emit({
      action: "delete", 
      type: "roll",
      originalName: this._originalRollName,
      rollName: this._originalRollName, 
      rollData: this._originalRollData
    });
  }

}
