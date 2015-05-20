// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    var firstName, middleName, lastName, ssn, dob, maidenName, homeStreetAddress, homeCity,
        homeZip, homeState, mailingAddress, mailingCity, mailingState, mailingZip;
    "use strict";
    WinJS.UI.Pages.define("/pages/new_application/new_application.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            $("#mailingAddressCB").change(function (event) {
                if (event.target.checked) {
                    //show mailing address fields
                    $(".mailing_address").css("display", "none");
                    homeStreetAddress = $("input[name = 'street']").val();
                    homeCity = $("input[name = 'city']").val();
                    homeState = $("input[name = 'state']").val();
                    homeZip = $("input[name = 'zipCode']").val();
                    mailingAddress = homeStreetAddress;
                    mailingCity = homeCity;
                    mailingState = homeState;
                    mailingZip = homeZip;


                } else {
                    //dont show mailing address fields
                    $(".mailing_address").slideToggle("slow");
                    mailingAddress = "";
                    mailingCity = "";
                    mailingState = "";
                    mailingZip = "";
                }
            });
            $(" input:radio[name='question_8_others']").change(function (event) {
                if (event.target.value == "yes") {
                    $("#question_8_other").slideToggle("slow");
                    $("#question_8_other").css("background","yellow");
                    //$(".question_nine").css("display", "block");

                } else {
                    $("#question_8_other").css("display", "none");
                }
            });
            $("input:radio[name='question_9_radio']").change(function (event) {
                //console.log("Radio clicked" + event.target.value);
                if (event.target.value == "yes") {
                    $(".question_nine").slideToggle("slow");
                    //$(".question_nine").css("display", "block");
                    $(".question_nine").css("background", "yellow");
                    
                } else {
                    $(".question_nine").css("display", "none");
                }
            });
            $("#asian_checkbox").change(function (event) {
                if (event.target.checked) {
                    $(".asian_row").slideToggle("slow");
                    $(".asian_row").css("background", "yellow");
                } else {
                    $(".asian_row").css("display", "none");
                }
            });
            $("#hawaiian_pi_checkbox").change(function (event) {
                if (event.target.checked) {
                    $(".hawaiian_pi").slideToggle("slow");
                    $(".hawaiian_pi").css("background", "yellow");
                } else {
                    $(".hawaiian_pi").css("display", "none");
                }

            });
            $("input:radio[name='pregnant']").change(function (event) {
                if (event.target.value == "yes") {
                    $(".pregnant_condition").slideToggle("slow");
                    $(".pregnant_condition").css("background", "yellow");
                } else {
                    $(".pregnant_condition").css("display", "none");
                }
            });
            $("input:radio[name='personal_emergency_radio']").change(function (event) {
                if (event.target.value == "yes") {
                    $(".personal_emergency_rows").slideToggle("slow");
                    $(".personal_emergency_rows").css("background", "yellow");
                } else {
                    $(".personal_emergency_rows").css("display", "none");
                }
            });
            $("#otherEmergency").change(function (event) {
                if (event.target.checked) {
                    $("#persanal_emergency_explain").slideToggle("slow");
                    $("#persanal_emergency_explain").css("background", "yellow");

                } else {
                    $("#persanal_emergency_explain").css("display", "none");
                }
            });
            $("#language_other_check").change(function (event) {
                if (event.target.checked) {
                    $("#other_lang_field").slideToggle("slow");
                    $("#other_lang_field").css("background", "yellow");
                } else {
                    $("#other_lang_field").css("display", "none");
                }
            });
            $("#form_submit").click(function (event) {
                //collect data
                // console.log("Clicked");
                var msg = new Windows.UI.Popups.MessageDialog("Are you sure you would like to save " + "" + " record");
                msg.commands.append(new Windows.UI.Popups.UICommand("Continue", addRecord));
                msg.commands.append(new Windows.UI.Popups.UICommand("Cancel", function () {
                    console.log("Action cancelled");
                }));
                msg.defaultCommandIndex = 0;
                msg.cancelCommandIndex = 1;
                msg.showAsync();
            });
            $(".liquid_resources").change(function (event) {
                console.log(this);
            });
            function addRecord() {
                console.log("Record Added");
                //$("input:checkbox[name=type]:checked").each(function () {
                //    selected.push($(this).val());
                //});
                //WinJS.Navigation.back(1);

            }
            // TODO: Initialize the page here.
            /*
            $("#name").change(function () {
                name = $("input[name = 'Name']").val();
            });
            $("#ssn").change(function () {
                ssn = $("input[name = 'ssn']").val();
            });
            $("#dob").change(function () {
                dob = $("input[name = 'dob']").val();
            });
            $("#maidenName").change(function () {
                maidenName = $("input[name = 'maidenName']").val();
            });
            $("#street").change(function () {
                street = $("input[name = 'street']").val();
            });
            $("#city").change(function () {
                city = $("input[name = 'city']").val();
            });
            $("#state").change(function () {
                state = $("input[name = 'state']").val();
            });
            $("#zipCode").change(function () {
                zipCode = $("input[name = 'zipCode']").val();
            });
            $("#mStreet").change(function () {
                mStreet = $("input[name = 'mStreet']").val();
            });
            $("#mCity").change(function () {
                mCity = $("input[name = 'mCity']").val();
            });
            $("#mState").change(function () {
                mState = $("input[name = 'mState']").val();
            });
            $("#mZipCode").change(function () {
                mZipCode = $("input[name = 'mZipCode']").val();
            });
            $("#home").change(function () {
                home = $("input[name = 'home']").val();
            });
            $("#work").change(function () {
                work = $("input[name = 'work']").val();
            });
            $("#message").change(function () {
                message = $("input[name = 'message']").val();
            });

            permAddress = $("input[name = 'permAddress']:checked").val();

            
			noHome = $("input[name = 'noHome']:checked").val();
            if ($('#noHome').is(":checked")) {
                noHome = $('#noHome').val();
				}
			
			$("#explainPerm").change(function(){
				explain = $("input[name = 'explainPerm']").val();
			})	
				
			cashAid = $("input[name = 'cashAid']:checked").val();	
			mediCal = $("input[name = 'mediCal']:checked").val();	
			foodStamps = $("input[name = 'foodStamps']:checked").val();
			cms = $("input[name = 'cms']:checked").val();	
			otherPrograms = $("input[name = 'otherPrograms']:checked").val();		
			
				
			$("#otherMessage").change(function () {
                otherMessage = $("input[name = 'otherMessage']").val();
            });	
            
            nonCash = $("input[name = 'nonCash']:checked").val();

			$("#nUsed").change(function () {
                nUsed = $("input[name = 'nUsed']").val();
            });		
            
            $("#aidBenefit").change(function () {
                nUsed = $("input[name = 'aidBenefit']").val();
            });	
            
            $("#dReceived").change(function () {
                nUsed = $("input[name = 'dReceived']").val();
            });
            
            $("#counStatCount").change(function () {
                counStatCount = $("input[name = 'counStatCount']").val();
            });
            
            hispanic = $("input[name = 'hispanic']:checked").val();
            
            amerIndian = $("input[name = 'amerIndian']:checked").val();

			asian = $("input[name = 'asian']:checked").val();

			filipino = $("input[name = 'filipino']:checked").val();

			cambodian = $("input[name = 'cambodian']:checked").val();

			chinese = $("input[name = 'chinese']:checked").val();

			laotian = $("input[name = 'laotian']:checked").val();

			japanese = $("input[name = 'japanese']:checked").val();

			korean = $("input[name = 'korean']:checked").val();

			vietnamese = $("input[name = 'vietnamese']:checked").val();

			asianIndian = $("input[name = 'asianIndian']:checked").val();
            
            $("#otherAsian").change(function () {
                otherAsian = $("input[name = 'otherAsian']").val();
            });
            
            nativeHawaiian = $("input[name = 'nativeHawaiian']:checked").val();

			natHawaiian = $("input[name = 'natHawaiian']:checked").val();

			guamanian = $("input[name = 'guamanian']:checked").val();

			samoan = $("input[name = 'samoan']:checked").val();

            
            $("#otherHawaiian").change(function () {
                otherAsian = $("input[name = 'otherHawaiian']").val();
            });

          	engLanguage = $("input[name = 'engLanguage']:checked").val();

			vietLanguage = $("input[name = 'vietLanguage']:checked").val();

			spanLanguage = $("input[name = 'spanLanguage']:checked").val();

			laoLanguage = $("input[name = 'laoLanguage']:checked").val();

			russLanguage = $("input[name = 'russLanguage']:checked").val();

			amerSignLanguage = $("input[name = 'amerSignLanguage']:checked").val();

			cantLanguage = $("input[name = 'cantLanguage']:checked").val();

			cambLanguage = $("input[name = 'cambLanguage']:checked").val();

			tagLanguage = $("input[name = 'tagLanguage']:checked").val();

			$("#otherLanguage").change(function () {
			                otherLanguage = $("input[name = 'otherLanguage']").val();
			            });

            migrant = $("input[name = 'migrant']:checked").val();

            pregnant = $("input[name = 'pregnant']:checked").val();

            presumptive = $("input[name = 'presumptive']:checked").val();

			emergencyYes = $("input[name = 'emergencyYes']:checked").val();


			imMedNeed = $("input[name = 'imMedNeed']:checked").val();

			elderAbuse = $("input[name = 'elderAbuse']:checked").val();

			pregnancy = $("input[name = 'pregnancy']:checked").val();

			childAbuse = $("input[name = 'childAbuse']:checked").val();

			domAbuse = $("input[name = 'domAbuse']:checked").val();

			otherEmergency = $("input[name = 'otherEmergency']:checked").val();

			$("#eExplain").change(function () {
				eExplain = $("input[name = 'eExplain']").val();
				});

			cash = $("input[name = 'cash']:checked").val();

			$("#cashText").change(function () {
				cashText = $("input[name = 'cashText']").val();
				});

			check = $("input[name = 'check']:checked").val();
			
			$("#checkText").change(function () {
				checkText = $("input[name = 'checkText']").val();
				});

			trust = $("input[name = 'trust']:checked").val();
			
			$("#trustText").change(function () {
				trustText = $("input[name = 'trustText']").val();
				});

			liquidOther = $("input[name = 'liquidOther']:checked").val();

			$("#liquidText").change(function () {
				trustText = $("input[name = 'liquidText']").val();
				});

				$("#dateIncome1").change(function () {
				dateIncome1 = $("input[name = 'dateIncome1']").val();
				});
				
				$("#amountIncome1").change(function () {
				amountIncome1 = $("input[name = 'amountIncome1']").val();
				});
				
				$("#dateIncome2").change(function () {
				dateIncome2 = $("input[name = 'dateIncome2']").val();
				});
				
				$("#amountIncome2").change(function () {
				amountIncome2 = $("input[name = 'amountIncome2']").val();
				});
				
				$("#dateIncome3").change(function () {
				dateIncome3 = $("input[name = 'dateIncome3']").val();
				});
				
				$("#amountIncome3").change(function () {
				amountIncome3 = $("input[name = 'amountIncome3']").val();
				});
				
				$("#dateIncome4").change(function () {
				dateIncome4 = $("input[name = 'dateIncome4']").val();
				});
				
				$("#amountIncome4").change(function () {
				amountIncome4 = $("input[name = 'amountIncome4']").val();
				});
				

				$("#rentMortgage").change(function () {
				rentMortgage = $("input[name = 'rentMortgage']").val();
				});
				
				$("#utilitiesText").change(function () {
				utilitiesText = $("input[name = 'utilitiesText']").val();
				});
		
				
			eviction = $("input[name = 'eviction']:checked").val();

			utilities = $("input[name = 'utilities']:checked").val();

			food = $("input[name = 'food']:checked").val();

			clothing = $("input[name = 'clothing']:checked").val();

			transportation = $("input[name = 'transportation']:checked").val();*/
				
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
