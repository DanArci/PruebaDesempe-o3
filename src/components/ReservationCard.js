import { getSession } from "@/utils";

export function ReservationCard(reservation) {
  let user = getSession();
  const {id, workspace, date, startHour, endHour, reason, status } = reservation;
  return `
    <article
      class="rounded"
    >
      <h3 class="font-bold text-lg">
        ${workspace}
      </h3>

      <div class="">

        <p>
          Fecha:
          ${date}
        </p>

        <p>
          Horario:
          ${startHour}
          -
          ${endHour}
        </p>

        <p>
          Motivo:
          ${reason}
        </p>

        <p>
          Estado:
          <span class="">
            ${status}
          </span>
        </p>

        <p>
          Id:
          <span class="">
            ${id}
          </span>
        </p>

        ${user.role === "admin"?
          `
            <button class="edit-reservation-btn mt-3 bg-green-600 text-white px-4 py-2 rounded">Edit</button>
          `
          :
          ""
        }

      </div>
    </article>
  `
}

