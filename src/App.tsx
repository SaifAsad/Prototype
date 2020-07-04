import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function Toolbar({ handleAddRectangle }: any) {
  return (
    <>
      <button onClick={handleAddRectangle}>Rectangle</button>
    </>
  );
}

interface CanvasProps {
  items: CanvasItem[];
  children: any;
}

function Canvas(props: CanvasProps) {
  const { items } = props;
  const drawingCanvasRef = useRef<HTMLCanvasElement>(null);

  const renderCanvasItems = () => {
    const ctx = drawingCanvasRef.current?.getContext("2d");

    items.map((item, index) => {
      ctx?.rect(20 * index, 20 * index, 150, 100);
      ctx?.stroke();
    });
  };

  useEffect(() => {
    renderCanvasItems();
  });

  return (
    <div className="canvas-container">
      {props.children}
      <canvas ref={drawingCanvasRef} />
    </div>
  );
}

interface CanvasItemProps {
  item: CanvasItem;
}

function CanvasItem({ item }: CanvasItemProps) {
  return <div className="canvas-item">item {item.id}</div>;
}

interface CanvasItem {
  id: string;
}

function App() {
  const [items, setItems] = useState<CanvasItem[]>([{ id: "1" }, { id: "2" }]);

  const handleAddRectangle = () => {
    const newItems = [...items, { id: (items.length + 1).toString() }];
    setItems(newItems);
  };

  return (
    <div className="App">
      <Toolbar handleAddRectangle={handleAddRectangle} />
      <Canvas items={items}>
        {items.map((item, index) => (
          <CanvasItem key={index} item={item} />
        ))}
      </Canvas>
    </div>
  );
}

export default App;
