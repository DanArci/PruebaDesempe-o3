import { ReservationCard } from "../components/ReservationCard.js";
import { editReservation, getReservations } from "../services/reservation.service.js";
import { getSession } from "../utils.js";
import { createReservation } from "../services/reservation.service.js"

export const homeController = async () => {
  const container = document.getElementById("reservationsContainer");

  const user = getSession();

  const reservations = await getReservations();

  const filteredReservations =
    user.role === "admin"
      ? reservations
      : reservations.filter((reservation) => String(reservation.userId) === user.id);
  
  container.innerHTML = container.innerHTML = filteredReservations?.length
    ? filteredReservations
        .map((reservation) => ReservationCard(reservation))
        .join("")
    : `
      <div class="w-full text-center py-8 col-span-2">
        <p class="text-slate-500">
          No hay reservas disponibles
        </p>
      </div>
    `;

  if (user.role === "user") {
    // lo saque de: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
      modal.style.display = "flex";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

    let submitBtn = document.getElementById('submit-reservation-btn')
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault()
      // Valores de la reservacion
      let workplace = document.getElementById('workplace-input').value
      let date = document.getElementById('date-input').value
      let startTime = document.getElementById('start-time').value
      let endTime = document.getElementById('end-time').value
      let reason = document.getElementById('reason-input').value

      let newReservation = {
        "userId": user.id,
        "workspace": workplace,
        "date": date,
        "startHour": startTime,
        "endHour": endTime,
        "reason": reason,
        "status": "pending"      
      }

      createReservation(newReservation)

    })
  }

  if (user.role === "admin"){
    let editBtn = document.querySelector('.edit-reservation-btn')
  }
  
};

