import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type DisplayMode = 'popup' | 'inline';

@Component({
  selector: 'app-display-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display-toggle.html',
  styleUrls: ['./display-toggle.css']
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
