import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppChildForComponent } from './app-child-for.component';

describe('AppChildForComponent', () => {
  let component: AppChildForComponent;
  let fixture: ComponentFixture<AppChildForComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppChildForComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppChildForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
