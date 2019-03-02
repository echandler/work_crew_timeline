import appendNewEntry from "./appendNewEntry.js";

function createContainer(dateText) {
    var container = document.createElement("div");
    container.className = "container";

    var date = document.createElement("textarea");
    date.className = "date";
    date.innerText = dateText || "date";

    var upButton = document.createElement("button");
    upButton.innerText = "up";
    upButton.onclick = moveUp;

    var downButton = document.createElement("button");
    downButton.innerText = "down";
    downButton.onclick = moveDown;

    var deleteButton = document.createElement("button");
    deleteButton.innerText = "x";
    deleteButton.onclick = delContainer;

    var buttonContainer = document.createElement("div");
    buttonContainer.className = "buttonContainer";
    buttonContainer.appendChild(upButton);
    buttonContainer.appendChild(downButton);
    buttonContainer.appendChild(deleteButton);

    var dateContainer = document.createElement("div");
    dateContainer.appendChild(date);
    dateContainer.appendChild(buttonContainer);

    var newEntryButton = document.createElement("button");
    newEntryButton.innerText = "New entry";
    newEntryButton.className = "newEntryButton";
    newEntryButton.addEventListener("click", appendNewEntry(container, newEntryButton));

    container.appendChild(dateContainer);
    container.appendChild(newEntryButton);

    container.addEventListener("mouseup", containerListener(container, upButton, downButton));

    return {
        containerEl: container,
        dateEl: date,
        newEntryButtonEl: newEntryButton
    };
}

function delContainer() {
    if (confirm("Delete this container?")) {
        this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);
    }
}

function moveUp() {
    let parent = this.parentElement.parentElement.parentElement.parentElement;
    let el = this.parentElement.parentElement.parentElement;
    flashBackground(el);

    parent.insertBefore(el, el.previousElementSibling);
    el.scrollIntoView();
}

function moveDown() {
    let parent = this.parentElement.parentElement.parentElement.parentElement;
    let el = this.parentElement.parentElement.parentElement;
    flashBackground(el);

    parent.insertBefore(el, el.nextElementSibling.nextElementSibling);
    el.scrollIntoView();
}

function containerListener(container, upButton, downButton) {
    return function(e) {
        container.style.backgroundColor = "#efefef";

        document.removeEventListener("click", tempClick);
        document.removeEventListener("keydown", tempKeyDown);

        document.addEventListener("keydown", tempKeyDown);

        setTimeout(() => {
            document.addEventListener("click", tempClick);
        }, 100);
    };

    function tempClick(e) {
        if (e.path.some(el => el === container)) {
            // Don't do anything if the container was clicked.
            return;
        }

        container.style.backgroundColor = "";

        document.removeEventListener("click", tempClick);
        document.removeEventListener("keydown", tempKeyDown);
    }

    function tempKeyDown(e) {
        if (e.path.some(el => el === container)) {
            // Don't do anything if the container was clicked.
            return;
        }
        //38 up, 40 down
        if (e.keyCode === 38) {
            moveUp.call(upButton);
        } else if (e.keyCode === 40) {
            moveDown.call(downButton);
        }
    }
}

function flashBackground(el) {
    var oldColor = el.style.backgroundColor;
    el.style.backgroundColor = "red";
    setTimeout(() => {
        el.style.backgroundColor = oldColor;
    }, 500);
}

export default createContainer;
