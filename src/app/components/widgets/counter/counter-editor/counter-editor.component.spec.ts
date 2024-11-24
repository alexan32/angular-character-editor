import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterEditorComponent } from './counter-editor.component';

describe('CounterEditorComponent', () => {
  let component: CounterEditorComponent;
  let fixture: ComponentFixture<CounterEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CounterEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
