export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  joinedAt: string;
  points: number;
  rank: number;
  solvedChallenges: number;
  streak: number;
  bio?: string;
  social?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export const USERS: User[] = [
  {
    id: '1',
    username: 'sarah_dev',
    email: 'sarah@example.com',
    avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinedAt: '2022-01-15',
    points: 12540,
    rank: 1,
    solvedChallenges: 187,
    streak: 32,
    bio: 'Full-stack developer with a passion for algorithms and clean code.',
    social: {
      github: 'sarahdev',
      twitter: 'sarah_codes',
      linkedin: 'sarahdev',
    },
  },
  {
    id: '2',
    username: 'alex_coder',
    email: 'alex@example.com',
    avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinedAt: '2022-03-21',
    points: 9875,
    rank: 2,
    solvedChallenges: 142,
    streak: 15,
    bio: 'JavaScript enthusiast and competitive programmer.',
    social: {
      github: 'alexcoder',
      twitter: 'alex_codes',
    },
  },
  {
    id: '3',
    username: 'mia_tech',
    email: 'mia@example.com',
    avatarUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinedAt: '2022-05-09',
    points: 8720,
    rank: 3,
    solvedChallenges: 134,
    streak: 28,
    bio: 'CS student with a focus on algorithms and data structures.',
    social: {
      github: 'miatech',
      linkedin: 'miatech',
    },
  },
  {
    id: '4',
    username: 'dave_js',
    email: 'dave@example.com',
    avatarUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinedAt: '2022-02-18',
    points: 7650,
    rank: 4,
    solvedChallenges: 112,
    streak: 5,
    bio: 'Frontend developer focused on React and TypeScript.',
    social: {
      github: 'davejs',
      twitter: 'dave_codes',
      linkedin: 'davejs',
    },
  },
  {
    id: '5',
    username: 'emma_dev',
    email: 'emma@example.com',
    avatarUrl: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinedAt: '2022-07-02',
    points: 6430,
    rank: 5,
    solvedChallenges: 95,
    streak: 10,
    bio: 'Python developer with ML experience.',
    social: {
      github: 'emmadev',
      linkedin: 'emmadev',
    },
  },
];

export const CURRENT_USER: User = USERS[0];