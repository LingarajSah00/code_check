import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatememoComponent } from './creatememo.component';

describe('CreatememoComponent', () => {
  let component: CreatememoComponent;
  let fixture: ComponentFixture<CreatememoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatememoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatememoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
