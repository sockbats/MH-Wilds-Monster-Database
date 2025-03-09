import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterDataComponent } from './monster-data.component';

describe('MonsterSelectorComponent', () => {
  let component: MonsterDataComponent;
  let fixture: ComponentFixture<MonsterDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonsterDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonsterDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
