import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastdueescalationComponent } from './pastdueescalation.component';

describe('PastdueescalationComponent', () => {
  let component: PastdueescalationComponent;
  let fixture: ComponentFixture<PastdueescalationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastdueescalationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastdueescalationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
