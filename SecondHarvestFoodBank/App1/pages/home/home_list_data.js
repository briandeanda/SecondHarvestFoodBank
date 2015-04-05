(function () {
    "use strict";

    var dataArray = [
    { title: "CalFresh Calculator", text: "Follow this link to calculates a family's eligibility!", picture: "images/black.png", link:"/pages/calculator/calculator.html"},
    { title: "New CalFresh Application", text: "Follow this link to create a new application", picture: "images/logo.scale-100.png", link: "/pages/new_application/new_application.html" },
    { title: "Browse Completed Applications", text: "Click here to view completed applicaitons", picture: "images/black.png", link: "/pages/completed_applications/completed_applications.html" }];

    var dataList = new WinJS.Binding.List(dataArray);

    // Create a namespace to make the data publicly
    // accessible. 
    var publicMembers =
        {
            itemList: dataList
        };
    WinJS.Namespace.define("DataExample", publicMembers);

})();