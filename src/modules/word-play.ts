/**
 * 英文单词打字练习模式
 * 显示单词，逐字输入，包含计时和暂停/恢复
 */

import { createInitialState, formatTime } from './practice.js';
import type { PracticeState } from './practice.js';
import { generateWordQuestion, checkAnswer } from './finger-map.js';
import type { PracticeQuestion } from './finger-map.js';

export interface WordQuestion {
  word: string;
  questions: PracticeQuestion[];
}

export interface WordPracticeCallbacks {
  onWordStart: (wordQuestion: WordQuestion) => void;
  onCharCorrect: (charIndex: number, question: PracticeQuestion) => void;
  onCharWrong: (charIndex: number, question: PracticeQuestion, pressedKey: string) => void;
  onWordComplete: (word: string, score: number) => void;
  onStreak: (streak: number) => void;
  onFinish: (state: PracticeState) => void;
  onScoreChange: (score: number) => void;
  onTimerUpdate: (timeStr: string) => void;
  onPauseChange: (isPaused: boolean) => void;
}

export class WordPractice {
  private state: PracticeState;
  private currentWord: WordQuestion | null = null;
  private currentCharIndex: number = 0;
  private callbacks: WordPracticeCallbacks;
  private totalWordsCompleted: number = 0;

  // 计时
  private startTime: number = 0;
  private pausedAt: number = 0;
  private accumulatedMs: number = 0;
  private timerInterval: ReturnType<typeof setInterval> | null = null;

  constructor(callbacks: WordPracticeCallbacks) {
    this.callbacks = callbacks;
    this.state = createInitialState('word');
  }

  /**
   * 开始练习
   */
  public start(): void {
    this.state = createInitialState('word');
    this.totalWordsCompleted = 0;
    this.accumulatedMs = 0;
    this.startTime = performance.now();
    this.state.isPaused = false;
    this.startTimer();
    this.nextWord();
  }

  /**
   * 暂停练习
   */
  public pause(): void {
    if (this.state.isPaused || this.state.isFinished) return;
    this.pausedAt = performance.now();
    this.state.isPaused = true;
    this.stopTimer();
    this.callbacks.onPauseChange(true);
  }

  /**
   * 恢复练习
   */
  public resume(): void {
    if (!this.state.isPaused || this.state.isFinished) return;
    const pauseDuration = performance.now() - this.pausedAt;
    this.startTime += pauseDuration;
    this.pausedAt = 0;
    this.state.isPaused = false;
    this.startTimer();
    this.callbacks.onPauseChange(false);
  }

  /**
   * 切换暂停状态
   */
  public togglePause(): void {
    if (this.state.isPaused) {
      this.resume();
    } else {
      this.pause();
    }
  }

  /**
   * 获取当前已用时间
   */
  public getElapsedMs(): number {
    if (this.state.isPaused) {
      return this.accumulatedMs;
    }
    return this.accumulatedMs + (performance.now() - this.startTime);
  }

  private startTimer(): void {
    this.stopTimer();
    this.timerInterval = setInterval(() => {
      const elapsed = this.getElapsedMs();
      this.accumulatedMs = elapsed;
      this.startTime = performance.now();
      this.callbacks.onTimerUpdate(formatTime(elapsed));
    }, 250);
  }

  private stopTimer(): void {
    if (this.timerInterval !== null) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    if (!this.state.isPaused) {
      this.accumulatedMs += performance.now() - this.startTime;
      this.startTime = 0;
    }
  }

  /**
   * 处理按键
   */
  public handleKeyPress(key: string): boolean {
    if (!this.currentWord || this.state.isFinished || this.state.isPaused) return false;
    if (this.currentCharIndex >= this.currentWord.word.length) return false;

    const question = this.currentWord.questions[this.currentCharIndex];
    if (!question) return false;

    const isCorrect = checkAnswer(question, key);
    if (isCorrect) {
      this.state.correctCount++;
      this.state.streak++;
      this.state.score += 10;
      this.state.maxStreak = Math.max(this.state.maxStreak, this.state.streak);
      this.callbacks.onCharCorrect(this.currentCharIndex, question);
      this.callbacks.onScoreChange(this.state.score);

      this.currentCharIndex++;

      // 单词完成
      if (this.currentCharIndex >= this.currentWord.word.length) {
        this.totalWordsCompleted++;
        const wordScore = this.state.score;
        this.callbacks.onWordComplete(this.currentWord.word, wordScore);

        if (this.state.streak > 0 && this.state.streak % 5 === 0) {
          this.callbacks.onStreak(this.state.streak);
        }

        // 进入下一个单词或结束
        if (this.totalWordsCompleted >= this.state.totalQuestions) {
          this.state.isFinished = true;
          this.state.elapsedMs = this.getElapsedMs();
          this.stopTimer();
          this.callbacks.onFinish({ ...this.state });
        } else {
          setTimeout(() => this.nextWord(), 800);
        }
      }
    } else {
      this.state.wrongCount++;
      this.state.streak = 0;
      this.callbacks.onCharWrong(this.currentCharIndex, question, key);
    }

    return isCorrect;
  }

  /**
   * 下一个单词
   */
  private nextWord(): void {
    this.currentWord = generateWordQuestion();
    this.currentCharIndex = 0;
    this.state.currentIndex = this.totalWordsCompleted + 1;
    this.callbacks.onWordStart(this.currentWord);
  }

  /**
   * 获取当前状态
   */
  public getState(): PracticeState {
    return { ...this.state, elapsedMs: this.getElapsedMs() };
  }

  /**
   * 获取当前单词
   */
  public getCurrentWord(): WordQuestion | null {
    return this.currentWord;
  }

  /**
   * 获取当前字符索引
   */
  public getCurrentCharIndex(): number {
    return this.currentCharIndex;
  }

  /**
   * 停止练习
   */
  public stop(): void {
    this.state.isFinished = true;
    this.state.elapsedMs = this.getElapsedMs();
    this.stopTimer();
  }
}
