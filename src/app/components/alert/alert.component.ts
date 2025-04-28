import { Component } from '@angular/core';
import { Input } from '@angular/core'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input() message: string = '';
  @Input() type: boolean=false;
  closeAlert() {
    this.message = '';
  }
}
