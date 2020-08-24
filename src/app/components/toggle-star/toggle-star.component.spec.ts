import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleStarComponent } from './toggle-star.component';

describe('ToggleStarComponent', () => {
  let component: ToggleStarComponent;
  let fixture: ComponentFixture<ToggleStarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleStarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
