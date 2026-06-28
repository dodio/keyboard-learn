/**
 * 主菜单界面
 */

export type MenuMode = 'familiar' | 'word' | 'alphabet' | 'number' | 'full';

export function showMenu(onSelect: (mode: MenuMode) => void): void {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="menu-container">
      <div class="menu-header">
        <h1 class="menu-title">
          <span class="title-icon">⌨️</span>
          键盘小达人
          <span class="title-icon">🎯</span>
        </h1>
        <p class="menu-subtitle">一起来学习键盘打字吧！</p>
      </div>

      <div class="menu-cards">
        <div class="menu-card" data-mode="familiar">
          <div class="card-icon">🎮</div>
          <h2 class="card-title">键盘熟习练习</h2>
          <p class="card-desc">认识键盘布局，学习手指指法</p>
          <div class="card-badge">推荐使用</div>
        </div>

        <div class="menu-card" data-mode="alphabet">
          <div class="card-icon">🔤</div>
          <h2 class="card-title">按字母顺序练习</h2>
          <p class="card-desc">从 A 到 Z，按顺序认识每个字母键</p>
        </div>

        <div class="menu-card" data-mode="number">
          <div class="card-icon">🔢</div>
          <h2 class="card-title">数字键练习</h2>
          <p class="card-desc">练习输入 0~9 数字键，掌握数字行</p>
        </div>

        <div class="menu-card" data-mode="word">
          <div class="card-icon">📝</div>
          <h2 class="card-title">英文单词打字</h2>
          <p class="card-desc">练习输入英文单词，提升打字速度</p>
        </div>

        <div class="menu-card" data-mode="full">
          <div class="card-icon">🖥️</div>
          <h2 class="card-title">全键盘练习</h2>
          <p class="card-desc">包含 Ctrl/Shift/Alt/空格 等所有键</p>
          <div class="card-badge">进阶挑战</div>
        </div>
      </div>

      <div class="menu-footer">
        <div class="stars-display">
          <span class="stars-label">我的星星：</span>
          <span class="stars-value" id="menu-stars">⭐ 0</span>
        </div>
        <div class="practice-count">
          已练习 <span id="menu-practice-count">0</span> 次
        </div>
        <a class="github-link" href="https://github.com/dodio/keyboard-learn" target="_blank" rel="noopener" title="在 GitHub 上查看源码">
          <svg class="github-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          <span>GitHub</span>
        </a>
      </div>
    </div>
  `;

  // 更新进度显示
  updateMenuProgress();

  // 卡片点击事件
  app.querySelectorAll('.menu-card').forEach(card => {
    card.addEventListener('click', () => {
      const mode = (card as HTMLElement).dataset.mode as MenuMode;
      if (mode) onSelect(mode);
    });
  });
}

function updateMenuProgress(): void {
  // 动态导入避免循环依赖
  import('../modules/score.js').then(({ loadProgress }) => {
    const progress = loadProgress();
    const starsEl = document.getElementById('menu-stars');
    const countEl = document.getElementById('menu-practice-count');
    if (starsEl) starsEl.textContent = `⭐ ${progress.stars}`;
    if (countEl) countEl.textContent = String(progress.practiceCount);
  });
}
