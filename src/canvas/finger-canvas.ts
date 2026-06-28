/**
 * Canvas 手指示意图渲染模块
 * 在 Canvas 上绘制左右手，展示手指对应的键位
 *
 * 设计：每只手各占画布一半，手指从手掌向上延伸，
 * 指尖处显示圆点和中文标签，激活手指有脉冲动画
 */

import { FINGERS } from '../modules/keyboard.js';
import type { FingerHand } from '../modules/keyboard.js';

export interface FingerCanvasOptions {
  canvas: HTMLCanvasElement;
}

export class FingerCanvas {
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private dpr: number = 1;
  private activeFinger: FingerHand | null = null;
  private animationFrame: number = 0;
  private pulsePhase: number = 0;

  constructor(options: FingerCanvasOptions) {
    this.canvas = options.canvas;
    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw new Error('Cannot get canvas context');
    this.ctx = ctx;
    this.dpr = window.devicePixelRatio || 1;
    this.setupSize();
    this.startAnimation();
  }

  private setupSize(): void {
    const rect = this.canvas.getBoundingClientRect();
    // 确保 canvas 内部尺寸匹配 CSS 尺寸 * 设备像素比
    this.canvas.width = rect.width * this.dpr;
    this.canvas.height = rect.height * this.dpr;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  public activateFinger(finger: FingerHand | null): void {
    this.activeFinger = finger;
    this.render();
  }

  private startAnimation(): void {
    const animate = () => {
      this.pulsePhase += 0.05;
      this.render();
      this.animationFrame = requestAnimationFrame(animate);
    };
    animate();
  }

  public stopAnimation(): void {
    cancelAnimationFrame(this.animationFrame);
  }

  public render(): void {
    const ctx = this.ctx;
    const w = this.canvas.width / this.dpr;
    const h = this.canvas.height / this.dpr;

    ctx.clearRect(0, 0, w, h);

    // 背景（带内边距）
    const pad = 16;
    ctx.fillStyle = '#FFF8F0';
    ctx.beginPath();
    ctx.roundRect(pad, pad, w - pad * 2, h - pad * 2, 16);
    ctx.fill();

    // 左手在左半区，右手在右半区，centerY 偏下给标签留空间
    const handCY = h * 0.68;
    this.drawHand(ctx, w * 0.27, handCY, 'left');
    this.drawHand(ctx, w * 0.73, handCY, 'right');

    // 中间分隔线
    ctx.strokeStyle = '#E0D5C8';
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(w / 2, pad);
    ctx.lineTo(w / 2, h - pad);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // ==================== 手掌和手指 ====================

  private drawHand(
    ctx: CanvasRenderingContext2D,
    cx: number, cy: number,
    side: 'left' | 'right'
  ): void {
    const fingerOrder = side === 'left'
      ? (['L5', 'L4', 'L3', 'L2', 'L1'] as FingerHand[])
      : (['R1', 'R2', 'R3', 'R4', 'R5'] as FingerHand[]);

    // 根据画布大小动态计算手掌尺寸
    const cw = this.canvas.width / this.dpr;
    const handHalfWidth = cw * 0.10;   // 手掌半宽
    const palmHeight = cw * 0.06;       // 手掌高度
    const fingerLength = cw * 0.14;     // 手指长度（从掌心向上）

    // --- 绘制手掌 ---
    ctx.fillStyle = '#FFDDB5';
    ctx.strokeStyle = '#D4A576';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(cx - handHalfWidth, cy - palmHeight * 0.5, handHalfWidth * 2, palmHeight, 12);
    ctx.fill();
    ctx.stroke();

    // --- 绘制手腕 ---
    ctx.strokeStyle = '#D4A576';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx - handHalfWidth * 0.6, cy + palmHeight * 0.5);
    ctx.lineTo(cx - handHalfWidth * 0.5, cy + palmHeight * 1.3);
    ctx.moveTo(cx + handHalfWidth * 0.6, cy + palmHeight * 0.5);
    ctx.lineTo(cx + handHalfWidth * 0.5, cy + palmHeight * 1.3);
    ctx.stroke();

    // --- 计算手指位置 ---
    const positions = this.calcFingerPositions(cx, cy, handHalfWidth, fingerLength, side);

    // --- 绘制每根手指 ---
    fingerOrder.forEach((fingerId, i) => {
      const fingerInfo = FINGERS[fingerId];
      const pos = positions[i];
      const isActive = this.activeFinger === fingerId;
      this.drawFinger(ctx, pos, fingerInfo, isActive);
    });

    // --- 手标签 ---
    ctx.fillStyle = '#B0A090';
    ctx.font = `${Math.max(12, cw * 0.018)}px "PingFang SC", "Microsoft YaHei", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(side === 'left' ? '👈 左手' : '右手 👉', cx, cy + palmHeight * 1.5);
  }

  /**
   * 计算 5 根手指的起点（掌心）和终点（指尖）
   */
  private calcFingerPositions(
    cx: number, cy: number,
    handHalfWidth: number,
    fingerLength: number,
    side: 'left' | 'right'
  ): { baseX: number; baseY: number; tipX: number; tipY: number }[] {
    const result: { baseX: number; baseY: number; tipX: number; tipY: number }[] = [];

    // 手指在掌心上的分布
    const spread = handHalfWidth * 2 * 1.05; // 手指分布宽度

    for (let i = 0; i < 5; i++) {
      // 左手: ['L5','L4','L3','L2','L1'] → 拇指(i=4), 手指从左到右排列
      // 右手: ['R1','R2','R3','R4','R5'] → 拇指(i=0), 手指从左到右排列
      const isThumb = side === 'left' ? i === 4 : i === 0;

      // 左右镜像对称的手指 X 位置归一化
      const leftPositions  = [-0.85, -0.35,  0.10,  0.55,  0.95]; // L5 L4 L3 L2 L1
      const rightPositions = [-0.95, -0.55, -0.10,  0.35,  0.85]; // R1 R2 R3 R4 R5
      const positions = side === 'left' ? leftPositions : rightPositions;

      const t = positions[i];
      const baseX = cx + t * spread * 0.5;
      const baseY = cy;

      let tipX: number, tipY: number;
      if (isThumb) {
        // 拇指：从手掌向下伸展，同时向中心（空格键方向）微偏
        // 左手拇指向右下偏，右手拇指向左下偏
        const towardCenter = side === 'left' ? handHalfWidth * 0.5 : -handHalfWidth * 0.5;
        tipX = baseX + towardCenter;
        tipY = baseY + fingerLength * 0.65;
      } else {
        tipX = baseX;
        tipY = baseY - fingerLength * (1.0 - Math.abs(t) * 0.15);
      }

      result.push({ baseX, baseY, tipX, tipY });
    }

    return result;
  }

  private drawFinger(
    ctx: CanvasRenderingContext2D,
    pos: { baseX: number; baseY: number; tipX: number; tipY: number },
    fingerInfo: import('../modules/keyboard.js').FingerInfo,
    isActive: boolean
  ): void {
    const { baseX, baseY, tipX, tipY } = pos;
    const color = fingerInfo.color;

    // 脉冲效果
    let pulse = 1;
    if (isActive) {
      pulse = Math.sin(this.pulsePhase * 2.5) * 0.25 + 1.0;
    }

    // 手指光晕（激活时）
    if (isActive) {
      ctx.save();
      ctx.shadowColor = color;
      ctx.shadowBlur = 16 * pulse;
    }

    // --- 手指线条 ---
    ctx.strokeStyle = isActive ? color : '#E8C9A0';
    ctx.lineWidth = isActive ? 13 * pulse : 10;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(baseX, baseY);
    ctx.lineTo(tipX, tipY);
    ctx.stroke();

    // 指节纹（两段）
    ctx.strokeStyle = 'rgba(0,0,0,0.08)';
    ctx.lineWidth = 1.5;
    for (let seg = 1; seg <= 2; seg++) {
      const sx = baseX + (tipX - baseX) * (seg * 0.33);
      const sy = baseY + (tipY - baseY) * (seg * 0.33);
      ctx.beginPath();
      ctx.moveTo(sx - 4, sy);
      ctx.lineTo(sx + 4, sy);
      ctx.stroke();
    }

    // --- 指尖圆点 ---
    ctx.fillStyle = isActive ? color : '#F5D5B0';
    const tipRadius = isActive ? 15 * pulse : 11;
    ctx.beginPath();
    ctx.arc(tipX, tipY, tipRadius, 0, Math.PI * 2);
    ctx.fill();

    if (isActive) {
      // 指尖高亮
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(tipX - 3, tipY - 3, tipRadius * 0.35, 0, Math.PI * 2);
      ctx.fill();
    }

    if (isActive) {
      ctx.restore();
    }

    // 激活时外光环
    if (isActive) {
      ctx.strokeStyle = color + '66';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(tipX, tipY, 22 + 8 * pulse, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = color + '33';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(tipX, tipY, 32 + 12 * pulse, 0, Math.PI * 2);
      ctx.stroke();
    }

    // --- 手指标签（仅在激活时显示） ---
    if (isActive) {
      const cw = this.canvas.width / this.dpr;
      const labelSize = Math.max(11, cw * 0.016);
      const labelY = tipY - 20 - 8 * pulse;

      const labelText = fingerInfo.name.replace('左手', '').replace('右手', '');
      const textWidth = ctx.measureText(labelText).width;

      // 标签背景
      ctx.fillStyle = color + 'CC';
      ctx.beginPath();
      ctx.roundRect(tipX - textWidth / 2 - 8, labelY - labelSize / 2 - 4, textWidth + 16, labelSize + 8, 10);
      ctx.fill();

      // 标签文字
      ctx.fillStyle = '#FFFFFF';
      ctx.font = `bold ${labelSize}px "PingFang SC", "Microsoft YaHei", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(labelText, tipX, labelY);
    }
  }

  public resize(): void {
    this.setupSize();
    this.render();
  }
}
