/**
 * 狗社群：貼文、按讚、留言（localStorage）
 * - 狗主人可發文
 * - 已登入使用者可按讚、留言
 */
window.Community = (function () {
  const KEY = "pawwalk_community_posts";

  const SEED = [
    {
      id: "post_seed_1",
      authorId: "seed_owner",
      authorName: "小美",
      dogName: "Lucky",
      caption: "今天公園玩超開心，尾巴搖到模糊 ☀️",
      image: "images/sample1.jpg",
      likedBy: [],
      comments: [
        {
          id: "c_seed_1",
          userId: "seed_user",
          userName: "阿傑",
          text: "也太可愛了吧！",
          createdAt: "2026-08-01T10:00:00.000Z"
        }
      ],
      createdAt: "2026-08-01T09:30:00.000Z"
    },
    {
      id: "post_seed_2",
      authorId: "seed_owner",
      authorName: "小華",
      dogName: "Cookie",
      caption: "短腿衝刺成功，零食獎勵時間 🍪",
      image: "images/sample2.jpg",
      likedBy: [],
      comments: [],
      createdAt: "2026-08-02T14:20:00.000Z"
    },
    {
      id: "post_seed_3",
      authorId: "seed_owner",
      authorName: "阿杰",
      dogName: "Mochi",
      caption: "柴柴的專注臉，誰能拒絕？",
      image: "images/sample3.jpg",
      likedBy: [],
      comments: [],
      createdAt: "2026-08-03T08:15:00.000Z"
    }
  ];

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw === null) {
        save(SEED);
        return SEED.slice();
      }
      return JSON.parse(raw) || [];
    } catch {
      return SEED.slice();
    }
  }

  function save(posts) {
    localStorage.setItem(KEY, JSON.stringify(posts));
  }

  function all() {
    return load().sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  }

  function byId(id) {
    return load().find((p) => p.id === id) || null;
  }

  function createPost({ authorId, authorName, dogName, caption, image }) {
    caption = (caption || "").trim();
    dogName = (dogName || "").trim();
    image = (image || "").trim();

    if (!authorId) return { ok: false, error: "請先登入。" };
    if (!image) return { ok: false, error: "請選擇或上傳照片。" };
    if (!caption) return { ok: false, error: "請寫一點分享文字。" };
    if (caption.length > 500) return { ok: false, error: "分享文字請在 500 字以內。" };

    const post = {
      id: "post_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      authorId,
      authorName: authorName || "匿名",
      dogName,
      caption,
      image,
      likedBy: [],
      comments: [],
      createdAt: new Date().toISOString()
    };

    const posts = load();
    posts.unshift(post);
    save(posts);
    return { ok: true, post };
  }

  function removePost(postId, userId) {
    const posts = load();
    const post = posts.find((p) => p.id === postId);
    if (!post) return { ok: false, error: "找不到這則貼文。" };
    if (post.authorId !== userId) return { ok: false, error: "只能刪除自己的貼文。" };
    save(posts.filter((p) => p.id !== postId));
    return { ok: true };
  }

  function toggleLike(postId, userId) {
    if (!userId) return { ok: false, error: "請先登入再按讚。" };
    const posts = load();
    const post = posts.find((p) => p.id === postId);
    if (!post) return { ok: false, error: "找不到這則貼文。" };

    const set = new Set(post.likedBy || []);
    if (set.has(userId)) set.delete(userId);
    else set.add(userId);
    post.likedBy = Array.from(set);
    save(posts);
    return { ok: true, post, liked: set.has(userId) };
  }

  function addComment(postId, { userId, userName, text }) {
    if (!userId) return { ok: false, error: "請先登入再留言。" };
    text = (text || "").trim();
    if (!text) return { ok: false, error: "請輸入留言內容。" };
    if (text.length > 200) return { ok: false, error: "留言請在 200 字以內。" };

    const posts = load();
    const post = posts.find((p) => p.id === postId);
    if (!post) return { ok: false, error: "找不到這則貼文。" };

    const comment = {
      id: "c_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      userId,
      userName: userName || "匿名",
      text,
      createdAt: new Date().toISOString()
    };
    post.comments = post.comments || [];
    post.comments.push(comment);
    save(posts);
    return { ok: true, post, comment };
  }

  return {
    all,
    byId,
    createPost,
    removePost,
    toggleLike,
    addComment
  };
})();
