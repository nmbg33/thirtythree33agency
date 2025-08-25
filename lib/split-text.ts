// Simple SplitText fallback implementation
export class SplitText {
  public chars: HTMLElement[] = [];
  public lines: HTMLElement[] = [];
  private element: HTMLElement;
  private originalHTML: string;

  constructor(element: HTMLElement | string, options: { type?: string; linesClass?: string; charsClass?: string } = {}) {
    const { type = 'chars', linesClass = 'line', charsClass = 'char' } = options;
    
    if (typeof element === 'string') {
      this.element = document.querySelector(element) as HTMLElement;
    } else {
      this.element = element;
    }

    if (!this.element) return;

    this.originalHTML = this.element.innerHTML;
    
    if (type.includes('chars')) {
      this.splitIntoChars(charsClass);
    }
    
    if (type.includes('lines')) {
      this.splitIntoLines(linesClass);
    }
  }

  private splitIntoChars(charClass: string) {
    const text = this.element.textContent || '';
    const chars = text.split('');
    
    this.element.innerHTML = '';
    
    chars.forEach((char) => {
      const span = document.createElement('span');
      span.className = charClass;
      span.style.display = 'inline-block';
      span.textContent = char === ' ' ? '\u00A0' : char; // Non-breaking space
      this.element.appendChild(span);
      this.chars.push(span);
    });
  }

  private splitIntoLines(lineClass: string) {
    // This is a simplified version - for production, you'd want more sophisticated line detection
    const text = this.element.textContent || '';
    const words = text.split(' ');
    
    this.element.innerHTML = '';
    
    const line = document.createElement('div');
    line.className = lineClass;
    line.style.overflow = 'hidden';
    
    words.forEach((word, index) => {
      const span = document.createElement('span');
      span.textContent = word + (index < words.length - 1 ? ' ' : '');
      line.appendChild(span);
    });
    
    this.element.appendChild(line);
    this.lines.push(line);
  }

  public revert() {
    if (this.element && this.originalHTML) {
      this.element.innerHTML = this.originalHTML;
    }
    this.chars = [];
    this.lines = [];
  }
}
