(function () {
  const SVG_NS = "http://www.w3.org/2000/svg";
  const names = {
    p: "pawn",
    r: "rook",
    n: "knight",
    b: "bishop",
    q: "queen",
    k: "king"
  };

  const palette = {
    white: {
      fill: "#faf8ee",
      mid: "#dedbd1",
      stroke: "#4f4c45",
      shine: "#ffffff",
      detail: "#6f6a60"
    },
    black: {
      fill: "#47443f",
      mid: "#2d2b28",
      stroke: "#12110f",
      shine: "#6c6760",
      detail: "#0b0a09"
    }
  };

  function svgEl(tag, attrs = {}) {
    const node = document.createElementNS(SVG_NS, tag);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
    return node;
  }

  function add(parent, tag, attrs) {
    const node = svgEl(tag, attrs);
    parent.appendChild(node);
    return node;
  }

  function shapeAttrs(colors, extra = {}) {
    return {
      fill: colors.fill,
      stroke: colors.stroke,
      "stroke-width": "4",
      "stroke-linejoin": "round",
      "stroke-linecap": "round",
      ...extra
    };
  }

  function addBase(svg, colors) {
    add(svg, "ellipse", {
      cx: "50",
      cy: "84",
      rx: "29",
      ry: "7",
      fill: colors.mid,
      stroke: colors.stroke,
      "stroke-width": "4"
    });
    add(svg, "rect", shapeAttrs(colors, {
      x: "25",
      y: "71",
      width: "50",
      height: "11",
      rx: "3"
    }));
  }

  function drawPawn(svg, colors) {
    add(svg, "circle", shapeAttrs(colors, { cx: "50", cy: "28", r: "12" }));
    add(svg, "path", shapeAttrs(colors, {
      d: "M41 43 C43 39 47 37 50 37 C53 37 57 39 59 43 L65 69 H35 Z"
    }));
    addBase(svg, colors);
  }

  function drawRook(svg, colors) {
    add(svg, "path", shapeAttrs(colors, {
      d: "M25 20 H36 V29 H43 V20 H57 V29 H64 V20 H75 V42 H25 Z"
    }));
    add(svg, "rect", shapeAttrs(colors, { x: "32", y: "42", width: "36", height: "29", rx: "3" }));
    addBase(svg, colors);
  }

  function drawKnight(svg, colors) {
    add(svg, "path", shapeAttrs(colors, {
      d: "M31 72 C34 57 38 49 33 37 C41 23 56 19 69 30 C63 33 63 39 67 45 C61 46 58 48 55 53 C52 58 47 60 41 60 C45 64 50 67 58 72 Z"
    }));
    add(svg, "path", {
      d: "M42 34 C45 37 47 39 49 42",
      fill: "none",
      stroke: colors.detail,
      "stroke-width": "3",
      "stroke-linecap": "round"
    });
    add(svg, "circle", { cx: "55", cy: "35", r: "2.4", fill: colors.stroke });
    addBase(svg, colors);
  }

  function drawBishop(svg, colors) {
    add(svg, "circle", shapeAttrs(colors, { cx: "50", cy: "22", r: "8" }));
    add(svg, "path", shapeAttrs(colors, {
      d: "M50 31 C66 43 69 60 58 72 H42 C31 60 34 43 50 31 Z"
    }));
    add(svg, "path", {
      d: "M43 34 L57 52",
      fill: "none",
      stroke: colors.detail,
      "stroke-width": "4",
      "stroke-linecap": "round"
    });
    addBase(svg, colors);
  }

  function drawQueen(svg, colors) {
    [[29, 29], [39, 19], [50, 14], [61, 19], [71, 29]].forEach(([cx, cy]) => {
      add(svg, "circle", shapeAttrs(colors, { cx, cy, r: "5" }));
    });
    add(svg, "path", shapeAttrs(colors, {
      d: "M27 35 L39 27 L50 23 L61 27 L73 35 L64 58 H36 Z"
    }));
    add(svg, "rect", shapeAttrs(colors, { x: "36", y: "58", width: "28", height: "13", rx: "3" }));
    addBase(svg, colors);
  }

  function drawKing(svg, colors) {
    add(svg, "path", {
      d: "M50 13 V31 M40 22 H60",
      fill: "none",
      stroke: colors.stroke,
      "stroke-width": "7",
      "stroke-linecap": "round"
    });
    add(svg, "path", shapeAttrs(colors, {
      d: "M32 43 C35 32 44 29 50 35 C56 29 65 32 68 43 C69 55 62 64 58 72 H42 C38 64 31 55 32 43 Z"
    }));
    add(svg, "path", {
      d: "M39 46 C45 39 55 39 61 46",
      fill: "none",
      stroke: colors.detail,
      "stroke-width": "3",
      "stroke-linecap": "round"
    });
    addBase(svg, colors);
  }

  function drawPiece(svg, type, colors) {
    if (type === "p") drawPawn(svg, colors);
    if (type === "r") drawRook(svg, colors);
    if (type === "n") drawKnight(svg, colors);
    if (type === "b") drawBishop(svg, colors);
    if (type === "q") drawQueen(svg, colors);
    if (type === "k") drawKing(svg, colors);
    add(svg, "path", {
      d: "M36 76 H64",
      fill: "none",
      stroke: colors.shine,
      "stroke-width": "3",
      "stroke-linecap": "round",
      opacity: "0.55"
    });
  }

  function render(piece) {
    const type = String(piece || "").toLowerCase();
    const isWhite = piece === String(piece).toUpperCase();
    const colorName = isWhite ? "white" : "black";
    const colors = palette[colorName];
    const label = `${colorName} ${names[type] || "piece"}`;
    const svg = svgEl("svg", {
      viewBox: "0 0 100 100",
      role: "img",
      "aria-label": label,
      class: `piece-img piece-svg piece-${colorName} piece-${type} ${type === "p" ? "piece-pawn" : ""}`,
      "data-piece": piece
    });
    drawPiece(svg, type, colors);
    return svg;
  }

  function label(piece) {
    const type = String(piece || "").toLowerCase();
    const isWhite = piece === String(piece).toUpperCase();
    const colorName = isWhite ? "white" : "black";
    return `${colorName[0].toUpperCase()}${names[type]?.[0]?.toUpperCase() || "?"}`;
  }

  window.ChessFacePieces = { render, label };
}());
