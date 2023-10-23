document.addEventListener("DOMContentLoaded", function() {
    const numSeatsInput = document.getElementById("num-seats");
    const bookSeatsButton = document.getElementById("book-seats");
    const seatingLayout = document.querySelector(".seating-layout");
    const confirmationMessage = document.getElementById("confirmation-message");
    const rowLabelsContainer = document.getElementById("row-labels"); // New element



    const seatLayout = [
        ["unbooked", "booked", "booked", "booked", "booked", "unbooked"],
        ["unbooked", "booked", "booked", "unbooked", "unbooked", "unbooked"],
        ["unbooked", "unbooked", "unbooked", "unbooked", "booked", "booked"],
        ["unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked"],
        ["unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked"],
        ["unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked"],
        ["unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked"],
        ["unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked"],
        ["unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked"],
        ["unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked"],
        ["unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked"],
        ["unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked"],
        ["unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked"],
        ["unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked"],
        ["unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked", "unbooked"]
    ]
    const rowLabels = Array.from({
        length: seatLayout.length
    }, (_, i) => String.fromCharCode(65 + i));

    function initializeSeatingLayout() {
        seatingLayout.innerHTML = "";
        rowLabelsContainer.innerHTML = ""; // Clear the row labels container
        for (let row = 0; row < seatLayout.length; row++) {
            const rowElement = document.createElement("div");
            rowElement.classList.add("row");

            // Add the row label to the left side of the layout
            const labelElement = document.createElement("div");
            labelElement.classList.add("row-label");
            labelElement.textContent = rowLabels[row];
            rowLabelsContainer.appendChild(labelElement);
            rowElement.dataset.row = row; // Add a data attribute to store the row index
            for (let seat of seatLayout[row]) {
                const seatElement = document.createElement("div");
                seatElement.classList.add("seat", seat);

                if (seat === "unbooked") {
                    seatElement.classList.add("available-seat");
                } else if (seat === "booked") {
                    seatElement.classList.add("booked-seat");
                }

                // Add a click event listener to select or deselect seats
                seatElement.addEventListener("click", function() {
                    if (seatElement.classList.contains("available-seat")) {
                        seatElement.classList.remove("available-seat");
                        seatElement.classList.add("selected-seat");
                    } else if (seatElement.classList.contains("selected-seat")) {
                        seatElement.classList.remove("selected-seat");
                        seatElement.classList.add("available-seat");
                    }
                });

                rowElement.appendChild(seatElement);
            }
            seatingLayout.appendChild(rowElement);
        }
    }

    initializeSeatingLayout();

    bookSeatsButton.addEventListener("click", function() {
        const numSeats = parseInt(numSeatsInput.value);

        // Find and book selected seats
        const selectedSeats = document.querySelectorAll(".selected-seat");

        if (selectedSeats.length >= numSeats) {
            for (let i = 0; i < numSeats; i++) {
                selectedSeats[i].classList.remove("selected-seat");
                selectedSeats[i].classList.remove("available-seat");
                selectedSeats[i].classList.add("booked-seat");

                // Update the seatLayout to mark seats as "booked"
                const rowIdx = parseInt(selectedSeats[i].parentElement.dataset.row);
                const seatIdx = Array.from(selectedSeats[i].parentElement.children).indexOf(selectedSeats[i]);
                seatLayout[rowIdx][seatIdx] = "booked";
            }

            // Update the seating layout to reflect the booked seats
            initializeSeatingLayout();

            // Display a confirmation message to the user
            confirmationMessage.textContent = `Successfully booked ${numSeats} seats.`;
        } else if (numSeats === "") {
            confirmationMessage.textContent = "Enter number of seat and book";
        } else {
            confirmationMessage.textContent = `Not enough seats available for booking. or select ${numSeats} seats`;
        }
    });
});
