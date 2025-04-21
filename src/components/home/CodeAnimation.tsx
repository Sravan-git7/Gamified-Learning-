import React, { useState, useEffect, useRef } from 'react';

// Code snippet that will be "typed" animation
const codeSnippet = `function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  
  const pivot = arr[0];
  const left = [];
  const right = [];
  
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  
  return [...quickSort(left), pivot, ...quickSort(right)];
}

// Example usage
const unsortedArray = [5, 3, 7, 6, 2, 9];
const sortedArray = quickSort(unsortedArray);
console.log(sortedArray); // [2, 3, 5, 6, 7, 9]`;

const CodeAnimation: React.FC = () => {
  const [displayedCode, setDisplayedCode] = useState<string>('');
  const [cursorPosition, setCursorPosition] = useState<{ line: number; char: number }>({ line: 0, char: 0 });
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const codeRef = useRef<HTMLPreElement>(null);
  
  // Split the code into lines for easier manipulation
  const codeLines = codeSnippet.split('\n');
  
  useEffect(() => {
    let isMounted = true;
    let timeout: NodeJS.Timeout;
    
    const typeCode = () => {
      if (!isMounted) return;
      
      const { line, char } = cursorPosition;
      
      if (line < codeLines.length) {
        const currentLine = codeLines[line];
        
        if (char < currentLine.length) {
          // Still typing the current line
          setDisplayedCode(prev => {
            // Keep all previous lines and add the next character to the current line
            const lines = prev.split('\n');
            while (lines.length <= line) lines.push('');
            lines[line] = currentLine.substring(0, char + 1);
            return lines.join('\n');
          });
          
          // Move cursor to next character
          setCursorPosition({ line, char: char + 1 });
        } else {
          // Move to the next line
          setCursorPosition({ line: line + 1, char: 0 });
        }
        
        // Random typing speed between 10ms and 50ms
        const typingSpeed = Math.floor(Math.random() * 40) + 10;
        timeout = setTimeout(typeCode, typingSpeed);
      } else {
        // Finished typing all lines
        setIsTyping(false);
        
        // After a pause, reset to start typing again
        timeout = setTimeout(() => {
          if (isMounted) {
            setDisplayedCode('');
            setCursorPosition({ line: 0, char: 0 });
            setIsTyping(true);
            typeCode();
          }
        }, 5000);
      }
    };
    
    if (isTyping) {
      timeout = setTimeout(typeCode, 500);
    }
    
    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [cursorPosition, isTyping]);
  
  // Apply syntax highlighting
  const highlightSyntax = (code: string) => {
    const keywordRegex = /\b(function|const|let|var|if|else|for|return|console\.log)\b/g;
    const stringRegex = /(["'`]).*?\1/g;
    const numberRegex = /\b\d+\b/g;
    const commentRegex = /\/\/.*$/gm;
    
    return code
      .replace(keywordRegex, match => `<span class="token keyword">${match}</span>`)
      .replace(stringRegex, match => `<span class="token string">${match}</span>`)
      .replace(numberRegex, match => `<span class="token number">${match}</span>`)
      .replace(commentRegex, match => `<span class="token comment">${match}</span>`);
  };
  
  // Insert a blinking cursor at the current position
  const getCodeWithCursor = () => {
    if (!isTyping) return highlightSyntax(displayedCode);
    
    const lines = displayedCode.split('\n');
    const { line, char } = cursorPosition;
    
    // Insert cursor at current position
    if (lines[line] !== undefined) {
      const beforeCursor = lines[line].substring(0, char);
      const afterCursor = lines[line].substring(char);
      lines[line] = `${beforeCursor}<span class="inline-block w-2 h-4 bg-blue-500 animate-pulse"></span>${afterCursor}`;
    }
    
    return highlightSyntax(lines.join('\n'));
  };
  
  return (
    <div className="w-full h-full bg-gray-900 rounded-lg p-4 overflow-hidden font-mono text-sm">
      <pre 
        ref={codeRef}
        className="text-white overflow-hidden"
        dangerouslySetInnerHTML={{ __html: getCodeWithCursor() }}
      />
    </div>
  );
};

export default CodeAnimation; 