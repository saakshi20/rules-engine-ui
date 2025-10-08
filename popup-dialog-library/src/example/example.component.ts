import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupDialogComponent, User } from '../lib/popup-dialog/popup-dialog.component';

@Component({
  selector: 'lib-example',
  standalone: true,
  imports: [CommonModule, PopupDialogComponent],
  template: `
    <div class="example-container">
      <h2>Popup Dialog Library Example</h2>
      <p>This demonstrates how to use the popup dialog component from the library.</p>
      
      <button 
        class="demo-button" 
        (click)="showDialog()">
        Show User Details
      </button>
      
      <lib-popup-dialog 
        [isVisible]="isDialogVisible"
        [user]="demoUser"
        (close)="closeDialog()">
      </lib-popup-dialog>
    </div>
  `,
  styles: [`
    .example-container {
      padding: 20px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    
    .demo-button {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.2s;
    }
    
    .demo-button:hover {
      background-color: #0056b3;
    }
  `]
})
export class ExampleComponent {
  isDialogVisible = false;
  
  demoUser: User = {
    id: 1,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '+1-555-987-6543'
  };

  showDialog() {
    this.isDialogVisible = true;
  }

  closeDialog() {
    this.isDialogVisible = false;
  }
}
