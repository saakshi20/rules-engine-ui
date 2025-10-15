import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

export interface UserInsertData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}

export interface InsertResult {
  success: boolean;
  data?: UserInsertData;
  message: string;
}

@Component({
  selector: 'lib-insert-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="insert-form-container" [class.popup-mode]="displayMode === 'popup'" [class.inline-mode]="displayMode === 'inline'">
      <!-- Popup Overlay (only in popup mode) -->
      <div *ngIf="displayMode === 'popup'" class="popup-overlay" (click)="onCancel()"></div>
      
      <!-- Form Content -->
      <div class="form-content" [class.popup-content]="displayMode === 'popup'" [class.inline-content]="displayMode === 'inline'">
        <!-- Header -->
        <div class="form-header">
          <h2>{{ title || 'Add New User' }}</h2>
          <button *ngIf="displayMode === 'popup'" class="close-btn" (click)="onCancel()" type="button">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <!-- Form -->
        <form [formGroup]="insertForm" (ngSubmit)="onSubmit()" class="insert-form">
          <!-- First Name -->
          <div class="form-group">
            <label for="firstName" class="form-label">First Name *</label>
            <input
              id="firstName"
              type="text"
              formControlName="firstName"
              class="form-input"
              [class.error]="isFieldInvalid('firstName')"
              placeholder="Enter first name"
            />
            <div *ngIf="isFieldInvalid('firstName')" class="error-message">
              {{ getFieldError('firstName') }}
            </div>
          </div>

          <!-- Last Name -->
          <div class="form-group">
            <label for="lastName" class="form-label">Last Name *</label>
            <input
              id="lastName"
              type="text"
              formControlName="lastName"
              class="form-input"
              [class.error]="isFieldInvalid('lastName')"
              placeholder="Enter last name"
            />
            <div *ngIf="isFieldInvalid('lastName')" class="error-message">
              {{ getFieldError('lastName') }}
            </div>
          </div>

          <!-- Email -->
          <div class="form-group">
            <label for="email" class="form-label">Email *</label>
            <input
              id="email"
              type="email"
              formControlName="email"
              class="form-input"
              [class.error]="isFieldInvalid('email')"
              placeholder="Enter email address"
            />
            <div *ngIf="isFieldInvalid('email')" class="error-message">
              {{ getFieldError('email') }}
            </div>
          </div>

          <!-- Phone -->
          <div class="form-group">
            <label for="phone" class="form-label">Phone *</label>
            <input
              id="phone"
              type="tel"
              formControlName="phone"
              class="form-input"
              [class.error]="isFieldInvalid('phone')"
              placeholder="Enter phone number"
            />
            <div *ngIf="isFieldInvalid('phone')" class="error-message">
              {{ getFieldError('phone') }}
            </div>
          </div>

          <!-- Success Message -->
          <div *ngIf="showSuccessMessage" class="success-message">
            <span class="success-icon">✓</span>
            {{ successMessage }}
          </div>

          <!-- Form Actions -->
          <div class="form-actions">
            <button type="button" class="btn-cancel" (click)="onCancel()">
              Cancel
            </button>
            <button type="submit" class="btn-submit" [disabled]="isSubmitting">
              <span *ngIf="isSubmitting" class="spinner"></span>
              {{ isSubmitting ? 'Adding...' : 'Add User' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['./insert-form.component.css']
})
export class InsertFormComponent implements OnInit {
  @Input() displayMode: 'popup' | 'inline' = 'popup';
  @Input() title?: string;
  @Input() isVisible: boolean = false;
  
  @Output() onInsert = new EventEmitter<InsertResult>();
  @Output() onClose = new EventEmitter<void>();
  @Output() onValidationChange = new EventEmitter<ValidationResult>();

  insertForm!: FormGroup;
  isSubmitting = false;
  showSuccessMessage = false;
  successMessage = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.insertForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[+]?[0-9\s\-\(\)]{10,15}$/)]]
    });

    // Emit validation changes
    this.insertForm.valueChanges.subscribe(() => {
      this.emitValidationState();
    });

    this.insertForm.statusChanges.subscribe(() => {
      this.emitValidationState();
    });
  }

  private emitValidationState() {
    const errors: { [key: string]: string } = {};
    
    Object.keys(this.insertForm.controls).forEach(key => {
      const control = this.insertForm.get(key);
      if (control && control.invalid && control.touched) {
        errors[key] = this.getFieldError(key);
      }
    });

    this.onValidationChange.emit({
      isValid: this.insertForm.valid,
      errors
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.insertForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.insertForm.get(fieldName);
    if (!field || !field.errors || !field.touched) return '';

    if (field.errors['required']) return `${this.getFieldLabel(fieldName)} is required`;
    if (field.errors['minlength']) return `${this.getFieldLabel(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters`;
    if (field.errors['maxlength']) return `${this.getFieldLabel(fieldName)} must not exceed ${field.errors['maxlength'].requiredLength} characters`;
    if (field.errors['email']) return 'Please enter a valid email address';
    if (field.errors['pattern']) return 'Please enter a valid phone number';

    return 'Invalid input';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone'
    };
    return labels[fieldName] || fieldName;
  }

  async onSubmit() {
    if (this.insertForm.invalid) {
      this.markAllFieldsAsTouched();
      return;
    }

    this.isSubmitting = true;
    
    try {
      // Simulate API call
      await this.delay(1500);

      const formData: UserInsertData = this.insertForm.value;
      
      // Emit successful insertion
      this.onInsert.emit({
        success: true,
        data: formData,
        message: 'User added successfully!'
      });

      // Show success message
      this.showSuccessMessage = true;
      this.successMessage = 'User has been added successfully!';

      // Reset form after short delay
      setTimeout(() => {
        this.resetForm();
        this.showSuccessMessage = false;
        if (this.displayMode === 'popup') {
          this.onClose.emit();
        }
      }, 2000);

    } catch (error) {
      // Handle error
      this.onInsert.emit({
        success: false,
        message: 'Failed to add user. Please try again.'
      });
    } finally {
      this.isSubmitting = false;
    }
  }

  onCancel() {
    this.resetForm();
    this.showSuccessMessage = false;
    this.onClose.emit();
  }

  private resetForm() {
    this.insertForm.reset();
    this.markAllFieldsAsUntouched();
  }

  private markAllFieldsAsTouched() {
    Object.keys(this.insertForm.controls).forEach(key => {
      this.insertForm.get(key)?.markAsTouched();
    });
  }

  private markAllFieldsAsUntouched() {
    Object.keys(this.insertForm.controls).forEach(key => {
      this.insertForm.get(key)?.markAsUntouched();
    });
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
