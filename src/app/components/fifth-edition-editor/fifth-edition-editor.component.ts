import { Component, Input } from '@angular/core';
import { AttributeComponent } from '../widgets/attribute/attribute.component';
import { CounterEditorComponent } from '../widgets/counter/counter-editor/counter-editor.component';
// import { CounterWidgetComponent } from '../widgets/counter/counter-widget/counter-widget.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-fifth-edition-editor',
  standalone: true,
  imports: [
    AttributeComponent,
    CommonModule
  ],
  templateUrl: './fifth-edition-editor.component.html',
  styleUrl: './fifth-edition-editor.component.scss'
})


export class FifthEditionEditorComponent {

  _characterData: any = {};
  _characterHandler: any = {};
  @Input() set characterHandler(characterHandler:any){
    this._characterHandler = characterHandler;
  }

}
