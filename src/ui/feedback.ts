/**
 * 视觉反馈动画模块
 * 正确/错误/连击的动画效果
 */

import { formatDuration } from '../modules/practice.js';

/**
 * 显示正确反馈（绿色闪光 + 星星上升）
 */
export function showCorrectFeedback(container: HTMLElement): void {
  const el = document.createElement('div');
  el.className = 'feedback-correct';
  el.innerHTML = `
    <div class="feedback-icon">✅</div>
    <div class="feedback-stars">
      ${Array(3).fill(0).map((_, i) => `<span class="star-particle" style="animation-delay:${i * 0.1}s">⭐</span>`).join('')}
    </div>
  `;
  container.appendChild(el);
  setTimeout(() => el.remove(), 1000);
}

/**
 * 显示错误反馈（红色抖动 + 提示）
 */
export function showWrongFeedback(container: HTMLElement, hint: string): void {
  const el = document.createElement('div');
  el.className = 'feedback-wrong';
  el.innerHTML = `
    <div class="feedback-icon">❌</div>
    <div class="feedback-hint">${hint}</div>
  `;
  container.appendChild(el);
  setTimeout(() => el.remove(), 1200);
}

/**
 * 显示连击奖励动画
 */
export function showStreakAnimation(container: HTMLElement, streak: number): void {
  const el = document.createElement('div');
  el.className = 'feedback-streak';
  el.innerHTML = `
    <div class="streak-fireworks">
      ${Array(6).fill(0).map((_, i) => `<span class="firework" style="--angle:${i * 60}deg">🎉</span>`).join('')}
    </div>
    <div class="streak-text">🔥 连击 ${streak}！太棒了！🔥</div>
  `;
  container.appendChild(el);
  setTimeout(() => el.remove(), 2000);
}

/**
 * 显示完成界面
 */
export function showFinishScreen(
  container: HTMLElement,
  state: {
    score: number;
    correctCount: number;
    totalQuestions: number;
    maxStreak: number;
    elapsedMs: number;
    mode: string;
  },
  onRestart: () => void,
  onBack: () => void
): void {
  const rating = getRating(state.score, state.totalQuestions);
  const starsHtml = Array(5).fill(0).map((_, i) =>
    i < rating ? '⭐' : '☆'
  ).join('');

  const totalTime = formatDuration(state.elapsedMs);
  const unit = state.mode === 'word' ? '单词' : '字母';
  const count = state.mode === 'word' ? state.totalQuestions : state.totalQuestions;
  const avgMs = count > 0 ? state.elapsedMs / count : 0;
  const avgTime = formatDuration(avgMs);

  container.innerHTML = `
    <div class="finish-screen">
      <div class="finish-title">🎉 练习完成！</div>
      <div class="finish-rating">${starsHtml}</div>
      <div class="finish-stats">
        <div class="stat-item">
          <span class="stat-label">得分</span>
          <span class="stat-value">${state.score}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">正确</span>
          <span class="stat-value correct">${state.correctCount}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">最大连击</span>
          <span class="stat-value streak">${state.maxStreak}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">总用时</span>
          <span class="stat-value time">${totalTime}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">平均/${unit}</span>
          <span class="stat-value time">${avgTime}</span>
        </div>
      </div>
      <div class="finish-actions">
        <button class="btn btn-primary" id="btn-restart">再来一次</button>
        <button class="btn btn-secondary" id="btn-back">返回菜单</button>
      </div>
    </div>
  `;

  const wrap = (fn: () => void) => () => {
    document.removeEventListener('keydown', handleKey);
    fn();
  };

  container.querySelector('#btn-restart')?.addEventListener('click', wrap(onRestart));
  container.querySelector('#btn-back')?.addEventListener('click', wrap(onBack));

  // 键盘快捷键：Enter 再来一次，Escape 返回
  const handleKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      wrap(onRestart)();
    } else if (e.key === 'Escape') {
      wrap(onBack)();
    }
  };
  document.addEventListener('keydown', handleKey);
}

function getRating(score: number, total: number): number {
  const ratio = score / (total * 10);
  if (ratio >= 0.95) return 5;
  if (ratio >= 0.8) return 4;
  if (ratio >= 0.6) return 3;
  if (ratio >= 0.4) return 2;
  return 1;
}
