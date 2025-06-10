import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenotificationtemplateComponent } from './createnotificationtemplate.component';

describe('CreatenotificationtemplateComponent', () => {
  let component: CreatenotificationtemplateComponent;
  let fixture: ComponentFixture<CreatenotificationtemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatenotificationtemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatenotificationtemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
