/**
 * 键盘布局数据 - 主键盘区
 * 定义键盘的键位布局、行列位置
 */

export interface KeyInfo {
  key: string;        // 键位字符
  code: string;       // 键盘事件 code
  label: string;      // 显示标签（主行字母）
  row: number;        // 行：0=数字行, 1=主行, 2=上行, 3=下行, 4=空格行
  col: number;        // 列位置（用于绘制）
  finger: FingerHand; // 负责该键位的手指
}

export type FingerHand =
  | 'L5' | 'L4' | 'L3' | 'L2' | 'L1'  // 左手：小指、无名指、中指、食指、拇指
  | 'R1' | 'R2' | 'R3' | 'R4' | 'R5';  // 右手：拇指、食指、中指、无名指、小指

export interface FingerInfo {
  id: FingerHand;
  name: string;        // 手指名称（中文）
  nameEn: string;      // 英文名称
  color: string;        // 显示颜色
  side: 'left' | 'right';
  index: number;        // 0-4 左手, 5-9 右手
}

// 手指信息
export const FINGERS: Record<FingerHand, FingerInfo> = {
  L5: { id: 'L5', name: '左手小指', nameEn: 'Left Pinky',   color: '#FF6B6B', side: 'left',  index: 0 },
  L4: { id: 'L4', name: '左手无名指', nameEn: 'Left Ring',  color: '#FFA07A', side: 'left',  index: 1 },
  L3: { id: 'L3', name: '左手中指', nameEn: 'Left Middle', color: '#FFD93D', side: 'left',  index: 2 },
  L2: { id: 'L2', name: '左手食指', nameEn: 'Left Index',  color: '#6BCB77', side: 'left',  index: 3 },
  L1: { id: 'L1', name: '左手拇指', nameEn: 'Left Thumb',  color: '#4ECDC4', side: 'left',  index: 4 },
  R1: { id: 'R1', name: '右手拇指', nameEn: 'Right Thumb', color: '#4ECDC4', side: 'right', index: 5 },
  R2: { id: 'R2', name: '右手食指', nameEn: 'Right Index', color: '#6BCB77', side: 'right', index: 6 },
  R3: { id: 'R3', name: '右手中指', nameEn: 'Right Middle',color: '#FFD93D', side: 'right', index: 7 },
  R4: { id: 'R4', name: '右手无名指', nameEn: 'Right Ring', color: '#FFA07A', side: 'right', index: 8 },
  R5: { id: 'R5', name: '右手小指', nameEn: 'Right Pinky', color: '#FF6B6B', side: 'right', index: 9 },
};

/**
 * 主键盘区布局（QWERTY）
 * 每行键位，按标准键盘排列
 */
export const KEYBOARD_ROWS: KeyInfo[][] = [
  // Row 0: 数字行
  [
    { key: '`',  code: 'Backquote',     label: '`~', row: 0, col: 0, finger: 'L5' },
    { key: '1',  code: 'Digit1',        label: '1!', row: 0, col: 1, finger: 'L5' },
    { key: '2',  code: 'Digit2',        label: '2@', row: 0, col: 2, finger: 'L4' },
    { key: '3',  code: 'Digit3',        label: '3#', row: 0, col: 3, finger: 'L3' },
    { key: '4',  code: 'Digit4',        label: '4$', row: 0, col: 4, finger: 'L2' },
    { key: '5',  code: 'Digit5',        label: '5%', row: 0, col: 5, finger: 'L2' },
    { key: '6',  code: 'Digit6',        label: '6^', row: 0, col: 6, finger: 'R2' },
    { key: '7',  code: 'Digit7',        label: '7&', row: 0, col: 7, finger: 'R2' },
    { key: '8',  code: 'Digit8',        label: '8*', row: 0, col: 8, finger: 'R3' },
    { key: '9',  code: 'Digit9',        label: '9(', row: 0, col: 9, finger: 'R4' },
    { key: '0',  code: 'Digit0',        label: '0)', row: 0, col: 10, finger: 'R5' },
    { key: '-',  code: 'Minus',         label: '-_', row: 0, col: 11, finger: 'R5' },
    { key: '=',  code: 'Equal',         label: '=+', row: 0, col: 12, finger: 'R5' },
    { key: 'Backspace', code: 'Backspace', label: '←', row: 0, col: 13, finger: 'R5' },
  ],
  // Row 1: 主行（ASDF）
  [
    { key: 'Tab', code: 'Tab',       label: 'Tab', row: 1, col: 0, finger: 'L5' },
    { key: 'q',   code: 'KeyQ',      label: 'Q', row: 1, col: 1, finger: 'L5' },
    { key: 'w',   code: 'KeyW',      label: 'W', row: 1, col: 2, finger: 'L4' },
    { key: 'e',   code: 'KeyE',      label: 'E', row: 1, col: 3, finger: 'L3' },
    { key: 'r',   code: 'KeyR',      label: 'R', row: 1, col: 4, finger: 'L2' },
    { key: 't',   code: 'KeyT',      label: 'T', row: 1, col: 5, finger: 'L2' },
    { key: 'y',   code: 'KeyY',      label: 'Y', row: 1, col: 6, finger: 'R2' },
    { key: 'u',   code: 'KeyU',      label: 'U', row: 1, col: 7, finger: 'R2' },
    { key: 'i',   code: 'KeyI',      label: 'I', row: 1, col: 8, finger: 'R3' },
    { key: 'o',   code: 'KeyO',      label: 'O', row: 1, col: 9, finger: 'R4' },
    { key: 'p',   code: 'KeyP',      label: 'P', row: 1, col: 10, finger: 'R5' },
    { key: '[',   code: 'BracketLeft',  label: '[{', row: 1, col: 11, finger: 'R5' },
    { key: ']',   code: 'BracketRight', label: ']}', row: 1, col: 12, finger: 'R5' },
    { key: '\\',  code: 'Backslash',    label: '\\|', row: 1, col: 13, finger: 'R5' },
  ],
  // Row 2: 上行（ZXCV）
  [
    { key: 'CapsLock', code: 'CapsLock',   label: 'Caps', row: 2, col: 0, finger: 'L5' },
    { key: 'a',        code: 'KeyA',      label: 'A', row: 2, col: 1, finger: 'L5' },
    { key: 's',        code: 'KeyS',      label: 'S', row: 2, col: 2, finger: 'L4' },
    { key: 'd',        code: 'KeyD',      label: 'D', row: 2, col: 3, finger: 'L3' },
    { key: 'f',        code: 'KeyF',      label: 'F', row: 2, col: 4, finger: 'L2' },
    { key: 'g',        code: 'KeyG',      label: 'G', row: 2, col: 5, finger: 'L2' },
    { key: 'h',        code: 'KeyH',      label: 'H', row: 2, col: 6, finger: 'R2' },
    { key: 'j',        code: 'KeyJ',      label: 'J', row: 2, col: 7, finger: 'R2' },
    { key: 'k',        code: 'KeyK',      label: 'K', row: 2, col: 8, finger: 'R3' },
    { key: 'l',        code: 'KeyL',      label: 'L', row: 2, col: 9, finger: 'R4' },
    { key: ';',        code: 'Semicolon',    label: ';:', row: 2, col: 10, finger: 'R5' },
    { key: "'",        code: 'Quote',        label: "'\"", row: 2, col: 11, finger: 'R5' },
    { key: 'Enter',    code: 'Enter',       label: 'Enter', row: 2, col: 12, finger: 'R5' },
  ],
  // Row 3: 下行（ZXCV）
  [
    { key: 'Shift', code: 'ShiftLeft',  label: 'Shift', row: 3, col: 0, finger: 'L5' },
    { key: 'z',     code: 'KeyZ',       label: 'Z', row: 3, col: 1, finger: 'L5' },
    { key: 'x',     code: 'KeyX',       label: 'X', row: 3, col: 2, finger: 'L4' },
    { key: 'c',     code: 'KeyC',       label: 'C', row: 3, col: 3, finger: 'L3' },
    { key: 'v',     code: 'KeyV',       label: 'V', row: 3, col: 4, finger: 'L2' },
    { key: 'b',     code: 'KeyB',       label: 'B', row: 3, col: 5, finger: 'L2' },
    { key: 'n',     code: 'KeyN',       label: 'N', row: 3, col: 6, finger: 'R2' },
    { key: 'm',     code: 'KeyM',       label: 'M', row: 3, col: 7, finger: 'R2' },
    { key: ',',     code: 'Comma',      label: ',<', row: 3, col: 8, finger: 'R3' },
    { key: '.',     code: 'Period',     label: '.>', row: 3, col: 9, finger: 'R4' },
    { key: '/',     code: 'Slash',      label: '/?', row: 3, col: 10, finger: 'R5' },
    { key: 'ShiftR', code: 'ShiftRight', label: 'Shift', row: 3, col: 11, finger: 'R5' },
  ],
  // Row 4: 空格行
  [
    { key: 'Ctrl',   code: 'ControlLeft',  label: 'Ctrl', row: 4, col: 0, finger: 'L1' },
    { key: 'Win',    code: 'MetaLeft',     label: 'Win', row: 4, col: 1, finger: 'L1' },
    { key: 'Alt',    code: 'AltLeft',      label: 'Alt', row: 4, col: 2, finger: 'L1' },
    { key: 'Space',  code: 'Space',        label: '', row: 4, col: 3, finger: 'L1' }, // 空格由拇指负责
    { key: 'AltR',   code: 'AltRight',     label: 'Alt', row: 4, col: 4, finger: 'R1' },
    { key: 'WinR',   code: 'MetaRight',    label: 'Win', row: 4, col: 5, finger: 'R1' },
    { key: 'Menu',   code: 'ContextMenu',  label: 'Menu', row: 4, col: 6, finger: 'R1' },
    { key: 'CtrlR',  code: 'ControlRight', label: 'Ctrl', row: 4, col: 7, finger: 'R1' },
  ],
];

/**
 * 获取所有字母键（主键盘区字母，用于练习）
 */
export function getLetterKeys(): KeyInfo[] {
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
 * 获取所有数字键（0-9）
 */
export function getNumberKeys(): KeyInfo[] {
  const numbers: KeyInfo[] = [];
  for (const k of KEYBOARD_ROWS[0]) {
    if (k.key.length === 1 && /[0-9]/.test(k.key)) {
      numbers.push(k);
    }
  }
  return numbers;
}

/**
 * 按字母顺序获取字母键（a-z）
 */
export function getAlphabetKeys(): KeyInfo[] {
  return getLetterKeys().sort((a, b) => a.key.localeCompare(b.key));
}

/**
 * 根据 key 字符查找 KeyInfo
 */
export function findKey(keyChar: string): KeyInfo | undefined {
  for (const row of KEYBOARD_ROWS) {
    for (const k of row) {
      if (k.key.toLowerCase() === keyChar.toLowerCase()) {
        return k;
      }
    }
  }
  return undefined;
}

/**
 * 根据 code 查找 KeyInfo
 */
export function findKeyByCode(code: string): KeyInfo | undefined {
  for (const row of KEYBOARD_ROWS) {
    for (const k of row) {
      if (k.code === code) {
        return k;
      }
    }
  }
  return undefined;
}
