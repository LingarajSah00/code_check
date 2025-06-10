import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClonememoComponent } from './clonememo.component';

describe('ClonememoComponent', () => {
  let component: ClonememoComponent;
  let fixture: ComponentFixture<ClonememoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClonememoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClonememoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
