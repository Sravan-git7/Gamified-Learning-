import React from 'react';
import { useStore } from '../../lib/store';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Users, Trophy, ArrowLeft } from 'lucide-react';
import Button from '../ui/Button';
import CodeEditor from './CodeEditor';

const ChallengeDetail: React.FC = () => {
  const { currentChallenge, setCurrentChallenge } = useStore();
  
  if (!currentChallenge) return null;
  
  const difficultyColor = {
    easy: 'success',
    medium: 'warning',
    hard: 'danger'
  } as const;
  
  const handleBack = () => {
    setCurrentChallenge('');
  };
  
  return (
    <div className="flex flex-col h-full">
      <Button 
        variant="ghost" 
        size="sm" 
        className="self-start mb-4"
        onClick={handleBack}
        icon={<ArrowLeft size={16} />}
      >
        Back to Challenges
      </Button>
      
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 h-[calc(100%-40px)]">
        <Card className="overflow-auto">
          <Card.Header>
            <div className="flex items-center justify-between mb-2">
              <Badge 
                variant={difficultyColor[currentChallenge.difficulty] || 'default'}
                className="capitalize"
              >
                {currentChallenge.difficulty}
              </Badge>
              <Badge variant="secondary">{currentChallenge.category}</Badge>
            </div>
            <Card.Title>{currentChallenge.title}</Card.Title>
          </Card.Header>
          
          <div className="flex items-center justify-between text-sm mb-4">
            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <Users size={16} />
              <span>{currentChallenge.completedBy.toLocaleString()} solved</span>
            </div>
            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <Trophy size={16} />
              <span>{currentChallenge.points} points</span>
            </div>
          </div>
          
          <Card.Content>
            <div className="prose prose-slate dark:prose-invert prose-pre:bg-slate-100 dark:prose-pre:bg-slate-800 prose-pre:text-slate-800 dark:prose-pre:text-slate-200 max-w-none">
              <div className="whitespace-pre-line">
                {currentChallenge.description}
              </div>
            </div>
          </Card.Content>
        </Card>
        
        <div className="border rounded-lg overflow-hidden bg-white dark:bg-slate-900 dark:border-slate-700 flex flex-col h-full">
          <CodeEditor />
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;