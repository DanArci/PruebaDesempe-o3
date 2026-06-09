import { getSession } from "@/utils";

export function ReservationCard(reservation) {
  let user = getSession();
  const { id, workspace, date, startHour, endHour, reason, status, userId } = reservation;

  return `
    <article class="rounded-xl bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-200">
      <div class="flex justify-between items-start gap-4 mb-4">
        <div>
          <h3 class="font-bold text-xl text-slate-900">${workspace}</h3>
          <p class="text-sm text-slate-500">Reserva #${id}</p>
        </div>

        <span class="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          ${status}
        </span>
      </div>

      <div class="space-y-2 text-sm text-slate-700">
        <p><span class="font-semibold">Fecha:</span> ${date}</p>
        <p><span class="font-semibold">Horario:</span> ${startHour} - ${endHour}</p>
        <p><span class="font-semibold">Motivo:</span> ${reason}</p>
        ${user.role === "admin" ? `<p><span class="font-semibold">Usuario:</span> ${userId}</p>` : ``}
      </div>

      ${user.role === "admin" ? `
        <button
          class="edit-reservation-btn mt-5 w-full rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 transition"
          data-reservation-id="${id}"
        >
          Editar reserva
        </button>
      ` : ``}
    </article>
  `;
}

