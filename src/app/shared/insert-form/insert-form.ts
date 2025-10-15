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
  selector: 'app-insert-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './insert-form.html',
  styleUrls: ['./insert-form.css']
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

  isFieldInvalid(field: string): boolean {
    const control = this.insertForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getFieldError(field: string): string {
  const control = this.insertForm.get(field);
  if (!control || !control.errors) return '';
  if (control.errors['required']) return 'This field is required.';
  if (control.errors['minlength']) return `Minimum length is ${control.errors['minlength'].requiredLength}.`;
  if (control.errors['maxlength']) return `Maximum length is ${control.errors['maxlength'].requiredLength}.`;
  if (control.errors['email']) return 'Invalid email address.';
  if (control.errors['pattern']) return 'Invalid format.';
  return 'Invalid value.';
  }

  onSubmit() {
    this.isSubmitting = true;
    if (this.insertForm.valid) {
      const data: UserInsertData = this.insertForm.value;
      this.onInsert.emit({ success: true, data, message: 'User added successfully.' });
      this.showSuccessMessage = true;
      this.successMessage = 'User added successfully!';
      this.insertForm.reset();
      setTimeout(() => {
        this.showSuccessMessage = false;
        this.onClose.emit();
      }, 1500);
    } else {
      this.onInsert.emit({ success: false, message: 'Form is invalid.' });
      this.insertForm.markAllAsTouched();
    }
    this.isSubmitting = false;
  }


  onCancel() {
    this.onClose.emit();
  }
}
