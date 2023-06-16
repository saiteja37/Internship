
/*
import React, { useState, useRef, useEffect } from 'react';
import { Network } from 'vis-network/standalone/esm/vis-network';
import { DataSet } from 'vis-data/peer/esm/vis-data';

const DirectedGraph = () => {
  const graphRef = useRef(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [parent, setParent] = useState('');
  const [child, setChild] = useState('');

  useEffect(() => {
    const container = graphRef.current;
    const data = {
      nodes: new DataSet(nodes),
      edges: new DataSet(edges),
    };
    const options = {
      edges: {
        arrows: { to: { enabled: true } },
        arrowStrikethrough: false,
        chosen: true,
      },
      layout: {
        hierarchical: {
          enabled: true,
          levelSeparation: 200,
          nodeSpacing: 200,
          direction: 'UD', // Up-Down direction
          sortMethod: 'directed', // Sort based on edge direction
        },
      },
      physics: false,
    };
    const network = new Network(container, data, options);

    return () => {
      network.destroy();
    };
  }, [nodes, edges]);

  const addNode = () => {
    const parentNode = nodes.find((node) => node.label === parent);
    const childNode = nodes.find((node) => node.label === child);

    if (!parentNode && parent) {
      const newNodeId = nodes.length + 1;
      const newNode = { id: newNodeId, label: parent, level: 0 };
      setNodes([...nodes, newNode]);
      setParent('');
    }

    if (!childNode && child) {
      const parentNode = nodes.find((node) => node.label === parent);
      const newNodeId = nodes.length + 1;
      const newNode = { id: newNodeId, label: child, level: parentNode ? parentNode.level + 1 : 1 };
      setNodes([...nodes, newNode]);
      setChild('');

      if (parentNode) {
        const newEdge = { from: parentNode.id, to: newNodeId };
        setEdges([...edges, newEdge]);
      }
    }
  };

  return (
    <div>
      <div ref={graphRef} style={{ height: '600px' }} />
      <div>
        <input
          type="text"
          value={parent}
          onChange={(e) => setParent(e.target.value)}
          placeholder="Parent node"
        />
        <input
          type="text"
          value={child}
          onChange={(e) => setChild(e.target.value)}
          placeholder="Child node"
        />
        <button onClick={addNode}>Add Node</button>
      </div>
    </div>
  );
};

export default DirectedGraph;
*/


import React, { useState, useRef, useEffect } from 'react';
import { Network } from 'vis-network/standalone/esm/vis-network';
import { DataSet } from 'vis-data/peer/esm/vis-data';

const DirectedGraph = () => {
    const graphRef = useRef(null);
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [parent, setParent] = useState('');
    const [child, setChild] = useState('');

    useEffect(() => {
        const container = graphRef.current;
        const data = {
            nodes: new DataSet(nodes),
            edges: new DataSet(edges),
        };
        const options = {
            nodes: {
                shape: 'box',
                widthConstraint: {
                  maximum: 200
                },
                color: {
                  background: '#97C2FC',
                  border: '#2B7CE9'
                }
              },
            edges: {
                
                arrows: { to: { enabled: true } },
                arrowStrikethrough: false,
                chosen: true,
            },
            layout: {
                hierarchical: {
                    enabled: true,
                    levelSeparation: 200,
                    nodeSpacing: 200,
                    direction: 'UD', // Up-Down direction
                    sortMethod: 'directed', // Sort based on edge direction
                },
            },
            physics: false,
        };
        const network = new Network(container, data, options);

        return () => {
            network.destroy();
        };
    }, [nodes, edges]);

    const addNode = () => {
        const parentNode = nodes.find((node) => node.label === parent);
        const childNode = nodes.find((node) => node.label === child);

        if (!parentNode && parent) {
            const newNodeId = nodes.length + 1;
            const newNode = { id: newNodeId, label: parent, level: 0 };
            setNodes([...nodes, newNode]);
            setParent('');
        }

        if (!childNode && child) {
            const parentNode = nodes.find((node) => node.label === parent);
            const newNodeId = nodes.length + 1;
            const newNode = { id: newNodeId, label: child, level: parentNode ? parentNode.level + 1 : 1 };
            setNodes([...nodes, newNode]);
            setChild('');

            if (parentNode) {
                const newEdge = { from: parentNode.id, to: newNodeId };
                setEdges([...edges, newEdge]);
            }
        }
    };

    return (
        <div>
            <div className='row mx-2 my-3'>
                <div className='mt-3 col-4'>
                    <input
                        type="text"
                        value={parent}
                        onChange={(e) => setParent(e.target.value)}
                        placeholder="Parent node"
                        style={{
                            flex: 1,
                            marginRight: '10px',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                        }}
                    />
                    <input
                        type="text"
                        value={child}
                        onChange={(e) => setChild(e.target.value)}
                        placeholder="Child node"
                        style={{
                            flex: 1,
                            marginRight: '10px',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                        }}
                    />
                    <button className='mt-3'
                        onClick={addNode}
                        style={{
                            padding: '10px',
                            backgroundColor: '#4caf50',
                            marginLeft:"150px",
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Add Node
                    </button>
                </div>

                <div className='col-8' ref={graphRef} style={{ border: "solid 3px black", margin: "20px",width:"900px",height: '600px' }} />
            </div>
        </div>
    );
};

export default DirectedGraph;
