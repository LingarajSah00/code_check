import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeecomplianceComponent } from './employeecompliance.component';

describe('EmployeecomplienceComponent', () => {
  let component: EmployeecomplianceComponent;
  let fixture: ComponentFixture<EmployeecomplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeecomplianceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeecomplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
