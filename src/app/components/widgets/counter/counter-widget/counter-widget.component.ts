import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ScrollTextComponent } from '../../scroll-text/scroll-text.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-counter-widget',
  standalone: true,
  imports: [ScrollTextComponent, CommonModule, FormsModule, MatIconModule],
  templateUrl: './counter-widget.component.html',
  styleUrl: './counter-widget.component.css'
})
export class CounterWidgetComponent {

  @Input() counterData = {
    max: 10,
    min:0,
    total: 10
  };

  @Input() counterName = "";

  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();

  increment(){
    this.counterData.total++;
    if(this.counterData.total > this.counterData.max){
      this.counterData.total = this.counterData.max;
    }
    this.emit();
  }

  decrement(){
    this.counterData.total--;
    if(this.counterData.total < this.counterData.min){
      this.counterData.total = this.counterData.min;
    }
    this.emit();
  }

  emit(){
    this.dataChange.emit({"action": "confirm", "counterName": this.counterName, "counterData": this.counterData});
  }

}
