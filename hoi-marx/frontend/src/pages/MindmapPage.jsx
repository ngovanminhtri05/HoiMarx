import { useState, useMemo, useRef, useCallback } from "react";
import { Maximize2, Minus, X, ZoomIn, ZoomOut } from "lucide-react";
import { mindmapData } from "../data/mindmapData.js";

const SLOT_H = 56;
const LEVEL_W = 230;
const NODE_W = [180, 168, 195, 172, 152];
const NODE_H = [48, 42, 40, 36, 32];
const PAD_L = 24;
const PAD_T = 40;

function countLeaves(node, collapsed) {
  if (!node.children?.length || collapsed[node.id]) return 1;
  return node.children.reduce((s, c) => s + countLeaves(c, collapsed), 0);
}

function layoutNode(node, depth, slotStart, collapsed) {
  const leaves = countLeaves(node, collapsed);
  const centerSlot = slotStart + leaves / 2;
  const nw = NODE_W[Math.min(depth, NODE_W.length - 1)];
  const nh = NODE_H[Math.min(depth, NODE_H.length - 1)];
  const x = PAD_L + depth * LEVEL_W;
  const y = PAD_T + centerSlot * SLOT_H - nh / 2;

  const children = [];
  if (node.children?.length && !collapsed[node.id]) {
    let cs = slotStart;
    for (const child of node.children) {
      children.push(layoutNode(child, depth + 1, cs, collapsed));
      cs += countLeaves(child, collapsed);
    }
  }
  return { ...node, x, y, nw, nh, depth, children };
}

function flatNodes(layout) {
  const out = [layout];
  for (const c of layout.children || []) out.push(...flatNodes(c));
  return out;
}

function flatEdges(layout) {
  const out = [];
  for (const c of layout.children || []) {
    out.push({ from: layout, to: c });
    out.push(...flatEdges(c));
  }
  return out;
}

function svgDims(nodes) {
  if (!nodes.length) return { w: 600, h: 400 };
  const maxX = Math.max(...nodes.map((n) => n.x + n.nw)) + 40;
  const maxY = Math.max(...nodes.map((n) => n.y + n.nh)) + 40;
  return { w: maxX, h: maxY };
}

function Edge({ from, to }) {
  const x1 = from.x + from.nw;
  const y1 = from.y + from.nh / 2;
  const x2 = to.x;
  const y2 = to.y + to.nh / 2;
  const cx = (x1 + x2) / 2;
  return (
    <path
      d={`M ${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`}
      fill="none"
      stroke={to.color}
      strokeWidth={to.depth <= 1 ? 2.5 : to.depth === 2 ? 1.8 : 1.2}
      strokeOpacity={0.55}
    />
  );
}

function Node({ node, onSelect, onToggle, collapsed, selectedId }) {
  const isCollapsible = node.children?.length > 0;
  const isCollapsed = collapsed[node.id];
  const isSelected = node.id === selectedId;
  const rx = node.depth === 0 ? 12 : 10;
  const fontSize = node.depth === 0 ? 11 : node.depth === 1 ? 10.5 : 9.5;
  const subFontSize = fontSize - 1;

  return (
    <g
      transform={`translate(${node.x}, ${node.y})`}
      onClick={() => onSelect(node)}
      style={{ cursor: "pointer" }}
      role="button"
      aria-pressed={isSelected}
    >
      <rect x={2} y={3} width={node.nw} height={node.nh} rx={rx} ry={rx} fill="rgba(23,33,43,0.14)" />
      <rect width={node.nw} height={node.nh} rx={rx} ry={rx} fill={node.color} />
      {isSelected && (
        <rect
          x={-3}
          y={-3}
          width={node.nw + 6}
          height={node.nh + 6}
          rx={rx + 3}
          ry={rx + 3}
          fill="none"
          stroke="#B4232A"
          strokeWidth={2}
        />
      )}
      {node.depth >= 3 && <rect width={3} height={node.nh} rx={3} fill="rgba(255,255,255,0.35)" />}
      <text
        x={node.depth === 0 ? node.nw / 2 : 10}
        y={node.sublabel ? node.nh / 2 - 3 : node.nh / 2 + fontSize * 0.35}
        textAnchor={node.depth === 0 ? "middle" : "start"}
        dominantBaseline={node.sublabel ? "auto" : "middle"}
        fill={node.textColor || "#fff"}
        fontSize={fontSize}
        fontFamily="'Outfit', Arial, sans-serif"
        fontWeight={node.depth <= 1 ? 700 : 600}
      >
        {node.label}
      </text>
      {node.sublabel && (
        <text
          x={node.depth === 0 ? node.nw / 2 : 10}
          y={node.nh / 2 + 3}
          textAnchor={node.depth === 0 ? "middle" : "start"}
          dominantBaseline="hanging"
          fill={node.textColor || "#fff"}
          fillOpacity={0.76}
          fontSize={subFontSize}
          fontFamily="'Outfit', Arial, sans-serif"
        >
          {node.sublabel}
        </text>
      )}
      {isCollapsible && (
        <g
          onClick={(e) => {
            e.stopPropagation();
            onToggle(node.id);
          }}
          style={{ cursor: "pointer" }}
        >
          <rect x={node.nw - 22} y={0} width={22} height={node.nh} fill="transparent" />
          <text
            x={node.nw - 11}
            y={node.nh / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={node.textColor || "#fff"}
            fillOpacity={0.82}
            fontSize={12}
            fontFamily="Consolas, monospace"
            fontWeight={700}
          >
            {isCollapsed ? "+" : "-"}
          </text>
        </g>
      )}
    </g>
  );
}

function DefinitionPanel({ node, onClose }) {
  if (!node) return null;
  return (
    <div className="mm-def-panel">
      <div className="mm-def-header">
        <div className="mm-def-header-text">
          <span className="mm-def-title">{node.label}</span>
          {node.sublabel && <span className="mm-def-sub">{node.sublabel}</span>}
        </div>
        <button className="mm-def-close" onClick={onClose} aria-label="Đóng">
          <X size={16} strokeWidth={2.2} />
        </button>
      </div>
      <p className="mm-def-body">{node.def ?? "Chưa có định nghĩa cho mục này."}</p>
    </div>
  );
}

const INITIAL_COLLAPSED = { "triet-2-1": true, "triet-2-2": true, "triet-2-3": true };

export default function MindmapPage() {
  const [collapsed, setCollapsed] = useState(INITIAL_COLLAPSED);
  const [zoom, setZoom] = useState(1);
  const [selectedNode, setSelectedNode] = useState(null);
  const containerRef = useRef(null);

  const toggle = useCallback((id) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const handleSelect = useCallback((node) => {
    setSelectedNode((prev) => (prev?.id === node.id ? null : node));
  }, []);

  const layout = useMemo(() => layoutNode(mindmapData, 0, 0, collapsed), [collapsed]);
  const nodes = useMemo(() => flatNodes(layout), [layout]);
  const edges = useMemo(() => flatEdges(layout), [layout]);
  const { w, h } = useMemo(() => svgDims(nodes), [nodes]);

  const expandAll = () => setCollapsed({});
  const collapseAll = () => {
    const c = {};
    nodes.forEach((n) => {
      if (n.children?.length) c[n.id] = true;
    });
    setCollapsed(c);
  };

  return (
    <div className="mm-page">
      <div className="mm-toolbar">
        <div className="mm-toolbar-left">
          <p className="page-kicker">Bản đồ khái niệm</p>
          <h2 className="mm-title">Sơ đồ tư duy</h2>
          <p className="mm-subtitle">Bấm vào node để xem định nghĩa, dùng thu gọn để ôn theo từng cụm.</p>
        </div>
        <div className="mm-toolbar-right">
          <button className="mm-btn" onClick={expandAll}>
            <Maximize2 size={16} strokeWidth={2.2} />
            Mở tất cả
          </button>
          <button className="mm-btn" onClick={collapseAll}>
            <Minus size={16} strokeWidth={2.2} />
            Thu gọn
          </button>
          <button className="mm-btn mm-icon-btn" onClick={() => setZoom((z) => Math.min(2, z + 0.15))} title="Phóng to">
            <ZoomIn size={17} strokeWidth={2.2} />
          </button>
          <button className="mm-btn mm-icon-btn" onClick={() => setZoom((z) => Math.max(0.4, z - 0.15))} title="Thu nhỏ">
            <ZoomOut size={17} strokeWidth={2.2} />
          </button>
          <span className="mm-zoom-label">{Math.round(zoom * 100)}%</span>
        </div>
      </div>

      <div className="mm-legend">
        {[
          { color: "#1e3a6e", label: "Triết học" },
          { color: "#7a4a00", label: "Kinh tế CT" },
          { color: "#1a5c2a", label: "CNXHKH" },
        ].map((l) => (
          <span key={l.label} className="mm-legend-item">
            <span className="mm-legend-dot" style={{ background: l.color }} />
            {l.label}
          </span>
        ))}
      </div>

      <DefinitionPanel node={selectedNode} onClose={() => setSelectedNode(null)} />

      <div className="mm-canvas-wrap" ref={containerRef}>
        <div
          className="mm-canvas-inner"
          style={{ transform: `scale(${zoom})`, transformOrigin: "top left", width: w, height: h }}
        >
          <svg width={w} height={h} style={{ display: "block" }} aria-label="Sơ đồ tư duy MLN111">
            <g className="mm-edges">
              {edges.map((e, i) => (
                <Edge key={i} from={e.from} to={e.to} />
              ))}
            </g>
            <g className="mm-nodes">
              {nodes.map((n) => (
                <Node
                  key={n.id}
                  node={n}
                  onSelect={handleSelect}
                  onToggle={toggle}
                  collapsed={collapsed}
                  selectedId={selectedNode?.id}
                />
              ))}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
