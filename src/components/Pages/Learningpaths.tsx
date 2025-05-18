import { useState, useEffect } from 'react';

interface Lecture {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  videoUrl?: string;
  contentMarkdown: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface LecturesProps {
  categoryFilter?: string;
  difficultyFilter?: string;
  searchQuery?: string;
}

export const Lectures: React.FC<LecturesProps> = ({
  categoryFilter,
  difficultyFilter,
  searchQuery = '',
}) => {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        setLoading(true);
        const mockLectures: Lecture[] = [
          {
            id: '1',
            title: 'Introduction to JavaScript Fundamentals',
            description: 'Learn the core concepts of JavaScript programming language.',
            category: 'JavaScript',
            difficulty: 'beginner',
            duration: 45,
            contentMarkdown: '# JavaScript Fundamentals\n\nIn this lecture, we will cover variables, functions, and control flow.',
            tags: ['javascript', 'web development', 'programming basics'],
            createdAt: new Date('2025-01-15'),
            updatedAt: new Date('2025-03-10'),
          },
          {
            id: '2',
            title: 'Advanced React Hooks',
            description: 'Master the use of React Hooks for state management and side effects.',
            category: 'React',
            difficulty: 'advanced',
            duration: 60,
            videoUrl: 'https://example.com/videos/react-hooks',
            contentMarkdown: '# Advanced React Hooks\n\nLearn how to use useReducer, useContext, and custom hooks effectively.',
            tags: ['react', 'hooks', 'frontend', 'state management'],
            createdAt: new Date('2025-02-20'),
            updatedAt: new Date('2025-04-05'),
          },
          {
            id: '3',
            title: 'TypeScript for React Developers',
            description: 'Apply TypeScript to your React applications for better code quality.',
            category: 'TypeScript',
            difficulty: 'intermediate',
            duration: 55,
            contentMarkdown: '# TypeScript with React\n\nIn this lecture, we explore interfaces, generics, and typing React components.',
            tags: ['typescript', 'react', 'static typing'],
            createdAt: new Date('2025-03-05'),
            updatedAt: new Date('2025-04-15'),
          },
        ];

        let filteredLectures = mockLectures;

        if (categoryFilter) {
          filteredLectures = filteredLectures.filter(
            lecture => lecture.category.toLowerCase() === categoryFilter.toLowerCase()
          );
        }

        if (difficultyFilter) {
          filteredLectures = filteredLectures.filter(
            lecture => lecture.difficulty === difficultyFilter
          );
        }

        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          filteredLectures = filteredLectures.filter(
            lecture =>
              lecture.title.toLowerCase().includes(query) ||
              lecture.description.toLowerCase().includes(query) ||
              lecture.tags.some(tag => tag.toLowerCase().includes(query))
          );
        }

        setLectures(filteredLectures);
        setLoading(false);
      } catch (err) {
        setError('Failed to load lectures. Please try again later.');
        setLoading(false);
        console.error('Error fetching lectures:', err);
      }
    };

    fetchLectures();
  }, [categoryFilter, difficultyFilter, searchQuery]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-t-2 border-b-2 rounded-full animate-spin border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 my-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:border-red-800">
        <p className="text-red-700 dark:text-red-400">{error}</p>
      </div>
    );
  }

  const handleLectureSelect = (lecture: Lecture) => {
    setSelectedLecture(lecture);
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-center">Gradivo Lectures</h1>

      {selectedLecture ? (
        <div className="mb-8 animate-fade-in">
          <button
            onClick={() => setSelectedLecture(null)}
            className="flex items-center mb-4 text-primary-600 dark:text-primary-400 hover:underline"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to lectures
          </button>

          <div className="overflow-hidden bg-white rounded-lg shadow-lg dark:bg-slate-900">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <span className={`px-2 py-1 text-xs rounded ${
                  selectedLecture.difficulty === 'beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                  selectedLecture.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {selectedLecture.difficulty.charAt(0).toUpperCase() + selectedLecture.difficulty.slice(1)}
                </span>
                <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">{selectedLecture.duration} minutes</span>
              </div>

              <h2 className="mb-2 text-2xl font-bold">{selectedLecture.title}</h2>
              <p className="mb-4 text-slate-600 dark:text-slate-400">{selectedLecture.description}</p>

              {selectedLecture.videoUrl && (
                <div className="flex items-center justify-center mb-6 rounded aspect-w-16 aspect-h-9 bg-slate-200 dark:bg-slate-800">
                  <p className="text-slate-500 dark:text-slate-400">Video content would load here</p>
                </div>
              )}

              <div className="prose dark:prose-invert max-w-none">
                <pre className="p-4 font-sans whitespace-pre-wrap rounded bg-slate-100 dark:bg-slate-800">
                  {selectedLecture.contentMarkdown}
                </pre>
              </div>

              <div className="mt-6">
                <h3 className="mb-2 text-lg font-semibold">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedLecture.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 text-sm rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {lectures.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-xl text-slate-600 dark:text-slate-400">No lectures found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {lectures.map(lecture => (
                <div
                  key={lecture.id}
                  onClick={() => handleLectureSelect(lecture)}
                  className="overflow-hidden transition-shadow duration-200 bg-white rounded-lg shadow-md cursor-pointer dark:bg-slate-900 hover:shadow-lg animate-slide-up"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <span className="px-2 py-1 text-xs rounded bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400">
                        {lecture.category}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded ${
                        lecture.difficulty === 'beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        lecture.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {lecture.difficulty.charAt(0).toUpperCase() + lecture.difficulty.slice(1)}
                      </span>
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">{lecture.title}</h3>
                    <p className="mb-4 text-slate-600 dark:text-slate-400 line-clamp-2">{lecture.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500 dark:text-slate-500">
                        {lecture.duration} minutes
                      </span>
                      <span className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                        View Course →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Lectures;
