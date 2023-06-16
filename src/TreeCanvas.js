import React, { useEffect, useRef } from 'react';

const TreeCanvas = ({ treeData }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawTree(ctx, treeData, canvas.width / 2, 50, canvas.width / 2, 50);

    // Adjust canvas size to fit the tree
    canvas.height = Math.max(canvas.height, getTreeHeight(treeData) * 100);
  }, [treeData]);

  const drawTree = (ctx, node, x, y, parentX, parentY) => {
    // Draw node
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillText(node.name, x - 20, y + 30);

    // Draw connecting line
    ctx.beginPath();
    ctx.moveTo(parentX, parentY);
    ctx.lineTo(x, y);
    ctx.stroke();

    // Draw children
    const children = node.children || [];
    const numChildren = children.length;
    const startX = x - (numChildren * 50) / 2;
    const startY = y + 100;
    for (let i = 0; i < numChildren; i++) {
      const childX = startX + i * 50;
      const childY = startY;
      drawTree(ctx, children[i], childX, childY, x, y);
    }
  };

  const getTreeHeight = node => {
    if (!node.children || node.children.length === 0) {
      return 1;
    }

    let maxHeight = 0;
    for (const child of node.children) {
      const childHeight = getTreeHeight(child);
      if (childHeight > maxHeight) {
        maxHeight = childHeight;
      }
    }
    return maxHeight + 1;
  };

  return <canvas ref={canvasRef} />;
};

export default TreeCanvas;
