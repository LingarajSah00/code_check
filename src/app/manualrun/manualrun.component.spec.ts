import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualrunComponent } from './manualrun.component';

describe('ManualrunComponent', () => {
  let component: ManualrunComponent;
  let fixture: ComponentFixture<ManualrunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManualrunComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualrunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
