import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent } from './alert.component';
import { By } from '@angular/platform-browser';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AlertComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
  });

  it('should create the AlertComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should display a message when input is provided', () => {
    component.message = 'Test Alert!';
    fixture.detectChanges();
    const alertElement = fixture.debugElement.query(By.css('.custom-alert'));
    expect(alertElement).not.toBeNull();
    expect(alertElement.nativeElement.textContent).toContain('Test Alert!');
  });

  it('should not display alert when message is empty', () => {
    component.message = '';
    fixture.detectChanges();
    const alertElement = fixture.debugElement.query(By.css('.custom-alert'));
    expect(alertElement).toBeNull();
  });

  it('should apply "alert-success" class when type is true', () => {
    component.message = 'Success!';
    component.type = true;
    fixture.detectChanges();
    const alertElement = fixture.debugElement.query(By.css('.custom-alert'));
    expect(alertElement.nativeElement.classList).toContain('alert-success');
  });

  it('should apply "alert-danger" class when type is false', () => {
    component.message = 'Error!';
    component.type = false;
    fixture.detectChanges();
    const alertElement = fixture.debugElement.query(By.css('.custom-alert'));
    expect(alertElement.nativeElement.classList).toContain('alert-danger');
  });

  it('should clear message when close button is clicked', () => {
    component.message = 'Close me!';
    fixture.detectChanges();
    const closeButton = fixture.debugElement.query(By.css('button'));
    closeButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.message).toBe('');
  });

  it('should remove alert element when message is cleared after clicking close button', () => {
    component.message = 'Dismiss me!';
    fixture.detectChanges();
    const closeButton = fixture.debugElement.query(By.css('button'));
    closeButton.nativeElement.click();
    fixture.detectChanges();
    const alertElement = fixture.debugElement.query(By.css('.custom-alert'));
    expect(alertElement).toBeNull();
  });
});
