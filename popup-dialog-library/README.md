# Popup Dialog Library

A reusable Angular popup dialog component library designed for rules engine UI applications.

## Features

- 🎯 **Standalone Component**: Works with modern Angular applications
- 🎨 **Professional Styling**: Clean, modern design with responsive layout
- 🔧 **Highly Configurable**: Input/Output properties for easy customization
- 📱 **Mobile Friendly**: Responsive design that works on all devices
- ♿ **Accessible**: Keyboard navigation and screen reader support
- 🎭 **Multiple Close Options**: Click outside, close button, or custom actions

## Installation

Since this is a local library, you can import it directly in your Angular application.

## Usage

### Basic Example

```typescript
import { PopupDialogComponent, User } from 'popup-dialog-library';

@Component({
  selector: 'app-example',
  imports: [PopupDialogComponent],
  template: `
    <button (click)="showDialog()">Show User Details</button>
    
    <lib-popup-dialog 
      [isVisible]="isDialogVisible"
      [user]="selectedUser"
      (close)="closeDialog()">
    </lib-popup-dialog>
  `
})
export class ExampleComponent {
  isDialogVisible = false;
  selectedUser: User = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1-555-123-4567'
  };

  showDialog() {
    this.isDialogVisible = true;
  }

  closeDialog() {
    this.isDialogVisible = false;
  }
}
```

## API Reference

### PopupDialogComponent

#### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `isVisible` | `boolean` | `false` | Controls the visibility of the dialog |
| `user` | `User \| null` | `null` | User data to display in the dialog |

#### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `close` | `EventEmitter<void>` | Emitted when the dialog should be closed |

#### Methods

| Method | Description |
|--------|-------------|
| `onClose()` | Programmatically close the dialog |
| `onBackdropClick(event)` | Handle backdrop click to close dialog |

### User Interface

```typescript
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
```

## Styling

The component comes with built-in professional styling. You can override styles by targeting the component classes:

```css
/* Custom styling example */
lib-popup-dialog .popup-content {
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

lib-popup-dialog .btn-primary {
  background-color: #28a745;
}
```

## Features in Detail

### 🎯 Multiple Close Methods
- Click the X button in the header
- Click the Close button in the footer  
- Click outside the dialog (backdrop)
- ESC key support (future enhancement)

### 📱 Responsive Design
- Adapts to different screen sizes
- Touch-friendly on mobile devices
- Optimal viewing on tablets and desktops

### 🎨 Professional Styling
- Modern flat design
- Smooth animations and transitions
- Consistent with enterprise UI standards
- Accessibility-compliant color contrast

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This library is part of the Rules Engine UI project. For contributions and issues, please refer to the main project repository.

## License

MIT License - see the main project for details.
