import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-article-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './article-editor.component.html',
  styleUrl: './article-editor.component.css'
})
export class ArticleEditorComponent {
  _originalArticleData: string = "";
  _articleData: string = "";
  @Input() set articleData(articleData:string){
    this._originalArticleData = articleData;
    this._articleData = articleData;
  }

  _originalArticleName: string = "";
  _articleName: string = "";
  @Input() set articleName(articleName:string){
    this._originalArticleName = articleName;
    this._articleName = articleName;
  }

  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();


  confirmChanges(){
    this.dataChange.emit({
      action: "confirm", 
      originalName: this._originalArticleName,
      articleName: this._articleName, 
      articleData: this._articleData
    });
  }

  cancelChanges(){
    this.dataChange.emit({
      action: "cancel", 
      originalName: this._originalArticleName,
      articleName: this._originalArticleName, 
      articleData: this._originalArticleData
    });
  }

  deleteArticle(){
    this.dataChange.emit({
      action: "delete", 
      originalName: this._originalArticleName,
      articleName: this._originalArticleName, 
      articleData: this._originalArticleData
    });
  }
}
