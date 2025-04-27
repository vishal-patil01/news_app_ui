import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderComponent } from './loader.component';
import { By } from '@angular/platform-browser';


describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderComponent], // Importing the standalone component
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the loader with spinner', () => {
    const loaderElement = fixture.debugElement.query(By.css('.loader'));
    const spinnerElement = fixture.debugElement.query(By.css('.spinner'));
    expect(loaderElement).toBeTruthy(); 
    expect(spinnerElement).toBeTruthy(); 
  });
});
