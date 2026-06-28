/**
 * 单键练习模式（键盘熟习 / 字母顺序 / 数字）
 * 支持注入不同的题目生成器，包含计时和暂停/恢复
 */

import { createInitialState, formatTime } from './practice.js';
import type { PracticeState } from './practice.js';
import { generateFamiliarQuestion, generateAlphabetQuestion, generateNumberQuestion, generateFullQuestion, checkAnswer, checkAnswerByCode } from './finger-map.js';
import type { PracticeQuestion, PracticeMode } from './finger-map.js';

export interface FamiliarPracticeCallbacks {
  onQuestion: (question: PracticeQuestion) => void;
  onCorrect: (question: PracticeQuestion) => void;
  onWrong: (question: PracticeQuestion, correctKey: string) => void;
  onStreak: (streak: number) => void;
  onFinish: (state: PracticeState) => void;
  onScoreChange: (score: number) => void;
  onTimerUpdate: (timeStr: string) => void;
  onPauseChange: (isPaused: boolean) => void;
}

export class FamiliarPractice {
  private state: PracticeState;
  private currentQuestion: PracticeQuestion | null = null;
  private usedKeys: string[] = [];
  private callbacks: FamiliarPracticeCallbacks;
  private mode: PracticeMode;
  private alphabetIndex: number = 0;

  // 计时
  private startTime: number = 0;
  private pausedAt: number = 0;
  private accumulatedMs: number = 0;
  private timerInterval: ReturnType<typeof setInterval> | null = null;

  constructor(callbacks: FamiliarPracticeCallbacks, mode: PracticeMode = 'familiar') {
    this.callbacks = callbacks;
    this.mode = mode;
    this.state = createInitialState(mode);
  }

  /**
   * 开始练习
   */
  public start(): void {
    this.state = createInitialState(this.mode);
    this.usedKeys = [];
    this.alphabetIndex = 0;
    this.accumulatedMs = 0;
    this.startTime = performance.now();
    this.state.isPaused = false;
    this.startTimer();
    this.nextQuestion();
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
    // 补偿暂停期间的时间
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

  /**
   * 获取格式化的时间字符串
   */
  public getFormattedTime(): string {
    return formatTime(this.getElapsedMs());
  }

  private startTimer(): void {
    this.stopTimer();
    this.timerInterval = setInterval(() => {
      const elapsed = this.getElapsedMs();
      this.accumulatedMs = elapsed;
      this.startTime = performance.now(); // 重置基准，避免误差累积
      this.callbacks.onTimerUpdate(formatTime(elapsed));
    }, 250);
  }

  private stopTimer(): void {
    if (this.timerInterval !== null) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    // 结算当前段耗时
    if (!this.state.isPaused) {
      this.accumulatedMs += performance.now() - this.startTime;
      this.startTime = 0;
    }
  }

  /**
   * 处理按键
   */
  public handleKeyPress(key: string, code?: string): boolean {
    if (!this.currentQuestion || this.state.isFinished || this.state.isPaused) return false;

    const isCorrect = code
      ? checkAnswerByCode(this.currentQuestion, code)
      : checkAnswer(this.currentQuestion, key);
    if (isCorrect) {
      this.state.correctCount++;
      this.state.streak++;
      this.state.score += 10 * (1 + Math.floor(this.state.streak / 5));
      this.state.maxStreak = Math.max(this.state.maxStreak, this.state.streak);
      this.callbacks.onCorrect(this.currentQuestion);
      this.callbacks.onScoreChange(this.state.score);

      if (this.state.streak > 0 && this.state.streak % 5 === 0) {
        this.callbacks.onStreak(this.state.streak);
      }

      this.nextQuestion();
    } else {
      this.state.wrongCount++;
      this.state.streak = 0;
      this.callbacks.onWrong(this.currentQuestion, key);
    }

    return isCorrect;
  }

  /**
   * 下一题
   */
  private nextQuestion(): void {
    if (this.state.currentIndex >= this.state.totalQuestions) {
      this.state.isFinished = true;
      this.state.elapsedMs = this.getElapsedMs();
      this.stopTimer();
      this.callbacks.onFinish({ ...this.state });
      return;
    }

    this.currentQuestion = this.generateQuestion();
    this.usedKeys.push(this.currentQuestion.key);
    this.state.currentIndex++;
    this.callbacks.onQuestion(this.currentQuestion);
  }

  /**
   * 根据模式生成题目
   */
  private generateQuestion(): PracticeQuestion {
    switch (this.mode) {
      case 'alphabet':
        return generateAlphabetQuestion(this.alphabetIndex++);
      case 'number':
        return generateNumberQuestion(this.usedKeys);
      case 'full':
        return generateFullQuestion(this.usedKeys);
      case 'familiar':
      default:
        return generateFamiliarQuestion(this.usedKeys);
    }
  }

  /**
   * 获取当前状态
   */
  public getState(): PracticeState {
    return { ...this.state, elapsedMs: this.getElapsedMs() };
  }

  /**
   * 获取当前题目
   */
  public getCurrentQuestion(): PracticeQuestion | null {
    return this.currentQuestion;
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
