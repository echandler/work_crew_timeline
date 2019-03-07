import info from "../../inmateJournal.js";

var app = {
    model: {
        get: function(key) {
            var data = localStorage["model"] ? JSON.parse(localStorage["model"]) : {};
            return key ? data[key] : data;
        },
        update: function(key, value) {
            var data = localStorage["model"] ? JSON.parse(localStorage["model"]) : {};
            data[key] = value;
            localStorage["model"] = JSON.stringify(data);
        }
    },
    init: function() {
        var subject = null;
        var body = null;
        var state = app.model.get();
        var main = document.getElementById('main_content');
        var main_ul = main.querySelector('ul');
        var fragment = document.createDocumentFragment();

        main_ul.innerHTML = '';

        info.events.forEach(event => {

            var li = document.createElement("li");

            var section = document.createElement("section");
            section.className = "day";

            var date = document.createElement("h2");
            date.className = "date";
            date.innerText = event.date;

            var ul = document.createElement("ul");
            section.appendChild(date);
            section.appendChild(ul);

            li.appendChild(section);

            event.entries.forEach(entry => {
                var li = document.createElement("li");
                var article = document.createElement("article");
                article.className = "entry";
                var subject = document.createElement("h3");
                subject.className = "entry__subject";
                var body = document.createElement("div");
                body.className = "entry__body";

                subject.innerHTML = entry.subj;
                body.innerHTML = entry.body.split(/\n\s*\n/).map((p)=> "<p>" + p + "</p>").join('');

                state[subject.innerText]
                    ? (body.className = state[subject.innerText])
                    : (body.className += " entry__body--closed");
                
                li.appendChild(article);
                article.appendChild(subject);
                article.appendChild(body);

                ul.appendChild(li);
            });

            fragment.appendChild(li);
        });
        
        main_ul.appendChild(fragment);

        var entries = document.querySelectorAll(".entry");
        for (var n = 0; n < entries.length; n++) {
            subject = entries[n].querySelector(".entry__subject");
            body = entries[n].querySelector(".entry__body");

            subject.addEventListener(
                "click",
                (function(subject, body) {
                    return function(e) {
                        app.util.toggleCssClass(body, "entry__body--closed");
                        app.model.update(subject.innerText, body.className);
                    };
                })(subject, body)
            );

        }
    },

    util: {
        toggleCssClass: function(el, cssClass) {
            // For browsers that don't support classList.toggle().
            if (el.className.indexOf(cssClass) > -1) {
                el.className = el.className.replace(" " + cssClass, "");
            } else {
                el.className += " " + cssClass;
            }
        }
    }
};

app.init();
