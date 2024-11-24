import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleWidgetComponent } from './article-widget.component';

describe('ArticleWidgetComponent', () => {
  let component: ArticleWidgetComponent;
  let fixture: ComponentFixture<ArticleWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArticleWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
