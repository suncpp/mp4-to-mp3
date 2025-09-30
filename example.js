// 使用示例
console.log('M4A to MP3 Converter - 使用示例');
console.log('================================');

console.log('1. 基本转换:');
console.log('   node index.js input.m4a');
console.log('   这将生成 input.mp3 文件\n');

console.log('2. 指定输出文件名:');
console.log('   node index.js input.m4a output.mp3\n');

console.log('3. 批量转换脚本示例:');
console.log(`
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// 获取当前目录下的所有.m4a文件
const m4aFiles = fs.readdirSync('.')
  .filter(file => path.extname(file).toLowerCase() === '.m4a');

console.log(\`找到 \${m4aFiles.length} 个.m4a文件\`);

m4aFiles.forEach((file, index) => {
  const outputFile = file.replace(/\\.m4a$/, '.mp3');
  console.log(\`转换 \${index + 1}/\${m4aFiles.length}: \${file} -> \${outputFile}\`);
  
  exec(\`node index.js "\${file}" "\${outputFile}"\`, (error, stdout, stderr) => {
    if (error) {
      console.error(\`转换失败: \${file}\`, error);
    } else {
      console.log(\`✓ 转换成功: \${outputFile}\`);
    }
  });
});
`);
