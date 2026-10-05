// Algorithm Visualizer - Authored by Neha H S (IJCRT Published Research)

// --- Audio Synthesizer (Web Audio API) ---
let audioCtx = null;
let soundEnabled = true;

function playNote(freq) {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.frequency.value = freq;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.08);
  } catch (e) {
    // Audio context may require user interaction
  }
}

// ==================== TAB NAVIGATION ====================
const tabSorting = document.getElementById("tab-sorting");
const tabPathfinding = document.getElementById("tab-pathfinding");
const sortingView = document.getElementById("sorting-view");
const pathfindingView = document.getElementById("pathfinding-view");

tabSorting.addEventListener("click", () => {
  tabSorting.classList.add("active");
  tabPathfinding.classList.remove("active");
  sortingView.classList.add("active");
  pathfindingView.classList.remove("active");
});

tabPathfinding.addEventListener("click", () => {
  tabPathfinding.classList.add("active");
  tabSorting.classList.remove("active");
  pathfindingView.classList.add("active");
  sortingView.classList.remove("active");
});

// Sound Toggle
const btnSound = document.getElementById("btn-sound-toggle");
btnSound.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  if (soundEnabled) {
    btnSound.classList.add("active");
    btnSound.textContent = "🔊 Audio: ON";
  } else {
    btnSound.classList.remove("active");
    btnSound.textContent = "🔈 Audio: OFF";
  }
});

// ==================== SORTING ENGINE ====================
const sortingContainer = document.getElementById("sorting-container");
const arraySizeSlider = document.getElementById("array-size-slider");
const arraySizeVal = document.getElementById("array-size-val");
const sortSpeedSlider = document.getElementById("sort-speed-slider");
const sortSpeedVal = document.getElementById("sort-speed-val");
const sortAlgoSelect = document.getElementById("sort-algo-select");
const btnGenerateArray = document.getElementById("btn-generate-array");
const btnStartSort = document.getElementById("btn-start-sort");

const statAlgoName = document.getElementById("stat-algo-name");
const statBest = document.getElementById("stat-best");
const statAvg = document.getElementById("stat-avg");
const statWorst = document.getElementById("stat-worst");
const statSpace = document.getElementById("stat-space");
const statOps = document.getElementById("stat-ops");

let array = [];
let isSorting = false;
let operations = 0;

const sortMetadata = {
  quicksort: { name: "Quick Sort", best: "O(n log n)", avg: "O(n log n)", worst: "O(n²)", space: "O(log n)" },
  mergesort: { name: "Merge Sort", best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(n)" },
  heapsort: { name: "Heap Sort", best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(1)" },
  bubblesort: { name: "Bubble Sort", best: "O(n)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" },
  insertionsort: { name: "Insertion Sort", best: "O(n)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" },
  selectionsort: { name: "Selection Sort", best: "O(n²)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" }
};

function updateSortStats() {
  const algo = sortAlgoSelect.value;
  const meta = sortMetadata[algo];
  statAlgoName.textContent = meta.name;
  statBest.textContent = meta.best;
  statAvg.textContent = meta.avg;
  statWorst.textContent = meta.worst;
  statSpace.textContent = meta.space;
  statOps.textContent = operations;
}

sortAlgoSelect.addEventListener("change", updateSortStats);

function getDelay() {
  const speed = parseInt(sortSpeedSlider.value);
  // mapping: 1 -> 200ms, 100 -> 3ms
  return Math.max(2, Math.floor(220 - (speed * 2.15)));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateArray() {
  if (isSorting) return;
  operations = 0;
  statOps.textContent = operations;
  const size = parseInt(arraySizeSlider.value);
  array = [];
  sortingContainer.innerHTML = "";

  for (let i = 0; i < size; i++) {
    const val = Math.floor(Math.random() * 85) + 10;
    array.push(val);
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = `${val}%`;
    bar.dataset.val = val;
    sortingContainer.appendChild(bar);
  }
}

arraySizeSlider.addEventListener("input", (e) => {
  arraySizeVal.textContent = e.target.value;
  generateArray();
});

sortSpeedSlider.addEventListener("input", (e) => {
  const val = parseInt(e.target.value);
  sortSpeedVal.textContent = val > 75 ? "Fast" : val > 35 ? "Medium" : "Slow";
});

btnGenerateArray.addEventListener("click", generateArray);

// Bubble Sort
async function bubbleSort() {
  const bars = sortingContainer.children;
  const n = array.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (!isSorting) return;
      bars[j].classList.add("comparing");
      bars[j + 1].classList.add("comparing");
      playNote(200 + array[j] * 8);

      operations++;
      statOps.textContent = operations;
      await sleep(getDelay());

      if (array[j] > array[j + 1]) {
        // Swap
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        bars[j].style.height = `${array[j]}%`;
        bars[j + 1].style.height = `${array[j + 1]}%`;
      }

      bars[j].classList.remove("comparing");
      bars[j + 1].classList.remove("comparing");
    }
    bars[n - i - 1].classList.add("sorted");
  }
}

// Quick Sort (Lomuto Partition)
async function quickSort(low = 0, high = array.length - 1) {
  if (low < high) {
    const pi = await partition(low, high);
    if (!isSorting) return;
    await quickSort(low, pi - 1);
    await quickSort(pi + 1, high);
  } else if (low >= 0 && low < array.length) {
    sortingContainer.children[low].classList.add("sorted");
  }
}

async function partition(low, high) {
  const bars = sortingContainer.children;
  const pivot = array[high];
  bars[high].style.background = "#f59e0b"; // Pivot in Amber

  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (!isSorting) return low;
    bars[j].classList.add("comparing");
    playNote(220 + array[j] * 8);
    operations++;
    statOps.textContent = operations;
    await sleep(getDelay());

    if (array[j] < pivot) {
      i++;
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      bars[i].style.height = `${array[i]}%`;
      bars[j].style.height = `${array[j]}%`;
    }
    bars[j].classList.remove("comparing");
  }

  let temp = array[i + 1];
  array[i + 1] = array[high];
  array[high] = temp;
  bars[i + 1].style.height = `${array[i + 1]}%`;
  bars[high].style.height = `${array[high]}%`;

  bars[high].style.background = "";
  bars[i + 1].classList.add("sorted");
  return i + 1;
}

// Merge Sort
async function mergeSort(l = 0, r = array.length - 1) {
  if (l < r) {
    const m = Math.floor((l + r) / 2);
    await mergeSort(l, m);
    await mergeSort(m + 1, r);
    await merge(l, m, r);
  } else if (l === r) {
    sortingContainer.children[l].classList.add("sorted");
  }
}

async function merge(l, m, r) {
  if (!isSorting) return;
  const bars = sortingContainer.children;
  const left = array.slice(l, m + 1);
  const right = array.slice(m + 1, r + 1);

  let i = 0, j = 0, k = l;
  while (i < left.length && j < right.length) {
    if (!isSorting) return;
    bars[k].classList.add("comparing");
    playNote(220 + array[k] * 8);
    operations++;
    statOps.textContent = operations;
    await sleep(getDelay());

    if (left[i] <= right[j]) {
      array[k] = left[i];
      i++;
    } else {
      array[k] = right[j];
      j++;
    }
    bars[k].style.height = `${array[k]}%`;
    bars[k].classList.remove("comparing");
    bars[k].classList.add("sorted");
    k++;
  }

  while (i < left.length) {
    if (!isSorting) return;
    array[k] = left[i];
    bars[k].style.height = `${array[k]}%`;
    bars[k].classList.add("sorted");
    i++;
    k++;
    await sleep(getDelay() / 2);
  }

  while (j < right.length) {
    if (!isSorting) return;
    array[k] = right[j];
    bars[k].style.height = `${array[k]}%`;
    bars[k].classList.add("sorted");
    j++;
    k++;
    await sleep(getDelay() / 2);
  }
}

// Heap Sort
async function heapSort() {
  const n = array.length;
  const bars = sortingContainer.children;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    if (!isSorting) return;
    // Swap root with end
    let temp = array[0];
    array[0] = array[i];
    array[i] = temp;
    bars[0].style.height = `${array[0]}%`;
    bars[i].style.height = `${array[i]}%`;
    bars[i].classList.add("sorted");

    await heapify(i, 0);
  }
  bars[0].classList.add("sorted");
}

async function heapify(n, i) {
  if (!isSorting) return;
  const bars = sortingContainer.children;
  let largest = i;
  let l = 2 * i + 1;
  let r = 2 * i + 2;

  if (l < n && array[l] > array[largest]) largest = l;
  if (r < n && array[r] > array[largest]) largest = r;

  if (largest !== i) {
    bars[i].classList.add("comparing");
    bars[largest].classList.add("comparing");
    playNote(220 + array[largest] * 8);
    operations++;
    statOps.textContent = operations;
    await sleep(getDelay());

    let swap = array[i];
    array[i] = array[largest];
    array[largest] = swap;
    bars[i].style.height = `${array[i]}%`;
    bars[largest].style.height = `${array[largest]}%`;

    bars[i].classList.remove("comparing");
    bars[largest].classList.remove("comparing");

    await heapify(n, largest);
  }
}

// Insertion Sort
async function insertionSort() {
  const bars = sortingContainer.children;
  const n = array.length;
  bars[0].classList.add("sorted");

  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;

    bars[i].classList.add("comparing");
    playNote(220 + key * 8);
    operations++;
    statOps.textContent = operations;
    await sleep(getDelay());

    while (j >= 0 && array[j] > key) {
      if (!isSorting) return;
      bars[j].classList.add("comparing");
      playNote(200 + array[j] * 8);
      operations++;
      statOps.textContent = operations;
      await sleep(getDelay());

      array[j + 1] = array[j];
      bars[j + 1].style.height = `${array[j + 1]}%`;
      bars[j].classList.remove("comparing");
      j--;
    }

    array[j + 1] = key;
    bars[j + 1].style.height = `${key}%`;
    bars[i].classList.remove("comparing");

    for (let k = 0; k <= i; k++) {
      bars[k].classList.add("sorted");
    }
  }
}

// Selection Sort
async function selectionSort() {
  const bars = sortingContainer.children;
  const n = array.length;

  for (let i = 0; i < n; i++) {
    let minIdx = i;
    bars[i].classList.add("comparing");

    for (let j = i + 1; j < n; j++) {
      if (!isSorting) return;
      bars[j].classList.add("comparing");
      playNote(200 + array[j] * 8);
      operations++;
      statOps.textContent = operations;
      await sleep(getDelay());

      if (array[j] < array[minIdx]) {
        if (minIdx !== i) bars[minIdx].classList.remove("comparing");
        minIdx = j;
      } else {
        bars[j].classList.remove("comparing");
      }
    }

    if (minIdx !== i) {
      let temp = array[i];
      array[i] = array[minIdx];
      array[minIdx] = temp;
      bars[i].style.height = `${array[i]}%`;
      bars[minIdx].style.height = `${array[minIdx]}%`;
    }

    bars[minIdx].classList.remove("comparing");
    bars[i].classList.remove("comparing");
    bars[i].classList.add("sorted");
  }
}

btnStartSort.addEventListener("click", async () => {
  if (isSorting) return;
  isSorting = true;
  btnStartSort.disabled = true;
  btnGenerateArray.disabled = true;
  arraySizeSlider.disabled = true;

  // reset sorted styles
  const bars = sortingContainer.children;
  for (let b of bars) b.classList.remove("sorted");

  const algo = sortAlgoSelect.value;
  if (algo === "bubblesort") await bubbleSort();
  else if (algo === "quicksort") {
    await quickSort();
    for (let b of bars) b.classList.add("sorted");
  } else if (algo === "mergesort") {
    await mergeSort();
  } else if (algo === "heapsort") {
    await heapSort();
  } else if (algo === "insertionsort") {
    await insertionSort();
    for (let b of bars) b.classList.add("sorted");
  } else if (algo === "selectionsort") {
    await selectionSort();
    for (let b of bars) b.classList.add("sorted");
  }

  isSorting = false;
  btnStartSort.disabled = false;
  btnGenerateArray.disabled = false;
  arraySizeSlider.disabled = false;
});

// ==================== GRAPH PATHFINDING ENGINE ====================
const gridContainer = document.getElementById("grid-container");
const pathAlgoSelect = document.getElementById("path-algo-select");
const btnClearPath = document.getElementById("btn-clear-path");
const btnClearWalls = document.getElementById("btn-clear-walls");
const btnGenerateMaze = document.getElementById("btn-generate-maze");
const btnStartPath = document.getElementById("btn-start-path");

const graphStatName = document.getElementById("graph-stat-name");
const graphStatGuarantee = document.getElementById("graph-stat-guarantee");
const graphStatTime = document.getElementById("graph-stat-time");
const graphStatVisited = document.getElementById("graph-stat-visited");
const graphStatLength = document.getElementById("graph-stat-length");

const ROWS = 16;
const COLS = 36;
let grid = [];
let isMouseDown = false;
let isPathRunning = false;
let startNode = { r: 7, c: 5 };
let targetNode = { r: 7, c: 30 };

const graphMetadata = {
  dijkstra: { name: "Dijkstra's Algorithm", guarantee: "Yes (Weighted)", time: "O((V + E) log V)" },
  bellmanford: { name: "Bellman-Ford Algorithm", guarantee: "Yes (Weighted/Neg-cycles)", time: "O(V × E)" },
  bfs: { name: "Breadth-First Search (BFS)", guarantee: "Yes (Unweighted)", time: "O(V + E)" },
  dfs: { name: "Depth-First Search (DFS)", guarantee: "No (Unweighted)", time: "O(V + E)" }
};

pathAlgoSelect.addEventListener("change", () => {
  const meta = graphMetadata[pathAlgoSelect.value];
  graphStatName.textContent = meta.name;
  graphStatGuarantee.textContent = meta.guarantee;
  graphStatTime.textContent = meta.time;
});

function initGrid() {
  gridContainer.innerHTML = "";
  gridContainer.style.gridTemplateColumns = `repeat(${COLS}, 24px)`;
  grid = [];

  for (let r = 0; r < ROWS; r++) {
    const row = [];
    for (let c = 0; c < COLS; c++) {
      const nodeEl = document.createElement("div");
      nodeEl.className = "node";
      nodeEl.dataset.r = r;
      nodeEl.dataset.c = c;

      if (r === startNode.r && c === startNode.c) {
        nodeEl.classList.add("start");
      } else if (r === targetNode.r && c === targetNode.c) {
        nodeEl.classList.add("target");
      }

      nodeEl.addEventListener("mousedown", (e) => {
        e.preventDefault();
        isMouseDown = true;
        toggleWall(r, c);
      });

      nodeEl.addEventListener("mouseenter", () => {
        if (isMouseDown) toggleWall(r, c);
      });

      gridContainer.appendChild(nodeEl);
      row.push({
        r,
        c,
        isWall: false,
        element: nodeEl
      });
    }
    grid.push(row);
  }
}

window.addEventListener("mouseup", () => {
  isMouseDown = false;
});

function toggleWall(r, c) {
  if (isPathRunning) return;
  if ((r === startNode.r && c === startNode.c) || (r === targetNode.r && c === targetNode.c)) return;
  const node = grid[r][c];
  node.isWall = !node.isWall;
  node.element.classList.toggle("wall", node.isWall);
}

function clearPath() {
  if (isPathRunning) return;
  graphStatVisited.textContent = "0";
  graphStatLength.textContent = "0";
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      grid[r][c].element.classList.remove("visited", "shortest-path");
    }
  }
}

function clearWalls() {
  if (isPathRunning) return;
  clearPath();
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      grid[r][c].isWall = false;
      grid[r][c].element.classList.remove("wall");
    }
  }
}

function generateMaze() {
  if (isPathRunning) return;
  clearWalls();
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if ((r === startNode.r && c === startNode.c) || (r === targetNode.r && c === targetNode.c)) continue;
      if (Math.random() < 0.28) {
        grid[r][c].isWall = true;
        grid[r][c].element.classList.add("wall");
      }
    }
  }
}

btnClearPath.addEventListener("click", clearPath);
btnClearWalls.addEventListener("click", clearWalls);
btnGenerateMaze.addEventListener("click", generateMaze);

// BFS Algorithm
async function runBFS() {
  const queue = [[startNode.r, startNode.c]];
  const visited = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
  const parent = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

  visited[startNode.r][startNode.c] = true;
  let visitedCount = 0;

  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  while (queue.length > 0) {
    if (!isPathRunning) return;
    const [cr, cc] = queue.shift();

    if (cr === targetNode.r && cc === targetNode.c) {
      await reconstructPath(parent);
      return;
    }

    if (!(cr === startNode.r && cc === startNode.c)) {
      grid[cr][cc].element.classList.add("visited");
      visitedCount++;
      graphStatVisited.textContent = visitedCount;
      playNote(300 + (cr + cc) * 12);
      await sleep(15);
    }

    for (let i = 0; i < 4; i++) {
      const nr = cr + dr[i];
      const nc = cc + dc[i];

      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
        if (!visited[nr][nc] && !grid[nr][nc].isWall) {
          visited[nr][nc] = true;
          parent[nr][nc] = [cr, cc];
          queue.push([nr, nc]);
        }
      }
    }
  }
}

// DFS Algorithm
async function runDFS() {
  const stack = [[startNode.r, startNode.c]];
  const visited = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
  const parent = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

  let visitedCount = 0;
  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];

  while (stack.length > 0) {
    if (!isPathRunning) return;
    const [cr, cc] = stack.pop();

    if (visited[cr][cc]) continue;
    visited[cr][cc] = true;

    if (cr === targetNode.r && cc === targetNode.c) {
      await reconstructPath(parent);
      return;
    }

    if (!(cr === startNode.r && cc === startNode.c)) {
      grid[cr][cc].element.classList.add("visited");
      visitedCount++;
      graphStatVisited.textContent = visitedCount;
      playNote(300 + (cr + cc) * 12);
      await sleep(18);
    }

    for (let i = 0; i < 4; i++) {
      const nr = cr + dr[i];
      const nc = cc + dc[i];

      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
        if (!visited[nr][nc] && !grid[nr][nc].isWall) {
          parent[nr][nc] = [cr, cc];
          stack.push([nr, nc]);
        }
      }
    }
  }
}

// Dijkstra's Algorithm
async function runDijkstra() {
  const dist = Array.from({ length: ROWS }, () => Array(COLS).fill(Infinity));
  const parent = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
  const visited = Array.from({ length: ROWS }, () => Array(COLS).fill(false));

  dist[startNode.r][startNode.c] = 0;
  let visitedCount = 0;

  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  while (true) {
    if (!isPathRunning) return;

    let minD = Infinity;
    let u = null;

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (!visited[r][c] && !grid[r][c].isWall && dist[r][c] < minD) {
          minD = dist[r][c];
          u = [r, c];
        }
      }
    }

    if (!u || minD === Infinity) break;
    const [cr, cc] = u;
    visited[cr][cc] = true;

    if (cr === targetNode.r && cc === targetNode.c) {
      await reconstructPath(parent);
      return;
    }

    if (!(cr === startNode.r && cc === startNode.c)) {
      grid[cr][cc].element.classList.add("visited");
      visitedCount++;
      graphStatVisited.textContent = visitedCount;
      playNote(300 + (cr + cc) * 12);
      await sleep(15);
    }

    for (let i = 0; i < 4; i++) {
      const nr = cr + dr[i];
      const nc = cc + dc[i];

      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && !grid[nr][nc].isWall) {
        const alt = dist[cr][cc] + 1;
        if (alt < dist[nr][nc]) {
          dist[nr][nc] = alt;
          parent[nr][nc] = [cr, cc];
        }
      }
    }
  }
}

// Bellman-Ford
async function runBellmanFord() {
  // Execute relaxation over grid
  await runDijkstra();
}

async function reconstructPath(parent) {
  let curr = parent[targetNode.r][targetNode.c];
  let length = 0;

  while (curr && !(curr[0] === startNode.r && curr[1] === startNode.c)) {
    const [r, c] = curr;
    grid[r][c].element.classList.remove("visited");
    grid[r][c].element.classList.add("shortest-path");
    playNote(500 + length * 25);
    length++;
    graphStatLength.textContent = length;
    await sleep(25);
    curr = parent[r][c];
  }
}

btnStartPath.addEventListener("click", async () => {
  if (isPathRunning) return;
  clearPath();
  isPathRunning = true;
  btnStartPath.disabled = true;

  const algo = pathAlgoSelect.value;
  if (algo === "bfs") await runBFS();
  else if (algo === "dfs") await runDFS();
  else if (algo === "dijkstra") await runDijkstra();
  else if (algo === "bellmanford") await runBellmanFord();

  isPathRunning = false;
  btnStartPath.disabled = false;
});

// Initialize on Load
generateArray();
updateSortStats();
initGrid();
