/**
 * 手指-键位映射逻辑
 * 提供练习题目生成、手指判断等功能
 */

import { FINGERS, KEYBOARD_ROWS, findKey, getNumberKeys, getAlphabetKeys } from './keyboard.js';
import type { KeyInfo, FingerHand } from './keyboard.js';

export interface PracticeQuestion {
  key: string;           // 目标键位
  label: string;         // 显示标签
  finger: FingerHand;    // 应使用的手指
  fingerName: string;    // 手指中文名称
  fingerColor: string;   // 手指颜色
  hint: string;          // 提示文字
}

export type PracticeMode = 'familiar' | 'word' | 'alphabet' | 'number';

/**
 * 生成随机练习题目（键盘熟习模式）
 * 从字母键中随机选取
 */
export function generateFamiliarQuestion(usedKeys?: string[]): PracticeQuestion {
  const letters = getLetterKeys();
  const available = usedKeys
    ? letters.filter(k => !usedKeys.includes(k.key))
    : letters;

  const pool = available.length > 0 ? available : letters;
  const keyInfo = pool[Math.floor(Math.random() * pool.length)];
  return toQuestion(keyInfo);
}

/**
 * 生成按字母顺序的练习题目（a → z）
 * @param index 当前索引 0-25，循环取模
 */
export function generateAlphabetQuestion(index: number): PracticeQuestion {
  const alphabet = getAlphabetKeys();
  const keyInfo = alphabet[index % alphabet.length];
  return toQuestion(keyInfo);
}

/**
 * 生成数字键练习题目（0-9）
 * @param usedKeys 已用过的数字键，避免短周期内重复
 */
export function generateNumberQuestion(usedKeys?: string[]): PracticeQuestion {
  const numbers = getNumberKeys();
  let pool = numbers;
  if (usedKeys && usedKeys.length < numbers.length) {
    pool = numbers.filter(k => !usedKeys.includes(k.key));
  }
  const keyInfo = pool[Math.floor(Math.random() * pool.length)];
  return toQuestion(keyInfo);
}

/**
 * 获取适合初学者的单词列表（3-6个字母，常见词）
 */
const BEGINNER_WORDS: string[] = [
  // 3字母单词
  'cat', 'dog', 'sun', 'run', 'fun', 'big', 'red', 'box', 'top', 'hot',
  'cup', 'bus', 'map', 'hat', 'pen', 'leg', 'arm', 'eye', 'ear', 'ice',
  'key', 'job', 'fly', 'sky', 'sea', 'dry', 'cry', 'try', 'why', 'how',
  // 4字母单词
  'bird', 'fish', 'tree', 'book', 'ball', 'game', 'play', 'jump', 'star', 'moon',
  'hand', 'foot', 'head', 'face', 'nose', 'kite', 'door', 'wall', 'desk', 'lamp',
  'cake', 'rice', 'milk', 'water', 'apple', 'grape', 'pear', 'plum', 'peach', 'lemon',
  // 5字母单词
  'heart', 'smile', 'dream', 'cloud', 'flower', 'grass', 'green', 'white', 'black', 'brown',
  'house', 'chair', 'table', 'window', 'garden', 'school', 'teacher', 'student', 'paper', 'pencil',
  // 6字母单词
  'banana', 'orange', 'monkey', 'rabbit', 'turtle', 'dragon', 'castle', 'rocket', 'planet', 'summer',
];

/**
 * 生成单词打字练习题目
 */
export function generateWordQuestion(): { word: string; questions: PracticeQuestion[] } {
  const word = BEGINNER_WORDS[Math.floor(Math.random() * BEGINNER_WORDS.length)];
  const questions: PracticeQuestion[] = [];
  for (const ch of word) {
    const keyInfo = findKey(ch);
    if (keyInfo) {
      questions.push(toQuestion(keyInfo));
    }
  }
  return { word, questions };
}

/**
 * 将 KeyInfo 转换为 PracticeQuestion
 */
function toQuestion(keyInfo: KeyInfo): PracticeQuestion {
  const finger = FINGERS[keyInfo.finger];
  const side = keyInfo.finger.startsWith('L') ? '左' : '右';
  return {
    key: keyInfo.key,
    label: keyInfo.label,
    finger: keyInfo.finger,
    fingerName: finger.name,
    fingerColor: finger.color,
    hint: `请用${side}手${finger.name.replace(/^左|右/, '')}按下 "${keyInfo.key.toUpperCase()}" 键`,
  };
}

/**
 * 获取所有字母键
 */
function getLetterKeys(): KeyInfo[] {
  const letters: KeyInfo[] = [];
  for (const row of KEYBOARD_ROWS) {
    for (const k of row) {
      if (k.key.length === 1 && /[a-z]/.test(k.key)) {
        letters.push(k);
      }
    }
  }
  return letters;
}

/**
 * 获取手指在键盘上的「基准键位」（ASDF JKL;）
 */
export function getHomeRowKeys(): PracticeQuestion[] {
  const homeKeys = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'];
  return homeKeys
    .map(k => findKey(k))
    .filter((k): k is KeyInfo => k !== undefined)
    .map(toQuestion);
}

/**
 * 判断按键是否正确
 */
export function checkAnswer(question: PracticeQuestion, pressedKey: string): boolean {
  return question.key.toLowerCase() === pressedKey.toLowerCase();
}

/**
 * 获取手指的说明文字
 */
export function getFingerDescription(finger: FingerHand): string {
  const fingerInfo = FINGERS[finger];
  const homeKey = getHomeKeyForFinger(finger);
  return `${fingerInfo.name}：负责 ${homeKey} 及其周围键位`;
}

/**
 * 获取手指对应的基准键
 */
export function getHomeKeyForFinger(finger: FingerHand): string {
  const map: Partial<Record<FingerHand, string>> = {
    L5: 'A/`',
    L4: 'S',
    L3: 'D',
    L2: 'F/R/T/G/V/B',
    L1: '空格',
    R1: '空格',
    R2: 'J/Y/U/H/N/M',
    R3: 'K',
    R4: 'L',
    R5: ';/P',
  };
  return map[finger] || '';
}
