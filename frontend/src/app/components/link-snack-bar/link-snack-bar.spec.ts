import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkSnackBar } from './link-snack-bar';

describe('LinkSnackBar', () => {
  let component: LinkSnackBar;
  let fixture: ComponentFixture<LinkSnackBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkSnackBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkSnackBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
