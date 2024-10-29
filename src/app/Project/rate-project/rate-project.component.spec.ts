import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateProjectComponent } from './rate-project.component';

describe('RateProjectComponent', () => {
  let component: RateProjectComponent;
  let fixture: ComponentFixture<RateProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
