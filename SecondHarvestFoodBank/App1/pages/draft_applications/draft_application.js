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
    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;
    var binding = WinJS.Binding;
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;
    var utils = WinJS.Utilities;
    // The selected item
    var post;


    WinJS.UI.Pages.define("/pages/draft_applications/draft_application.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        _items: null,
        _group: null,
        _itemSelectionIndex: -1,
        ready: function (element, options) {
            // TODO: Initialize the page here.
            listview = element.querySelector("#calculator_application_lv");
            this._group = (options && options.groupKey) ? CalculatorApplications.resolveGroupReference(options.groupKey) : CalculatorApplications.groups.getAt(0);
            this._items = CalculatorApplications.getItemsFromGroup(this._group);
            this._itemSelectionIndex = (options && "selectedIndex" in options) ? options.selectedIndex : -1;
            
            post = this._items.getAt(0);
            //element.querySelector("header[role=banner] .pagetitle").textContent = this._group.name;
            listview.winControl.onselectionchanged = this._selectionChanged.bind(this);
            this._updateVisibility();
            if (this._isSingleColumn()) {
                if (this._itemSelectionIndex >= 0) {
                    // For single-column detail view, load the article.
                    binding.processAll(element.querySelector(".articlesection"), this._items.getAt(this._itemSelectionIndex));
                }
            } else {
                if (nav.canGoBack && nav.history.backStack[nav.history.backStack.length - 1].location === "/pages/draft_applications/draft_application.html") {
                    // Clean up the backstack to handle a user snapping, navigating
                    // away, unsnapping, and then returning to this page.
                    nav.history.backStack.pop();
                }
                // If this page has a selectionIndex, make that selection
                // appear in the ListView.
                listview.winControl.selection.set(Math.max(this._itemSelectionIndex, 0));
            }
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
 
        },
        // This function checks if the list and details columns should be displayed
        // on separate pages instead of side-by-side.
        _isSingleColumn: function () {
            var viewState = Windows.UI.ViewManagement.ApplicationView.value;
            return (viewState === appViewState.snapped || viewState === appViewState.fullScreenPortrait);
        },

        _selectionChanged: function (args) {
            var listView = document.body.querySelector("#calculator_application_lv").winControl;
            var details;
            // By default, the selection is restriced to a single item.
            listView.selection.getItems().done(function updateDetails(items) {
                if (items.length > 0) {
                    this._itemSelectionIndex = items[0].index;
                    // Get the item selected by the user
                    post = this._items.getAt(this._itemSelectionIndex);

                    if (this._isSingleColumn()) {
                        // If snapped or portrait, navigate to a new page containing the
                        // selected item's details.
                        //nav.navigate("/pages/draft_applications/draft_application.html", { groupKey: this._group.id, selectedIndex: this._itemSelectionIndex });
                    } else {
                        // If fullscreen or filled, update the details column with new data.
                        details = document.querySelector(".articlesection");
                        document.body.querySelector("header[role=banner] .pagetitle").textContent = items[0].data.name
                        binding.processAll(details, items[0].data);
                        details.scrollTop = 0;
                    }
                }
            }.bind(this));

        },

        // This function toggles visibility of the two columns based on the current
        // view state and item selection.
        _updateVisibility: function () {
            var oldPrimary = document.querySelector(".primarycolumn");
            if (oldPrimary) {
                utils.removeClass(oldPrimary, "primarycolumn");
            }
            if (this._isSingleColumn()) {
                if (this._itemSelectionIndex >= 0) {
                    utils.addClass(document.querySelector(".articlesection"), "primarycolumn");
                    document.querySelector(".articlesection").focus();
                } else {
                    utils.addClass(document.querySelector(".itemlistsection"), "primarycolumn");
                    document.querySelector(".itemlist").focus();
                }
            } else {
                document.querySelector("#calculator_application_lv").focus();
            }
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
            console.log("Action Cancelled");
        }));
    msg.defaultCommandIndex = 1;
    msg.cancelCommandIndex = 1;
    msg.showAsync();
}
