import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-counter-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './counter-editor.component.html',
  styleUrl: './counter-editor.component.css'
})
export class CounterEditorComponent {

  _counterName:string = "";
  _originalName:string = "";
  @Input() set counterName(counterName:string){
    this._originalName = counterName;
    this._counterName = counterName;
  }

  _counterData:any = {max:0, min:0, total:0};
  _originalData:any = {max:0, min:0, total:0};
  @Input() set counterData(counterData:any){
    this._counterData = JSON.parse(JSON.stringify(counterData));
    this._originalData = JSON.parse(JSON.stringify(counterData));
  }

  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();


  updateValues(){
    if(this._counterData.max <= this._counterData.min){
      this._counterData.max = this._counterData.min + 1;
    }
    if(this._counterData.total < this._counterData.min){
      this._counterData.total = this._counterData.min;
    }else if(this._counterData.total > this._counterData.max){
      this._counterData.total = this._counterData.max;
    }
  }

  confirmChanges(){
    this.dataChange.emit({
      action: "confirm", 
      type: "counter",
      originalName: this._originalName,
      counterName: this._counterName, 
      counterData: this._counterData
    });
  }

  cancelChanges(){
    this.dataChange.emit({
      action: "cancel", 
      type: "counter",
      originalName: this._originalName,
      counterName: this._originalName, 
      counterData: this._originalData
    });
  }

  deleteCounter(){
    this.dataChange.emit({
      action: "delete", 
      type: "counter",
      originalName: this._originalName,
      counterName: this._originalName, 
      counterData: this._originalData
    });
  }

}
