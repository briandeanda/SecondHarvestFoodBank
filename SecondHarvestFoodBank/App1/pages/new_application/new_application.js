// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
    var name = '', ssn = '', dob = '', maidenName = '', street = '', 
city = '', state = '', zipCode = '', mStreet = '', mCity = '', 
mState = '', mZipCode = '', home = '', work = '', message = '', 
permAddress = 'no', explain = '', noHome = '', cashAid = 'no', mediCal = 'no', 
foodStamps = 'no', cams = 'no', otherPrograms = 'no', 
otherMessage = '', nonCash = 'no', nUsed = '', aidBenefit = '', 
dReceived = '', counStatCount = '', hispanic = 'no', 
amerIndian = '', asian = '', filipino = '', cambodian = '', 
chinese = '', laotian = '', japanese = '', korean = '', 
vietnamese = '', asianIndian = '', otherAsian = '', 
nativeHawaiian = '', natHawaiian = '', guamanian = '', samoan = '',
otherHawaiian = '', engLanguage = '', vietLanguage = '', 
spanLanguage = '', laoLanguage = '', russLanguage = '', 
tagLanguage = '', amerSignLanguage = '', cantLanguage = '', 
cambLanguage = '', otherLanguage = '', migrant = 'no',
pregnant = 'no', presumptive = 'no', emergencyYes = '', 
imMedNeed = '', elderAbuse = '', pregnancy = '', childAbuse = '', 
domAbuse = '', otherEmergency = '', eExplain = '', cash = '', 
cashText = '', check = '', checkText = '', trust = '', 
trustText = '', liquidOther = '', liquidText = '', 
dateIncome1 = '', amountIncome1 = '', dateIncome2 = '', 
amountIncome2 = '', dateIncome3 = '', amountIncome3 = '', 
dateIncome4 = '', amountIncome4 = '', rentMortgage = '', 
utilitiesText = '', eviction = 'no', utilities = 'no', food = 'no',
clothing = 'no', transportation = 'no';
    WinJS.UI.Pages.define("/pages/new_application.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            $("#name").change(function () {
                name = $("#name").val();
            });
            $("#ssn").change(function () {
                ssn = $("#ssn").val();
            });
            $("#dob").change(function () {
                dob = $("#dob").val();
            });
            $("#maidenName").change(function () {
                maidenName = $("#maidenName").val();
            });
            $("#street").change(function () {
                street = $("#street").val();
            });
            $("#city").change(function () {
                city = $("#city").val();
            });
            $("#state").change(function () {
                state = $("#state").val();
            });
            $("#zipCode").change(function () {
                zipCode = $("#zipCode").val();
            });
            $("#mStreet").change(function () {
                mStreet = $("#mStreet").val();
            });
            $("#mCity").change(function () {
                mCity = $("#mCity").val();
            });
            $("#mState").change(function () {
                mState = $("#mState").val();
            });
            $("#mZipCode").change(function () {
                mZipCode = $("#mZipCode").val();
            });
            $("#home").change(function () {
                home = $("#home").val();
            });
            $("#work").change(function () {
                work = $("#work").val();
            });
            $("#message").change(function () {
                message = $("#message").val();
            });

            permAddress = $("input[name = 'permAddress']:checked").val();

            if ($('#noHome').is(":checked")) {
                noHOme = $('#noHome').val();
            }


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
