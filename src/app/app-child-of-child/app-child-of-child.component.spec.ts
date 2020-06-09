import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppChildOfChildComponent } from './app-child-of-child.component';

describe('AppChildOfChildComponent', () => {
  let component: AppChildOfChildComponent;
  let fixture: ComponentFixture<AppChildOfChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppChildOfChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppChildOfChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
