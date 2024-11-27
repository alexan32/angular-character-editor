import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FifthEditionEditorComponent } from './fifth-edition-editor.component';

describe('FifthEditionEditorComponent', () => {
  let component: FifthEditionEditorComponent;
  let fixture: ComponentFixture<FifthEditionEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FifthEditionEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FifthEditionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
