# Master Dev Orchestrator - Tool Access Control Matrix

## Tool Access Restrictions by Sub-Agent

### ALEX CHEN (Creative Lead) Team

1. **UI/UX Designer Agent**
   - ✅ Read (for reviewing existing designs)
   - ✅ Write (for creating design documentation)
   - ✅ WebFetch (for design inspiration/research)
   - ❌ Bash, Edit, MultiEdit, Git operations

2. **Brand Consistency Agent**
   - ✅ Read (for checking brand compliance)
   - ✅ Grep (for finding brand-related files)
   - ✅ Glob (for locating style files)
   - ❌ Write, Edit, Bash, Git operations

3. **User Research Agent**
   - ✅ Read (for analyzing user data)
   - ✅ WebFetch (for market research)
   - ✅ WebSearch (for competitor analysis)
   - ❌ Code modification tools

4. **Motion Design Agent**
   - ✅ Read (for reviewing animations)
   - ✅ Write (for animation specifications)
   - ✅ Grep (for finding animation files)
   - ❌ Bash, Git operations

5. **Content Strategy Agent**
   - ✅ Read, Write (for content management)
   - ✅ Grep (for finding content)
   - ✅ WebSearch (for SEO research)
   - ❌ Code execution tools

### TAYLOR MORGAN (Frontend Lead) Team

1. **React Specialist Agent**
   - ✅ Read, Edit, MultiEdit (for React code)
   - ✅ Grep, Glob (for finding components)
   - ✅ LS (for project structure)
   - ❌ Bash (limited to npm commands only)
   - ❌ Git operations

2. **CSS/Styling Agent**
   - ✅ Read, Edit, MultiEdit (for stylesheets)
   - ✅ Grep (for finding style definitions)
   - ✅ Glob (for CSS/SCSS files)
   - ❌ Bash, Git operations

3. **Performance Optimization Agent**
   - ✅ Read (for analyzing code)
   - ✅ Bash (restricted to: npm run build, npm run analyze)
   - ✅ WebFetch (for lighthouse reports)
   - ❌ Direct code modification

4. **Accessibility Specialist Agent**
   - ✅ Read, Edit (for ARIA attributes)
   - ✅ Grep (for accessibility issues)
   - ✅ Bash (restricted to: npm run test:a11y)
   - ❌ System-level operations

5. **Frontend Testing Agent**
   - ✅ Read, Write (for test files)
   - ✅ Bash (restricted to: npm test, npm run test:*)
   - ✅ Grep (for test coverage)
   - ❌ Production code modification

### CAMERON REESE (Security Lead) Team

1. **Application Security Agent**
   - ✅ Read, Grep (for security analysis)
   - ✅ Bash (restricted to: security scanning tools)
   - ✅ WebFetch (for vulnerability databases)
   - ❌ Direct code modification

2. **Authentication/Authorization Agent**
   - ✅ Read (for auth flow analysis)
   - ✅ Edit (for auth config only)
   - ✅ Grep (for auth patterns)
   - ❌ Bash system commands

3. **Data Protection Agent**
   - ✅ Read, Grep (for data flow analysis)
   - ✅ Edit (for encryption configs)
   - ❌ Bash, Write (except secure configs)

4. **Security Monitoring Agent**
   - ✅ Read (for log analysis)
   - ✅ Grep (for security events)
   - ✅ Bash (restricted to: log queries)
   - ❌ Code modification tools

5. **Compliance Agent**
   - ✅ Read, Write (for compliance docs)
   - ✅ Grep (for compliance checks)
   - ✅ WebSearch (for regulations)
   - ❌ Code execution tools

### RIVER NAKAMURA (DevOps Lead) Team

1. **CI/CD Pipeline Agent**
   - ✅ Read, Edit (for pipeline configs)
   - ✅ Bash (restricted to: CI/CD commands)
   - ✅ Write (for .github/workflows/*)
   - ❌ Application code modification

2. **Infrastructure Agent**
   - ✅ Read, Write (for IaC files)
   - ✅ Bash (restricted to: terraform, kubectl)
   - ✅ Edit (for infrastructure configs)
   - ❌ Application code access

3. **Monitoring & Observability Agent**
   - ✅ Read (for metrics analysis)
   - ✅ Write (for monitoring configs)
   - ✅ Bash (restricted to: monitoring tools)
   - ❌ Code modification

4. **Database Operations Agent**
   - ✅ Read (for schema analysis)
   - ✅ Bash (restricted to: database commands)
   - ✅ Write (for migration files)
   - ❌ Application code access

5. **Incident Response Agent**
   - ✅ Read, Grep (for incident analysis)
   - ✅ Bash (restricted to: diagnostic commands)
   - ✅ Write (for runbooks)
   - ❌ Code modification during incidents

### AVERY RICHARDSON (QA Lead) Team

1. **Test Strategy Agent**
   - ✅ Read, Write (for test plans)
   - ✅ Grep (for test coverage)
   - ✅ WebSearch (for testing best practices)
   - ❌ Code execution tools

2. **Automation Testing Agent**
   - ✅ Read, Write (for test scripts)
   - ✅ Bash (restricted to: test execution)
   - ✅ Edit (for test files only)
   - ❌ Production code modification

3. **Manual Testing Agent**
   - ✅ Read (for test execution)
   - ✅ Write (for bug reports)
   - ✅ WebFetch (for test tools)
   - ❌ Code modification tools

4. **Performance Testing Agent**
   - ✅ Read (for performance analysis)
   - ✅ Bash (restricted to: jmeter, k6)
   - ✅ Write (for performance reports)
   - ❌ Code modification

5. **Quality Metrics Agent**
   - ✅ Read, Grep (for metrics collection)
   - ✅ Write (for quality reports)
   - ✅ WebFetch (for dashboards)
   - ❌ Code execution tools

## Tool Access Implementation

```typescript
interface SubAgentToolAccess {
  agentId: string;
  teamLead: string;
  allowedTools: Tool[];
  restrictedCommands?: {
    bash?: string[]; // Whitelist of allowed commands
  };
  fileAccessPatterns?: {
    read?: string[];  // Glob patterns for readable files
    write?: string[]; // Glob patterns for writable files
    edit?: string[];  // Glob patterns for editable files
  };
}

// Example implementation for React Specialist Agent
const reactSpecialistAccess: SubAgentToolAccess = {
  agentId: "frontend-react-specialist",
  teamLead: "TAYLOR_MORGAN",
  allowedTools: ["Read", "Edit", "MultiEdit", "Grep", "Glob", "LS"],
  restrictedCommands: {
    bash: ["npm install", "npm run build", "npm test"]
  },
  fileAccessPatterns: {
    read: ["**/*.tsx", "**/*.ts", "**/*.jsx", "**/*.js"],
    write: ["src/components/**/*", "src/hooks/**/*"],
    edit: ["src/**/*.tsx", "src/**/*.ts", "!src/**/*.test.*"]
  }
};
```

## Security Enforcement Rules

1. **Principle of Least Privilege**: Each agent gets minimum required access
2. **No Cross-Domain Access**: Agents cannot access other teams' domains
3. **Audit Trail**: All tool usage is logged with agent ID
4. **Command Whitelisting**: Bash commands must be explicitly allowed
5. **File Pattern Restrictions**: Access limited to relevant file types
6. **Read-Only by Default**: Write/Edit access granted only when necessary
7. **No Git Access**: Only master orchestrator can commit changes
8. **Sandboxed Execution**: Each agent runs in isolated context

## Master Orchestrator Override
The master orchestrator retains full tool access but delegates appropriately:
- Reviews all changes before committing
- Validates tool usage against access matrix
- Prevents unauthorized operations
- Aggregates results from all sub-agents