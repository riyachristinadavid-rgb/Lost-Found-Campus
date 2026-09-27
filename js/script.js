// =========================
// REPORT FORM
// =========================

const reportForm = document.getElementById("reportForm");

if (reportForm) {

    reportForm.addEventListener("submit", function(event) {

        event.preventDefault();

        // Get form values
        const itemStatus =
            document.getElementById("itemStatus").value;

        const itemName =
            document.getElementById("itemName").value.trim();

        const category =
            document.getElementById("category").value;

        const description =
            document.getElementById("description").value.trim();

        const location =
            document.getElementById("location").value.trim();

        const date =
            document.getElementById("date").value;

        const contactName =
            document.getElementById("contactName").value.trim();

        const email =
            document.getElementById("email").value.trim();


        // Check required fields
        if (
            itemStatus === "" ||
            itemName === "" ||
            category === "" ||
            description === "" ||
            location === "" ||
            date === "" ||
            contactName === "" ||
            email === ""
        ) {
            alert("Please fill in all the required fields.");
            return;
        }


        // Check email
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }


        // Create new item
        const newItem = {

            id: Date.now(),

            status: itemStatus,

            name: itemName,

            category: category,

            description: description,

            location: location,

            date: date,

            contactName: contactName,

            email: email
        };


        // Get existing items
        let items =
            JSON.parse(
                localStorage.getItem("lostFoundItems")
            ) || [];


        // Add new item
        items.push(newItem);


        // Save to LocalStorage
        localStorage.setItem(
            "lostFoundItems",
            JSON.stringify(items)
        );


        // Success message
        alert(
            "Your " +
            itemStatus.toLowerCase() +
            " item report has been submitted successfully!"
        );


        // Clear form
        reportForm.reset();
    });
}



// =========================
// SEARCH AND FILTER
// =========================

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");


if (searchInput && categoryFilter) {

    function filterItems() {

        const searchText =
            searchInput.value
                .toLowerCase()
                .trim();

        const selectedCategory =
            categoryFilter.value;


        const itemCards =
            document.querySelectorAll(".item-card");


        itemCards.forEach(function(card) {

            const itemText =
                card.innerText.toLowerCase();

            const itemCategory =
                card.getAttribute("data-category");


            const matchesSearch =
                itemText.includes(searchText);


            const matchesCategory =
                selectedCategory === "All" ||
                itemCategory === selectedCategory;


            if (
                matchesSearch &&
                matchesCategory
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";
            }
        });
    }


    searchInput.addEventListener(
        "input",
        filterItems
    );


    categoryFilter.addEventListener(
        "change",
        filterItems
    );
}



// =========================
// DISPLAY SAVED LOST ITEMS
// =========================

const lostItemsContainer =
    document.getElementById(
        "lostItemsContainer"
    );


if (lostItemsContainer) {

    // Get items from LocalStorage
    const savedItems =
        JSON.parse(
            localStorage.getItem(
                "lostFoundItems"
            )
        ) || [];


    // Get only Lost items
    const lostItems =
        savedItems.filter(function(item) {

            return item.status === "Lost";

        });


    // Display Lost items
    lostItems.forEach(function(item) {

        const itemCard =
            document.createElement("div");


        itemCard.className =
            "item-card";


        // Store contact details
        itemCard.setAttribute(
            "data-contact-name",
            item.contactName || ""
        );


        itemCard.setAttribute(
            "data-email",
            item.email || ""
        );


        // Store category
        itemCard.setAttribute(
            "data-category",
            item.category || "Others"
        );


        // Format date
        let formattedDate =
            item.date || "Not available";


        if (item.date) {

            const dateParts =
                item.date.split("-");


            if (dateParts.length === 3) {

                formattedDate =
                    dateParts[2] +
                    "/" +
                    dateParts[1] +
                    "/" +
                    dateParts[0];
            }
        }


        // Select icon
        let icon = "📦";


        if (item.category === "Documents") {

            icon = "🪪";

        } else if (item.category === "Electronics") {

            icon = "🎧";

        } else if (item.category === "Books") {

            icon = "📚";

        } else if (item.category === "Accessories") {

            icon = "🎒";
        }


        // Create card HTML
        itemCard.innerHTML = `

            <div class="item-icon">
                ${icon}
            </div>

            <div class="item-info">

                <h2>
                    ${item.name}
                </h2>

                <p>
                    <strong>Category:</strong>
                    ${item.category}
                </p>

                <p>
                    <strong>Location:</strong>
                    ${item.location}
                </p>

                <p>
                    <strong>Date:</strong>
                    ${formattedDate}
                </p>

                <p>
                    ${item.description}
                </p>

                <button
                    class="view-btn"
                    type="button"
                >
                    View Details
                </button>

            </div>
        `;


        // Add card to page
        lostItemsContainer.appendChild(
            itemCard
        );
    });
}



// =========================
// DISPLAY SAVED FOUND ITEMS
// =========================

const foundItemsContainer =
    document.getElementById(
        "foundItemsContainer"
    );


if (foundItemsContainer) {

    // Get items from LocalStorage
    const savedItems =
        JSON.parse(
            localStorage.getItem(
                "lostFoundItems"
            )
        ) || [];


    // Get only Found items
    const foundItems =
        savedItems.filter(function(item) {

            return item.status === "Found";

        });


    // Display Found items
    foundItems.forEach(function(item) {

        const itemCard =
            document.createElement("div");


        itemCard.className =
            "item-card";


        // Store contact details
        itemCard.setAttribute(
            "data-contact-name",
            item.contactName || ""
        );


        itemCard.setAttribute(
            "data-email",
            item.email || ""
        );


        // Store category
        itemCard.setAttribute(
            "data-category",
            item.category || "Others"
        );


        // Format date
        let formattedDate =
            item.date || "Not available";


        if (item.date) {

            const dateParts =
                item.date.split("-");


            if (dateParts.length === 3) {

                formattedDate =
                    dateParts[2] +
                    "/" +
                    dateParts[1] +
                    "/" +
                    dateParts[0];
            }
        }


        // Select icon
        let icon = "📦";


        if (item.category === "Documents") {

            icon = "🪪";

        } else if (item.category === "Electronics") {

            icon = "🎧";

        } else if (item.category === "Books") {

            icon = "📚";

        } else if (item.category === "Accessories") {

            icon = "🎒";
        }


        // Create card HTML
        itemCard.innerHTML = `

            <div class="item-icon">
                ${icon}
            </div>

            <div class="item-info">

                <h2>
                    ${item.name}
                </h2>

                <p>
                    <strong>Category:</strong>
                    ${item.category}
                </p>

                <p>
                    <strong>Location:</strong>
                    ${item.location}
                </p>

                <p>
                    <strong>Date:</strong>
                    ${formattedDate}
                </p>

                <p>
                    ${item.description}
                </p>

                <button
                    class="view-btn"
                    type="button"
                >
                    View Details
                </button>

            </div>
        `;


        // Add card to page
        foundItemsContainer.appendChild(
            itemCard
        );
    });
}



// =========================
// VIEW DETAILS / CONTACT
// =========================

// Create modal
const modal =
    document.createElement("div");


modal.className =
    "modal";


modal.innerHTML = `

    <div class="modal-content">

        <span class="close-modal">
            &times;
        </span>

        <h2 id="modalItemName">
            Item Details
        </h2>

        <p>
            <strong>Category:</strong>
            <span id="modalCategory"></span>
        </p>

        <p>
            <strong>Location:</strong>
            <span id="modalLocation"></span>
        </p>

        <p>
            <strong>Date:</strong>
            <span id="modalDate"></span>
        </p>

        <p>
            <strong>Description:</strong>
            <span id="modalDescription"></span>
        </p>

        <p>
            <strong>Reported By:</strong>
            <span id="modalContactName"></span>
        </p>

        <p>
            <strong>Email:</strong>
            <span id="modalEmail"></span>
        </p>

        <a
            href="#"
            id="modalContactBtn"
            class="contact-btn"
        >
            Contact / Claim Item
        </a>

    </div>
`;


document.body.appendChild(modal);



// Get modal elements
const closeModal =
    modal.querySelector(
        ".close-modal"
    );


const modalItemName =
    document.getElementById(
        "modalItemName"
    );


const modalCategory =
    document.getElementById(
        "modalCategory"
    );


const modalLocation =
    document.getElementById(
        "modalLocation"
    );


const modalDate =
    document.getElementById(
        "modalDate"
    );


const modalDescription =
    document.getElementById(
        "modalDescription"
    );


const modalContactName =
    document.getElementById(
        "modalContactName"
    );


const modalEmail =
    document.getElementById(
        "modalEmail"
    );


const modalContactBtn =
    document.getElementById(
        "modalContactBtn"
    );



// =========================
// OPEN VIEW DETAILS
// =========================

document.addEventListener(
    "click",
    function(event) {

        if (
            !event.target.classList.contains(
                "view-btn"
            )
        ) {
            return;
        }


        const card =
            event.target.closest(
                ".item-card"
            );


        if (!card) {
            return;
        }


        // Get item name
        const title =
            card.querySelector("h2");


        modalItemName.textContent =
            title
                ? title.textContent
                : "Item Details";


        // Get paragraphs
        const paragraphs =
            card.querySelectorAll("p");


        let category =
            "Not available";

        let location =
            "Not available";

        let date =
            "Not available";

        let description =
            "Not available";


        paragraphs.forEach(
            function(paragraph) {

                const text =
                    paragraph.innerText;


                if (
                    text.includes(
                        "Category:"
                    )
                ) {

                    category =
                        text
                            .replace(
                                "Category:",
                                ""
                            )
                            .trim();
                }


                if (
                    text.includes(
                        "Location:"
                    )
                ) {

                    location =
                        text
                            .replace(
                                "Location:",
                                ""
                            )
                            .trim();
                }


                if (
                    text.includes(
                        "Date:"
                    )
                ) {

                    date =
                        text
                            .replace(
                                "Date:",
                                ""
                            )
                            .trim();
                }


                if (
                    !text.includes(
                        "Category:"
                    ) &&
                    !text.includes(
                        "Location:"
                    ) &&
                    !text.includes(
                        "Date:"
                    )
                ) {

                    description =
                        text.trim();
                }
            }
        );


        // Put values into modal
        modalCategory.textContent =
            category;


        modalLocation.textContent =
            location;


        modalDate.textContent =
            date;


        modalDescription.textContent =
            description;


        // Get contact information
        const contactName =
            card.getAttribute(
                "data-contact-name"
            );


        const email =
            card.getAttribute(
                "data-email"
            );


        if (
            contactName &&
            email
        ) {

            modalContactName.textContent =
                contactName;


            modalEmail.textContent =
                email;


            modalContactBtn.href =
                "mailto:" + email;


            modalContactBtn.textContent =
                "Contact / Claim Item";


        } else {

            modalContactName.textContent =
                "Sample Item";


            modalEmail.textContent =
                "Contact information not available";


            modalContactBtn.removeAttribute(
                "href"
            );


            modalContactBtn.textContent =
                "Contact Information Unavailable";
        }


        // Show modal
        modal.style.display =
            "flex";
    }
);



// =========================
// CLOSE MODAL
// =========================

closeModal.addEventListener(
    "click",
    function() {

        modal.style.display =
            "none";
    }
);



// Close modal by clicking outside
modal.addEventListener(
    "click",
    function(event) {

        if (
            event.target === modal
        ) {

            modal.style.display =
                "none";
        }
    }
);