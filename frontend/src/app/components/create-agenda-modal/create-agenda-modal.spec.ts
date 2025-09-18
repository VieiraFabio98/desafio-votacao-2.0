import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAgendaModal } from './create-agenda-modal';

describe('CreateAgendaModal', () => {
  let component: CreateAgendaModal;
  let fixture: ComponentFixture<CreateAgendaModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAgendaModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAgendaModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
