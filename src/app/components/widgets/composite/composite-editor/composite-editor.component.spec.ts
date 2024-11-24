import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompositeEditorComponent } from './composite-editor.component';

describe('CompositeEditorComponent', () => {
  let component: CompositeEditorComponent;
  let fixture: ComponentFixture<CompositeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompositeEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompositeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
