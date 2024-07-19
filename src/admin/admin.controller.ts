import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Settings } from 'http2';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  getUsers() {
    return this.adminService.getUsers();
  }

  @Post('users/:id/block')
  blockUser(@Param('id') id: number) {
    this.adminService.updateUser(id, { blocked: true });
  }

  @Delete('users/:id')
  deleteUser(@Param('id') id: number) {
    this.adminService.deleteUser(id);
  }

  @Get('settings')
  getSettings(){
    return this.adminService.getSettings();
  }

  @Post('settings')
  updateSettings(@Body() settings) {
    this.adminService.updateSettings(settings);
  }
}
