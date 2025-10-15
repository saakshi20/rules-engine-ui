import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { UserService } from '../../services/user';
import { PopupDialogComponent } from '../../shared/popup-dialog/popup-dialog';
import { InsertFormComponent, InsertResult } from '../../shared/insert-form/insert-form';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, PopupDialogComponent, InsertFormComponent],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  isPopupVisible: boolean = false;

  // Insert form logic
  showInsertForm: boolean = false;
  insertDisplayMode: 'popup' | 'inline' = 'popup';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users;
      }
    );
  }

  showUserDetails(user: User): void {
    this.selectedUser = user;
    this.isPopupVisible = true;
  }

  closePopup(): void {
    this.isPopupVisible = false;
    this.selectedUser = null;
  }

  trackByUserId(index: number, user: User): number {
    return user.id;
  }

  // Insert form methods
  showAddUserForm(): void {
    this.showInsertForm = true;
  }

  closeInsertForm(): void {
    this.showInsertForm = false;
  }

  onInsertModeChange(mode: 'popup' | 'inline'): void {
    this.insertDisplayMode = mode;
  }

  onUserInsert(result: InsertResult): void {
    if (result.success && result.data) {
      const newUser: User = {
        id: this.generateNewId(),
        firstName: result.data.firstName,
        lastName: result.data.lastName,
        email: result.data.email,
        phone: result.data.phone
      };
      this.users = [...this.users, newUser];
    }
    this.showInsertForm = false;
  }

  private generateNewId(): number {
    return Math.max(...this.users.map(u => u.id), 0) + 1;
  }
}
