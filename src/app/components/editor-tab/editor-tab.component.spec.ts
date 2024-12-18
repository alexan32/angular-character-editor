import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorTabComponent } from './editor-tab.component';

describe('EditorTabComponent', () => {
  let component: EditorTabComponent;
  let fixture: ComponentFixture<EditorTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
