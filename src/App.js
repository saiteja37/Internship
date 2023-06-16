/*import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const Flowchart = ({ treeData, canvasRef }) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const nodeWidth = 120;
    const nodeHeight = 40;
    const nodeGapX = 40;
    const nodeGapY = 100;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const drawNode = (x, y, label) => {
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(x - nodeWidth / 2, y - nodeHeight / 2, nodeWidth, nodeHeight);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.strokeRect(x - nodeWidth / 2, y - nodeHeight / 2, nodeWidth, nodeHeight);
      ctx.fillStyle = '#000000';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, x, y);
    };

    const drawLine = (x1, y1, x2, y2) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const drawTree = (node, x, y, level, parentX, parentY) => {
      const childrenCount = node.children.length;
      const startY = y + nodeGapY;

      drawNode(x, y, node.label);

      if (childrenCount === 0) {
        return;
      }

      const totalWidth = childrenCount * (nodeWidth + nodeGapX) - nodeGapX;
      const startX = x - totalWidth / 2;

      for (let i = 0; i < childrenCount; i++) {
        const childX = startX + i * (nodeWidth + nodeGapX) + nodeWidth / 2;
        const childY = startY + level * nodeGapY;
        drawLine(x, y + nodeHeight / 2, childX, childY - nodeHeight / 2);
        drawTree(
          node.children[i],
          childX,
          childY,
          level + 1,
          x,
          y + nodeHeight / 2
        );
      }
    };

    if (treeData) {
      const rootX = canvasWidth / 2;
      const rootY = nodeHeight + 20;
      drawTree(treeData, rootX, rootY, 1);
    }
  }, [treeData, canvasRef]);

  return <canvas ref={canvasRef} width={800} height={600} />;
};

const App = () => {
  const [treeData, setTreeData] = useState(null);
  const [label, setLabel] = useState('');
  const [parent, setParent] = useState('');
  const canvasRef = useRef(null);

  const handleLabelChange = (event) => {
    setLabel(event.target.value);
  };

  const handleParentChange = (event) => {
    setParent(event.target.value);
  };

  const handleAddNode = (event) => {
    event.preventDefault();

    if (label.trim() === '') {
      return;
    }

    const newNode = {
      label: label.trim(),
      children: [],
    };

    if (!treeData) {
      setTreeData(newNode);
    } else {
      const updatedTreeData = { ...treeData };
      const parentNode = findNodeByLabel(updatedTreeData, parent);
      if (parentNode) {
        parentNode.children.push(newNode);
        setTreeData(updatedTreeData);
      }
    }

    setLabel('');
    setParent('');
  };

  const findNodeByLabel = (node, label) => {
    if (node.label === label) {
      return node;
    }

    for (const child of node.children) {
      const foundNode = findNodeByLabel(child, label);
      if (foundNode) {
        return foundNode;
      }
    }

    return null;
  };

  return (
    <div>
      <form onSubmit={handleAddNode}>
        <label>
          Label:
          <input type="text" value={label} onChange={handleLabelChange} />
        </label>
        <label>
          Parent:
          <input type="text" value={parent} onChange={handleParentChange} />
        </label>
        <button type="submit">Add Node</button>
      </form>

      {treeData && <Flowchart treeData={treeData} canvasRef={canvasRef} />}
    </div>
  );
};

export default App;
*/import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const Flowchart = ({ treeData, canvasRef }) => {
  const [canvasSize, setCanvasSize] = useState({ width:1000, height:1000 });
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const nodeWidth = 120;
    const nodeHeight = 40;
    const nodeGapX = 40;
    const nodeGapY = 100;
    const canvasWidth = canvasSize.width;
    const canvasHeight = canvasSize.height;

    // Calculate the required canvas size based on the tree data
    const calculateCanvasSize = () => {
      const rootNode = treeData;
      const totalLevels = calculateTotalLevels(rootNode);
      const requiredWidth = totalLevels * (nodeWidth + nodeGapX) - nodeGapX;
      const requiredHeight = (rootNode.children.length + 1) * nodeGapY;
      return {
        width: Math.max(requiredWidth, canvasWidth),
        height: Math.max(requiredHeight, canvasHeight),
      };
    };

    // Calculate the total levels in the tree
    const calculateTotalLevels = (node, level = 1) => {
      if (node.children.length === 0) {
        return level;
      }

      let maxChildLevel = level;
      for (const child of node.children) {
        const childLevel = calculateTotalLevels(child, level + 1);
        maxChildLevel = Math.max(maxChildLevel, childLevel);
      }

      return maxChildLevel;
    };

    // Adjust the canvas size
    const adjustCanvasSize = () => {
      const newSize = calculateCanvasSize();
      setCanvasSize(newSize);
      canvas.width = newSize.width;
      canvas.height = newSize.height;
    };

    // Draw a node on the canvas
    const drawNode = (x, y, label) => {
      const labelWidth = ctx.measureText(label).width;
      const boxWidth = Math.max(labelWidth + 20, nodeWidth);
      const boxHeight = nodeHeight;

      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(x - boxWidth / 2, y - boxHeight / 2, boxWidth, boxHeight);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.strokeRect(x - boxWidth / 2, y - boxHeight / 2, boxWidth, boxHeight);
      ctx.fillStyle = '#000000';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, x, y);
    };

    // Draw a line between two points on the canvas
    const drawLine = (x1, y1, x2, y2) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    // Recursively draw the tree
    const drawTree = (node, x, y, level, parentX, parentY) => {
      const childrenCount = node.children.length;
      const startY = y + nodeGapY;

      drawNode(x, y, node.label);

      if (childrenCount === 0) {
        return;
      }

      const totalWidth = childrenCount * (nodeWidth + nodeGapX) - nodeGapX;
      const startX = x - totalWidth / 2;

      for (let i = 0; i < childrenCount; i++) {
        const childX = startX + i * (nodeWidth + nodeGapX) + nodeWidth / 2;
        const childY = startY + level * nodeGapY;
        drawLine(x, y + nodeHeight / 2, childX, childY - nodeHeight / 2);
        drawTree(
          node.children[i],
          childX,
          childY,
          level + 1,
          x,
          y + nodeHeight / 2
        );
      }
    };

    // Redraw the canvas when the tree data changes
    const redrawCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (treeData) {
        const rootX = canvas.width / 2;
        const rootY = nodeHeight + 20;
        drawTree(treeData, rootX, rootY, 1);
      }
    };

    adjustCanvasSize();
    redrawCanvas();

    // Event listener to adjust the canvas size when the container size changes
    const handleResize = () => {
      adjustCanvasSize();
      redrawCanvas();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [treeData, canvasSize, canvasRef]);

  return (
    <div ref={containerRef} className="canvas-container">
      <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height} />
    </div>
  );
};

const App = () => {
  const [treeData, setTreeData] = useState(null);
  const [label, setLabel] = useState('');
  const [parent, setParent] = useState('');
  const canvasRef = useRef(null);

  const handleLabelChange = (event) => {
    setLabel(event.target.value);
  };

  const handleParentChange = (event) => {
    setParent(event.target.value);
  };

  const handleAddNode = (event) => {
    event.preventDefault();

    if (label.trim() === '') {
      return;
    }

    const newNode = {
      label: label.trim(),
      children: [],
    };

    if (!treeData) {
      setTreeData(newNode);
    } else {
      const updatedTreeData = { ...treeData };
      const parentNode = findNodeByLabel(updatedTreeData, parent);
      if (parentNode) {
        parentNode.children.push(newNode);
        setTreeData(updatedTreeData);
      }
    }

    setLabel('');
    setParent('');
  };

  const findNodeByLabel = (node, label) => {
    if (node.label === label) {
      return node;
    }

    for (const child of node.children) {
      const foundNode = findNodeByLabel(child, label);
      if (foundNode) {
        return foundNode;
      }
    }

    return null;
  };

  return (
    <div>
      <form onSubmit={handleAddNode}>
        <label>
          Label:
          <input type="text" value={label} onChange={handleLabelChange} />
        </label>
        <label>
          Parent:
          <input type="text" value={parent} onChange={handleParentChange} />
        </label>
        <button type="submit">Add Node</button>
      </form>

      {treeData && <Flowchart treeData={treeData} canvasRef={canvasRef} />}
    </div>
  );
};

export default App;
