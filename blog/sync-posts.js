const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// 源文档目录
const sourceDirs = [
    '../work/docs',
    '../study/docs',
    '../life/docs',
    '../hobby/docs'
];

// Hexo _posts 目录
const postsDir = './source/_posts';

// 处理文件名，生成更友好的标题
function generateTitle(filename) {
    // 移除 chat_ 前缀和时间戳
    let title = filename.replace(/chat_\d{8}_\d{6}/, '');
    
    // 如果文件名为空，使用日期作为标题
    if (!title) {
        const match = filename.match(/\d{8}/);
        if (match) {
            const date = match[0];
            title = `日志 ${date.slice(0,4)}-${date.slice(4,6)}-${date.slice(6,8)}`;
        }
    }
    
    return title || filename;
}

// 处理单个文件
function processFile(filePath, category) {
    const content = fs.readFileSync(filePath, 'utf8');
    const { data, content: mdContent } = matter(content);
    
    const filename = path.basename(filePath, '.md');
    const title = generateTitle(filename);
    
    // 构建新的 front-matter
    const newFrontMatter = {
        title: title,
        date: data.date || new Date().toISOString(),
        categories: [category],
        tags: [],
        excerpt: mdContent.slice(0, 150) + '...'
    };
    
    // 创建新的文章内容
    const newContent = matter.stringify(mdContent, newFrontMatter);
    
    // 写入到 _posts 目录
    fs.writeFileSync(
        path.join(postsDir, `${filename}.md`),
        newContent
    );
}

// 同步所有文档
function syncDocs() {
    if (!fs.existsSync(postsDir)) {
        fs.mkdirSync(postsDir, { recursive: true });
    }
    
    sourceDirs.forEach(dir => {
        const category = path.basename(path.dirname(dir));
        if (fs.existsSync(dir)) {
            const files = fs.readdirSync(dir);
            files.forEach(file => {
                if (file.endsWith('.md')) {
                    processFile(path.join(dir, file), category);
                }
            });
        }
    });
}

// 执行同步
syncDocs();
