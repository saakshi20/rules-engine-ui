import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private mockUsers: User[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1-555-123-4567'
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '+1-555-987-6543'
    },
    {
      id: 3,
      firstName: 'Michael',
      lastName: 'Johnson',
      email: 'michael.johnson@example.com',
      phone: '+1-555-456-7890'
    },
    {
      id: 4,
      firstName: 'Sarah',
      lastName: 'Williams',
      email: 'sarah.williams@example.com',
      phone: '+1-555-234-5678'
    },
    {
      id: 5,
      firstName: 'David',
      lastName: 'Brown',
      email: 'david.brown@example.com',
      phone: '+1-555-345-6789'
    }
  ];

  constructor() { }

  getUsers(): Observable<User[]> {
    return of(this.mockUsers);
  }

  getUserById(id: number): Observable<User | undefined> {
    const user = this.mockUsers.find(u => u.id === id);
    return of(user);
  }
}
