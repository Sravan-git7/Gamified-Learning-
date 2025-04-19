export interface Challenge {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  description: string;
  starterCode: string;
  testCases: TestCase[];
  points: number;
  completedBy: number;
  createdAt: string;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

export const CHALLENGES: Challenge[] = [
  {
    id: '1',
    title: 'Two Sum',
    difficulty: 'easy',
    category: 'arrays',
    description: `
Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
    `,
    starterCode: `function twoSum(nums, target) {
  // Your code here
}`,
    testCases: [
      {
        input: 'twoSum([2,7,11,15], 9)',
        expectedOutput: '[0,1]',
      },
      {
        input: 'twoSum([3,2,4], 6)',
        expectedOutput: '[1,2]',
      },
      {
        input: 'twoSum([3,3], 6)',
        expectedOutput: '[0,1]',
      },
    ],
    points: 100,
    completedBy: 15420,
    createdAt: '2023-04-15',
  },
  {
    id: '2',
    title: 'Palindrome Number',
    difficulty: 'easy',
    category: 'math',
    description: `
Given an integer \`x\`, return \`true\` if \`x\` is a palindrome, and \`false\` otherwise.

A palindrome is a number that reads the same backward as forward.

Example:
Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.
    `,
    starterCode: `function isPalindrome(x) {
  // Your code here
}`,
    testCases: [
      {
        input: 'isPalindrome(121)',
        expectedOutput: 'true',
      },
      {
        input: 'isPalindrome(-121)',
        expectedOutput: 'false',
      },
      {
        input: 'isPalindrome(10)',
        expectedOutput: 'false',
      },
    ],
    points: 75,
    completedBy: 12834,
    createdAt: '2023-05-20',
  },
  {
    id: '3',
    title: 'Merge Two Sorted Lists',
    difficulty: 'medium',
    category: 'linked-lists',
    description: `
You are given the heads of two sorted linked lists \`list1\` and \`list2\`.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

Example:
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
    `,
    starterCode: `function mergeTwoLists(list1, list2) {
  // Your code here
}`,
    testCases: [
      {
        input: 'mergeTwoLists([1,2,4], [1,3,4])',
        expectedOutput: '[1,1,2,3,4,4]',
      },
      {
        input: 'mergeTwoLists([], [])',
        expectedOutput: '[]',
      },
      {
        input: 'mergeTwoLists([], [0])',
        expectedOutput: '[0]',
      },
    ],
    points: 150,
    completedBy: 8654,
    createdAt: '2023-06-12',
  },
  {
    id: '4',
    title: 'Maximum Subarray',
    difficulty: 'medium',
    category: 'arrays',
    description: `
Given an integer array \`nums\`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

A subarray is a contiguous part of an array.

Example:
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.
    `,
    starterCode: `function maxSubArray(nums) {
  // Your code here
}`,
    testCases: [
      {
        input: 'maxSubArray([-2,1,-3,4,-1,2,1,-5,4])',
        expectedOutput: '6',
      },
      {
        input: 'maxSubArray([1])',
        expectedOutput: '1',
      },
      {
        input: 'maxSubArray([5,4,-1,7,8])',
        expectedOutput: '23',
      },
    ],
    points: 200,
    completedBy: 7231,
    createdAt: '2023-07-05',
  },
  {
    id: '5',
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'hard',
    category: 'trees',
    description: `
Given the \`root\` of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

Example:
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]
    `,
    starterCode: `function levelOrder(root) {
  // Your code here
}`,
    testCases: [
      {
        input: 'levelOrder([3,9,20,null,null,15,7])',
        expectedOutput: '[[3],[9,20],[15,7]]',
      },
      {
        input: 'levelOrder([1])',
        expectedOutput: '[[1]]',
      },
      {
        input: 'levelOrder([])',
        expectedOutput: '[]',
      },
    ],
    points: 300,
    completedBy: 4523,
    createdAt: '2023-08-18',
  },
];