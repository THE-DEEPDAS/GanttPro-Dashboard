import React, { useState, useRef } from 'react';
import { Download, FileText, Image, FileSpreadsheet, ChevronDown } from 'lucide-react';
import { toPng, toJpeg } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { useGanttProject } from '../context/GanttProjectContext';
import { exportToCsv } from '../utils/exportUtils';

interface DownloadOptionsProps {
  chartId: string;
  projectName: string;
}

const DownloadOptions: React.FC<DownloadOptionsProps> = ({ chartId, projectName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { tasks } = useGanttProject();
  
  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const sanitizeFileName = (name: string): string => {
    return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  };
  
  const downloadAsPng = async () => {
    const element = document.getElementById(chartId);
    if (!element) return;
    
    try {
      const dataUrl = await toPng(element, { quality: 0.95 });
      const link = document.createElement('a');
      link.download = `${sanitizeFileName(projectName)}_gantt_chart.png`;
      link.href = dataUrl;
      link.click();
      setIsOpen(false);
    } catch (error) {
      console.error('Error generating PNG:', error);
    }
  };
  
  const downloadAsJpg = async () => {
    const element = document.getElementById(chartId);
    if (!element) return;
    
    try {
      const dataUrl = await toJpeg(element, { quality: 0.95 });
      const link = document.createElement('a');
      link.download = `${sanitizeFileName(projectName)}_gantt_chart.jpg`;
      link.href = dataUrl;
      link.click();
      setIsOpen(false);
    } catch (error) {
      console.error('Error generating JPG:', error);
    }
  };
  
  const downloadAsPdf = async () => {
    const element = document.getElementById(chartId);
    if (!element) return;
    
    try {
      const dataUrl = await toPng(element);
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
      });
      
      // Calculate the dimensions to maintain aspect ratio
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${sanitizeFileName(projectName)}_gantt_chart.pdf`);
      setIsOpen(false);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };
  
  const downloadAsCsv = () => {
    exportToCsv(tasks, `${sanitizeFileName(projectName)}_gantt_data`);
    setIsOpen(false);
  };
  
  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors duration-200"
      >
        <Download className="h-4 w-4 mr-1" />
        Download
        <ChevronDown className="h-3.5 w-3.5 ml-1" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 animate-fadeIn">
          <div className="py-1">
            <button
              onClick={downloadAsPng}
              className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Image className="h-4 w-4 mr-2 text-gray-500" />
              Download as PNG
            </button>
            <button
              onClick={downloadAsJpg}
              className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Image className="h-4 w-4 mr-2 text-gray-500" />
              Download as JPG
            </button>
            <button
              onClick={downloadAsPdf}
              className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FileText className="h-4 w-4 mr-2 text-gray-500" />
              Download as PDF
            </button>
            <button
              onClick={downloadAsCsv}
              className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FileSpreadsheet className="h-4 w-4 mr-2 text-gray-500" />
              Download as CSV
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadOptions;