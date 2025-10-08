import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../models/user.interface';

// Re-export the User interface for convenience
export { User } from '../models/user.interface';

@Component({
  selector: 'lib-popup-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup-dialog.component.html',
  styleUrl: './popup-dialog.component.css'
})
export class PopupDialogComponent {
  @Input() isVisible: boolean = false;
  @Input() user: User | null = null;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }
}
