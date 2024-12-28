'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export function DocList() {
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  
  const { data: docs = [] } = useQuery({
    queryKey: ['docs'],
    queryFn: () => fetch('/api/docs').then(res => res.json())
  });

  return (
    <div className="space-y-2">
      {docs.map((doc: any) => (
        <div key={doc.id} className="flex items-center gap-2 p-2 hover:bg-gray-50">
          <input 
            type="checkbox"
            checked={selectedDocs.includes(doc.id)}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedDocs([...selectedDocs, doc.id]);
              } else {
                setSelectedDocs(selectedDocs.filter(id => id !== doc.id));
              }
            }}
          />
          <span>{doc.title}</span>
        </div>
      ))}
    </div>
  );
} 