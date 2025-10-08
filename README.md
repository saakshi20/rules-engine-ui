# Rules Engine UI - Proof of Concept

> A modern Angular-based user interface for rules engine applications, featuring reusable components and professional design.

![Angular](https://img.shields.io/badge/Angular-18-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Status](https://img.shields.io/badge/Status-Active-green)

## 🎯 Overview

This project demonstrates a proof of concept for a custom user interface using Angular to validate the feasibility of proposed UI design and architecture for rules engine workflows. The application showcases key UI interactions through a user management interface with popup dialogs.

## 🏗️ Project Structure

```
rules-engine-ui/
├── 📂 popup-dialog-library/          # Reusable popup component library
│   ├── 📄 README.md                  # Library documentation
│   ├── 📄 package.json               # Library configuration
│   └── 📂 src/lib/                   # Library source code
│
├── 📂 rules-engine-ui/               # Main Angular application
│   ├── 📂 src/app/
│   │   ├── 📂 components/            # Feature components
│   │   ├── 📂 shared/                # Shared components
│   │   ├── 📂 models/                # TypeScript interfaces
│   │   └── 📂 services/              # Data services
│   └── 📄 package.json               # App dependencies
│
├── 📄 README.md                      # This file
└── 📄 .gitignore                     # Git ignore rules
```

## ✨ Features

### 🎨 User Interface
- **Modern Design**: Professional styling with gradients and animations
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Interactive Elements**: Hover effects, smooth transitions, and visual feedback

### 📊 Data Management
- **User List Display**: Clean table format showing user information
- **Mock Data Service**: Realistic sample data for development
- **Type Safety**: Full TypeScript implementation with interfaces

### 🔧 Popup Dialog Library
- **Reusable Component**: Standalone library for use across projects
- **Multiple Close Options**: Click outside, close button, or ESC key
- **Professional Modal**: Clean design with header, body, and footer sections

### 🏛️ Architecture
- **Component-Based**: Modular Angular components
- **Service Pattern**: Separation of data logic and UI components
- **Modern Angular**: Uses latest Angular 18 features and standalone components

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Angular CLI 18+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/saakshi20/rules-engine-ui.git
   cd rules-engine-ui
   ```

2. **Install dependencies**
   ```bash
   cd rules-engine-ui
   npm install
   ```

3. **Start development server**
   ```bash
   ng serve --open
   ```

4. **Open browser**
   Navigate to `http://localhost:4200/`

## 💡 Usage

### User List Interface
1. View the user management table with sample data
2. Click "View Details" button for any user
3. Popup dialog displays complete user information
4. Close dialog using X button, Close button, or click outside

### Using the Popup Library
```typescript
import { PopupDialogComponent, User } from 'popup-dialog-library';

@Component({
  selector: 'app-example',
  imports: [PopupDialogComponent],
  template: `
    <lib-popup-dialog 
      [isVisible]="showDialog"
      [user]="selectedUser"
      (close)="closeDialog()">
    </lib-popup-dialog>
  `
})
export class ExampleComponent {
  // Implementation
}
```

## 🛠️ Development

### Code Structure
- **Components**: Feature-specific UI components
- **Services**: Data management and business logic
- **Models**: TypeScript interfaces for type safety
- **Shared**: Reusable components and utilities

### Key Commands
```bash
# Development server
ng serve

# Build for production
ng build

# Run tests
ng test

# Code linting
ng lint
```

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## 🎯 Design Validation

### ✅ Proof of Concept Results
- **✅ Component Architecture**: Successfully implemented modular components
- **✅ Shared Library**: Popup dialog component is reusable across applications
- **✅ Data Integration**: Mock data service demonstrates API integration patterns
- **✅ UI Interactions**: All key interactions work as expected
- **✅ Responsive Design**: Interface adapts to different screen sizes
- **✅ Professional Styling**: Modern, clean appearance suitable for enterprise use

## 🔮 Future Enhancements

- [ ] Real backend API integration
- [ ] Advanced form components
- [ ] Data filtering and sorting
- [ ] Pagination for large datasets
- [ ] Dark mode support
- [ ] Internationalization (i18n)
- [ ] Unit and integration tests
- [ ] CI/CD pipeline

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙋‍♀️ Support

For support and questions:
- Create an issue in this repository
- Contact: [Your Email]

---

**Made with ❤️ using Angular 18 and TypeScript**
