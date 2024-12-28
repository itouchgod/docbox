import { DocList } from '@/components/DocList';
import { ProcessPanel } from '@/components/ProcessPanel';
import { StatusBar } from '@/components/StatusBar';

export default function Home() {
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">文档处理系统</h1>
      
      {/* 状态栏 */}
      <StatusBar />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* 文档列表 */}
        <section className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">待处理文档</h2>
          <DocList />
        </section>
        
        {/* 处理面板 */}
        <section className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">操作面板</h2>
          <ProcessPanel />
        </section>
      </div>
    </main>
  );
}
