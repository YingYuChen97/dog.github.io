/**
 * PawWalk 本地帳號（localStorage）
 * 僅供前端示範，非正式伺服器驗證。
 */
window.Auth = (function () {
  const USERS_KEY = "pawwalk_users";
  const SESSION_KEY = "pawwalk_session";

  function loadUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function loadSession() {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY));
    } catch {
      return null;
    }
  }

  function saveSession(session) {
    if (!session) {
      localStorage.removeItem(SESSION_KEY);
      return;
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  async function hashPassword(password) {
    // file:// 開啟時 crypto.subtle 可能不可用，改用簡易雜湊後備
    if (crypto && crypto.subtle) {
      const data = new TextEncoder().encode("pawwalk:" + password);
      const buf = await crypto.subtle.digest("SHA-256", data);
      return Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    }
    let h = 2166136261;
    const s = "pawwalk:" + password;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return "fnv_" + (h >>> 0).toString(16);
  }

  function publicUser(user) {
    if (!user) return null;
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone || "",
      area: user.area || "",
      createdAt: user.createdAt
    };
  }

  function currentUser() {
    const session = loadSession();
    if (!session || !session.userId) return null;
    const user = loadUsers().find((u) => u.id === session.userId);
    return publicUser(user);
  }

  function isLoggedIn() {
    return !!currentUser();
  }

  async function register({ name, email, password, role }) {
    name = (name || "").trim();
    email = (email || "").trim().toLowerCase();
    password = password || "";
    role = role === "walker" ? "walker" : "owner";

    if (!name) return { ok: false, error: "請輸入名稱。" };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { ok: false, error: "請輸入有效的 Email。" };
    }
    if (password.length < 6) {
      return { ok: false, error: "密碼至少需要 6 個字元。" };
    }

    const users = loadUsers();
    if (users.some((u) => u.email === email)) {
      return { ok: false, error: "此 Email 已被註冊。" };
    }

    const user = {
      id: "u_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      name,
      email,
      passwordHash: await hashPassword(password),
      role,
      phone: "",
      area: "",
      createdAt: new Date().toISOString()
    };

    users.push(user);
    saveUsers(users);
    saveSession({ userId: user.id });
    return { ok: true, user: publicUser(user) };
  }

  async function login({ email, password }) {
    email = (email || "").trim().toLowerCase();
    password = password || "";

    if (!email || !password) {
      return { ok: false, error: "請輸入 Email 與密碼。" };
    }

    const users = loadUsers();
    const user = users.find((u) => u.email === email);
    if (!user) {
      return { ok: false, error: "帳號或密碼不正確。" };
    }

    const hash = await hashPassword(password);
    if (hash !== user.passwordHash) {
      return { ok: false, error: "帳號或密碼不正確。" };
    }

    saveSession({ userId: user.id });
    return { ok: true, user: publicUser(user) };
  }

  function logout() {
    saveSession(null);
  }

  function roleLabel(role) {
    return role === "walker" ? "遛狗員" : "主人";
  }

  function updateProfile({ name, phone, area }) {
    const session = loadSession();
    if (!session || !session.userId) {
      return { ok: false, error: "請先登入。" };
    }

    name = (name || "").trim();
    phone = (phone || "").trim();
    area = (area || "").trim();

    if (!name) return { ok: false, error: "請輸入名稱。" };

    const users = loadUsers();
    const idx = users.findIndex((u) => u.id === session.userId);
    if (idx < 0) return { ok: false, error: "找不到帳號。" };

    users[idx].name = name;
    users[idx].phone = phone;
    users[idx].area = area;
    saveUsers(users);
    return { ok: true, user: publicUser(users[idx]) };
  }

  async function changePassword({ currentPassword, newPassword }) {
    const session = loadSession();
    if (!session || !session.userId) {
      return { ok: false, error: "請先登入。" };
    }

    currentPassword = currentPassword || "";
    newPassword = newPassword || "";

    if (newPassword.length < 6) {
      return { ok: false, error: "新密碼至少需要 6 個字元。" };
    }

    const users = loadUsers();
    const idx = users.findIndex((u) => u.id === session.userId);
    if (idx < 0) return { ok: false, error: "找不到帳號。" };

    const currentHash = await hashPassword(currentPassword);
    if (currentHash !== users[idx].passwordHash) {
      return { ok: false, error: "目前密碼不正確。" };
    }

    users[idx].passwordHash = await hashPassword(newPassword);
    saveUsers(users);
    return { ok: true };
  }

  return {
    register,
    login,
    logout,
    currentUser,
    isLoggedIn,
    roleLabel,
    updateProfile,
    changePassword
  };
})();
