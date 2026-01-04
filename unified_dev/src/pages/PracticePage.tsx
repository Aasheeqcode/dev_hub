import React from 'react';
import { Play, CheckCircle, RotateCcw, Clock, Award, Settings } from 'lucide-react';
import { NeonButton } from '../components/NeonButton';
export function PracticePage() {
  return <div className="h-[calc(100vh-64px)] flex flex-col lg:flex-row bg-navy-900">
      {/* Left Panel - Problem */}
      <div className="w-full lg:w-1/2 flex flex-col border-r border-white/5 bg-navy-900">
        {/* Header */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">Two Sum</h1>
            <div className="flex space-x-2">
              <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium border border-green-500/30">
                Easy
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 text-gray-400 text-xs font-medium border border-white/10">
                Arrays
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Solved by 125k</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-yellow-500" />
              <span>100 Points</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="flex-1 overflow-y-auto p-6 text-gray-300 leading-relaxed space-y-6">
          <p>
            Given an array of integers{' '}
            <code className="bg-white/10 px-1.5 py-0.5 rounded text-neon-blue">
              nums
            </code>{' '}
            and an integer{' '}
            <code className="bg-white/10 px-1.5 py-0.5 rounded text-neon-blue">
              target
            </code>
            , return indices of the two numbers such that they add up to{' '}
            <code className="bg-white/10 px-1.5 py-0.5 rounded text-neon-blue">
              target
            </code>
            .
          </p>
          <p>
            You may assume that each input would have{' '}
            <strong>exactly one solution</strong>, and you may not use the same
            element twice.
          </p>
          <p>You can return the answer in any order.</p>

          <div className="bg-navy-800/50 rounded-lg p-4 border border-white/5">
            <h3 className="text-white font-medium mb-2">Example 1:</h3>
            <pre className="font-mono text-sm text-gray-400">
              <span className="text-neon-violet">Input:</span> nums =
              [2,7,11,15], target = 9{'\n'}
              <span className="text-neon-violet">Output:</span> [0,1]{'\n'}
              <span className="text-neon-violet">Explanation:</span> Because
              nums[0] + nums[1] == 9, we return [0, 1].
            </pre>
          </div>

          <div className="bg-navy-800/50 rounded-lg p-4 border border-white/5">
            <h3 className="text-white font-medium mb-2">Constraints:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
              <li>2 &le; nums.length &le; 104</li>
              <li>-109 &le; nums[i] &le; 109</li>
              <li>-109 &le; target &le; 109</li>
            </ul>
          </div>
        </div>

        {/* Tabs */}
        <div className="h-12 border-t border-white/5 flex items-center px-4 space-x-6">
          <button className="text-neon-blue font-medium border-b-2 border-neon-blue h-full px-2">
            Description
          </button>
          <button className="text-gray-400 hover:text-white h-full px-2">
            Editorial
          </button>
          <button className="text-gray-400 hover:text-white h-full px-2">
            Solutions
          </button>
          <button className="text-gray-400 hover:text-white h-full px-2">
            Submissions
          </button>
        </div>
      </div>

      {/* Right Panel - Editor */}
      <div className="w-full lg:w-1/2 flex flex-col bg-[#0d1117]">
        {/* Editor Toolbar */}
        <div className="h-12 border-b border-white/5 flex items-center justify-between px-4 bg-navy-800">
          <select className="bg-navy-900 border border-white/10 text-white text-sm rounded px-3 py-1.5 focus:outline-none focus:border-neon-blue">
            <option>C++</option>
            <option>Java</option>
            <option>Python 3</option>
            <option>JavaScript</option>
          </select>

          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <RotateCcw className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Code Editor Area */}
        <div className="flex-1 p-4 font-mono text-sm overflow-auto">
          <div className="text-gray-300 leading-6">
            <span className="text-neon-violet">class</span>{' '}
            <span className="text-yellow-400">Solution</span> {'{'}
            <br />
            &nbsp;&nbsp;<span className="text-neon-violet">public</span>{' '}
            <span className="text-red-400">int</span>[]{' '}
            <span className="text-blue-400">twoSum</span>(
            <span className="text-red-400">int</span>[] nums,{' '}
            <span className="text-red-400">int</span> target) {'{'}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-gray-500"> // Write your code here</span>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-neon-violet">for</span> (
            <span className="text-red-400">int</span> i = 0; i &lt; nums.length;
            i++) {'{'}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-neon-violet">for</span> (
            <span className="text-red-400">int</span> j = i + 1; j &lt;
            nums.length; j++) {'{'}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-neon-violet">if</span> (nums[j] == target -
            nums[i]) {'{'}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-neon-violet">return new</span>{' '}
            <span className="text-red-400">int</span>[] {'{'} i, j {'}'};<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'}'}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'}'}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;{'}'}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-neon-violet">return new</span>{' '}
            <span className="text-red-400">int</span>[] {'{'}
            {'}'};<br />
            &nbsp;&nbsp;{'}'}
            <br />
            {'}'}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="h-16 border-t border-white/5 flex items-center justify-between px-6 bg-navy-800">
          <button className="text-gray-400 hover:text-white text-sm font-medium">
            Console
          </button>
          <div className="flex space-x-3">
            <NeonButton variant="secondary" size="sm" icon={<Play className="w-4 h-4" />}>
              Run Code
            </NeonButton>
            <NeonButton size="sm">Submit</NeonButton>
          </div>
        </div>
      </div>
    </div>;
}