import { Injectable, UnauthorizedException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin, AdminDocument } from './schema/admin.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginAdminDto } from './dto/login-admin.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';


@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  private readonly jwtService: JwtService,
  ) {}
  
  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const {user_name, password} = createAdminDto;
    const hashed_password = await bcrypt.hash(password, 7);
    const createdAdmin = new this.adminModel({
      user_name,
      hashed_password
    });
    return createdAdmin;
  };

  async getTokens(admin: AdminDocument) {
    const jwtPayload = {
      id: admin.id,
      is_active: admin.is_active,
      is_owner: admin.is_creator,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async login(loginAdminDto: LoginAdminDto, res: Response){
    const { user_name, password } = loginAdminDto;
    const admin = await this.adminModel.findOne({ user_name }).exec();
    
    if(!admin){
      throw new UnauthorizedException('User not registred');
    };
    
    const isMatchPass = await bcrypt.compare(password, admin.hashed_password);
    
    if(!isMatchPass){
      throw new UnauthorizedException('User not registred(pass)');
    }
    
    const tokens = await this.getTokens(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updatedAdmin = await this.adminModel.findByIdAndUpdate(
      admin._id, {hashed_token: hashed_refresh_token}, {new: true}
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true
    });
    const response = {
      message: 'User logged in',
      admin: updatedAdmin,
      tokens,
    };
    return response;
  };

  async logout(refreshToken: string, res: Response){
    const adminData  = await this.jwtService.verify(refreshToken,{
      secret: process.env.REFRESH_TOKEN_KEY
    });
    
    if(!adminData){
      throw new ForbiddenException('User not found');
    };
    
    const updatedAdmin = await this.adminModel.findByIdAndUpdate(
      adminData.id,
      {hashed_refresh_token: null},
      {new: true}
    );
    
    res.clearCookie('refresh_token');
    
    if (!updatedAdmin) {
      throw new NotFoundException('User not found');
    }
    
    const deletedTokens = await this.adminModel.deleteOne({ refresh_token: refreshToken });
    
    await updatedAdmin.save();
    const response = {
      message: 'User logged out successfully',
      user: updatedAdmin,
    };
    return response;
  };


  findAll(): Promise<Admin[]> {
    return this.adminModel.find().exec();
  }

  findOneByUserName(user_name: string) {
    return this.adminModel.findOne({user_name}).exec();
  }

  findOneById(id: string) {
    return this.adminModel.findById(id).exec();
  }

  update(id: string, updateAdminDto: UpdateAdminDto) {
    return this.adminModel.findByIdAndUpdate(id, updateAdminDto, {new: true}).exec();
  }

  remove(id: string) {
    return this.adminModel.findByIdAndDelete(id);
  }
}
