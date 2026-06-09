import { removeSession, getSession } from "@/utils";
import { navigateTo } from "@/router/router";

export default function Sidebar() {
  const user = getSession();

  setTimeout(() => {
    const logoutBtn = document.querySelector("#logoutBtn");
    logoutBtn?.addEventListener("click", () => {
      removeSession();
      navigateTo("/");
    });

    document.querySelectorAll("[data-link]").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        navigateTo(link.getAttribute("href"));
      });
    });
  });

  return `
    <aside
      class="w-64 bg-slate-900 text-white h-screen p-5"
    >
      <h2 class="text-2xl font-bold mb-8">
        SPA Base
      </h2>

      <nav class="flex flex-col gap-4">

        <a href="/home" class="px-3 py-1 bg-gray-500 rounded-xl" data-link>
          Home
        </a>

        ${
          user?.role === "admin"
            ? `<a href="/admin" class="px-3 py-1 bg-blue-600 rounded-xl" data-link>Reservas admin</a>`
            : ""
        }

        <button
          id="logoutBtn"
          class="text-left cursor-pointer text-red-400 hover:text-white hover:bg-red-400 px-3 py-1 rounded-xl"
        >
          Cerrar sesión
        </button>

      </nav>

    </aside>
  `;
}