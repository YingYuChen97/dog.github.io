/**
 * 主人刊登的狗狗（localStorage）
 * 與 data/dogs.js 的示範資料分開存放，公開列表時合併。
 */
window.Listings = (function () {
  const KEY = "pawwalk_listings";

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

  function all() {
    return load();
  }

  function byOwner(ownerId) {
    return load().filter((d) => d.ownerId === ownerId);
  }

  function byId(id) {
    return load().find((d) => d.id === id) || null;
  }

  function normalize(input, ownerId, existingId) {
    const name = (input.name || "").trim();
    const breed = (input.breed || "").trim();
    const location = (input.location || "").trim();
    const bio = (input.bio || "").trim();
    const age = Number(input.age);

    if (!name) return { ok: false, error: "請輸入狗狗名字。" };
    if (!breed) return { ok: false, error: "請輸入品種。" };
    if (!Number.isFinite(age) || age < 0 || age > 30) {
      return { ok: false, error: "請輸入合理的年齡（0–30）。" };
    }
    if (!location) return { ok: false, error: "請輸入活動地區。" };
    if (!bio) return { ok: false, error: "請輸入簡短介紹。" };

    const tags = Array.isArray(input.tags)
      ? input.tags
      : String(input.tags || "")
          .split(/[,，、]/)
          .map((t) => t.trim())
          .filter(Boolean);

    const dog = {
      id: existingId || "dog_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      ownerId,
      name,
      breed,
      age,
      gender: input.gender === "母" ? "母" : "公",
      size: ["小型", "中型", "大型"].includes(input.size) ? input.size : "中型",
      energy: ["低", "中", "高"].includes(input.energy) ? input.energy : "中",
      location,
      image: input.image || "images/sample1.jpg",
      tags,
      bio,
      temperament: (input.temperament || "").trim() || "待補充",
      walkNeed: {
        durationMin: Math.max(10, Number(input.durationMin) || 30),
        frequency: (input.frequency || "").trim() || "每天 1–2 次",
        preferredTime: (input.preferredTime || "").trim() || "傍晚"
      },
      notes: (input.notes || "").trim() || "無特別注意事項。",
      featured: false,
      createdAt: input.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return { ok: true, dog };
  }

  function add(ownerId, input) {
    const result = normalize(input, ownerId);
    if (!result.ok) return result;
    const list = load();
    list.unshift(result.dog);
    save(list);
    return { ok: true, dog: result.dog };
  }

  function update(ownerId, id, input) {
    const list = load();
    const idx = list.findIndex((d) => d.id === id && d.ownerId === ownerId);
    if (idx < 0) return { ok: false, error: "找不到這筆刊登，或無權限修改。" };
    const result = normalize(
      { ...input, createdAt: list[idx].createdAt },
      ownerId,
      id
    );
    if (!result.ok) return result;
    list[idx] = result.dog;
    save(list);
    return { ok: true, dog: result.dog };
  }

  function remove(ownerId, id) {
    const list = load();
    const next = list.filter((d) => !(d.id === id && d.ownerId === ownerId));
    if (next.length === list.length) {
      return { ok: false, error: "找不到這筆刊登，或無權限刪除。" };
    }
    save(next);
    return { ok: true };
  }

  /** 為指定帳號補一筆刊登（同一瀏覽器、帳號需已存在） */
  function bootstrapForEmail(email, dogInput, seedId) {
    let users;
    try {
      users = JSON.parse(localStorage.getItem("pawwalk_users") || "[]");
    } catch {
      return;
    }

    const user = users.find(
      (u) => (u.email || "").toLowerCase() === String(email).toLowerCase()
    );
    if (!user) return;

    if (user.role !== "owner") {
      user.role = "owner";
      localStorage.setItem("pawwalk_users", JSON.stringify(users));
    }

    const list = load();
    if (list.some((d) => d.id === seedId)) return;

    const result = normalize(dogInput, user.id, seedId);
    if (!result.ok) return;
    list.unshift(result.dog);
    save(list);
  }

  bootstrapForEmail(
    "a0919903171@gmail.com",
    {
      name: "Biscuit",
      breed: "米克斯",
      age: 2,
      gender: "公",
      size: "中型",
      energy: "中",
      location: "台北市",
      image: "images/sample1.jpg",
      tags: ["親人", "好帶", "適合新手遛狗員"],
      bio: "個性穩、喜歡散步聞草，適合一起慢慢逛公園。",
      temperament: "溫和親人，見到人會搖尾巴。",
      durationMin: 35,
      frequency: "每天 1–2 次",
      preferredTime: "傍晚",
      notes: "記得帶水與拾便袋；遇大型車聲可能會緊張，請安撫即可。"
    },
    "dog_seed_a0919903171"
  );

  return { all, byOwner, byId, add, update, remove };
})();
