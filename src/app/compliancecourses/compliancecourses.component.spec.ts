import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompliancecoursesComponent } from './compliancecourses.component';

describe('CompliancecoursesComponent', () => {
  let component: CompliancecoursesComponent;
  let fixture: ComponentFixture<CompliancecoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompliancecoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompliancecoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
