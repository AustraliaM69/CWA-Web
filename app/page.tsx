
'use client';
import { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


export default function Home() {
  const [tabs, setTabs] = useState<{ label: string; content: string }[]>([
    { label: 'Tab 1', content: '' },
  ]);
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  const addTab = () => {
    setTabs([...tabs, { label: `Tab ${tabs.length + 1}`, content: '' }]);
    setActiveTab(tabs.length);
  };

  const removeTab = () => {
    if (tabs.length === 1) return;
    const newTabs = tabs.filter((_, idx) => idx !== activeTab);
    setTabs(newTabs);
    setActiveTab(Math.max(0, activeTab - 1));
  };

  const updateContent = (value: string) => {
    setTabs(
      tabs.map((tab, idx) =>
        idx === activeTab ? { ...tab, content: value } : tab
      )
    );
  };

  const generateOutput = () => {
    const content = tabs[activeTab].content;
    const htmlOutput = `<div>${content}</div>`;
    return htmlOutput;
  };

  return (
    <main className='bg-white dark:bg-gray-900 min-h-screen'>
      


               <div className="flex gap-8 p-8 justify-center">
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-bold mb-2 text-gray-900 dark:!text-gray-100">Editor</h3>
          <Box sx={{ width: 400 }} className='bg-white dark:!bg-gray-800 p-4 rounded'>
          <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable"scrollButtons="auto">
            {tabs.map((tab, idx) => (
              <Tab key={idx} label={tab.label} />
            ))}
          </Tabs>
          <div className="flex space-x-2 mt-2">
            <button onClick={addTab} className="px-2 py-1 bg-green-500 text-white rounded">+</button>
            <button onClick={removeTab} className="px-2 py-1 bg-red-500 text-white rounded">-</button>
          </div>
          <textarea
            className="w-full h-32 p-2 border rounded mt-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            value={tabs[activeTab].content}
            onChange={e => updateContent(e.target.value)}
            placeholder="Enter tab content..."
          />
          </Box>
        </div>
        
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">Display</h3>
          <Box sx={{ width: 400 }} className='bg-white dark:bg-gray-800 p-4 rounded'>
            <div className="w-full h-32 p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600">
              {tabs[activeTab].content || 'No content to display'}
            </div>
          </Box>
        </div>
        
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">Output</h3>
          <Box sx={{ width: 400 }} className='bg-white dark:bg-gray-800 p-4 rounded'>
            <button 
              onClick={() => {
                const output = generateOutput();
                const outputElement = document.getElementById('output-display');
                if (outputElement) {
                  outputElement.textContent = output;
                }
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded mb-2 hover:bg-blue-600 transition-colors"
            >
              Generate Output
            </button>
            <div 
              id="output-display"
              className="w-full h-32 p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 overflow-auto"
            >
              Empty
            </div>
          </Box>
        </div>
      </div>
      

    </main>
  );
}
