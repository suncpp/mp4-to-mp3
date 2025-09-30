# M4A to MP3 Converter

一个简单的Node.js工具，用于将.m4a音频文件转换为.mp3格式。

## 功能特点

- 支持将.m4a文件转换为.mp3格式
- 命令行操作，使用简单
- 显示转换进度
- 自动处理文件路径

## 安装依赖

在使用之前，需要安装项目依赖：

```bash
npm install
```

项目包含内置的FFmpeg静态二进制文件，无需手动安装系统级FFmpeg。

## 使用方法

### 基本用法

```bash
node index.js <输入文件路径> [输出文件路径]
```

### 使用npm脚本

```bash
# 转换单个文件
npm run convert input.m4a

# 批量转换当前目录下的所有.m4a文件
npm run batch

# 批量转换指定目录下的所有.m4a文件
npm run batch ./audio-files
```

### 示例

1. 转换文件并自动生成输出文件名：
```bash
node index.js input.m4a
```
这将生成 `input.mp3` 文件。

2. 指定输出文件名：
```bash
node index.js input.m4a output.mp3
```

3. 批量转换：
```bash
node batch-convert.js
# 或者
npm run batch
```

## 注意事项

- 输入文件必须是.m4a格式
- 转换过程可能需要一些时间，取决于文件大小
- 项目包含内置FFmpeg，无需手动安装（可选安装系统FFmpeg以获得更好性能）

## 安装系统FFmpeg（可选）

如果需要更好的性能或遇到问题，可以安装系统级FFmpeg：

### Windows
1. 访问 [FFmpeg官网](https://ffmpeg.org/download.html)
2. 下载Windows版本
3. 解压并添加到系统PATH环境变量

### macOS
```bash
brew install ffmpeg
```

### Ubuntu/Debian
```bash
sudo apt update
sudo apt install ffmpeg
```

## 项目结构

```
.
├── index.js          # 主程序文件
├── package.json      # 项目配置文件
└── README.md         # 说明文档
```

## 许可证

MIT
