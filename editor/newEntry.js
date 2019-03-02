function newEntry(obj) {
    obj = obj || {};

    var entry = document.createElement("div");
    entry.className = "entry";

    var subject = document.createElement("textarea");
    subject.className = "entrySubject";
    subject.innerText = obj.subjectText || "subject";

    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "x";
    deleteButton.style.background = "lightblue";
    deleteButton.addEventListener("click", delEntry); //onclick = delEntry;

    var subjectContainer = document.createElement("div");
    subjectContainer.className = "subjectContainer";
    subjectContainer.appendChild(subject);
    subjectContainer.appendChild(deleteButton);

    var body = document.createElement("textarea");
    body.className = "entryBody";
    body.value = obj.bodyText || "body";

    entry.appendChild(subjectContainer);
    entry.appendChild(body);

    if (obj.bodyHeight) {
        body.style.height = obj.bodyHeight + "px";
    }
    if (obj.bodyWidth) {
        body.style.width = obj.bodyWidth + "px";
    }
    if (obj.subjHeight) {
        subject.style.height = obj.subjHeight + "px";
    }
    if (obj.subjWidth) {
        subject.style.width = obj.subjWidth + "px";
    }

    return {
        entryEl: entry,
        bodyEl: body,
        subjectEl: subject
    };
}

function delEntry() {
    if (confirm("Delete this entry?")) {
        this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);
    }
}

export default newEntry;
