/**
 * 依登入狀態更新導覽列右側帳號區
 * 需要頁面有 <nav id="main-nav">，其中含 data-auth-slot
 */
(function () {
  function render() {
    const nav = document.getElementById("main-nav");
    if (!nav || typeof Auth === "undefined") return;

    let slot = nav.querySelector("[data-auth-slot]");
    if (!slot) {
      slot = document.createElement("span");
      slot.setAttribute("data-auth-slot", "");
      nav.appendChild(slot);
    }

    const user = Auth.currentUser();
    if (!user) {
      slot.innerHTML = `
        <a href="login.html">登入</a>
        <a href="register.html">註冊</a>
      `;
      return;
    }

    const profileHref = user.role === "owner" ? "owner.html" : "walker.html";
    const nameHtml = `<a class="nav-user nav-user-link" href="${profileHref}">${escapeHtml(user.name)}（${Auth.roleLabel(user.role)}）</a>`;

    slot.innerHTML = `
      ${nameHtml}
      <a href="#" id="nav-logout">登出</a>
    `;

    const logoutBtn = document.getElementById("nav-logout");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        Auth.logout();
        window.location.href = "index.html";
      });
    }
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
