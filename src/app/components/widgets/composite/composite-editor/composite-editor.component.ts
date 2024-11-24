import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-composite-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './composite-editor.component.html',
  styleUrl: './composite-editor.component.css'
})
export class CompositeEditorComponent {

  mouseIndex:number = -1;

  _compositeName:string = "";
  _originalName:string = "";
  @Input() set compositeName(compositeName:string){
    this._originalName = compositeName;
    this._compositeName = compositeName;
  }

  _originalData:any = {};
  _rows:Array<any> = [];
  @Input() set compositeData(compositeData:any){
    this._originalData = JSON.parse(JSON.stringify(compositeData));
    this._rows = [];
    for(var key in this._originalData){
      this._rows.push({"key": key, "data": this._originalData[key]})
    }
  }

  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();

  addRow(){
    this._rows.push({key: "", data: ""})
  }

  deleteRow(index:number){
    this._rows.splice(index, 1)
  }

  confirmChanges(){
    let temp:any = {};
    this._rows.forEach(x=>{
      console.log(x.key, x.data);
      temp[x.key] = x.data;
    });
    console.log(temp);

    this.dataChange.emit({
      action: "confirm", 
      type: "composite",
      originalName: this._originalName,
      compositeName: this._compositeName, 
      compositeData: temp
    });
  }

  cancelChanges(){
    this.dataChange.emit({
      action: "cancel", 
      type: "composite",
      originalName: this._originalName,
      compositeName: this._originalName, 
      compositeData: this._originalData
    });
  }

  deleteComposite(){
    this.dataChange.emit({
      action: "delete", 
      type: "composite",
      originalName: this._originalName,
      compositeName: this._originalName, 
      compositeData: this._originalData
    });
  }

}