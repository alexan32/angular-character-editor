import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-article-widget',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './article-widget.component.html',
  styleUrl: './article-widget.component.css'
})
export class ArticleWidgetComponent {

  showInfo:boolean = false;

  @Input() articleName:string = "";
  @Input() articleData:string = "";
}
