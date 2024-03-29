import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // 获取目录
  @Post('getDirectory')
  getDirectory(@Body() body: any) {
    return this.uploadService.getDirectory(body.hash);
  }

  // 文件上传
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: any, @Body() body: any) {
    return this.uploadService.upload(body.hash, body.myfilename, file);
  }
  // 文件上传
  @Post('merge')
  merge(@Body() body: any) {
    return this.uploadService.merge(body.hash, body.count, body.suffix);
  }
}
