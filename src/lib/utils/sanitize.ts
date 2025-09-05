// Edge runtime compatible sanitization
// DOMPurify doesn't work in edge runtime, so we use basic sanitization

/**
 * Basic HTML entity encoding for edge runtime compatibility
 */
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Strip HTML tags from string
 */
function stripHtml(html: string): string {
  // Basic tag stripping for edge runtime
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Sanitize plain text input - removes all HTML
 */
export function sanitizeText(input: string): string {
  if (!input || typeof input !== 'string') return '';
  // For edge runtime, we strip HTML and escape entities
  return escapeHtml(stripHtml(input));
}

/**
 * Sanitize basic HTML input - allows only safe tags
 */
export function sanitizeHtml(input: string): string {
  if (!input || typeof input !== 'string') return '';
  // For edge runtime, we escape HTML entities
  return escapeHtml(input);
}

/**
 * Sanitize markdown-generated HTML
 */
export function sanitizeMarkdown(input: string): string {
  if (!input || typeof input !== 'string') return '';
  // For edge runtime, we do basic escaping
  // In production, markdown should be rendered server-side with proper sanitization
  return escapeHtml(input);
}

/**
 * Sanitize user input for use in SQL queries (basic escaping)
 */
export function sanitizeSqlInput(input: string): string {
  if (!input || typeof input !== 'string') return '';
  // Basic SQL injection prevention - in production use parameterized queries
  return input
    .replace(/'/g, "''")
    .replace(/;/g, '')
    .replace(/--/g, '')
    .replace(/\/\*/g, '')
    .replace(/\*\//g, '');
}

/**
 * Sanitize filename to prevent directory traversal
 */
export function sanitizeFilename(filename: string): string {
  if (!filename || typeof filename !== 'string') return '';
  // Remove any path separators and null bytes
  return filename
    .replace(/[\/\\]/g, '')
    .replace(/\0/g, '')
    .replace(/\.\./g, '')
    .substring(0, 255); // Limit length
}

/**
 * Sanitize URL to prevent XSS
 */
export function sanitizeUrl(url: string): string {
  if (!url || typeof url !== 'string') return '';
  
  // Allow only safe protocols
  const allowedProtocols = ['http:', 'https:', 'mailto:'];
  
  try {
    const urlObj = new URL(url);
    if (!allowedProtocols.includes(urlObj.protocol)) {
      return '';
    }
    return url;
  } catch {
    // If URL parsing fails, treat as relative URL
    // Remove any potential XSS vectors
    return url
      .replace(/javascript:/gi, '')
      .replace(/data:/gi, '')
      .replace(/vbscript:/gi, '');
  }
}

/**
 * Sanitize JSON input
 */
export function sanitizeJson(input: any): any {
  if (typeof input === 'string') {
    return sanitizeText(input);
  }
  
  if (Array.isArray(input)) {
    return input.map(sanitizeJson);
  }
  
  if (input && typeof input === 'object') {
    const sanitized: any = {};
    for (const key in input) {
      if (input.hasOwnProperty(key)) {
        // Sanitize the key as well
        const sanitizedKey = sanitizeText(key);
        sanitized[sanitizedKey] = sanitizeJson(input[key]);
      }
    }
    return sanitized;
  }
  
  return input;
}

/**
 * Middleware to sanitize request body
 */
export async function sanitizeRequestBody(request: Request): Promise<any> {
  try {
    const contentType = request.headers.get('content-type');
    
    if (contentType?.includes('application/json')) {
      const body = await request.json();
      return sanitizeJson(body);
    }
    
    if (contentType?.includes('text/plain')) {
      const text = await request.text();
      return sanitizeText(text);
    }
    
    // For other content types, return as-is
    return await request.text();
  } catch (error) {
    console.error('Error sanitizing request body:', error);
    throw new Error('Invalid request body');
  }
}