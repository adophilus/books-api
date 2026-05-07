import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicYearsUpdatePageComponent } from './academic-years-update-page.component';

describe('AcademicYearsUpdatePageComponent', () => {
  let component: AcademicYearsUpdatePageComponent;
  let fixture: ComponentFixture<AcademicYearsUpdatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicYearsUpdatePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicYearsUpdatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
