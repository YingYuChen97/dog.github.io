/**
 * 共用：把狗狗資料渲染成卡片
 * mode: "simple" 首頁簡卡 | "detail" 列表頁詳卡
 */
window.DogsUI = {
  escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  },

  tagsHtml(tags) {
    if (!tags || !tags.length) return "";
    return `<div class="tag-row">${tags
      .map((t) => `<span class="tag">${this.escapeHtml(t)}</span>`)
      .join("")}</div>`;
  },

  cardHref(dog) {
    return "dog.html?id=" + encodeURIComponent(dog.id);
  },

  cardSimple(dog) {
    return `
      <a class="card card-link" href="${this.escapeHtml(this.cardHref(dog))}">
        <img src="${this.escapeHtml(dog.image)}" alt="${this.escapeHtml(dog.name)}">
        <div class="card-content">
          <h3>${this.escapeHtml(dog.name)}</h3>
          <p>
            ${this.escapeHtml(dog.breed)}，${dog.age}歲。<br>
            ${this.escapeHtml(dog.bio)}
          </p>
        </div>
      </a>
    `;
  },

  cardDetail(dog) {
    const w = dog.walkNeed || {};
    return `
      <a class="card dog-card card-link" href="${this.escapeHtml(this.cardHref(dog))}">
        <img src="${this.escapeHtml(dog.image)}" alt="${this.escapeHtml(dog.name)}">
        <div class="card-content">
          <div class="card-top">
            <h3>${this.escapeHtml(dog.name)}</h3>
            <span class="meta-pill">${this.escapeHtml(dog.location)}</span>
          </div>
          <p class="breed-line">
            ${this.escapeHtml(dog.breed)} · ${dog.age}歲 · ${this.escapeHtml(dog.gender)} ·
            ${this.escapeHtml(dog.size)} · 活力${this.escapeHtml(dog.energy)}
          </p>
          ${this.tagsHtml(dog.tags)}
          <p>${this.escapeHtml(dog.bio)}</p>
          <ul class="dog-meta">
            <li><strong>性情</strong>${this.escapeHtml(dog.temperament)}</li>
            <li><strong>散步</strong>約 ${w.durationMin || "—"} 分鐘 · ${this.escapeHtml(w.frequency || "—")} · 偏好${this.escapeHtml(w.preferredTime || "—")}</li>
            <li><strong>注意</strong>${this.escapeHtml(dog.notes)}</li>
          </ul>
        </div>
      </a>
    `;
  },

  render(container, dogs, mode = "simple") {
    if (!container) return;
    if (!dogs.length) {
      container.innerHTML = `<p class="empty-hint">目前沒有符合條件的狗狗。</p>`;
      return;
    }
    const fn = mode === "detail" ? this.cardDetail.bind(this) : this.cardSimple.bind(this);
    container.innerHTML = dogs.map(fn).join("");
  }
};
