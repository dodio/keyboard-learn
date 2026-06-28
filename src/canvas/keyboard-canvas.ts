/**
 * Canvas 键盘渲染模块
 * 在 Canvas 上绘制键盘布局，高亮指定键位
 */

import { KEYBOARD_ROWS, FINGERS } from '../modules/keyboard.js';
import type { KeyInfo, FingerHand } from '../modules/keyboard.js';

export interface KeyboardCanvasOptions {
  canvas: HTMLCanvasElement;
  onKeyClick?: (keyInfo: KeyInfo) => void;
}

export class KeyboardCanvas {
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private highlightedKey: string | null = null;
  private highlightedFinger: FingerHand | null = null;
  private pressedKey: string | null = null;
  private dpr: number = 1;

  // 键盘绘制参数（会在 calculateSize 中自动计算）
  private keyW = 48;
  private keyH = 48;
  private gap = 4;
  private padX = 16;
  private padY = 12;
  private radius = 6;
  private scale = 1;

  // 每行的按键起始偏移（相对于第0行）
  private rowStartOffsets: number[] = [];

  constructor(options: KeyboardCanvasOptions) {
    this.canvas = options.canvas;
    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw new Error('Cannot get canvas context');
    this.ctx = ctx;
    this.dpr = window.devicePixelRatio || 1;
    this.setupSize();
    this.render();
  }

  private setupSize(): void {
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * this.dpr;
    this.canvas.height = rect.height * this.dpr;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  public highlight(key: string | null, finger: FingerHand | null = null): void {
    this.highlightedKey = key;
    this.highlightedFinger = finger;
    this.render();
  }

  public showPress(key: string): void {
    this.pressedKey = key;
    this.render();
    setTimeout(() => {
      this.pressedKey = null;
      this.render();
    }, 150);
  }

  /**
   * 渲染键盘
   */
  public render(): void {
    const ctx = this.ctx;
    const cw = this.canvas.width / this.dpr;
    const ch = this.canvas.height / this.dpr;

    ctx.clearRect(0, 0, cw, ch);

    // 背景
    ctx.fillStyle = '#F5F0E8';
    ctx.beginPath();
    ctx.roundRect(4, 4, cw - 8, ch - 8, 12);
    ctx.fill();

    // 根据画布大小计算键位尺寸
    this.calculateSize(cw, ch);

    // 绘制每一行
    for (let r = 0; r < KEYBOARD_ROWS.length; r++) {
      const row = KEYBOARD_ROWS[r];
      const offsetX = this.rowStartOffsets[r] || 0;

      for (let c = 0; c < row.length; c++) {
        const keyInfo = row[c];

        // 计算该键位的 x 坐标
        // 累积前面所有键的宽度（包括宽键的特殊宽度）
        let x = this.padX + offsetX;
        for (let i = 0; i < c; i++) {
          x += this.getKeyDisplayWidth(row[i]) + this.gap;
        }

        const y = this.padY + r * (this.keyH + this.gap);

        const isHighlighted = this.highlightedKey?.toLowerCase() === keyInfo.key.toLowerCase();
        const isFingerHighlighted = this.highlightedFinger !== null && keyInfo.finger === this.highlightedFinger;
        const isPressed = this.pressedKey?.toLowerCase() === keyInfo.key.toLowerCase();
        const fingerColor = FINGERS[keyInfo.finger]?.color || '#999';

        this.drawKey(ctx, x, y, keyInfo, fingerColor, isHighlighted, isFingerHighlighted, isPressed);
      }
    }
  }

  /**
   * 获取特定键位的绘制宽度
   */
  private getKeyDisplayWidth(keyInfo: KeyInfo): number {
    switch (keyInfo.code) {
      case 'Backspace': return this.keyW * 1.6;
      case 'Tab':       return this.keyW * 1.4;
      case 'CapsLock':  return this.keyW * 1.5;
      case 'Enter':     return this.keyW * 1.7;
      case 'ShiftLeft':
      case 'ShiftRight':return this.keyW * 1.8;
      case 'Space':     return this.keyW * 4.5;
      default:          return this.keyW;
    }
  }

  /**
   * 计算每行总宽度
   */
  private getRowWidth(row: KeyInfo[]): number {
    let w = 0;
    for (const key of row) {
      w += this.getKeyDisplayWidth(key);
    }
    w += (row.length - 1) * this.gap;
    return w;
  }

  /**
   * 根据画布大小自动计算键位尺寸
   */
  private calculateSize(cw: number, ch: number): void {
    // 找出最宽的行
    let maxRowWidth = 0;
    for (const row of KEYBOARD_ROWS) {
      // 用临时 keyW=48 估算
      const est = this.estimateRowWidth(row);
      maxRowWidth = Math.max(maxRowWidth, est);
    }

    // 基于宽度缩放
    const availW = cw - this.padX * 2;
    const availH = ch - this.padY * 2;

    // 5 行，行间距 gap
    const needH = 48 * 5 + this.gap * 4; // 以 48 为基准

    const scaleW = availW / maxRowWidth;
    const scaleH = availH / needH;
    const scale = Math.min(scaleW, scaleH, 1.5);

    this.scale = Math.max(0.6, scale);
    this.keyW = Math.floor(48 * this.scale);
    this.keyH = Math.floor(48 * this.scale);
    this.gap = Math.max(1, Math.floor(4 * this.scale));
    this.radius = Math.max(3, Math.floor(8 * this.scale));
    this.padX = Math.max(6, Math.floor(16 * this.scale));
    this.padY = Math.max(6, Math.floor(12 * this.scale));

    // 计算每行的起始偏移，使其居中
    // 最宽行作为基准
    const rows = KEYBOARD_ROWS;
    this.rowStartOffsets = [];
    let maxDisplayWidth = 0;
    const rowDisplayWidths: number[] = [];

    for (let r = 0; r < rows.length; r++) {
      const rw = this.getRowWidth(rows[r]);
      rowDisplayWidths.push(rw);
      maxDisplayWidth = Math.max(maxDisplayWidth, rw);
    }

    for (let r = 0; r < rows.length; r++) {
      this.rowStartOffsets.push((maxDisplayWidth - rowDisplayWidths[r]) / 2);
    }
  }

  /**
   * 估算行宽度（以 keyW=48 为基准）
   */
  private estimateRowWidth(row: KeyInfo[]): number {
    let w = 0;
    for (const key of row) {
      switch (key.code) {
        case 'Backspace': w += 48 * 1.6; break;
        case 'Tab':       w += 48 * 1.4; break;
        case 'CapsLock':  w += 48 * 1.5; break;
        case 'Enter':     w += 48 * 1.7; break;
        case 'ShiftLeft':
        case 'ShiftRight':w += 48 * 1.8; break;
        case 'Space':     w += 48 * 4.5; break;
        default:          w += 48;
      }
    }
    w += (row.length - 1) * 4; // gap
    return w;
  }

  private drawKey(
    ctx: CanvasRenderingContext2D,
    x: number, y: number,
    keyInfo: KeyInfo,
    fingerColor: string,
    isHighlighted: boolean,
    isFingerHighlighted: boolean,
    isPressed: boolean
  ): void {
    const w = this.getKeyDisplayWidth(keyInfo);
    const h = this.keyH;

    // 按键阴影
    if (!isPressed) {
      ctx.fillStyle = 'rgba(0,0,0,0.12)';
      ctx.beginPath();
      ctx.roundRect(x + 2, y + 2, w, h, this.radius);
      ctx.fill();
    }

    // 按键背景
    if (isPressed) {
      ctx.fillStyle = '#4ECDC4';
    } else if (isHighlighted) {
      ctx.fillStyle = '#FFE66D';
    } else if (isFingerHighlighted) {
      ctx.fillStyle = fingerColor + '33';
    } else {
      ctx.fillStyle = '#FFFFFF';
    }

    ctx.beginPath();
    ctx.roundRect(x, y, w, h, this.radius);
    ctx.fill();

    // 边框
    ctx.strokeStyle = isHighlighted ? '#FF6B6B' : fingerColor + '88';
    ctx.lineWidth = isHighlighted ? 3 : 1.5;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, this.radius);
    ctx.stroke();

    // 按键标签
    const label = this.getKeyLabel(keyInfo);
    ctx.fillStyle = isPressed ? '#FFFFFF' : '#2D3436';
    const fontSize = Math.max(10, Math.min(16, this.keyW * 0.33));
    ctx.font = `bold ${fontSize}px "PingFang SC", "Comic Sans MS", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, x + w / 2, y + h / 2);

    // 基准键（F/J）上画小触点
    if (keyInfo.key === 'f' || keyInfo.key === 'j') {
      ctx.fillStyle = '#FF6B6B';
      ctx.beginPath();
      ctx.arc(x + w / 2, y + h * 0.72, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  private getKeyLabel(keyInfo: KeyInfo): string {
    if (keyInfo.label) {
      // 对于组合标签如 "1!"，只显示主标签
      return keyInfo.label.length <= 2 ? keyInfo.label : keyInfo.key;
    }
    switch (keyInfo.key) {
      case 'Space':    return '空格';
      case 'Backspace':return '←';
      case 'Enter':    return 'Enter';
      case 'Shift':    return '⇧';
      case 'ShiftR':   return '⇧';
      case 'Ctrl':     return 'Ctrl';
      case 'CtrlR':    return 'Ctrl';
      case 'Alt':      return 'Alt';
      case 'AltR':     return 'Alt';
      case 'CapsLock': return 'Caps';
      case 'Tab':      return 'Tab';
      case 'Win':      return 'Win';
      case 'WinR':     return 'Win';
      case 'Menu':     return '☰';
      default:         return keyInfo.key.toUpperCase();
    }
  }

  public resize(): void {
    this.setupSize();
    this.render();
  }
}
