(function () {
    "use strict";
    var dataList = new WinJS.Binding.List();
    var groupedItems = dataList.createGrouped(
        function groupKeySelector(item) { return item.id; },
        function groupDataSelector(item) { return item; }
    );

    var calFreshList = new WinJS.Binding.List();
    var calFreshGroupedItems = calFreshList.createGrouped(
        function groupKeySelector(item) { return item.id; },
        function groupDataSelector(item) { return item; }
    );


    var dbRequest = indexedDB.open("SHFBDB",2);

    // Add asynchronous callback functions
    dbRequest.onerror = function () { console.log && console.log("Error creating database.", "sample", "error"); };
    dbRequest.onsuccess = function (evt) { dbSuccess(evt); };
    dbRequest.onupgradeneeded = function (evt) { dbVersionUpgrade(evt); };
    dbRequest.onblocked = function () { console.log && console.log("Database create blocked.", "sample", "error"); };


    
    function deleteDB() {

        // Close and clear the handle to the database, held in the parent SdkSample namespace.
        if (SHFB.db) {
            SHFB.db.close();
        }
        SHFB.db = null;
        var dbRequest = window.indexedDB.deleteDatabase("SHFBDB");
        dbRequest.onerror = function () { console.log && console.log("Error deleting database.", "sample", "error"); };
        dbRequest.onsuccess = function () { console.log && console.log("Database deleted.", "sample", "status"); };
        dbRequest.onblocked = function () {
            console.log && console.log("Database delete blocked.", "sample", "error");
        };
    }

    // Whenever an IndexedDB is created, the version is set to "", but can be immediately upgraded by calling createDB. 
    function dbVersionUpgrade(evt) {

        // If the database was previously loaded, close it. 
        // Closing the database keeps it from becoming blocked for later delete operations.
        if (SHFB.db) {
            SHFB.db.close();
        }
        SHFB.db = evt.target.result;

        // Get the version update transaction handle, since we want to create the schema as part of the same transaction.
        var txn = evt.target.transaction;

        if (evt.oldVersion != 1) {
            var calculatorStore = SHFB.db.createObjectStore("calculator_applicants", { keyPath: "id", autoIncrement: true });
            calculatorStore.createIndex("name", "name", { unique: false });
            calculatorStore.createIndex("date_created", "date_created", { unique: false });
        }


        var applicationStore = SHFB.db.createObjectStore("calfresh_applicants", { keyPath: "id", autoIncrement: true });
        applicationStore.createIndex("name", "name", { unique: false });
        applicationStore.createIndex("ssid", "ssid", { unique: true });
        applicationStore.createIndex("date_created", "date_created", { unique: false });

        // Once the creation of the object stores is finished (they are created asynchronously), log success.
        txn.oncomplete = function () { console.log && console.log("Database schema created.", "sample", "status"); };
    }

    function dbSuccess(evt) {

        SHFB.db = evt.target.result;
        var txn = SHFB.db.transaction("calculator_applicants");
        txn.objectStore("calculator_applicants").openCursor().onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                dataList.dataSource.insertAtEnd(null, cursor.value);
                cursor.continue();
            }
        }
    }

    function addRecord(record) {
        var txn = SHFB.db.transaction(["calculator_applicants"], "readwrite");

        // Set the event callbacks for the transaction
        txn.onerror = function (evt) { console.log && console.log("Error writing data.", "sample", "error"); };
        txn.onabort = function (evt) { console.log && console.log("Writing of data aborted.", "sample", "error"); };

        // The oncomplete event handler is called asynchronously once all writes have completed; when that's done, we reset our pending write queue.
        txn.oncomplete = function () {
            console.log && console.log("Changes saved to database.", "sample", "status");
            dataList.dataSource.insertAtEnd(null, record);
        };
        var calculatorStore = txn.objectStore("calculator_applicants");
        var request = calculatorStore.add(record);

    }
    function addApplication(applicationData) {
        var txn = SHFB.db.transaction(["calfresh_applicants"], "readwrite");
        txn.onerror = function (evt) { console.log && console.log("Error writing data.", "sample", "error"); };
        txn.onabort = function (evt) { console.log && console.log("Writing of data aborted.", "sample", "error"); };

        // The oncomplete event handler is called asynchronously once all writes have completed; when that's done, we reset our pending write queue.
        txn.oncomplete = function () {
            console.log && console.log("Changes saved to database.", "sample", "status");
            dataList.dataSource.insertAtEnd(null, applicationData);
        };
        var applicationStore = txn.objectStore("calfresh_applicants");
        var request = applicationStore.add(applicationData);
    }
    function deleteRecord(listViewItem) {
        // Database key != ListView key
        var dbKey = listViewItem.data.id;
        var listViewKey = listViewItem.key;

        // Remove item from db and, if success, remove item from ListView
        var transaction = SHFB.db.transaction(["calculator_applicants"], "readwrite");
        var deleteRequest = transaction.objectStore("calculator_applicants").delete(dbKey);
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
    

    WinJS.Namespace.define("CalculatorApplications", {
        dataList: dataList,
        addRecord: addRecord,
        deleteRecord: deleteRecord,
        groups: groupedItems.groups,
        getItemReference: getItemReference,
        getItemsFromGroup: getItemsFromGroup,
        resolveGroupReference: resolveGroupReference,
        resolveItemReference: resolveItemReference,
        addApplication: addApplication
    });

})();
