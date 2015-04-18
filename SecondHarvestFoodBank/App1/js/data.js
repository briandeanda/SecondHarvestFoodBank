(function () {
    "use strict";
    var dataList = new WinJS.Binding.List();


    var newCreate = false;

    var dbRequest = indexedDB.open("SHFBDB", 1);

    // Add asynchronous callback functions
    dbRequest.onerror = function () { console.log && console.log("Error creating database.", "sample", "error"); };
    dbRequest.onsuccess = function (evt) { dbSuccess(evt); };
    dbRequest.onupgradeneeded = function (evt) { dbVersionUpgrade(evt); };
    dbRequest.onblocked = function () { console.log && console.log("Database create blocked.", "sample", "error"); };

    // Reset the flag that indicates whether this is a new creation request. 
    // Assume that the database was previously created.
    newCreate = false;

    
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

        // Create the books object store, with an index on the book title. Note that we set the returned object store to a variable
        // in order to make further calls (index creation) on that object store.
        var calculatorStore = SHFB.db.createObjectStore("calculator_applicants", { keyPath: "id", autoIncrement: true });
        calculatorStore.createIndex("name", "name", { unique: false });
        calculatorStore.createIndex("date_create", "date_created", { unique: false });

        // Once the creation of the object stores is finished (they are created asynchronously), log success.
        txn.oncomplete = function () { console.log && console.log("Database schema created.", "sample", "status"); };
        newCreate = true;
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
        if (!newCreate) {
            // Close this additional database request
            //var db = evt.target.result;
           // db.close();

            //console.log && console.log("Database schema already exists.", "sample", "error");
            //return;
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

    WinJS.Namespace.define("CalculatorApplications", {
        dataList: dataList,
        addRecord: addRecord,
        deleteRecord: deleteRecord
    });

})();
