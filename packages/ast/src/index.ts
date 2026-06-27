import type { ParsedFile } from '@sentinel/parser';

export interface ASTNode {
  type: string;
  start: number;
  end: number;
  children?: ASTNode[];
  [key: string]: unknown;
}

export interface ASTAnalysis {
  functions: FunctionDeclaration[];
  classes: ClassDeclaration[];
  imports: ImportDeclaration[];
  exports: ExportDeclaration[];
  complexity: number;
}

export interface FunctionDeclaration {
  name: string;
  startLine: number;
  endLine: number;
  isAsync: boolean;
  isExported: boolean;
  params: string[];
}

export interface ClassDeclaration {
  name: string;
  startLine: number;
  endLine: number;
  methods: string[];
  isExported: boolean;
}

export interface ImportDeclaration {
  source: string;
  specifiers: string[];
  isDefault: boolean;
  line: number;
}

export interface ExportDeclaration {
  name: string;
  line: number;
  isDefault: boolean;
}

export class ASTAnalyzer {
  analyzeFile(file: ParsedFile): ASTAnalysis {
    const functions = this.extractFunctions(file.content);
    const classes = this.extractClasses(file.content);
    const imports = this.extractImports(file.content);
    const exports = this.extractExports(file.content);
    const complexity = this.calculateComplexity(file.content);

    return { functions, classes, imports, exports, complexity };
  }

  private extractFunctions(content: string): FunctionDeclaration[] {
    const functions: FunctionDeclaration[] = [];
    const funcRegex = /(?:export\s+)?(?:async\s+)?function\s+(\w+)\s*\(([^)]*)\)/g;
    const arrowRegex = /(?:export\s+)?(?:const|let|var)\s+(\w+)\s*=\s*(?:async\s*)?\(([^)]*)\)\s*=>/g;

    let match: RegExpExecArray | null;
    while ((match = funcRegex.exec(content)) !== null) {
      const startLine = content.slice(0, match.index).split('\n').length;
      functions.push({
        name: match[1],
        startLine,
        endLine: startLine,
        isAsync: match[0].includes('async '),
        isExported: match[0].startsWith('export '),
        params: match[2].split(',').map(p => p.trim()).filter(Boolean),
      });
    }

    while ((match = arrowRegex.exec(content)) !== null) {
      const startLine = content.slice(0, match.index).split('\n').length;
      functions.push({
        name: match[1],
        startLine,
        endLine: startLine,
        isAsync: match[0].includes('async '),
        isExported: match[0].startsWith('export '),
        params: match[2].split(',').map(p => p.trim()).filter(Boolean),
      });
    }

    return functions;
  }

  private extractClasses(content: string): ClassDeclaration[] {
    const classes: ClassDeclaration[] = [];
    const classRegex = /(?:export\s+)?(?:abstract\s+)?class\s+(\w+)/g;

    let match: RegExpExecArray | null;
    while ((match = classRegex.exec(content)) !== null) {
      const startLine = content.slice(0, match.index).split('\n').length;
      classes.push({
        name: match[1],
        startLine,
        endLine: startLine,
        methods: [],
        isExported: match[0].startsWith('export '),
      });
    }

    return classes;
  }

  private extractImports(content: string): ImportDeclaration[] {
    const imports: ImportDeclaration[] = [];
    const importRegex = /(?:import\s+(?:(\w+)\s+)?(?:,\s*)?(?:\{([^}]*)\})?\s+from\s+['"]([^'"]+)['"])|(?:import\s+['"]([^'"]+)['"])/g;
    let match: RegExpExecArray | null;

    while ((match = importRegex.exec(content)) !== null) {
      const line = content.slice(0, match.index).split('\n').length;
      imports.push({
        source: match[3] || match[4],
        specifiers: match[2] ? match[2].split(',').map(s => s.trim()).filter(Boolean) : [],
        isDefault: !!match[1],
        line,
      });
    }

    return imports;
  }

  private extractExports(content: string): ExportDeclaration[] {
    const exports: ExportDeclaration[] = [];
    const exportRegex = /export\s+(?:default\s+)?(?:function|class|const|let|var|interface|type)\s+(\w+)/g;
    let match: RegExpExecArray | null;

    while ((match = exportRegex.exec(content)) !== null) {
      const line = content.slice(0, match.index).split('\n').length;
      exports.push({
        name: match[1],
        line,
        isDefault: match[0].includes('default '),
      });
    }

    return exports;
  }

  private calculateComplexity(content: string): number {
    const controlFlowPatterns = [
      /\bif\b/g, /\belse\s+if\b/g, /\bswitch\b/g, /\bcase\b/g,
      /\bfor\b/g, /\bwhile\b/g, /\bcatch\b/g, /\b&&\b/g, /\b\|\|\b/g,
      /\?\.?\s*[^:]*:/g,
    ];

    let complexity = 1;
    for (const pattern of controlFlowPatterns) {
      const matches = content.match(pattern);
      if (matches) complexity += matches.length;
    }

    return complexity;
  }
}
