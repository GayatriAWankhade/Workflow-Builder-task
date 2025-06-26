'use client';

import { useCallback, useRef, useState, useEffect } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  ReactFlowInstance,
} from 'reactflow';
import 'reactflow/dist/style.css';

import WorkflowNode from './WorkflowNode';
import NodePanel from './NodePanel';
import WorkflowControls from './WorkflowControls';
import { generateId } from '@/lib/utils';
import { NODE_COLORS } from '@/lib/constants';

const nodeTypes = {
  start: WorkflowNode,
  action: WorkflowNode,
  condition: WorkflowNode,
  end: WorkflowNode,
  email: WorkflowNode,
  database: WorkflowNode,
  api: WorkflowNode,
  approval: WorkflowNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'start',
    position: { x: 250, y: 50 },
    data: { label: 'Start', description: 'Workflow begins here' },
  },
];

const initialEdges: Edge[] = [];

export default function WorkflowCanvas() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [history, setHistory] = useState<{ nodes: Node[]; edges: Edge[] }[]>([{ nodes: initialNodes, edges: initialEdges }]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type || !reactFlowInstance || !reactFlowBounds) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: Node = {
        id: generateId(),
        type,
        position,
        data: { 
          label: type.charAt(0).toUpperCase() + type.slice(1),
          description: `${type} node`,
          isConfigured: false
        },
      };

      setNodes((nds) => nds.concat(newNode));
      saveToHistory([...nodes, newNode], edges);
    },
    [reactFlowInstance, nodes, edges, setNodes]
  );

  const onNodeAdd = useCallback((nodeType: string) => {
    const newNode: Node = {
      id: generateId(),
      type: nodeType,
      position: { x: Math.random() * 400 + 100, y: Math.random() * 400 + 100 },
      data: { 
        label: nodeType.charAt(0).toUpperCase() + nodeType.slice(1),
        description: `${nodeType} node`,
        isConfigured: false
      },
    };

    setNodes((nds) => nds.concat(newNode));
    saveToHistory([...nodes, newNode], edges);
  }, [nodes, edges, setNodes]);

  const saveToHistory = useCallback((newNodes: Node[], newEdges: Edge[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ nodes: newNodes, edges: newEdges });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const onUndo = useCallback(() => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      setNodes(prevState.nodes);
      setEdges(prevState.edges);
      setHistoryIndex(historyIndex - 1);
    }
  }, [history, historyIndex, setNodes, setEdges]);

  const onRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setNodes(nextState.nodes);
      setEdges(nextState.edges);
      setHistoryIndex(historyIndex + 1);
    }
  }, [history, historyIndex, setNodes, setEdges]);

  const onSave = useCallback(() => {
    const workflow = {
      nodes,
      edges,
      name: 'My Workflow',
      description: 'Workflow description',
    };
    console.log('Saving workflow:', workflow);
    // Here you would call your API to save the workflow
  }, [nodes, edges]);

  const onRun = useCallback(() => {
    console.log('Running workflow:', { nodes, edges });
    // Here you would call your API to execute the workflow
  }, [nodes, edges]);

  const onExport = useCallback(() => {
    const workflow = { nodes, edges };
    const dataStr = JSON.stringify(workflow, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'workflow.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [nodes, edges]);

  const onImport = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const workflow = JSON.parse(e.target?.result as string);
            setNodes(workflow.nodes || []);
            setEdges(workflow.edges || []);
            saveToHistory(workflow.nodes || [], workflow.edges || []);
          } catch (error) {
            console.error('Error importing workflow:', error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }, [setNodes, setEdges, saveToHistory]);

  // Save to history when nodes or edges change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (nodes.length > 0 || edges.length > 0) {
        saveToHistory(nodes, edges);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [nodes, edges]);

  return (
    <div className="flex h-full">
      <NodePanel onNodeAdd={onNodeAdd} />
      
      <div className="flex-1 relative" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
          className="bg-gray-50"
        >
          <Controls />
          <MiniMap 
            nodeColor={(node) => NODE_COLORS[node.type as keyof typeof NODE_COLORS] || '#6b7280'}
            className="bg-white"
          />
          <Background color="#aaa" gap={16} />
        </ReactFlow>

        <WorkflowControls
          onSave={onSave}
          onRun={onRun}
          onUndo={onUndo}
          onRedo={onRedo}
          onZoomIn={() => reactFlowInstance?.zoomIn()}
          onZoomOut={() => reactFlowInstance?.zoomOut()}
          onFitView={() => reactFlowInstance?.fitView()}
          onExport={onExport}
          onImport={onImport}
          canUndo={historyIndex > 0}
          canRedo={historyIndex < history.length - 1}
        />
      </div>
    </div>
  );
}