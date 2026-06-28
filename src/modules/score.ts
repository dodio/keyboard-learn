/**
 * 计分与进度管理模块
 * 管理分数、连击、LocalStorage 持久化
 */

export interface ProgressData {
  totalScore: number;
  totalCorrect: number;
  totalWrong: number;
  maxStreak: number;
  familiarBestScore: number;
  wordBestScore: number;
  alphabetBestScore: number;
  numberBestScore: number;
  fullBestScore: number;
  stars: number;        // 总星星数
  practiceCount: number; // 练习次数
  lastPracticeDate: string;
}

const STORAGE_KEY = 'keyboard-learn-progress';

/**
 * 获取初始进度
 */
function getDefaultProgress(): ProgressData {
  return {
    totalScore: 0,
    totalCorrect: 0,
    totalWrong: 0,
    maxStreak: 0,
    familiarBestScore: 0,
    wordBestScore: 0,
    alphabetBestScore: 0,
    numberBestScore: 0,
    fullBestScore: 0,
    stars: 0,
    practiceCount: 0,
    lastPracticeDate: '',
  };
}

/**
 * 读取进度
 */
export function loadProgress(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return { ...getDefaultProgress(), ...JSON.parse(raw) };
    }
  } catch {
    // ignore
  }
  return getDefaultProgress();
}

/**
 * 保存进度
 */
export function saveProgress(progress: ProgressData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // ignore
  }
}

/**
 * 更新进度（练习结束后调用）
 */
export function updateProgress(
  mode: 'familiar' | 'word' | 'alphabet' | 'number' | 'full',
  score: number,
  correct: number,
  wrong: number,
  streak: number
): ProgressData {
  const progress = loadProgress();

  progress.totalScore += score;
  progress.totalCorrect += correct;
  progress.totalWrong += wrong;
  progress.maxStreak = Math.max(progress.maxStreak, streak);
  progress.practiceCount++;

  if (mode === 'familiar') {
    progress.familiarBestScore = Math.max(progress.familiarBestScore, score);
  } else if (mode === 'word') {
    progress.wordBestScore = Math.max(progress.wordBestScore, score);
  } else if (mode === 'alphabet') {
    progress.alphabetBestScore = Math.max(progress.alphabetBestScore, score);
  } else if (mode === 'number') {
    progress.numberBestScore = Math.max(progress.numberBestScore, score);
  } else if (mode === 'full') {
    progress.fullBestScore = Math.max(progress.fullBestScore, score);
  }

  // 计算星星（每100分一颗星）
  progress.stars = Math.floor(progress.totalScore / 100);

  progress.lastPracticeDate = new Date().toISOString().split('T')[0];
  saveProgress(progress);
  return progress;
}

/**
 * 计算评级（1-5星）
 */
export function getRating(score: number, total: number): number {
  const ratio = score / (total * 10); // 满分是每题10分
  if (ratio >= 0.95) return 5;
  if (ratio >= 0.8) return 4;
  if (ratio >= 0.6) return 3;
  if (ratio >= 0.4) return 2;
  return 1;
}

/**
 * 获取鼓励语
 */
export function getEncouragement(streak: number, isCorrect: boolean): string {
  if (!isCorrect) return '没关系，再试一次！💪';
  if (streak >= 10) return '太厉害了！连击 ' + streak + '！🔥';
  if (streak >= 5) return '连击 ' + streak + '！继续加油！⭐';
  if (streak >= 3) return '很棒！连续对了 ' + streak + ' 个！👍';
  return '正确！继续加油！✨';
}
