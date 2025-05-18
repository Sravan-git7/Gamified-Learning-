import React from 'react';
import { useStore } from '../../lib/store';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { githubLight, githubDark } from '@uiw/codemirror-theme-github';
import Button from '../ui/Button';
import { Play, Check, X } from 'lucide-react';

interface TestResult {
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
}

const CodeEditor: React.FC = () => {
  const { currentChallenge, code, setCode, theme } = useStore();
  const [isRunning, setIsRunning] = React.useState(false);
  const [results, setResults] = React.useState<TestResult[]>([]);
  const [allPassed, setAllPassed] = React.useState(false);

  const runCode = () => {
    if (!currentChallenge) return;
    
    setIsRunning(true);
    setResults([]);
    
    setTimeout(() => {
      try {
        // This is a simplified evaluation - in a real app, you'd use a sandboxed environment
        const func = new Function(`
          ${code};
          return {
            ${currentChallenge.testCases.map(test => {
              const funcName = test.input.split('(')[0];
              return `${test.input}: ${test.input}`;
            }).join(',\n')}
          };
        `)();
        
        const testResults = currentChallenge.testCases.map(test => {
          const actual = JSON.stringify(func[test.input]);
          const expected = test.expectedOutput;
          const passed = actual === expected;
          
          return {
            input: test.input,
            expected,
            actual,
            passed
          };
        });
        
        const passed = testResults.every(result => result.passed);
        setResults(testResults);
        setAllPassed(passed);
      } catch (error) {
        setResults([{
          input: 'Error',
          expected: 'Valid JavaScript',
          actual: error instanceof Error ? error.message : String(error),
          passed: false
        }]);
        setAllPassed(false);
      } finally {
        setIsRunning(false);
      }
    }, 500);
  };

  if (!currentChallenge) return null;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden">
        <CodeMirror
          value={code}
          height="100%"
          extensions={[javascript({ jsx: true })]}
          onChange={setCode}
          theme={theme === 'dark' ? githubDark : githubLight}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightSpecialChars: true,
            foldGutter: true,
            dropCursor: true,
            allowMultipleSelections: true,
            indentOnInput: true,
            syntaxHighlighting: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            rectangularSelection: true,
            crosshairCursor: true,
            highlightActiveLine: true,
            highlightSelectionMatches: true,
            closeBracketsKeymap: true,
            defaultKeymap: true,
            searchKeymap: true,
            historyKeymap: true,
            foldKeymap: true,
            completionKeymap: true,
            lintKeymap: true,
          }}
          className="h-full text-sm"
        />
      </div>
      
      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <Button 
          onClick={runCode}
          disabled={isRunning}
          className="w-full sm:w-auto"
          icon={<Play size={16} />}
        >
          {isRunning ? 'Running...' : 'Run Code'}
        </Button>
        
        {results.length > 0 && (
          <div className="mt-4 space-y-3">
            <div className={`rounded-md p-3 ${
              allPassed 
                ? 'bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-200' 
                : 'bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-200'
            }`}>
              <div className="flex items-center gap-2">
                {allPassed ? (
                  <Check size={18} className="text-green-500 dark:text-green-400" />
                ) : (
                  <X size={18} className="text-red-500 dark:text-red-400" />
                )}
                <span className="font-medium">
                  {allPassed ? 'All tests passed!' : 'Some tests failed'}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              {results.map((result, index) => (
                <div 
                  key={index}
                  className={`rounded-md border ${
                    result.passed 
                      ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' 
                      : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
                  } p-3`}
                >
                  <div className="flex items-center gap-2 text-sm font-medium">
                    {result.passed ? (
                      <Check size={16} className="text-green-500 dark:text-green-400" />
                    ) : (
                      <X size={16} className="text-red-500 dark:text-red-400" />
                    )}
                    <span>Test {index + 1}</span>
                  </div>
                  <div className="mt-2 space-y-1 text-xs">
                    <div><span className="font-medium">Input:</span> {result.input}</div>
                    <div><span className="font-medium">Expected:</span> {result.expected}</div>
                    <div><span className="font-medium">Actual:</span> {result.actual}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;