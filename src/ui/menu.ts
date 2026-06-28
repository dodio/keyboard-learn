/**
 * 主菜单界面
 */

export type MenuMode = 'familiar' | 'word' | 'alphabet' | 'number';

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
      </div>

      <div class="menu-footer">
        <div class="stars-display">
          <span class="stars-label">我的星星：</span>
          <span class="stars-value" id="menu-stars">⭐ 0</span>
        </div>
        <div class="practice-count">
          已练习 <span id="menu-practice-count">0</span> 次
        </div>
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
