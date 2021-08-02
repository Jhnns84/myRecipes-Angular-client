import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealtypeComponent } from './mealtype.component';

describe('MealtypeComponent', () => {
  let component: MealtypeComponent;
  let fixture: ComponentFixture<MealtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealtypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
