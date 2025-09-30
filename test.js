const fs = require('fs');
const path = require('path');

console.log('M4A to MP3 Converter - 测试脚本');
console.log('================================');

// 检查ffmpeg-static是否可用
let ffmpegAvailable = false;
try {
  const ffmpegStatic = require('ffmpeg-static');
  if (ffmpegStatic) {
    console.log('✓ ffmpeg-static可用');
    console.log(`  路径: ${ffmpegStatic}`);
    ffmpegAvailable = true;
  }
} catch (error) {
  console.log('ℹ 未找到ffmpeg-static');
}

// 检查系统FFmpeg是否已安装
const { execSync } = require('child_process');

try {
  const ffmpegVersion = execSync('ffmpeg -version', { encoding: 'utf-8' });
  console.log('✓ 系统FFmpeg已安装');
  console.log(ffmpegVersion.split('\n')[0]);
  ffmpegAvailable = true;
} catch (error) {
  if (!ffmpegAvailable) {
    console.log('⚠ 系统FFmpeg未安装或未添加到PATH');
    console.log('提示: 项目将使用内置的ffmpeg-static');
  }
}

if (ffmpegAvailable) {
  console.log('✓ 音频处理功能可用');
} else {
  console.log('✗ 音频处理功能不可用');
  console.log('请确保已安装ffmpeg-static依赖');
}

// 检查项目文件
const requiredFiles = ['index.js', 'package.json'];
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✓ ${file} 存在`);
  } else {
    console.log(`✗ ${file} 不存在`);
  }
});

// 检查依赖是否安装
if (fs.existsSync('node_modules')) {
  console.log('✓ 依赖已安装');
} else {
  console.log('✗ 依赖未安装，请运行: npm install');
}

console.log('\n使用方法:');
console.log('node index.js <输入文件.m4a> [输出文件.mp3]');
console.log('\n示例:');
console.log('node index.js example.m4a');
console.log('node index.js input.m4a output.mp3');
