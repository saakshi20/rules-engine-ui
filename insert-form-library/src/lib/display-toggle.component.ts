import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type DisplayMode = 'popup' | 'inline';

@Component({
  selector: 'lib-display-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      class="display-toggle-btn"
      [class.popup-mode]="currentMode === 'popup'"
      [class.inline-mode]="currentMode === 'inline'"
      (click)="toggleMode()"
      [attr.aria-label]="getAriaLabel()"
      type="button">
      
      <span class="toggle-icon">
        <ng-container *ngIf="currentMode === 'popup'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        </ng-container>
        <ng-container *ngIf="currentMode === 'inline'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z"/>
          </svg>
        </ng-container>
      </span>
      
      <span class="toggle-text">
        {{ getButtonText() }}
      </span>
      
      <span class="toggle-indicator">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" class="arrow-icon">
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
        </svg>
      </span>
    </button>
  `,
  styleUrls: ['./display-toggle.component.css']
})
export class DisplayToggleComponent {
  @Input() currentMode: DisplayMode = 'popup';
  @Input() inlineLabel: string = 'Show Inline';
  @Input() popupLabel: string = 'Show Popup';
  @Input() disabled: boolean = false;
  
  @Output() modeChange = new EventEmitter<DisplayMode>();

  toggleMode() {
    if (this.disabled) return;
    
    const newMode: DisplayMode = this.currentMode === 'popup' ? 'inline' : 'popup';
    this.currentMode = newMode;
    this.modeChange.emit(newMode);
  }

  getButtonText(): string {
    return this.currentMode === 'popup' ? this.inlineLabel : this.popupLabel;
  }

  getAriaLabel(): string {
    return `Switch to ${this.currentMode === 'popup' ? 'inline' : 'popup'} display mode`;
  }
}
