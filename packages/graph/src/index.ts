export interface GraphNode {
  id: string;
  label: string;
  metadata?: Record<string, unknown>;
}

export interface GraphEdge {
  from: string;
  to: string;
  type: string;
  weight?: number;
}

export interface DependencyGraph {
  nodes: Map<string, GraphNode>;
  edges: GraphEdge[];
}

export class GraphAnalyzer {
  private graph: DependencyGraph;

  constructor() {
    this.graph = { nodes: new Map(), edges: [] };
  }

  addNode(id: string, label: string, metadata?: Record<string, unknown>): void {
    if (!this.graph.nodes.has(id)) {
      this.graph.nodes.set(id, { id, label, metadata });
    }
  }

  addEdge(from: string, to: string, type: string = 'depends-on', weight?: number): void {
    this.graph.edges.push({ from, to, type, weight });
  }

  getDependencies(nodeId: string): string[] {
    return this.graph.edges
      .filter(e => e.from === nodeId)
      .map(e => e.to);
  }

  getDependents(nodeId: string): string[] {
    return this.graph.edges
      .filter(e => e.to === nodeId)
      .map(e => e.from);
  }

  detectCycles(): string[][] {
    const visited = new Set<string>();
    const recursionStack = new Set<string>();
    const cycles: string[][] = [];
    const path: string[] = [];
    const allNodes = Array.from(this.graph.nodes.keys());

    const dfs = (node: string) => {
      if (recursionStack.has(node)) {
        const cycleStartIdx = path.indexOf(node);
        if (cycleStartIdx >= 0) {
          cycles.push([...path.slice(cycleStartIdx), node]);
        }
        return;
      }
      if (visited.has(node)) return;

      visited.add(node);
      recursionStack.add(node);
      path.push(node);

      const deps = this.getDependencies(node);
      for (const dep of deps) {
        if (this.graph.nodes.has(dep)) {
          dfs(dep);
        }
      }

      path.pop();
      recursionStack.delete(node);
    };

    for (const node of allNodes) {
      dfs(node);
    }

    return cycles;
  }

  getDistance(from: string, to: string): number {
    const queue: [string, number][] = [[from, 0]];
    const visited = new Set<string>();

    while (queue.length > 0) {
      const [current, dist] = queue.shift()!;
      if (current === to) return dist;
      if (visited.has(current)) continue;
      visited.add(current);

      for (const dep of this.getDependencies(current)) {
        queue.push([dep, dist + 1]);
      }
    }

    return -1;
  }

  toJSON(): { nodes: GraphNode[]; edges: GraphEdge[] } {
    return {
      nodes: Array.from(this.graph.nodes.values()),
      edges: this.graph.edges,
    };
  }

  clear(): void {
    this.graph.nodes.clear();
    this.graph.edges = [];
  }
}
