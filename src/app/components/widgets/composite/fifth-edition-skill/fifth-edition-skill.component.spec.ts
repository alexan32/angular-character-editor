import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FifthEditionSkillComponent } from './fifth-edition-skill.component';

describe('FifthEditionSkillComponent', () => {
  let component: FifthEditionSkillComponent;
  let fixture: ComponentFixture<FifthEditionSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FifthEditionSkillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FifthEditionSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
