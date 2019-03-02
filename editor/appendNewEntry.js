import newEntry from "./newEntry.js";

function appendNewEntry(container, childEl, newEntryObj) {
    if (newEntryObj) {
        container.insertBefore(newEntry(newEntryObj).entryEl, childEl);
        return;
    }

    return function (e, newEntryObj){
        // This returned function is used as a callback for an event listener.
        container.insertBefore(newEntry(newEntryObj).entryEl, childEl);
    };
}

export default appendNewEntry;
