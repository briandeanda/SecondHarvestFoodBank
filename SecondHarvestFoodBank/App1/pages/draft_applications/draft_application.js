// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
var listview;
var MyJSItemTemplate = WinJS.Utilities.markSupportedForProcessing(function MyJSItemTemplate(itemPromise) {
    return itemPromise.then(function (currentItem) {
        // Build ListView Item Container div 
        var result = document.createElement("div");
        result.className = "icon_template";

        // Build content body 
        var body = document.createElement("div");
        body.className = "person";

        // Display title 
        var title = document.createElement("h2");
        title.innerText = currentItem.data.name;
        body.appendChild(title);

        // Display text 
        var date = document.createElement("h3");
        date.innerText = currentItem.data.date_created;
        body.appendChild(date);

        var phoneNumber = document.createElement("h3");
        phoneNumber.innerText = currentItem.data.phone_number;
        body.appendChild(phoneNumber);
        var button = document.createElement("button");
        button.id = currentItem.data.name;
        button.value = currentItem.data.id;
        button.innerHTML = "Delete Record";
        button.addEventListener("click", function(evt){
            // console.log("Deleting record with ID: " + this.value);
            displayConfirmDialogue(this.value, this.id);
        });
        body.appendChild(button);

        //put the body into the ListView Item 
        result.appendChild(body);

        return result;
    });
});

(function () {
    "use strict";
    
    WinJS.UI.Pages.define("/pages/draft_applications/draft_application.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            listview = element.querySelector("#calculator_application_lv");
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
 
        }
    });
})();
function displayConfirmDialogue(id, name) {
    var msg = new Windows.UI.Popups.MessageDialog("Are you sure you would like to delete " + name + "'s record?");
    msg.commands.append(new Windows.UI.Popups.UICommand(
        "Delete", function () {
            listview.winControl.selection.getItems().then(function (items) {
                items.forEach(function (item) {
                    CalculatorApplications.deleteRecord(item);
                });
            });
        }));
    msg.commands.append(new Windows.UI.Popups.UICommand(
        "Cancel", function () {
            console.log("Deleting record");
        }));
    msg.defaultCommandIndex = 1;
    msg.cancelCommandIndex = 1;
    msg.showAsync();
}
