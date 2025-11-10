/**
 * Sanitize HTML content to prevent XSS attacks
 * Escapes all HTML special characters
 */
export function sanitizeHtml(text: string): string {
  if (typeof text !== 'string') {
    return '';
  }

  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };

  return text.replace(/[&<>"']/g, (char) => map[char] || char);
}

/**
 * Validate and sanitize email content
 * Trims and validates length
 */
export function sanitizeEmailContent(
  content: string,
  maxLength: number
): string {
  if (typeof content !== 'string') {
    return '';
  }

  const trimmed = content.trim();
  
  if (trimmed.length > maxLength) {
    return trimmed.substring(0, maxLength);
  }

  return trimmed;
}

