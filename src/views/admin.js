import Sidebar from "@/components/Sidebar";
import { getSession } from "@/utils";
import { adminController } from "@/controllers/admin.controller";

export default function adminView() {
  const user = getSession();

  setTimeout(() => {
    adminController();
  });

  return `
    <div class="flex">

      ${Sidebar()}

      <main class="flex-1 p bg-slate-100 min-h-screen">

        <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 class="text-sm font-bold">Panel Admin</h1>
            <p class="text-orange-900">Bienvenido ${user?.name}</p>
          </div>
        </div>

        <section class="bg-white p-5 rounded-lg shadow mb-6">
          <h2 class="font-bold text-xl mb-2">Gestión de Reservas</h2>
          <p>Accede a esta vista para editar las reservas de los usuarios.</p>
        </section>

        <section class="bg-white p-5 rounded-lg shadow">
          <div class="flex justify-between items-center mb-4">
            <h2 class="font-bold text-xl">Reservas</h2>
            <span class="text-sm text-slate-500">Puedes editar cada reserva desde los botones.</span>
          </div>

          <div id="reservationsContainer" class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <div class="w-full text-center py-8 col-span-2">
              <p class="text-emerald-800">Cargando reservas ...</p>
            </div>
          </div>
        </section>

        <div id="editModal" class="modal">
          <div class="modal-content rounded-xl bg-white text-slate-900">
            <span class="close edit-modal-close text-slate-900">&times;</span>
            <h3 class="text-xl font-bold mb-4">Editar reserva</h3>
            <form id="edit-reservation-form" class="space-y-4 w-full max-w-2xl">
              <div class="grid gap-4 sm:grid-cols-2">
                <label class="block">
                  <span class="text-sm font-semibold">Sala</span>
                  <select id="edit-workplace-input" class="mt-1 w-full rounded border px-3 py-2">
                    <option value="Sala A">Sala A</option>
                    <option value="Sala B">Sala B</option>
                    <option value="Sala C">Sala C</option>
                  </select>
                </label>

                <label class="block">
                  <span class="text-sm font-semibold">Fecha</span>
                  <input id="edit-date-input" type="date" class="mt-1 w-full rounded border px-3 py-2" />
                </label>
              </div>

              <div class="grid gap-4 sm:grid-cols-2">
                <label class="block">
                  <span class="text-sm font-semibold">Hora inicio</span>
                  <input id="edit-start-time" type="time" class="mt-1 w-full rounded border px-3 py-2" />
                </label>

                <label class="block">
                  <span class="text-sm font-semibold">Hora fin</span>
                  <input id="edit-end-time" type="time" class="mt-1 w-full rounded border px-3 py-2" />
                </label>
              </div>

              <label class="block">
                <span class="text-sm font-semibold">Motivo</span>
                <input id="edit-reason-input" type="text" class="mt-1 w-full rounded border px-3 py-2" />
              </label>

              <label class="block">
                <span class="text-sm font-semibold">Estado</span>
                <select id="edit-status-input" class="mt-1 w-full rounded border px-3 py-2">
                  <option value="pending">pending</option>
                  <option value="approved">approved</option>
                  <option value="rejected">rejected</option>
                </select>
              </label>

              <div class="flex justify-end gap-3">
                <button type="button" class="edit-modal-close rounded bg-slate-200 px-4 py-2">Cancelar</button>
                <button type="submit" class="rounded bg-blue-600 px-4 py-2 text-white">Guardar cambios</button>
              </div>
            </form>
          </div>
        </div>
      </main>

    </div>
  `;
}