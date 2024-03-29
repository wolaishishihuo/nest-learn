import { Injectable } from '@nestjs/common';
import { mkdirSync, readdirSync, createWriteStream, readFileSync } from 'fs';
import path from 'path';
const projectRoot = path.resolve(__dirname, '..');

//判断目录是否存在
@Injectable()
export class UploadService {
  getDirectory(hash: string) {
    const imagesDirPath = path.join(projectRoot, `../images/${hash}`);
    try {
      mkdirSync(imagesDirPath);
      return {
        message: '不存在',
        files: [],
      };
    } catch (e) {
      //获取目录下文件，用于断点续传和判断文件是否已经完成
      const files = readdirSync(imagesDirPath);
      return {
        message: '存在',
        files,
      };
    }
  }
  upload(hash: string, myfilename: string, file: any) {
    const imagesDirPath = path.join(
      projectRoot,
      `../images/${myfilename}`,
      `${hash}`,
    );
    const ws = createWriteStream(imagesDirPath);
    ws.write(file.buffer);
    return true;
  }
  //合并切片
  merge(hash: string, count: number, suffix: string) {
    console.log(hash, count, suffix);

    const Filebuffers: Buffer[] = [];
    for (let i = 1; i < count; i++) {
      const buffer = readFileSync(
        path.join(projectRoot, `../images/${hash}`, `${hash}_${i}`),
      );
      Filebuffers.push(buffer);
    }
    const buffer = Buffer.concat(Filebuffers);
    const ws = createWriteStream(
      path.join(projectRoot, `../images`, `${hash}.${suffix}`),
    );
    debugger;
    ws.write(buffer);

    return '合并成功';
  }
}
