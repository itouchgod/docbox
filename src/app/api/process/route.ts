import { promises as fs } from 'fs';
import path from 'path';
import { processWithAI } from '@/lib/ai';

export async function POST(request: Request) {
  try {
    const { docIds } = await request.json();
    
    for (const docId of docIds) {
      // 1. 读取原始文档
      const docPath = path.join(process.cwd(), 'study/docs', `${docId}.md`);
      const content = await fs.readFile(docPath, 'utf-8');
      
      // 2. AI 处理
      const processedContent = await processWithAI(content);
      
      // 3. 保存到 published 目录
      const publishPath = path.join(process.cwd(), 'published', `${docId}.md`);
      await fs.writeFile(publishPath, processedContent);
    }
    
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
} 