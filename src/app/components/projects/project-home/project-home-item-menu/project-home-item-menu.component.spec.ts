import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectHomeItemMenuComponent } from './project-home-item-menu.component';

describe('ProjectHomeItemMenuComponent', () => {
  let component: ProjectHomeItemMenuComponent;
  let fixture: ComponentFixture<ProjectHomeItemMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectHomeItemMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectHomeItemMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
