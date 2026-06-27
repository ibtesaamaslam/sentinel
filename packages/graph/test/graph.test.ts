import { describe, it, expect } from 'vitest';
import { GraphAnalyzer } from '../src/index.js';

describe('GraphAnalyzer', () => {
  it('should create an empty graph', () => {
    const graph = new GraphAnalyzer();
    expect(graph.toJSON().nodes).toHaveLength(0);
    expect(graph.toJSON().edges).toHaveLength(0);
  });

  it('should add nodes', () => {
    const graph = new GraphAnalyzer();
    graph.addNode('a', 'Node A');
    graph.addNode('b', 'Node B');
    expect(graph.toJSON().nodes).toHaveLength(2);
  });

  it('should not add duplicate nodes', () => {
    const graph = new GraphAnalyzer();
    graph.addNode('a', 'Node A');
    graph.addNode('a', 'Node A Again');
    expect(graph.toJSON().nodes).toHaveLength(1);
  });

  it('should add edges', () => {
    const graph = new GraphAnalyzer();
    graph.addNode('a', 'A');
    graph.addNode('b', 'B');
    graph.addEdge('a', 'b');
    expect(graph.getDependencies('a')).toEqual(['b']);
    expect(graph.getDependents('b')).toEqual(['a']);
  });

  it('should detect cycles', () => {
    const graph = new GraphAnalyzer();
    graph.addNode('a', 'A');
    graph.addNode('b', 'B');
    graph.addNode('c', 'C');
    graph.addEdge('a', 'b');
    graph.addEdge('b', 'c');
    graph.addEdge('c', 'a');
    const cycles = graph.detectCycles();
    expect(cycles.length).toBeGreaterThan(0);
  });

  it('should report no cycles for DAG', () => {
    const graph = new GraphAnalyzer();
    graph.addNode('a', 'A');
    graph.addNode('b', 'B');
    graph.addNode('c', 'C');
    graph.addEdge('a', 'b');
    graph.addEdge('b', 'c');
    const cycles = graph.detectCycles();
    expect(cycles).toHaveLength(0);
  });
});
