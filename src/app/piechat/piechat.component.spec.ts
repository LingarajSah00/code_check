import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiechatComponent } from './piechat.component';

describe('PiechatComponent', () => {
  let component: PiechatComponent;
  let fixture: ComponentFixture<PiechatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PiechatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiechatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
