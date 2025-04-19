import React from 'react';
import { Challenge } from '../../lib/challenges';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Users, TrendingUp } from 'lucide-react';

interface ChallengeCardProps {
  challenge: Challenge;
  onClick: (id: string) => void;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, onClick }) => {
  const difficultyColor = {
    easy: 'success',
    medium: 'warning',
    hard: 'danger'
  } as const;

  return (
    <Card 
      variant="default" 
      hover 
      interactive
      onClick={() => onClick(challenge.id)}
      className="h-full transition-all hover:translate-y-[-2px]"
    >
      <Card.Header>
        <div className="flex justify-between items-start mb-2">
          <Badge 
            variant={difficultyColor[challenge.difficulty] || 'default'}
            className="capitalize"
          >
            {challenge.difficulty}
          </Badge>
          <Badge variant="secondary">{challenge.category}</Badge>
        </div>
        <Card.Title>{challenge.title}</Card.Title>
      </Card.Header>
      
      <Card.Content>
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
          {challenge.description.split('\n\n')[0]}
        </p>
      </Card.Content>
      
      <Card.Footer className="justify-between text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1">
          <Users size={14} />
          <span>{challenge.completedBy.toLocaleString()} solved</span>
        </div>
        <div className="flex items-center gap-1">
          <TrendingUp size={14} />
          <span>{challenge.points} points</span>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default ChallengeCard;