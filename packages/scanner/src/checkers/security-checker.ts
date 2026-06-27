import { Severity, FindingCategory, type Finding } from '@sentinel/core';
import type { Checker, CheckerContext } from '../types.js';
import { patternMatcher } from './pattern-matcher.js';

const SECURITY_PATTERNS = [
  // SQL Injection
  { pattern: /\.query\s*\(\s*['"`]\s*SELECT\s+.+\s+FROM\s+.+['"`]\s*\+/gi, severity: Severity.Critical, message: 'Possible SQL injection - string concatenation in SQL query' },
  { pattern: /\.query\s*\(\s*['"`]\s*INSERT\s+INTO\s+.+['"`]\s*\+/gi, severity: Severity.Critical, message: 'Possible SQL injection - string concatenation in INSERT query' },
  { pattern: /\.query\s*\(\s*['"`]\s*UPDATE\s+.+\s+SET\s+.+['"`]\s*\+/gi, severity: Severity.Critical, message: 'Possible SQL injection - string concatenation in UPDATE query' },
  { pattern: /\.query\s*\(\s*['"`]\s*DELETE\s+FROM\s+.+['"`]\s*\+/gi, severity: Severity.Critical, message: 'Possible SQL injection - string concatenation in DELETE query' },
  { pattern: /\.exec\s*\(\s*['"`]/gi, severity: Severity.High, message: 'SQL exec() used - may be vulnerable to injection without parameterization' },

  // Cross-Site Scripting (XSS)
  { pattern: /\.innerHTML\s*=.*\+/g, severity: Severity.High, message: 'Potential XSS - innerHTML assignment with concatenation' },
  { pattern: /\.outerHTML\s*=.*\+/g, severity: Severity.High, message: 'Potential XSS - outerHTML assignment with concatenation' },
  { pattern: /document\.write\s*\(.*\+/g, severity: Severity.High, message: 'Potential XSS - document.write() with concatenation' },
  { pattern: /dangerouslySetInnerHTML/g, severity: Severity.High, message: 'dangerouslySetInnerHTML used - potential XSS risk' },
  { pattern: /v-html\s*=/g, severity: Severity.High, message: 'v-html binding used - potential XSS risk' },
  { pattern: /eval\s*\(/g, severity: Severity.Critical, message: 'eval() used - security and performance risk' },
  { pattern: /Function\s*\([^)]*['"]/g, severity: Severity.Critical, message: 'Function constructor used with string - potential code injection' },
  { pattern: /setTimeout\s*\(\s*['"]/g, severity: Severity.High, message: 'setTimeout with string argument - potential code injection' },
  { pattern: /setInterval\s*\(\s*['"]/g, severity: Severity.High, message: 'setInterval with string argument - potential code injection' },

  // Command Injection
  { pattern: /child_process\.exec\s*\(/g, severity: Severity.Critical, message: 'Command execution detected - potential command injection risk' },
  { pattern: /child_process\.execSync\s*\(/g, severity: Severity.Critical, message: 'Synchronous command execution detected - potential command injection risk' },
  { pattern: /exec\s*\(\s*['"`]/g, severity: Severity.High, message: 'Shell command execution with string literal - potential injection risk' },
  { pattern: /spawn\s*\(\s*['"`].*sh['"`]\s*,\s*\[/g, severity: Severity.High, message: 'Shell spawn detected - ensure arguments are sanitized' },

  // Path Traversal
  { pattern: /readFileSync\s*\(\s*[^)]*\+/g, severity: Severity.High, message: 'File read with path concatenation - potential path traversal' },
  { pattern: /readFile\s*\(\s*[^)]*\+/g, severity: Severity.High, message: 'File read with path concatenation - potential path traversal' },
  { pattern: /writeFileSync\s*\(\s*[^)]*\+/g, severity: Severity.High, message: 'File write with path concatenation - potential path traversal' },
  { pattern: /writeFile\s*\(\s*[^)]*\+/g, severity: Severity.High, message: 'File write with path concatenation - potential path traversal' },
  { pattern: /unlinkSync\s*\(\s*[^)]*\+/g, severity: Severity.High, message: 'File deletion with path concatenation - potential path traversal' },

  // Insecure Authentication / Missing Auth
  { pattern: /password\s*=\s*['"][^'"]{1,7}['"]/gi, severity: Severity.High, message: 'Short hardcoded password detected - likely insecure' },
  { pattern: /allowPublicKeyRetrieval\s*=\s*true/gi, severity: Severity.Medium, message: 'Allow public key retrieval enabled - potential security risk' },
  { pattern: /rejectUnauthorized\s*=\s*false/gi, severity: Severity.High, message: 'TLS certificate validation disabled - security risk' },
  { pattern: /NODE_TLS_REJECT_UNAUTHORIZED\s*=\s*0/g, severity: Severity.Critical, message: 'TLS rejection disabled environment variable set' },

  // CSRF / SSRF
  { pattern: /app\.use\s*\(\s*cors\s*\(\s*\{\s*origin\s*:\s*['"`]\*['"`]/g, severity: Severity.High, message: 'CORS configured with wildcard origin - potential security risk' },
  { pattern: /fetch\s*\(\s*['"`][^'\"`]*localhost['\"`]/gi, severity: Severity.Medium, message: 'Fetch to localhost - potential SSRF risk in production' },
  { pattern: /axios\.get\s*\(\s*['"`]/g, severity: Severity.Info, message: 'External HTTP request detected - verify SSRF protections' },

  // Proto-type pollution
  { pattern: /Object\.assign\s*\(\s*[^,]+,\s*[^)]+\s*\)/g, severity: Severity.Medium, message: 'Object.assign() with user-controlled input - potential prototype pollution' },
  { pattern: /\.__proto__\s*=/g, severity: Severity.Critical, message: 'Direct __proto__ assignment - potential prototype pollution' },
];

export const securityChecker: Checker = {
  id: 'sentinel/security-vulnerability-detection',
  name: 'Security Vulnerability Detection',
  description: 'Detects security vulnerabilities including SQL injection, XSS, SSRF, CSRF, command injection, and path traversal',
  languages: ['*'],
  check(context: CheckerContext): Finding[] {
    return patternMatcher(context, SECURITY_PATTERNS, 'security-detection', FindingCategory.SecurityVulnerability);
  },
};
