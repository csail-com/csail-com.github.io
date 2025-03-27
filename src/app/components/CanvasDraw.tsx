// components/CanvasDraw.tsx
import React, {
  PointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  points: Point[];
  color: string;
  brushRadius: number;
}

interface CanvasDrawProps {
  initialData?: string;
  onSave?: (data: string) => void;
}

const CanvasDraw: React.FC<CanvasDrawProps> = ({ initialData, onSave }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  // 브러시 굵기는 상수로 처리
  const brushRadius = 4;
  const [currentColor, setCurrentColor] = useState<string>("#000000");
  const [eraserMode, setEraserMode] = useState<boolean>(false);

  // 확대/축소(scale) 상태: 기본 1
  const [scale, setScale] = useState<number>(1);

  // 모바일 핀치 줌용 상태
  const [initialPinchDistance, setInitialPinchDistance] = useState<
    number | null
  >(null);
  const [initialScale, setInitialScale] = useState<number>(1);
  // 활성 포인터들을 저장 (핀치 줌 감지를 위해)
  const activePointers = useRef<Map<number, { x: number; y: number }>>(
    new Map()
  );

  // 전달받은 저장 데이터 로드
  useEffect(() => {
    if (initialData) {
      try {
        const savedStrokes: Stroke[] = JSON.parse(initialData);
        setStrokes(savedStrokes);
      } catch (err) {
        console.error("initialData 파싱 오류:", err);
      }
    }
  }, [initialData]);

  // 전체 그리기 함수 (zoom 적용 및 캔버스 초기화)
  const drawAll = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.save();
    // transform 초기화
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // zoom 적용 (좌상단 기준)
    ctx.scale(scale, scale);
    strokes.forEach((stroke) => {
      if (!stroke || !stroke.points || stroke.points.length === 0) return;
      ctx.beginPath();
      ctx.lineWidth = stroke.brushRadius;
      ctx.strokeStyle = stroke.color;
      stroke.points.forEach((point, index) => {
        if (index === 0) ctx.moveTo(point.x, point.y);
        else ctx.lineTo(point.x, point.y);
      });
      ctx.stroke();
    });
    ctx.restore();
  }, [strokes, scale]);

  // 캔버스 크기를 창 크기에 맞게 설정
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawAll();
    }
  }, [drawAll]);

  // 캔버스 초기 설정 및 윈도우 리사이즈 처리
  useEffect(() => {
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, [updateCanvasSize]);

  // 현재 zoom(scale)을 고려한 좌표 계산
  const getCanvasPoint = (e: PointerEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / scale,
      y: (e.clientY - rect.top) / scale,
    };
  };

  // 단일 터치일 때 드로잉 시작
  const startDrawing = (e: PointerEvent<HTMLCanvasElement>) => {
    if (activePointers.current.size >= 2) return; // 줌 중이면 드로잉 X
    const point = getCanvasPoint(e);
    setIsDrawing(true);
    const strokeColor = eraserMode ? "#ffffff" : currentColor;
    const newStroke: Stroke = {
      points: [point],
      color: strokeColor,
      brushRadius: brushRadius,
    };
    setCurrentStroke(newStroke);
  };

  // 단일 터치일 때 드로잉 진행
  const draw = (e: PointerEvent<HTMLCanvasElement>) => {
    if (activePointers.current.size >= 2) return; // 줌 제스처 중이면 드로잉 X
    if (!isDrawing || !currentStroke) return;
    const point = getCanvasPoint(e);
    setCurrentStroke((prev) => {
      if (!prev) return prev;
      return { ...prev, points: [...prev.points, point] };
    });
    drawAll();
    // 진행중인 선도 임시로 그림
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.save();
    ctx.scale(scale, scale);
    ctx.beginPath();
    ctx.lineWidth = currentStroke.brushRadius;
    ctx.strokeStyle = currentStroke.color;
    currentStroke.points.forEach((pt, index) => {
      if (index === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    ctx.restore();
  };

  const endDrawing = () => {
    if (!isDrawing || !currentStroke) return;
    setIsDrawing(false);
    setStrokes((prev) => [...prev, currentStroke]);
    setCurrentStroke(null);
  };

  // 데스크탑: ctrl+마우스휠 줌 처리
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const zoomFactor = 1 - e.deltaY * 0.001;
      setScale((prev) => Math.min(Math.max(prev * zoomFactor, 0.5), 3));
    }
  };

  // 모바일/태블릿: 포인터 이벤트를 통한 핀치 줌 구현
  const handlePointerDown = (e: PointerEvent<HTMLCanvasElement>) => {
    activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (activePointers.current.size === 1) {
      startDrawing(e);
    } else if (activePointers.current.size === 2) {
      setInitialPinchDistance(getPinchDistance());
      setInitialScale(scale);
      setIsDrawing(false);
      setCurrentStroke(null);
    }
  };

  const handlePointerMove = (e: PointerEvent<HTMLCanvasElement>) => {
    if (activePointers.current.has(e.pointerId)) {
      activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    }
    if (activePointers.current.size >= 2) {
      const currentDistance = getPinchDistance();
      if (initialPinchDistance && currentDistance) {
        const newScale =
          initialScale * (currentDistance / initialPinchDistance);
        setScale(Math.min(Math.max(newScale, 0.5), 3));
      }
    } else if (activePointers.current.size === 1) {
      draw(e);
    }
  };

  const handlePointerUp = (e: PointerEvent<HTMLCanvasElement>) => {
    activePointers.current.delete(e.pointerId);
    if (activePointers.current.size < 2) {
      if (isDrawing) endDrawing();
      setInitialPinchDistance(null);
      setInitialScale(scale);
    }
  };

  // 두 포인터 간의 거리 계산 (화면 좌표 기준)
  const getPinchDistance = (): number | null => {
    const pointers = Array.from(activePointers.current.values());
    if (pointers.length < 2) return null;
    const [p1, p2] = pointers;
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // 저장하기
  const handleSave = () => {
    const data = JSON.stringify(strokes);
    console.log("저장된 필기 데이터:", data);
    if (onSave) onSave(data);
  };

  const toggleEraser = () => {
    setEraserMode((prev) => !prev);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentColor(e.target.value);
    setEraserMode(false);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{ border: "1px solid #000", touchAction: "none" }}
        onWheel={handleWheel}
        onPointerDown={(e) => {
          (canvasRef.current as HTMLCanvasElement).setPointerCapture(
            e.pointerId
          );
          handlePointerDown(e);
        }}
        onPointerMove={handlePointerMove}
        onPointerUp={(e) => {
          (canvasRef.current as HTMLCanvasElement).releasePointerCapture(
            e.pointerId
          );
          handlePointerUp(e);
        }}
      />
      <div style={{ marginTop: "10px" }}>
        <button onClick={toggleEraser}>
          {eraserMode ? "펜 모드로 전환" : "지우개 모드로 전환"}
        </button>
        <input
          type="color"
          value={currentColor}
          onChange={handleColorChange}
          disabled={eraserMode}
          style={{ marginLeft: "10px" }}
        />
        <button onClick={handleSave} style={{ marginLeft: "10px" }}>
          저장하기
        </button>
      </div>
    </div>
  );
};

export default CanvasDraw;
