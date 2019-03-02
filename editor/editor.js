import info from "../inmateJournal.js";
import newEntry from "./newEntry.js";
import createContainer from "./createContainer.js";
import appendNewEntry from "./appendNewEntry.js";

var newContainerButton = document.getElementById("newContainerButton");
var saveButton = document.getElementById("saveButton");
var main = document.getElementById("main");

saveButton.onclick = saveEntries;

function saveEntries() {
    var containers = document.querySelectorAll(".container");
    var obj = { events: [] };

    for (var n = 0; n < containers.length; n++) {
        var date = containers[n].querySelector(".date").value;
        var entrys = containers[n].querySelectorAll(".entry");
        var obj2 = { date: date, entries: [] };

        obj.events.push(obj2);

        for (var m = 0; m < entrys.length; m++) {
            obj2.entries.push({
                subj: entrys[m].querySelector(".entrySubject").value,
                subjHeight: entrys[m].querySelector(".entrySubject").offsetHeight,
                subjWidth: entrys[m].querySelector(".entrySubject").offsetWidth,
                body: entrys[m].querySelector(".entryBody").value,
                bodyHeight: entrys[m].querySelector(".entryBody").offsetHeight,
                bodyWidth: entrys[m].querySelector(".entryBody").offsetWidth
            });
        }
    }

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/write_JSON_to_file", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(JSON.stringify(obj, null, 2));
}

newContainerButton.onclick = () => {
    var container = createContainer();

    appendNewEntry(container.containerEl, container.newEntryButtonEl)();
    main.appendChild(container.containerEl);

    container.newEntryButtonEl.scrollIntoView();
    container.dateEl.focus();
    container.dateEl.select();

    saveEntries();
};

function createJournal() {
    info.events.forEach(event => {
        let container = createContainer(event.date);

        event.entries.forEach(entry => {
            var new_Entry = appendNewEntry(container.containerEl, container.newEntryButtonEl, {
                subjectText: entry.subj,
                bodyText: entry.body,
                bodyHeight: entry.bodyHeight,
                bodyWidth: entry.bodyWidth,
                subjHeight: entry.subjHeight,
                subjWidth: entry.subjWidth
            });
        });

        main.appendChild(container.containerEl);
    });
}
createJournal();
//https://jsbin.com/nemizovise/edit?html,css,js,output

window.addEventListener("beforeunload", function(e) {
    (e || window.event).returnValue = false;

    return false;
});
