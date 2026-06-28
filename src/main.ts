/**
 * 键盘学习应用 - 主入口
 */

import './styles/main.css';
import { showMenu } from './ui/menu.js';
import type { MenuMode } from './ui/menu.js';
import { KeyboardCanvas } from './canvas/keyboard-canvas.js';
import { FingerCanvas } from './canvas/finger-canvas.js';
import { FamiliarPractice } from './modules/free-play.js';
import { WordPractice } from './modules/word-play.js';
import { updateProgress } from './modules/score.js';
import type { PracticeQuestion, PracticeMode } from './modules/finger-map.js';
import { showCorrectFeedback, showWrongFeedback, showStreakAnimation, showFinishScreen } from './ui/feedback.js';

type AppMode = 'menu' | 'familiar' | 'word' | 'alphabet' | 'number';

let currentMode: AppMode = 'menu';
let keyboardCanvas: KeyboardCanvas | null = null;
let fingerCanvas: FingerCanvas | null = null;
let familiarPractice: FamiliarPractice | null = null;
let wordPractice: WordPractice | null = null;

// ==================== 初始化 ====================

function init(): void {
  showMenu(handleMenuSelect);
}

// ==================== 菜单处理 ====================

function handleMenuSelect(mode: MenuMode): void {
  switch (mode) {
    case 'familiar':
      startKeyPractice('familiar', '键盘熟习练习');
      break;
    case 'alphabet':
      startKeyPractice('alphabet', '按字母顺序练习');
      break;
    case 'number':
      startKeyPractice('number', '数字键练习');
      break;
    case 'word':
      startWordPractice();
      break;
  }
}

// ==================== 通用单键练习（熟习/字母/数字） ====================

function startKeyPractice(mode: PracticeMode, title: string): void {
  currentMode = mode;
  const app = document.getElementById('app')!;
  app.innerHTML = getKeyPracticeHTML(title, mode);

  // 初始化 Canvas
  const kbCanvas = document.getElementById('keyboard-canvas') as HTMLCanvasElement;
  const fingerCanvasEl = document.getElementById('finger-canvas') as HTMLCanvasElement;
  keyboardCanvas = new KeyboardCanvas({ canvas: kbCanvas });
  fingerCanvas = new FingerCanvas({ canvas: fingerCanvasEl });

  // 创建练习实例
  familiarPractice = new FamiliarPractice({
    onQuestion: (q) => handleKeyQuestion(q),
    onCorrect: (q) => handleKeyCorrect(q),
    onWrong: (q, pressed) => handleKeyWrong(q, pressed),
    onStreak: (streak) => handleStreak(streak),
    onFinish: (state) => handleKeyFinish(state, mode),
    onScoreChange: (score) => updateScoreDisplay(score),
    onTimerUpdate: (timeStr) => updateTimerDisplay(timeStr),
    onPauseChange: (isPaused) => handlePauseChange(isPaused),
  }, mode);

  // 绑定按钮事件
  app.querySelector('#btn-back')?.addEventListener('click', () => {
    familiarPractice?.stop();
    showMenu(handleMenuSelect);
  });
  app.querySelector('#btn-pause')?.addEventListener('click', () => {
    familiarPractice?.togglePause();
  });

  // 开始练习
  familiarPractice.start();

  // 监听键盘事件
  setupKeyboardListener();
  // 监听空格键暂停
  setupPauseHotkey();
}

function getKeyPracticeHTML(_title: string, mode: PracticeMode): string {
  const total = mode === 'alphabet' ? 26 : mode === 'number' ? 20 : 20;
  return `
    <div class="practice-container">
      <div class="pause-overlay" id="pause-overlay" style="display:none;">
        <div class="pause-icon">⏸️</div>
        <div class="pause-text">已暂停</div>
        <div class="pause-hint">按 空格键 或点击 ▼ 继续</div>
      </div>

      <div class="practice-header">
        <button class="btn btn-back" id="btn-back">← 返回</button>
        <span class="practice-mode-label">${_title}</span>
        <div class="practice-hud">
          <div class="hud-item">
            <span class="hud-label">用时</span>
            <span class="hud-value timer" id="timer-display">00:00</span>
          </div>
          <div class="hud-item">
            <span class="hud-label">分数</span>
            <span class="hud-value" id="score-display">0</span>
          </div>
          <div class="hud-item">
            <span class="hud-label">连击</span>
            <span class="hud-value streak" id="streak-display">0</span>
          </div>
          <div class="hud-item">
            <span class="hud-label">进度</span>
            <span class="hud-value" id="progress-display">1/${total}</span>
          </div>
        </div>
        <button class="btn btn-pause" id="btn-pause" title="暂停/继续">⏯️</button>
      </div>

      <div class="practice-body">
        <div class="question-area" id="question-area">
          <div class="question-hint" id="question-hint">准备好开始了吗？</div>
          <div class="question-key" id="question-key">?</div>
          <div class="question-finger" id="question-finger"></div>
        </div>

        <div class="canvas-area">
          <div class="finger-canvas-wrapper">
            <canvas id="finger-canvas"></canvas>
            <div class="canvas-label">手指位置示意</div>
          </div>
          <div class="keyboard-canvas-wrapper">
            <canvas id="keyboard-canvas"></canvas>
            <div class="canvas-label">键盘布局</div>
          </div>
        </div>
      </div>

      <div class="feedback-container" id="feedback-container"></div>
    </div>
  `;
}

function handleKeyQuestion(q: PracticeQuestion): void {
  const hintEl = document.getElementById('question-hint');
  const keyEl = document.getElementById('question-key');
  const fingerEl = document.getElementById('question-finger');
  const progressEl = document.getElementById('progress-display');

  if (hintEl) hintEl.textContent = q.hint;
  if (keyEl) {
    keyEl.textContent = q.key.toUpperCase();
    keyEl.style.color = q.fingerColor;
  }
  if (fingerEl) {
    fingerEl.textContent = q.fingerName;
    fingerEl.style.color = q.fingerColor;
  }
  if (progressEl && familiarPractice) {
    const state = familiarPractice.getState();
    progressEl.textContent = `${state.currentIndex}/${state.totalQuestions}`;
  }

  // 高亮键盘和手指
  keyboardCanvas?.highlight(q.key, q.finger);
  fingerCanvas?.activateFinger(q.finger);
}

function handleKeyCorrect(q: PracticeQuestion): void {
  const container = document.getElementById('feedback-container');
  if (container) showCorrectFeedback(container);
  keyboardCanvas?.showPress(q.key);
}

function handleKeyWrong(q: PracticeQuestion, pressed: string): void {
  const container = document.getElementById('feedback-container');
  if (container) showWrongFeedback(container, `按了 "${pressed.toUpperCase()}"，请用${q.fingerName}按 "${q.key.toUpperCase()}"`);
}

function handleKeyFinish(state: { score: number; correctCount: number; totalQuestions: number; maxStreak: number; elapsedMs: number }, mode: PracticeMode): void {
  const fullState = familiarPractice?.getState();
  if (fullState) {
    updateProgress(mode, fullState.score, fullState.correctCount, fullState.wrongCount, fullState.maxStreak);
  }

  const container = document.getElementById('app')!;
  showFinishScreen(
    container,
    { ...state, mode },
    () => startKeyPractice(mode, mode === 'familiar' ? '键盘熟习练习' : mode === 'alphabet' ? '按字母顺序练习' : '数字键练习'),
    () => showMenu(handleMenuSelect)
  );
}

// ==================== 英文单词打字练习 ====================

function startWordPractice(): void {
  currentMode = 'word';
  const app = document.getElementById('app')!;
  app.innerHTML = getWordPracticeHTML();

  // 初始化 Canvas
  const kbCanvas = document.getElementById('keyboard-canvas') as HTMLCanvasElement;
  const fingerCanvasEl = document.getElementById('finger-canvas') as HTMLCanvasElement;
  keyboardCanvas = new KeyboardCanvas({ canvas: kbCanvas });
  fingerCanvas = new FingerCanvas({ canvas: fingerCanvasEl });

  // 创建练习实例
  wordPractice = new WordPractice({
    onWordStart: (wq) => handleWordStart(wq),
    onCharCorrect: (idx, q) => handleCharCorrect(idx, q),
    onCharWrong: (idx, q, pressed) => handleCharWrong(idx, q, pressed),
    onWordComplete: (word, score) => handleWordComplete(word, score),
    onStreak: (streak) => handleStreak(streak),
    onFinish: (state) => handleWordFinish(state),
    onScoreChange: (score) => updateScoreDisplay(score),
    onTimerUpdate: (timeStr) => updateTimerDisplay(timeStr),
    onPauseChange: (isPaused) => handlePauseChange(isPaused),
  });

  // 绑定按钮事件
  app.querySelector('#btn-back')?.addEventListener('click', () => {
    wordPractice?.stop();
    showMenu(handleMenuSelect);
  });
  app.querySelector('#btn-pause')?.addEventListener('click', () => {
    wordPractice?.togglePause();
  });

  // 开始练习
  wordPractice.start();

  // 监听键盘事件
  setupKeyboardListener();
  setupPauseHotkey();
}

function getWordPracticeHTML(): string {
  return `
    <div class="practice-container">
      <div class="pause-overlay" id="pause-overlay" style="display:none;">
        <div class="pause-icon">⏸️</div>
        <div class="pause-text">已暂停</div>
        <div class="pause-hint">按 空格键 或点击 ▼ 继续</div>
      </div>

      <div class="practice-header">
        <button class="btn btn-back" id="btn-back">← 返回</button>
        <div class="practice-hud">
          <div class="hud-item">
            <span class="hud-label">用时</span>
            <span class="hud-value timer" id="timer-display">00:00</span>
          </div>
          <div class="hud-item">
            <span class="hud-label">分数</span>
            <span class="hud-value" id="score-display">0</span>
          </div>
          <div class="hud-item">
            <span class="hud-label">连击</span>
            <span class="hud-value streak" id="streak-display">0</span>
          </div>
          <div class="hud-item">
            <span class="hud-label">单词</span>
            <span class="hud-value" id="progress-display">1/10</span>
          </div>
        </div>
        <button class="btn btn-pause" id="btn-pause" title="暂停/继续">⏯️</button>
      </div>

      <div class="practice-body">
        <div class="word-display-area" id="word-display-area">
          <div class="word-label">请输入单词：</div>
          <div class="word-letters" id="word-letters"></div>
        </div>

        <div class="canvas-area">
          <div class="finger-canvas-wrapper">
            <canvas id="finger-canvas"></canvas>
            <div class="canvas-label">手指位置示意</div>
          </div>
          <div class="keyboard-canvas-wrapper">
            <canvas id="keyboard-canvas"></canvas>
            <div class="canvas-label">键盘布局</div>
          </div>
        </div>
      </div>

      <div class="feedback-container" id="feedback-container"></div>
    </div>
  `;
}

function handleWordStart(wq: { word: string; questions: PracticeQuestion[] }): void {
  const lettersEl = document.getElementById('word-letters');
  const progressEl = document.getElementById('progress-display');

  if (lettersEl) {
    lettersEl.innerHTML = wq.word
      .split('')
      .map((ch, i) => `<span class="word-letter" data-index="${i}" id="letter-${i}">${ch.toUpperCase()}</span>`)
      .join('');
  }
  if (progressEl && wordPractice) {
    const state = wordPractice.getState();
    progressEl.textContent = `${state.currentIndex}/${state.totalQuestions}`;
  }

  // 高亮第一个字母
  highlightWordLetter(0);
}

function highlightWordLetter(index: number): void {
  // 清除所有高亮
  document.querySelectorAll('.word-letter').forEach(el => {
    el.classList.remove('active', 'correct', 'wrong');
  });

  // 高亮当前字母
  const el = document.getElementById(`letter-${index}`);
  if (el) el.classList.add('active');

  // 更新手指提示
  const word = wordPractice?.getCurrentWord();
  if (word && word.questions[index]) {
    const q = word.questions[index];
    keyboardCanvas?.highlight(q.key, q.finger);
    fingerCanvas?.activateFinger(q.finger);
  }
}

function handleCharCorrect(index: number, q: PracticeQuestion): void {
  const el = document.getElementById(`letter-${index}`);
  if (el) {
    el.classList.remove('active');
    el.classList.add('correct');
  }

  const container = document.getElementById('feedback-container');
  if (container) showCorrectFeedback(container);
  keyboardCanvas?.showPress(q.key);

  // 高亮下一个字母
  setTimeout(() => highlightWordLetter(index + 1), 200);
}

function handleCharWrong(index: number, _q: PracticeQuestion, pressed: string): void {
  const el = document.getElementById(`letter-${index}`);
  if (el) {
    el.classList.add('wrong');
    setTimeout(() => el.classList.remove('wrong'), 300);
  }

  const container = document.getElementById('feedback-container');
  if (container) showWrongFeedback(container, `按了 "${pressed.toUpperCase()}"`);
}

function handleWordComplete(_word: string, _score: number): void {
  const container = document.getElementById('feedback-container');
  if (container) {
    const el = document.createElement('div');
    el.className = 'feedback-word-complete';
    el.innerHTML = `🎉 太棒了！"${_word.toUpperCase()}" 输入完成！`;
    container.appendChild(el);
    setTimeout(() => el.remove(), 1000);
  }
}

function handleWordFinish(state: { score: number; correctCount: number; totalQuestions: number; maxStreak: number; elapsedMs: number }): void {
  const fullState = wordPractice?.getState();
  if (fullState) {
    updateProgress('word', fullState.score, fullState.correctCount, fullState.wrongCount, fullState.maxStreak);
  }

  const container = document.getElementById('app')!;
  showFinishScreen(
    container,
    { ...state, mode: 'word' },
    () => startWordPractice(),
    () => showMenu(handleMenuSelect)
  );
}

// ==================== 通用处理 ====================

function handleStreak(streak: number): void {
  const container = document.getElementById('feedback-container');
  if (container) showStreakAnimation(container, streak);

  const streakEl = document.getElementById('streak-display');
  if (streakEl) {
    streakEl.classList.add('streak-pop');
    setTimeout(() => streakEl.classList.remove('streak-pop'), 500);
  }
}

function updateScoreDisplay(score: number): void {
  const el = document.getElementById('score-display');
  if (el) el.textContent = String(score);
  const streakEl = document.getElementById('streak-display');
  if (streakEl) {
    const state = familiarPractice?.getState() || wordPractice?.getState();
    if (streakEl && state) streakEl.textContent = String(state.streak);
  }
}

function updateTimerDisplay(timeStr: string): void {
  const el = document.getElementById('timer-display');
  if (el) el.textContent = timeStr;
}

function handlePauseChange(isPaused: boolean): void {
  const overlay = document.getElementById('pause-overlay');
  const btn = document.getElementById('btn-pause');
  if (overlay) overlay.style.display = isPaused ? 'flex' : 'none';
  if (btn) btn.textContent = isPaused ? '▶️' : '⏯️';
}

// ==================== 暂停快捷键 ====================

function setupPauseHotkey(): void {
  // 空格键暂停/恢复（当没有输入框聚焦时）
  document.addEventListener('keydown', handlePauseKey);
}

function handlePauseKey(e: KeyboardEvent): void {
  // 只响应空格键，且不在输入模式
  if (e.key !== ' ' && e.code !== 'Space') return;

  // 如果已完成，不处理
  const practice = familiarPractice || wordPractice;
  if (!practice || practice.getState().isFinished) return;

  e.preventDefault();
  practice.togglePause();
}

// ==================== 键盘事件监听 ====================

function setupKeyboardListener(): void {
  // 移除旧监听器
  document.removeEventListener('keydown', handleKeyDown);

  // 延迟添加，确保 DOM 已更新
  setTimeout(() => {
    document.addEventListener('keydown', handleKeyDown);
  }, 100);
}

function handleKeyDown(e: KeyboardEvent): void {
  // 空格键由暂停快捷键处理
  if (e.key === ' ' || e.code === 'Space') return;

  if (currentMode === 'word' && wordPractice) {
    const activeEl = document.activeElement;
    // 只在没有输入框聚焦时处理
    if (!activeEl || activeEl === document.body || activeEl.tagName === 'BUTTON') {
      e.preventDefault();
      wordPractice.handleKeyPress(e.key);
    }
  } else if (familiarPractice) {
    e.preventDefault();
    familiarPractice.handleKeyPress(e.key);
  }
}

// ==================== 启动 ====================

init();
