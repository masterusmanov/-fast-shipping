import { Controller, Get, Res, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { Response } from 'express';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { JwtAdminGuard } from '../guards/admin.guard';
import { AdminSelfGuard } from '../guards/admin_self.guard';


@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('create')
  create(@Body() createAdminDto: CreateAdminDto) {   
    return this.adminService.create(createAdminDto);
  }

  @UseGuards(JwtAdminGuard)
  @Post('signin')
  login(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response
  ){
    return this.adminService.login(loginAdminDto, res);
  };

  @UseGuards(JwtAdminGuard)
  @Post("signout")
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({passthrough:true}) res:Response
  ){
    console.log(refreshToken);
    
    return this.adminService.logout(refreshToken, res)
  };

  @UseGuards(JwtAdminGuard)
  @UseGuards(AdminSelfGuard)
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @UseGuards(AdminSelfGuard)
  @UseGuards(JwtAdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOneById(id);
  }
  
  @UseGuards(AdminSelfGuard)
  @UseGuards(JwtAdminGuard)
  @Get('username/:username')
  findOneByUserName(@Param('username') username: string) {
    return this.adminService.findOneByUserName(username);
  }

  @UseGuards(AdminSelfGuard)
  @UseGuards(JwtAdminGuard)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @UseGuards(AdminSelfGuard)
  @UseGuards(JwtAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}
