import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const docsDir = path.join(process.cwd(), 'study/docs');
    const files = await fs.readdir(docsDir);
    
    const docs = await Promise.all(
      files.map(async (file) => {
        const content = await fs.readFile(path.join(docsDir, file), 'utf-8');
        return {
          id: file.replace('.md', ''),
          title: file,
          content
        };
      })
    );
    
    return Response.json(docs);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
} 