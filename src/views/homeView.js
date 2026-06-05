import Sidebar from "@/components/Sidebar";
import { getSession } from "@/utils";
import { homeController } from "@/controllers/home.controller";

export default function homeView() {
  const user = getSession();

  setTimeout(() => {
    homeController();
  });

  return `
    <div class="flex">

      ${Sidebar()}

      <main class="flex-1 p bg-slate-100 min-h-screen">

        <div class="">

          <h1 class="text-sm font-bold">
            Bienvenido ${user?.name}
          </h1>

          <p class="text-orange-900">
            Rol: ${user?.role}
          </p>

        </div>

        ${
          user?.role === "admin"
            ? `
              <section
                class="bg-white p-5 rounded-lg shadow mb-6"
              >
                <h2 class="font-bold text-xl mb-2">
                  Panel Administrador
                </h2>

                <p>
                  Puedes visualizar todas las reservas.
                </p>

                <button id="editar-reservaciones"
                  class="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Gestionar Reservas
                </button>

              </section>
            `
            : `
              <section
                class="bg-white p-5"
              >
                <h2 class="font-bold text-xl mb-2">
                  Panel Usuario
                </h2>

                <p>
                  Puedes visualizar únicamente tus reservas.
                </p>
                
                <div id="myModal" class="modal">
                  <div class="modal-content">
                    <span class="close">&times;</span>
                    <form id="create-reservation-form">

                      <div>
                        <label for="workplace-input">Sala:</label>
                        <select id="workplace-input" name="select">
                            <option value="Sala A" selected>Sala A</option>
                            <option value="Sala B">Sala B</option>
                            <option value="Sala C">Sala C</option>
                        </select>
                      </div>

                      <div>
                        <label for="date-input">Fecha de Reserva</label>
                        <input id="date-input" type="date">
                      </div>
                      
                      <div>
                        <label for="start-time" min="00:00" max="24:00">Hora de inicio:</label>
                        <input id="start-time" type="time" min="00:00" max="24:00">
                      </div>

                      <div>
                        <label for="end-time">Hora de finalizacion:</label>
                        <input id="end-time" type="time">
                      </div>

                      <div>
                        <label for="reason-input">Razón:</label>
                        <input id="reason-input" type="text">
                      </div>
                      
                      <button id="submit-reservation-btn" type="submit">Subir</button>

                    </form>
                  </div>
                </div>

                <button id="myBtn"
                  class="mt-3 bg-green-600 text-white px-4 py-2 rounded"
                >
                  Nueva Reserva
                </button>

              </section>
            `
        }

        <section
          class="bg-white p-5 rounded-lg shadow"
        >

          <div
            class="flex justify-between items-center mb-4"
          >
            <h2 class="font-bold text-xl">
              Reservas
            </h2>

            <span
              class="text-sm text-slate-500"
            >
              ${
                user?.role === "admin"
                  ? "Mostrando todas las reservas"
                  : "Mostrando únicamente tus reservas"
              }
            </span>
          </div>

          <div
            id="reservationsContainer"
            class="grid gap-4 md:grid-cols-2"
          >
            <div class="w-full text-center py-8 col-span-2">
              <p class="text-emerald-800">
                Cargando reservas ...
              </p>
            </div>
          </div>

        </section>

      </main>

    </div>
  `;
}