import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-loader', 
  templateUrl: './loader.component.html', 
  styleUrls: ['./loader.component.css'] 
})
export class LoaderComponent {}