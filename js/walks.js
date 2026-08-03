/**
 * 遛狗申請／接單／評價（localStorage）
 *
 * status: pending → accepted | rejected | cancelled
 *         accepted → completed | cancelled
 * 完成後雙方可互評（各評一次）
 */
window.Walks = (function () {
  const KEY = "pawwalk_walks";

  const STATUS_LABEL = {
    pending: "待審核",
    accepted: "已接單",
    rejected: "已拒絕",
    completed: "已完成",
    cancelled: "已取消"
  };

  function load() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
      return [];
    }
  }

  function save(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
  }

  function byId(id) {
    return load().find((w) => w.id === id) || null;
  }

  function byOwner(ownerId) {
    return load()
      .filter((w) => w.ownerId === ownerId)
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  }

  function byWalker(walkerId) {
    return load()
      .filter((w) => w.walkerId === walkerId)
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  }

  function statusLabel(status) {
    return STATUS_LABEL[status] || status;
  }

  function apply({ dog, walker, message, preferredTime }) {
    if (!walker || walker.role !== "walker") {
      return { ok: false, error: "請使用遛狗員帳號申請。" };
    }
    if (!dog || !dog.ownerId) {
      return { ok: false, error: "此刊登無法申請（示範資料或缺少主人）。" };
    }
    if (dog.ownerId === walker.id) {
      return { ok: false, error: "不能申請自己的狗狗。" };
    }

    message = (message || "").trim();
    preferredTime = (preferredTime || "").trim();
    if (!message) return { ok: false, error: "請簡單說明你的申請。" };
    if (message.length > 300) return { ok: false, error: "申請說明請在 300 字以內。" };

    const list = load();
    const dup = list.some(
      (w) =>
        w.dogId === dog.id &&
        w.walkerId === walker.id &&
        (w.status === "pending" || w.status === "accepted")
    );
    if (dup) {
      return { ok: false, error: "你已有進行中的申請，請先等待處理。" };
    }

    let ownerName = "主人";
    try {
      const users = JSON.parse(localStorage.getItem("pawwalk_users") || "[]");
      const owner = users.find((u) => u.id === dog.ownerId);
      if (owner) ownerName = owner.name;
    } catch (_) {}

    const walk = {
      id: "walk_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      dogId: dog.id,
      dogName: dog.name,
      dogImage: dog.image || "images/sample1.jpg",
      dogBreed: dog.breed || "",
      ownerId: dog.ownerId,
      ownerName,
      walkerId: walker.id,
      walkerName: walker.name,
      message,
      preferredTime: preferredTime || "可協調",
      status: "pending",
      ownerRating: null,
      walkerRating: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    list.unshift(walk);
    save(list);
    return { ok: true, walk };
  }

  function setStatus(walkId, actorId, nextStatus) {
    const list = load();
    const idx = list.findIndex((w) => w.id === walkId);
    if (idx < 0) return { ok: false, error: "找不到這筆申請。" };

    const walk = list[idx];
    const isOwner = walk.ownerId === actorId;
    const isWalker = walk.walkerId === actorId;

    if (nextStatus === "accepted" || nextStatus === "rejected") {
      if (!isOwner) return { ok: false, error: "只有主人可以審核申請。" };
      if (walk.status !== "pending") return { ok: false, error: "此申請已處理過。" };
    } else if (nextStatus === "completed") {
      if (!isOwner && !isWalker) return { ok: false, error: "無權限操作。" };
      if (walk.status !== "accepted") return { ok: false, error: "只有已接單的行程可標記完成。" };
    } else if (nextStatus === "cancelled") {
      if (!isOwner && !isWalker) return { ok: false, error: "無權限操作。" };
      if (walk.status !== "pending" && walk.status !== "accepted") {
        return { ok: false, error: "目前狀態無法取消。" };
      }
    } else {
      return { ok: false, error: "不支援的狀態。" };
    }

    walk.status = nextStatus;
    walk.updatedAt = new Date().toISOString();
    list[idx] = walk;
    save(list);
    return { ok: true, walk };
  }

  function rate(walkId, actorId, { score, comment }) {
    score = Number(score);
    comment = (comment || "").trim();

    if (!Number.isFinite(score) || score < 1 || score > 5) {
      return { ok: false, error: "請選擇 1–5 星評價。" };
    }
    if (comment.length > 200) return { ok: false, error: "評價文字請在 200 字以內。" };

    const list = load();
    const idx = list.findIndex((w) => w.id === walkId);
    if (idx < 0) return { ok: false, error: "找不到這筆行程。" };

    const walk = list[idx];
    if (walk.status !== "completed") {
      return { ok: false, error: "行程完成後才能評價。" };
    }

    const rating = {
      score,
      comment,
      createdAt: new Date().toISOString()
    };

    if (walk.ownerId === actorId) {
      if (walk.ownerRating) return { ok: false, error: "你已評價過這位遛狗員。" };
      walk.ownerRating = rating;
    } else if (walk.walkerId === actorId) {
      if (walk.walkerRating) return { ok: false, error: "你已評價過這位主人。" };
      walk.walkerRating = rating;
    } else {
      return { ok: false, error: "無權限評價。" };
    }

    walk.updatedAt = new Date().toISOString();
    list[idx] = walk;
    save(list);
    return { ok: true, walk };
  }

  /** 取得某人被評過的分數摘要（主人被遛狗員評、遛狗員被主人評） */
  function ratingSummary(userId) {
    const scores = [];
    load().forEach((w) => {
      if (w.walkerId === userId && w.ownerRating) scores.push(w.ownerRating.score);
      if (w.ownerId === userId && w.walkerRating) scores.push(w.walkerRating.score);
    });
    if (!scores.length) {
      return { count: 0, average: 0 };
    }
    const sum = scores.reduce((a, b) => a + b, 0);
    return {
      count: scores.length,
      average: Math.round((sum / scores.length) * 10) / 10
    };
  }

  function pendingCountForOwner(ownerId) {
    return load().filter((w) => w.ownerId === ownerId && w.status === "pending").length;
  }

  return {
    byId,
    byOwner,
    byWalker,
    apply,
    setStatus,
    rate,
    ratingSummary,
    pendingCountForOwner,
    statusLabel
  };
})();
