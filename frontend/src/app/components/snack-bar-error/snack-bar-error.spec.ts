import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarError } from './snack-bar-error';

describe('SnackBarError', () => {
  let component: SnackBarError;
  let fixture: ComponentFixture<SnackBarError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnackBarError]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnackBarError);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
