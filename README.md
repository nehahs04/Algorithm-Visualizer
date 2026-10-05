<h1 align="center">Algorithm Visualizer ⚡</h1>
<h3 align="center">Interactive Full-Stack Visualization Platform for Sorting & Graph Pathfinding</h3>

<p align="center">
  <img src="https://img.shields.io/badge/Research-IJCRT%20Published-success?style=for-the-badge" alt="Research Published" />
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
</p>

---

## 📌 Research Background & Publication

This project originated as an undergraduate research initiative by **Neha H S** at **Global Academy of Technology**, focused on solving algorithmic comprehension hurdles encountered in computer science education.

- **Paper Title:** *Interactive Real-Time Visualization Framework for Asymptotic Analysis and Traversal in Complex Graph Networks & Sorting Heuristics*
- **Author:** Neha H S
- **Publication Journal:** *International Journal of Creative Research Thoughts (IJCRT)*

---

## 🎯 Key Features

### 1. 📊 Sorting Algorithm Visualizer
- **Supported Algorithms:**
  - **Quick Sort** (Lomuto Partition Scheme)
  - **Merge Sort** (Divide-and-Conquer Recursive Reconstruction)
  - **Heap Sort** (Max-Heapify and In-place Swapping)
  - **Bubble Sort** (Adjacent Element Bubbling)
  - **Insertion Sort** (Incremental Element Insertion with Real-Time Shift Tracing)
  - **Selection Sort** (Iterative Minimum-Finding and In-Place Swapping)
- **Dynamic Array Controls:** Real-time array size slider (15 to 90 elements), speed adjuster, and instant re-shuffling.
- **Audio Synthesizer:** Real-time acoustic frequency synthesis powered by Web Audio API based on relative element magnitude.
- **Real-Time Metrics:** Tracks comparisons, operations, and dynamic asymptotic complexity indicators (Best, Average, Worst, and Space complexity).

### 2. 🕸️ Graph Pathfinding & Maze Solver
- **Supported Algorithms:**
  - **Dijkstra’s Algorithm** (Weighted Shortest Path)
  - **Bellman-Ford Algorithm** (Edge Relaxation & Negative Weight Support)
  - **Breadth-First Search (BFS)** (Unweighted Optimal Traversal)
  - **Depth-First Search (DFS)** (Exhaustive Exploration)
- **Interactive Grid System:**
  - Click-and-drag wall/obstacle placement.
  - Interactive Start and Target markers.
  - Procedural random maze generator.
  - Frontier visualization with backtrack trace for optimal shortest route.

---

## 🔬 Complexity Matrix

| Algorithm | Type | Best Case | Average Case | Worst Case | Space Complexity |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Quick Sort** | Sorting | $\Omega(n \log n)$ | $\Theta(n \log n)$ | $O(n^2)$ | $O(\log n)$ |
| **Merge Sort** | Sorting | $\Omega(n \log n)$ | $\Theta(n \log n)$ | $O(n \log n)$ | $O(n)$ |
| **Heap Sort** | Sorting | $\Omega(n \log n)$ | $\Theta(n \log n)$ | $O(n \log n)$ | $O(1)$ |
| **Bubble Sort** | Sorting | $\Omega(n)$ | $\Theta(n^2)$ | $O(n^2)$ | $O(1)$ |
| **Insertion Sort** | Sorting | $\Omega(n)$ | $\Theta(n^2)$ | $O(n^2)$ | $O(1)$ |
| **Selection Sort** | Sorting | $\Omega(n^2)$ | $\Theta(n^2)$ | $O(n^2)$ | $O(1)$ |
| **Dijkstra** | Graph | $O(V \log V + E)$ | $O((V + E) \log V)$ | $O((V + E) \log V)$ | $O(V)$ |
| **Bellman-Ford** | Graph | $O(E)$ | $O(V \cdot E)$ | $O(V \cdot E)$ | $O(V)$ |
| **BFS / DFS** | Graph | $O(V + E)$ | $O(V + E)$ | $O(V + E)$ | $O(V)$ |

---

## 🚀 Getting Started

### Prerequisites
No dependencies or installations required! This is a client-side web application built with vanilla modern web standards.

### Running Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/nehahs04/Algorithm-Visualizer.git
   cd Algorithm-Visualizer
   ```
2. Open `index.html` in any modern web browser (Chrome, Edge, Firefox, Safari):
   ```bash
   # On Windows PowerShell
   Start-Process index.html
   ```
   Or use VS Code Live Server extension.

---

## 👩‍💻 Author

**Neha H S**  
- **LinkedIn:** [neha-h-s-4701b0375](https://www.linkedin.com/in/neha-h-s-4701b0375/)  
- **GitHub:** [@nehahs04](https://github.com/nehahs04)  
- **Institution:** Global Academy of Technology, Bengaluru  
