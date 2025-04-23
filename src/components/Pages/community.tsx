import React, { useState } from 'react';

interface Comment {
  id: number;
  username: string;
  avatar: string;
  content: string;
  timestamp: string;
  upvotes: number;
  downvotes: number;
  replies: Comment[];
}

const initialComments: Comment[] = [
  {
    id: 1,
    username: 'DevMaster2025',
    avatar: 'https://i.pravatar.cc/150?img=7',
    content: 'This is a great article! Learned so much about React.',
    timestamp: '2 hours ago',
    upvotes: 10,
    downvotes: 1,
    replies: [
      {
        id: 2,
        username: 'Coder123',
        avatar: 'https://i.pravatar.cc/150?img=8',
        content: 'I agree! React is such a powerful library.',
        timestamp: '1 hour ago',
        upvotes: 3,
        downvotes: 0,
        replies: [],
      },
    ],
  },
  {
    id: 3,
    username: 'TechFan88',
    avatar: 'https://i.pravatar.cc/150?img=9',
    content: 'Can you provide more examples? Would love to see some hands-on code.',
    timestamp: '3 hours ago',
    upvotes: 5,
    downvotes: 2,
    replies: [],
  },
];

const Community: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const handleAddComment = () => {
    if (newComment.trim() === '') return;

    const newCommentObj: Comment = {
      id: Date.now(),
      username: 'You',
      avatar: 'https://i.pravatar.cc/150?img=10',
      content: newComment,
      timestamp: 'Just now',
      upvotes: 0,
      downvotes: 0,
      replies: [],
    };

    setComments([...comments, newCommentObj]);
    setNewComment('');
  };

  const handleUpvote = (commentId: number) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return { ...comment, upvotes: comment.upvotes + 1 };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleDownvote = (commentId: number) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return { ...comment, downvotes: comment.downvotes + 1 };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleAddReply = (parentId: number) => {
    if (newComment.trim() === '') return;

    const reply: Comment = {
      id: Date.now(),
      username: 'You',
      avatar: 'https://i.pravatar.cc/150?img=10',
      content: newComment,
      timestamp: 'Just now',
      upvotes: 0,
      downvotes: 0,
      replies: [],
    };

    const updatedComments = comments.map((comment) => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...comment.replies, reply],
        };
      }
      return comment;
    });

    setComments(updatedComments);
    setNewComment('');
    setReplyingTo(null);
  };

  return (
    <div className="flex flex-col min-h-screen p-6 text-black bg-slate-50 dark:bg-slate-900 dark:text-white">
      <header className="mb-4 text-2xl font-semibold">Community - Comments Section</header>

      {/* Comments Section */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="p-4 bg-white rounded-lg shadow-md dark:bg-slate-800">
            <div className="flex items-start gap-4">
              <img src={comment.avatar} alt={comment.username} className="w-12 h-12 rounded-full" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold">{comment.username}</span>
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{comment.timestamp}</span>
                  </div>
                </div>
                <p className="mt-2">{comment.content}</p>
                {comment.replies.length > 0 && (
                  <div className="mt-4 ml-6 space-y-2">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="p-4 rounded-lg shadow-sm bg-gray-50 dark:bg-slate-700">
                        <div className="flex items-start gap-4">
                          <img
                            src={reply.avatar}
                            alt={reply.username}
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold">{reply.username}</span>
                              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{reply.timestamp}</span>
                            </div>
                            <p className="mt-2">{reply.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-4 mt-4">
                  <button
                    onClick={() => setReplyingTo(comment.id)}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600"
                  >
                    Reply
                  </button>
                  <button
                    onClick={() => handleUpvote(comment.id)}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-green-600"
                  >
                    Upvote ({comment.upvotes})
                  </button>
                  <button
                    onClick={() => handleDownvote(comment.id)}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-600"
                  >
                    Downvote ({comment.downvotes})
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Comment Section */}
      <div className="mt-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-4 text-black bg-white border border-gray-300 rounded-lg resize-none dark:bg-slate-800 dark:border-slate-700 dark:text-white"
          rows={3}
        />
        <div className="flex justify-end mt-2">
          {replyingTo === null ? (
            <button
              onClick={handleAddComment}
              className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Post Comment
            </button>
          ) : (
            <button
              onClick={() => handleAddReply(replyingTo)}
              className="px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
            >
              Post Reply
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;
