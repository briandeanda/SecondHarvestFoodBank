(function () {
    "use strict";
    var dataList = new WinJS.Binding.List();
    var groupedItems = dataList.createGrouped(
        function groupKeySelector(item) { return item.id; },
        function groupDataSelector(item) { return item; }
    );
    
    function getRecords() {

        var txn = SHFB.db.transaction("calfresh_applicants");
        txn.objectStore("calfresh_applicants").openCursor().onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                dataList.dataSource.insertAtEnd(null, cursor.value);
                cursor.continue();
            }
        }
    }
    function addRecord(record) {
        var txn = SHFB.db.transaction(["calfresh_applicants"], "readwrite");

        // Set the event callbacks for the transaction
        txn.onerror = function (evt) { console.log && console.log("Error writing data.", "sample", "error"); };
        txn.onabort = function (evt) { console.log && console.log("Writing of data aborted.", "sample", "error"); };

        // The oncomplete event handler is called asynchronously once all writes have completed; when that's done, we reset our pending write queue.
        txn.oncomplete = function () {
            console.log && console.log("Changes saved to database.", "sample", "status");
            dataList.dataSource.insertAtEnd(null, record);
        };
        var calfreshApplicationStore = txn.objectStore("calfresh_applicants");
        var request = calfreshApplicationStore.add(record);

    }
    function deleteRecord(listViewItem) {
        // Database key != ListView key
        var dbKey = listViewItem.data.id;
        var listViewKey = listViewItem.key;

        // Remove item from db and, if success, remove item from ListView
        var transaction = SHFB.db.transaction(["calfresh_applicants"], "readwrite");
        var deleteRequest = transaction.objectStore("calfresh_applicants").delete(dbKey);
        deleteRequest.onsuccess = function () {
            dataList.dataSource.remove(listViewKey);
        }
    }

    // Get a reference for an item, using the group key and item title as a
    // unique reference to the item that can be easily serialized.
    function getItemReference(item) {
        return [item.group.key, item.name];
    }

    // This function returns a WinJS.Binding.List containing only the items
    // that belong to the provided group.
    function getItemsFromGroup(group) {
        return dataList.createFiltered(function (item) { return item.id === group.id; });
    }

    // Get the unique group corresponding to the provided group key.
    function resolveGroupReference(key) {
        for (var i = 0; i < groupedItems.groups.length; i++) {
            if (groupedItems.groups.getAt(i).key === key) {
                return groupedItems.groups.getAt(i);
            }
        }
    }

    // Get a unique item from the provided string array, which should contain a
    // group key and an item title.
    function resolveItemReference(reference) {
        for (var i = 0; i < groupedItems.length; i++) {
            var item = groupedItems.getAt(i);
            if (item.group.key === reference[0] && item.title === reference[1]) {
                return item;
            }
        }
    }
    WinJS.Namespace.define("CalFreshApplications", {
        dataList: dataList,
        addRecord: addRecord,
        deleteRecord: deleteRecord,
        groups: groupedItems.groups,
        getItemReference: getItemReference,
        getItemsFromGroup: getItemsFromGroup,
        resolveGroupReference: resolveGroupReference,
        resolveItemReference: resolveItemReference,
        getRecords: getRecords
    });
})();