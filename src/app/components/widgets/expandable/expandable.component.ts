import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-expandable',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './expandable.component.html',
  styleUrl: './expandable.component.css'
})
export class ExpandableComponent {

  @Input() title: string;

  @Input() template: TemplateRef<any>;

  @Input() showContent:boolean = false;

}
