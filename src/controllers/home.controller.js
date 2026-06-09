import { getSession } from "../utils.js";
import { createReservation, getReservations } from "../services/reservation.service.js";
import { navigateTo } from "@/router/router";

export const homeController = async () => {
  const container = document.getElementById("reservationsContainer");
  const user = getSession();
  const adminButton = document.getElementById("editar-reservaciones");

  if (!container || !user) {
    return;
  }

  adminButton?.addEventListener("click", () => {
    navigateTo("/admin");
  });

  const loadReservations = async () => {
    const reservations = await getReservations();
    const filteredReservations =
      user.role === "admin"
        ? reservations
        : reservations.filter((reservation) => String(reservation.userId) === user.id);

    container.innerHTML = filteredReservations?.length
      ? filteredReservations
          .map(
            (reservation) => `
              <article class="rounded-xl bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-200">
                <h3 class="font-bold text-lg">${reservation.workspace}</h3>
                <p class="text-sm text-slate-500">Fecha: ${reservation.date}</p>
                <p class="text-sm text-slate-500">Horario: ${reservation.startHour} - ${reservation.endHour}</p>
                <p class="text-sm text-slate-500">Motivo: ${reservation.reason}</p>
              </article>
            `
          )
          .join("")
      : `
          <div class="w-full text-center py-8 col-span-2">
            <p class="text-slate-500">No hay reservas disponibles</p>
          </div>
        `;
  };

  if (user.role === "user") {
    const modal = document.getElementById("myModal");
    const btn = document.getElementById("myBtn");
    const span = document.getElementsByClassName("close")[0];
    const submitBtn = document.getElementById("submit-reservation-btn");

    btn.onclick = () => {
      if (modal) modal.style.display = "flex";
    };

    span.onclick = () => {
      if (modal) modal.style.display = "none";
    };

    window.onclick = (event) => {
      if (event.target === modal) {
        if (modal) modal.style.display = "none";
      }
    };

    submitBtn?.addEventListener("click", async (e) => {
      e.preventDefault();

      const workplace = document.getElementById("workplace-input").value;
      const date = document.getElementById("date-input").value;
      const startTime = document.getElementById("start-time").value;
      const endTime = document.getElementById("end-time").value;
      const reason = document.getElementById("reason-input").value;

      const newReservation = {
        userId: user.id,
        workspace: workplace,
        date: date,
        startHour: startTime,
        endHour: endTime,
        reason: reason,
        status: "pending",
      };

      await createReservation(newReservation);
      await loadReservations();
    });
  }

  await loadReservations();
};

