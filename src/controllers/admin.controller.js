import { ReservationCard } from "../components/ReservationCard.js";
import { editReservation, getReservations } from "../services/reservation.service.js";
import { getSession } from "../utils.js";
import { navigateTo } from "@/router/router";

export const adminController = async () => {
    // todos los elementos del DOM que se van a usar en esta fnción
    // container, modales y forms 
    const container = document.getElementById("reservationsContainer");
    const editModal = document.getElementById("editModal");
    const editForm = document.getElementById("edit-reservation-form");

    // inputs del formulario para editar
    const editWorkplace = document.getElementById("edit-workplace-input");
    const editDate = document.getElementById("edit-date-input");
    const editStartTime = document.getElementById("edit-start-time");
    const editEndTime = document.getElementById("edit-end-time");
    const editReason = document.getElementById("edit-reason-input");
    const editStatus = document.getElementById("edit-status-input");

    const user = getSession();
    if (!container || !user) {
        return;
    }

    // Inicializo la variable para almacenar la reserva que se está editando actualmente
    let activeReservationId = null;

    // Función para cerrar el modal de edición y limpiar la reserva activa
    const closeEditModal = () => {
        if (editModal) {
        editModal.style.display = "none";
        }
        activeReservationId = null;
    };

    // Cargar modal de editar con los datos de la reserva seleccionada
    const openEditModal = (reservation) => {
        activeReservationId = reservation.id;
        if (editWorkplace) editWorkplace.value = reservation.workspace || "Sala A";
        if (editDate) editDate.value = reservation.date || "";
        if (editStartTime) editStartTime.value = reservation.startHour || "";
        if (editEndTime) editEndTime.value = reservation.endHour || "";
        if (editReason) editReason.value = reservation.reason || "";
        if (editStatus) editStatus.value = reservation.status || "pending";
        if (editModal) editModal.style.display = "flex";
    };

    const loadReservations = async () => {
        const reservations = await getReservations();
        const filteredReservations =
        user.role === "admin"
            ? reservations
            : reservations.filter((reservation) => String(reservation.userId) === user.id);

        container.innerHTML = filteredReservations?.length
        ? filteredReservations.map((reservation) => ReservationCard(reservation)).join("")
        : `
            <div class="w-full text-center py-8 col-span-2">
            <p class="text-slate-500">No hay reservas registradas.</p>
            </div>
        `;

        const buttons = container.querySelectorAll(".edit-reservation-btn");
        buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const reservationId = button.dataset.reservationId;

            // Busca la reserva que se va a editar en base al ID almacenado en el dataset del botón
            const reservation = filteredReservations.find(
            (item) => item.id === reservationId
            );

            // y abre el modal de edición
            if (reservation) {
            openEditModal(reservation);
            }
        });
        });
    };

    if (editModal) {
        // Evento para cerrar el modal al hacer click en la x o fuera del contenido
        document.querySelectorAll(".edit-modal-close").forEach((closeButton) => {
        closeButton.addEventListener("click", closeEditModal);
        });

        window.addEventListener("click", (event) => {
        if (event.target === editModal) {
            closeEditModal();
        }
        });
    }

    if (editForm) {

        // Evento para enviar el formulario de edición
        editForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Si no hay una reserva activa seleccionada, no hace nada
        if (!activeReservationId) return;

        // Crea un objeto con los datos actualizados de la reserva
        const updatedReservation = {
            workspace: editWorkplace?.value,
            date: editDate?.value,
            startHour: editStartTime?.value,
            endHour: editEndTime?.value,
            reason: editReason?.value,
            status: editStatus?.value,
        };

        // Llama al servicio para editar la reserva, cierra el modal y recarga las reservas
        await editReservation(updatedReservation, activeReservationId);
        closeEditModal();
        await loadReservations();
        });
    }

    await loadReservations();
};
