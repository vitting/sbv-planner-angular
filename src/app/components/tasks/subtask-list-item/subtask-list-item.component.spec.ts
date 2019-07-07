import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtaskListItemComponent } from './subtask-list-item.component';

describe('SubtaskListItemComponent', () => {
  let component: SubtaskListItemComponent;
  let fixture: ComponentFixture<SubtaskListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtaskListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtaskListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
