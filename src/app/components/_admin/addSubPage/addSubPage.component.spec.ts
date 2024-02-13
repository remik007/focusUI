import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubPageComponent } from './addSubPage.component';

describe('AddSubPageComponent', () => {
  let component: AddSubPageComponent;
  let fixture: ComponentFixture<AddSubPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
