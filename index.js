const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');

// 尝试使用ffmpeg-static（如果可用）
try {
  const ffmpegStatic = require('ffmpeg-static');
  if (ffmpegStatic) {
    ffmpeg.setFfmpegPath(ffmpegStatic);
    console.log('使用内置FFmpeg静态二进制文件');
  }
} catch (error) {
  console.log('未找到ffmpeg-static，将使用系统FFmpeg');
}

// 检查命令行参数
if (process.argv.length < 3) {
  console.log('使用方法: node index.js <输入文件路径> [输出文件路径]');
  console.log('示例: node index.js input.m4a output.mp3');
  process.exit(1);
}

const inputFile = process.argv[2];

// 指定输出目录
const outputDir = 'C:\\Users\\caopengpeng\\Desktop\\音乐';

// 保证输出目录存在
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 新增：获取输出文件名参数
let outputBaseName;
if (process.argv[3]) {
  outputBaseName = path.basename(process.argv[3], path.extname(process.argv[3]));
} else {
  outputBaseName = path.basename(inputFile, path.extname(inputFile));
}

// 构建输出文件路径
const outputFile = path.join(outputDir, `${outputBaseName}.mp3`);

// 检查输入文件是否存在
if (!fs.existsSync(inputFile)) {
  console.error(`错误: 输入文件 '${inputFile}' 不存在`);
  process.exit(1);
}

// 检查输入文件是否为.m4a格式
const inputExt = path.extname(inputFile).toLowerCase();
if (inputExt !== '.m4a') {
  console.warn(`警告: 输入文件 '${inputFile}' 不是.m4a格式`);
}

console.log(`正在转换: ${inputFile} -> ${outputFile}`);

// 执行转换
ffmpeg(inputFile)
  .toFormat('mp3')
  .on('end', () => {
    console.log('转换完成!');
    console.log(`输出文件: ${outputFile}`);
    // 删除原始 .m4a 文件
    fs.unlink(inputFile, (err) => {
      if (err) {
        console.error(`删除原文件失败: ${err.message}`);
      } else {
        console.log(`已删除原文件: ${inputFile}`);
      }
    });
  })
  .on('error', (err) => {
    console.error('转换失败: ' + err.message);
  })
  .on('progress', (progress) => {
    if (progress.percent) {
      console.log(`转换进度: ${Math.round(progress.percent)}%`);
    }
  })
  .save(outputFile);
