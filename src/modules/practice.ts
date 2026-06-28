/**
 * 练习模式基类
 */

import type { PracticeMode } from './finger-map.js';

export interface PracticeState {
  mode: PracticeMode;
  currentIndex: number;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  streak: number;      // 当前连击
  maxStreak: number;   // 最大连击
  score: number;
  isFinished: boolean;
  elapsedMs: number;   // 累计有效练习时间（不含暂停）
  isPaused: boolean;
}

export function createInitialState(mode: PracticeMode): PracticeState {
  let total: number;
  switch (mode) {
    case 'alphabet':
      total = 26;   // a-z 共26个字母
      break;
    case 'number':
      total = 20;   // 数字0-9，循环2轮
      break;
    case 'familiar':
      total = 20;
      break;
    case 'full':
      total = 30;   // 全键盘，30题
      break;
    case 'word':
      total = 10;
      break;
  }
  return {
    mode,
    currentIndex: 0,
    totalQuestions: total,
    correctCount: 0,
    wrongCount: 0,
    streak: 0,
    maxStreak: 0,
    score: 0,
    isFinished: false,
    elapsedMs: 0,
    isPaused: false,
  };
}

/** 格式化毫秒为 MM:SS */
export function formatTime(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

/** 格式化毫秒为可读时长（用于完成页） */
export function formatDuration(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  if (min > 0) {
    return `${min} 分 ${sec} 秒`;
  }
  return `${sec} 秒`;
}
