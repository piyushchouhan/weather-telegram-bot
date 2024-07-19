import { Injectable } from '@nestjs/common';
import { User, Settings } from './interface';

@Injectable()
export class AdminService {
  private users: User[] = [];
  private settings: Settings = {
    apiKey: '',
    city: '',
  };

  getUsers(): User[] {
    return this.users;
  }

  updateUser(userId: number, data: Partial<User>): void {
    const user = this.users.find((user) => user.id === userId);
    if (user) {
      Object.assign(user, data);
    }
  }

  deleteUser(userId: number): void {
    this.users = this.users.filter((user) => user.id !== userId);
  }

  getSettings(): Settings {
    return this.settings;
  }

  updateSettings(settings: Partial<Settings>): void {
    Object.assign(this.settings, settings);
  }
}
