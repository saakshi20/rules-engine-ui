import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { UserService } from '../../services/user';
import { PopupDialogComponent } from '../../shared/popup-dialog/popup-dialog';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, PopupDialogComponent],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  isPopupVisible: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    console.log('UserListComponent initialized');
    this.loadUsers();
  }

  loadUsers(): void {
    console.log('Loading users...');
    this.userService.getUsers().subscribe(
      (users) => {
        console.log('Users loaded:', users);
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
}
