export function quillToPlainText(delta: any[]): string {
  if (!Array.isArray(delta)) {
    return '';
  }

  let plainText = '';

  for (const item of delta) {
    if (typeof item.insert === 'string') {
      // Add the text content
      plainText += item.insert;
    } else if (item.insert && typeof item.insert === 'object') {
      // Handle special inserts like images, videos, etc.
      if (item.insert.image) {
        plainText += '[Image]';
      } else if (item.insert.video) {
        plainText += '[Video]';
      } else {
        plainText += '[Embedded Content]';
      }
    }
  }

  return plainText;
}
