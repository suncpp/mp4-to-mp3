#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

console.log('M4A to MP3 批量转换工具');
console.log('========================');

// 获取命令行参数
const targetDir = process.argv[2] || '.';

// 检查目录是否存在
if (!fs.existsSync(targetDir)) {
  console.error(`错误: 目录 '${targetDir}' 不存在`);
  process.exit(1);
}

// 读取目录中的所有文件
let files;
try {
  files = fs.readdirSync(targetDir);
} catch (error) {
  console.error(`错误: 无法读取目录 '${targetDir}'`);
  process.exit(1);
}

// 筛选出.m4a文件
const m4aFiles = files
  .filter(file => {
    const fullPath = path.join(targetDir, file);
    return fs.statSync(fullPath).isFile() &&
      path.extname(file).toLowerCase() === '.m4a';
  })
  .map(file => path.join(targetDir, file));

if (m4aFiles.length === 0) {
  console.log(`在目录 '${targetDir}' 中没有找到.m4a文件`);
  process.exit(0);
}

console.log(`找到 ${m4aFiles.length} 个.m4a文件:`);
m4aFiles.forEach((file, index) => {
  console.log(`${index + 1}. ${path.basename(file)}`);
});

console.log('\n开始转换...');

let completed = 0;
let failed = 0;

// 转换所有文件
m4aFiles.forEach((inputFile, index) => {
  const fileName = path.basename(inputFile, '.m4a');
  const outputFile = path.join(targetDir, `${fileName}.mp3`);

  console.log(`\n[${index + 1}/${m4aFiles.length}] 转换: ${path.basename(inputFile)}`);

  const command = `node "${path.join(__dirname, 'index.js')}" "${inputFile}" "${outputFile}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`  ✗ 转换失败: ${error.message}`);
      failed++;
    } else {
      console.log(`  ✓ 转换成功: ${path.basename(outputFile)}`);
      completed++;
    }

    // 检查是否完成所有转换
    if (completed + failed === m4aFiles.length) {
      console.log('\n========================');
      console.log(`转换完成! 成功: ${completed}, 失败: ${failed}`);
      console.log('========================');
    }
  });
});
