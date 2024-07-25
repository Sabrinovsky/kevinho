import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('FormComponent', () => {
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    fixture.componentRef.setInput('options', [
      'option 1',
      'option 2',
      'option 3',
      'option 4',
    ]);
    fixture.componentRef.setInput('initialValues', { select: 'option 1' });
    fixture.detectChanges();
  });

  it('should have a default value', () => {
    // fixture.nativeElement.click();
    // fixture.detectChanges();
    const select = fixture.debugElement.query(By.css('mat-select'));
    expect(select.nativeElement.textContent).toBe('option 1');
  });
});
