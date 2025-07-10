/**
 * 修复空代码块
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 递归查找所有markdown文件
function findMarkdownFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      files.push(...findMarkdownFiles(fullPath));
    } else if (item.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// 修复空代码块
function fixEmptyCodeBlocks(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // 查找空的代码块 ``` 并替换为 ```text
  const emptyCodeBlockRegex = /```\s*\n/g;
  if (emptyCodeBlockRegex.test(content)) {
    content = content.replace(emptyCodeBlockRegex, '```text\n');
    modified = true;
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ 修复了 ${filePath}`);
  }
}

// 主函数
function main() {
  const markdownFiles = findMarkdownFiles('.');
  
  console.log(`🔍 找到 ${markdownFiles.length} 个markdown文件`);
  
  for (const file of markdownFiles) {
    fixEmptyCodeBlocks(file);
  }
  
  console.log('🎉 所有空代码块已修复完成！');
}

main(); 