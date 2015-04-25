(function () {
    "use strict";
    var dataList = new WinJS.Binding.List();
    var groupedItems = dataList.createGrouped(
        function groupKeySelector(item) { return item.id; },
        function groupDataSelector(item) { return item; }
    );

})();