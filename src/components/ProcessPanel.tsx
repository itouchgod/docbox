'use client';

import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export function ProcessPanel() {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const processMutation = useMutation({
    mutationFn: (docIds: string[]) => 
      fetch('/api/process', {
        method: 'POST',
        body: JSON.stringify({ docIds })
      }).then(res => res.json()),
    onSuccess: () => {
      setIsProcessing(false);
    }
  });

  return (
    <div className="space-y-4">
      <button 
        className="w-full py-2 px-4 bg-blue-500 text-white rounded"
        onClick={() => {
          setIsProcessing(true);
          processMutation.mutate(['selected-docs']);
        }}
        disabled={isProcessing}
      >
        {isProcessing ? '处理中...' : '开始处理'}
      </button>
      
      {/* 处理进度显示 */}
      {isProcessing && (
        <div className="w-full bg-gray-200 rounded">
          <div 
            className="bg-blue-500 h-2 rounded"
            style={{ width: `${processMutation.progress || 0}%` }}
          />
        </div>
      )}
    </div>
  );
} 