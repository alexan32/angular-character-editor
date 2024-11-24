import { Component } from '@angular/core';
import { CharacterEditorComponent } from './components/character-editor/character-editor.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CharacterEditorComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'character-editor';
}
