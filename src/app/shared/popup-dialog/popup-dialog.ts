import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';

@Component({
  selector: 'app-popup-dialog',
  imports: [CommonModule],
  templateUrl: './popup-dialog.html',
  styleUrl: './popup-dialog.css'
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
