# Insert Form Library

A reusable Angular library providing insert functionality with popup and inline display modes.

## Features

- ✅ **Dual Display Modes**: Popup and inline display options
- ✅ **Form Validation**: Comprehensive validation with error messages
- ✅ **Data Processing**: Submit handling with success/error feedback
- ✅ **Accessibility**: ARIA labels and keyboard navigation
- ✅ **Responsive Design**: Mobile-friendly interface
- ✅ **TypeScript Support**: Full type safety

## Components

### InsertFormComponent

A form component for adding new users with validation and submission handling.

**Inputs:**
- `displayMode: 'popup' | 'inline'` - Display mode (default: 'popup')
- `title?: string` - Form title (default: 'Add New User')
- `isVisible: boolean` - Visibility state (default: false)

**Outputs:**
- `onInsert: EventEmitter<InsertResult>` - Emitted when form is submitted
- `onClose: EventEmitter<void>` - Emitted when form is closed
- `onValidationChange: EventEmitter<ValidationResult>` - Emitted when validation state changes

### DisplayToggleComponent

A toggle button that switches between popup and inline display modes.

**Inputs:**
- `currentMode: DisplayMode` - Current display mode (default: 'popup')
- `inlineLabel: string` - Label for inline mode button (default: 'Show Inline')
- `popupLabel: string` - Label for popup mode button (default: 'Show Popup')
- `disabled: boolean` - Whether the button is disabled (default: false)

**Outputs:**
- `modeChange: EventEmitter<DisplayMode>` - Emitted when mode changes

## Usage Example

```typescript
import { Component } from '@angular/core';
import { InsertFormComponent, DisplayToggleComponent, DisplayMode, InsertResult } from 'insert-form-library';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [InsertFormComponent, DisplayToggleComponent],
  template: `
    <div class="container">
      <!-- Toggle Button -->
      <lib-display-toggle
        [currentMode]="displayMode"
        (modeChange)="onModeChange($event)">
      </lib-display-toggle>

      <!-- Add User Button -->
      <button (click)="showForm = true">Add New User</button>

      <!-- Insert Form -->
      <lib-insert-form
        *ngIf="showForm"
        [displayMode]="displayMode"
        [isVisible]="showForm"
        (onInsert)="handleInsert($event)"
        (onClose)="showForm = false">
      </lib-insert-form>
    </div>
  `
})
export class ExampleComponent {
  displayMode: DisplayMode = 'popup';
  showForm = false;

  onModeChange(mode: DisplayMode) {
    this.displayMode = mode;
  }

  handleInsert(result: InsertResult) {
    if (result.success) {
      console.log('User added:', result.data);
      // Handle successful insertion
    } else {
      console.error('Error:', result.message);
      // Handle error
    }
  }
}
```

## Interfaces

### UserInsertData
```typescript
interface UserInsertData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
```

### InsertResult
```typescript
interface InsertResult {
  success: boolean;
  data?: UserInsertData;
  message: string;
}
```

### ValidationResult
```typescript
interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}
```

## Installation

1. Copy the library folder to your project
2. Import the required components
3. Add to your module or component imports

## Dependencies

- @angular/core ^18.0.0
- @angular/common ^18.0.0
- @angular/forms ^18.0.0
- rxjs ^7.0.0

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
