'use client';

import { Button } from '@/components/ui/button';
import { 
  Play, 
  Save, 
  Undo, 
  Redo, 
  ZoomIn, 
  ZoomOut, 
  Maximize,
  Download,
  Upload
} from 'lucide-react';

interface WorkflowControlsProps {
  onSave: () => void;
  onRun: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitView: () => void;
  onExport: () => void;
  onImport: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export default function WorkflowControls({
  onSave,
  onRun,
  onUndo,
  onRedo,
  onZoomIn,
  onZoomOut,
  onFitView,
  onExport,
  onImport,
  canUndo,
  canRedo,
}: WorkflowControlsProps) {
  return (
    <div className="absolute top-4 right-4 z-10 flex items-center space-x-2 bg-white rounded-lg shadow-lg p-2">
      <Button variant="outline" size="sm" onClick={onSave}>
        <Save className="w-4 h-4 mr-2" />
        Save
      </Button>
      
      <Button size="sm" onClick={onRun} className="bg-green-600 hover:bg-green-700">
        <Play className="w-4 h-4 mr-2" />
        Run
      </Button>
      
      <div className="w-px h-6 bg-gray-300" />
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onUndo}
        disabled={!canUndo}
      >
        <Undo className="w-4 h-4" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onRedo}
        disabled={!canRedo}
      >
        <Redo className="w-4 h-4" />
      </Button>
      
      <div className="w-px h-6 bg-gray-300" />
      
      <Button variant="ghost" size="sm" onClick={onZoomIn}>
        <ZoomIn className="w-4 h-4" />
      </Button>
      
      <Button variant="ghost" size="sm" onClick={onZoomOut}>
        <ZoomOut className="w-4 h-4" />
      </Button>
      
      <Button variant="ghost" size="sm" onClick={onFitView}>
        <Maximize className="w-4 h-4" />
      </Button>
      
      <div className="w-px h-6 bg-gray-300" />
      
      <Button variant="ghost" size="sm" onClick={onExport}>
        <Download className="w-4 h-4" />
      </Button>
      
      <Button variant="ghost" size="sm" onClick={onImport}>
        <Upload className="w-4 h-4" />
      </Button>
    </div>
  );
}