/*
=========================================
 VM CARD MANAGEMENT
=========================================
*/
document.addEventListener(
"DOMContentLoaded",
function(){
    updateVmNumbers();
});


/*
=========================================
 GLOBAL CLICK HANDLER
Handles dynamic buttons
inside cloned VM cards
=========================================
*/
document.addEventListener(
"click",
function(event){
    /*
    Add VM Card
    */
    if(
        event.target.classList
        .contains("add-card-btn")
    ){
        addVmCard(
            event.target
        );
    }

    /*
    Delete VM Card
    */
    if(
        event.target.classList
        .contains("delete-card-btn")
    ){
        deleteVmCard(
            event.target
        );
    }

    /*
    Add Hard Disk
    */
    if(
        event.target.classList
        .contains("add-disk-btn")
    ){
        addDisk(
            event.target
        );
    }

    /*
    Remove Hard Disk
    */
    if(
        event.target.classList
        .contains("remove-disk-btn")
    ){
        removeDisk(
            event.target
        );
    }
});

/*
=========================================
 ADD VM CARD
=========================================
*/
function addVmCard(button){
    const currentCard =
    button.closest(".vm-card");

    const clone =
    currentCard.cloneNode(true);

    /*
    Clear input fields
    */
    clone
    .querySelectorAll("input")
    .forEach(
    input=>{
        input.value="";
    });

    /*
    Reset dropdown
    */
    clone
    .querySelectorAll("select")
    .forEach(
    select=>{
        select.selectedIndex=0;
    });

    /*
    Reset disks back to C,D,E
    */
    const diskContainer =
    clone.querySelector(
        ".disk-container"
    );
    diskContainer.innerHTML = `
        <div class="disk-row">
            <label class="disk-label">
            C:
            </label>
            <input
            type="number"
            class="disk-size"
            placeholder="GB"
            required>
        </div>

        <div class="disk-row">
            <label class="disk-label">
            D:
            </label>
            <input
            type="number"
            class="disk-size"
            placeholder="GB"
            required>
        </div>

        <div class="disk-row">
            <label class="disk-label">
            E:
            </label>
            <input
            type="number"
            class="disk-size"
            placeholder="GB"
            required>
            <button
            type="button"
            class="add-disk-btn">
            ➕
            </button>
        </div>
    `;

    currentCard.after(clone);
    updateVmNumbers();
}

/*
=========================================
 DELETE VM CARD
=========================================
*/
function deleteVmCard(button){
    const cards =
    document.querySelectorAll(
        ".vm-card"
    );

    if(cards.length === 1){
        alert(
        "At least one VM card is required."
        );
        return;
    }

    const card =
    button.closest(".vm-card");

    card.remove();
    updateVmNumbers();
}


/*
=========================================
 UPDATE VM NUMBER
=========================================
*/


function updateVmNumbers(){
    document
    .querySelectorAll(".vm-card")
    .forEach(
    (card,index)=>{
        const title =
        card.querySelector(
            ".vm-title"
        );
        if(title){
            title.innerHTML =
            `VM #${index+1} - Provision Virtual Machine`;
        }
    });
}

/*
=========================================
 ADD HARD DISK
=========================================
*/

function addDisk(button){
    const container =
    button.closest(
        ".disk-container"
    );

    const disks =
    container.querySelectorAll(
        ".disk-row"
    );

    const driveLetter =
    String.fromCharCode(
        67 + disks.length
    );

    const row =
    document.createElement(
        "div"
    );

    row.className =
    "disk-row";

    row.innerHTML = `
        <label class="disk-label">
        ${driveLetter}:
        </label>
        <input
        type="number"
        class="disk-size"
        placeholder="GB"
        required>
        <button
        type="button"
        class="remove-disk-btn">
        −
        </button>
    `;
    container.appendChild(row);
}

/*
=========================================
 REMOVE HARD DISK
=========================================
*/


function removeDisk(button){
    const row =
    button.closest(
        ".disk-row"
    );
    const container =
    button.closest(
        ".disk-container"
    );
    row.remove();
    updateDriveLetters(
        container
    );
}


/*
=========================================
 UPDATE DRIVE LETTERS
=========================================
*/

function updateDriveLetters(container){
    const rows =
    container.querySelectorAll(
        ".disk-row"
    );
    rows.forEach(
    (row,index)=>{
        const label =
        row.querySelector(
            ".disk-label"
        );
        label.innerHTML =
        String.fromCharCode(
            67 + index
        ) + ":";
    });
}


