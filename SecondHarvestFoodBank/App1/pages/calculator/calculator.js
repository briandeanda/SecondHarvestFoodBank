// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
    var HH_a = 0, HH_b = 0, HH_c = 0,
    A1_a = 0, A1_b = 0, A1 = 0,
    A2_a = 0, A2_b = 0, A2 = 0,
    B = 0, C = 0, D = 0, E = 0, F = 0, G = 0,
    H = 0, I = 0, J = 0, J2 = 0, K = 0, L = 0,
    M1 = 0, M2 = 0, M3 = 0, N2 = 373, O = 0, P = 0,
    Q = 0, R = 0, S = 0, T = 0, U = 0, V = 0, W = 0,
    X = 0, Y = 0, Z = 0, monthDays = 0, DOM = 0, AA = 0,
    AB = 0, AC = 0, AD = 0, ADr = 0, firstMonth = 0, IRT = 0,
    homeless = "no", disabled_seniors = "no", MeetNetIncomeTest = "no",
    incomeTestPass = "no", firstName = "", lastName = "", phoneNumber = "";
    WinJS.UI.Pages.define("/pages/calculator/calculator.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.

            $("#complete_button").click(displayConfirmDialogue);

            $("#HH_a").change(function () {
                HH_a = $("#HH_a").val();
            });
            $("#HH_b").change(function () {
                HH_b = $("#HH_b").val();
                if (HH_b >= 1 && HH_b <= 3) {
                    $("#H").val(155);
                    H = 155;
                }
                else if (HH_b == 4) {
                    $("#H").val(165);
                    H = 165;
                }
                else if (HH_b == 5) {
                    $("#H").val(193);
                    H = 193;
                }
                else {
                    $("#H").val(221);
                    H = 221;
                }
            });
            $("#HH_c").change(function () {
                HH_c = $("#HH_c").val();
            });
            $("#monthDays").change(function () {
                monthDays = $("#monthDays").val();
            });
            $("#DOM").change(function () {
                DOM = $("#DOM").val();
            });
            $("#I").change(function () {
                I = $("#I").val();
            });
            $("#A1_a").change(function () {
                A1_a = $("#A1_a").val();
            });
            $("#A1_b").change(function () {
                A1_b = $("#A1_b").val();
            });
            $("#A2_a").change(function () {
                A2_a = $("#A2_a").val();
            });
            $("#A2_b").change(function () {
                A2_b = $("#A2_b").val();
            });
            $("#B").change(function () {
                B = $("#B").val();
            });
            $("#M1").change(function () {
                M1 = $("#M1").val();
            });
            $("#M2").change(function () {
                M2 = $("#M2").val();
            });
            $("#disabled_seniors_yes").change(function () {
                disabled_seniors = $("#disabled_seniors_yes").val();
                if (J == 0) {
                    $("#J2").val(0);
                    J2 = 0;
                }
                else {
                    $("#J2").val(J - 35);
                    J2 = J - 35;
                }
            });
            $("#disabled_seniors_no").change(function () {
                disabled_seniors = $("#disabled_seniors_no").val();
                $("#J2").val(0);
                J2 = 0;
            });
            $("#homeless_yes").change(function () {
                homeless = "yes";
                $("#K").val(143);
                K = 143;
            });
            $("#homeless_no").change(function () {
                homeless = "no";
                $("#K").val(0);
                K = 0;
            });
            $("#J").change(function () {
                J = $("#J").val();
                if (disabled_seniors == "yes") {
                    if (J == 0) {
                        J2 = 0;
                        $("#J2").val(0);
                    }
                    else {
                        J2 = J - 35;
                        $("#J2").val(J - 35);
                    }
                }
                else {
                    J2 = 0;
                    $("#J2").val(0);
                }
            });

            $(".L_val").change(function () {
                var empty = $(this).parent().find(".L_val").filter(function () {
                    return this.value === "";
                });
                if (empty.length) { }
                else {
                    L = G - H - I - J2 - K;
                    $("#L").val(G - H - I - J2 - K);

                }
            });
            $(".M3_val").change(function () {
                var empty = $(this).parent().find(".M3_val").filter(function () {
                    return this.value === "";
                });
                if (empty.length) { }
                else {
                    $("#M3").val(parseInt(M1) * parseInt(HH_b) / (parseInt(HH_b) + parseInt(HH_c)) + parseInt(M2) * parseInt(HH_b) / (parseInt(HH_a) + parseInt(HH_c)));
                    M3 = (parseInt(M1) * parseInt(HH_b) / (parseInt(HH_b) + parseInt(HH_c)) + parseInt(M2) * parseInt(HH_b) / (parseInt(HH_a) + parseInt(HH_c)));
                    $("#N2").val(N2);
                    $("#O").val((M3 + N2).toFixed(2));
                    O = (M3 + N2).toFixed(2);
                    $("#P").val(0.5 * L);
                    P = (0.5 * L);
                    $("#Q").val((O - P).toFixed(2));
                    Q = (O - P).toFixed(2);;
                    if (disabled_seniors == "no" && Q > 490) {
                        $("#R").val(490);
                        R = 490;
                    }
                    else {
                        $("#R").val(Q);
                        R = Q;
                    }

                    if (homeless == "yes") {
                        S = L.toFixed(2);
                        $("#S").val(L.toFixed(2));
                    } else {
                        S = (L - R).toFixed(2);
                        $("#S").val((L - R).toFixed(2));
                    }

                    meetNetIncomeTest();

                    $("#T").val(S * 0.3);
                    T = (S * 0.3);
                    $("#U").val(Math.ceil(T));
                    U = Math.round(T);

                    changeV();
                    changeU();
                    changeXY();
                    changeZ();


                }
            });
            $(".A_val").change(function () {
                var empty = $(this).parent().find(".1_val").filter(function () {
                    return this.value === "";
                });
                if (empty.length) { }
                else {
                    $("#AA").val(monthDays - DOM);
                    AA = (monthDays - DOM);
                    $("#AB").val((AA / 30).toFixed(2));
                    AB = (AA / 30).toFixed(2);
                    $("#AC").val(AB * Z);
                    AC = AB * Z
                    $("#AD").val(AC);
                    AD = AC
                    $("#ADr").val(Math.round(AC));
                    ADr = Math.round(AC);
                    $("#firstMonth").val(ADr);
                    firstMonth = ADr;
                }
            });
            $(".A1_val").change(function () {
                var empty = $(this).parent().find(".A1_val").filter(function () {
                    return this.value === "";
                });
                if (empty.length) { }
                else {

                   // console.log("HELLO")
                    $("#A1").val(Number(A1_a) + Number(A1_b * (HH_b / HH_a)));
                    A1 = Number(A1_a) + Number(A1_b * (HH_b / HH_a));
                    $("#D").val(A1);
                    D = A1;
                    $("#E").val(A1 * 0.2);
                    E = (A1 * 0.2);
                    $("#F").val(A1 - (A1 * 0.2));
                    F = (A1 - (A1 * 0.2));
                    changeIRT();
                }
            });
            $(".A2_val").change(function () {
                var empty = $(this).parent().find(".A2_val").filter(function () {
                    return this.value === "";
                });
                if (empty.length) { }
                else {
                    $("#A2").val(Number(A2_a) + Number(A2_b * (HH_b / HH_a)));
                    A2 = Number(A2_a) + Number(A2_b * (HH_b / HH_a));
                }
            });
            $(".C_val").change(function () {
                var empty = $(this).parent().find(".C_val").filter(function () {
                    return this.value === "";
                });
                if (empty.length) { }
                else {
                    $("#C").val(Number(A1 + A2) - Number(B));
                    C = (Number(A1 + A2) - Number(B));
                    $("#G").val((A2 + (A1 - (A1 * 0.2))) - B);
                    G = ((A2 + (A1 - (A1 * 0.2))) - B);
                }
            });
            $("#complete_button").click(function () {
                console.log("Clicked");
                //var objectStore = SHFB.db.transaction("calculator_applicant", "readwrite").objectStore("calculator_applicant");

            });

        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />
           

            // TODO: Respond to changes in layout.
        }
    });
    function changeZ() {
        if (HH_b == 1 || HH_b == 2) {
            $("#Z").val(Y);
            Z = Y;
        }
        else {
            $("#Z").val(X);
            Z = X;
        }

    }

    function changeIRT() {
        switch (HH_b) {
            case 0, 1: $("#IRT").val(1265);
                IRT = (1265);
                break;
            case 2: $("#IRT").val(1705);
                V = (1705);
                break;
            case 3: $("#IRT").val(2144);
                V = (2144);
                break;
            case 4: $("#IRT").val(2584);
                IRT = (2584);
                break;
            case 5: $("#IRT").val(3024);
                IRT = (3024);
                break;
            case 6: $("#IRT").val(3464);
                IRT = (3464);
                break;
            case 7: $("#IRT").val(3904);
                IRT = (3904);
                break;
            case 8: $("#IRT").val(4344);
                IRT = (4344);
                break;
            default: var temp = HH_b - 8;
                var num = temp * 440;
                $("#IRT").val(4344 + num);
                IRT = (4344 + num);
                break;
        }

    }

    function changeV() {
        if(HH_b == 1){
            $("#V").val(194);
            V = (194);
        }
        else if(HH_b == 2){
            $("#V").val(357);
            V = (357);
        }
        else if(HH_b == 3){
            $("#V").val(511);
            V = (511);
        }
        else if(HH_b == 4){
            $("#V").val(649);
            V = (649);
        }
        else if(HH_b == 5){
            $("#V").val(771);
            V = (711);
        }
        else if(HH_b == 6){
            $("#V").val(925);
            V = (925);
        }
        else if(HH_b == 7){
            $("#V").val(1022);
            V = (1022);
        }
        else if(HH_b == 8){
            $("#V").val(1169);
            V = (1169);
        }
        else{
            var temp = HH_b - 8;
            var num = temp * 146;
            $("#V").val(1169 + num);
            V = (1169 + num);
        }
    }

    function changeU() {

        if (U < 0) {
            $("#W").val(V);
            W = V;
        }
        else if (U > V) {
            $("#W").val(0);
            W = 0;
        }
        else if (U < V) {
            $("#W").val(V - U);
            W = V - U;
        }
    }

    function changeXY() {
        if (HH_b < 2) {
            $("#X").val(0);
            X = 0;
            if (MeetNetIncomeTest == "yes" && W < 16) {
                $("#Y").val(16);
                Y = 16;
            }
            else {
                $("#Y").val(W);
                Y = W;
            }

        }
        else {
            $("#Y").val(0);
            Y = 0;
            $("#X").val(W);
            X = W;
        }
    }

    function meetNetIncomeTest() {
        if ((S <= 973 && HH_b == 1) || (S <= 1311 && HH_b == 2) || (S <= 1650 && HH_b == 3) ||
           (S <= 1988 && HH_b == 4) || (S <= 2326 && HH_b == 5) || (S <= 2665 && HH_b == 6) ||
           (S <= 3003 && HH_b == 7) || (S <= 3341 && HH_b == 8) || (S <= (3341 + ((Q - 8) * 339)) && HH_b > 8)) {
            MeetNetIncomeTest = "yes";
        }
        else {
            MeetNetIncomeTest = "no";
        }
    }

    function passIncomeTest() {
        if ((C <= 1946 && HH_b == 1) || (C <= 2622 && HH_b == 2) || (C <= 3300 && HH_b == 3) ||
           (C <= 3976 && HH_b == 4) || (C <= 4652 && HH_b == 5) || (C <= 5330 && HH_b == 6) ||
           (C <= 6006 && HH_b == 7) || (C <= 6682 && HH_b == 8) || (C <= (6682 + ((HH_b - 8) * 678)) && HH_b > 8)) {
            incomeTestPass = "yes";
        }
        else if (disabled_seniors = "yes") {
            incomeTestPass = "yes";
        }
        else {
            incomeTestPass = "no";
        }
    }
    function displayConfirmDialogue() {
        firstName = $("#first_name").val();
        lastName = $("#last_name").val();
        phoneNumber = $("#phone_number").val();
        var name = firstName + " " + lastName;
        var msg = new Windows.UI.Popups.MessageDialog("Are you sure you would like to save " + name + "'s record?");
        msg.commands.append(new Windows.UI.Popups.UICommand(
            "Continue", storeData));
        msg.commands.append(new Windows.UI.Popups.UICommand(
            "Cancel", function () {
                console.log("Cancelling choice");
            }));
        msg.defaultCommandIndex = 1;
        msg.cancelCommandIndex = 1;
        msg.showAsync();
    }
    function getDate() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = mm + '/' + dd + '/' + yyyy;
        return today;
    }

    function storeData() {
        // If the database has not been opened, log an error.
        var record = {
            HH_a: "" + HH_a, HH_b: "" + HH_b, HH_c: "" + HH_c, A1_a: "" + A1_a, A1_b: "" + A1_b, A1: "" + A1,
            A2_a: "" + A2_a, A2_b: "" + A2_b, A2: "" + A2,
            B: "" + B, C: "" + C, D: "" + D, E: "" + E, F: "" + F, G: "" + G, H: "" + H, I: "" + I, J: "" + J,
            J2: "" + J2, K: "" + K, L: "" + L, M1: "" + M1, M2: "" + M2, M3: "" + M3, N2: "" + N2 , O: "" + O, P: "" + P,
            Q: "" + Q, R: "" + R, S: "" + S, T: "" + T, U: "" + U, V: "" + V, W: "" + W, X: "" + X, Y: "" + Y,
            Z: "" + Z, monthDays: "" + Z, DOM: "" + DOM, AA: "" + AA, AB: "" + AB, AC: "" + AC, AD: "" + AD,
            ADr: "" + ADr, firstMonth: "" + firstMonth, IRT: "" + IRT, homeless: "" + homeless,
            disabled_seniors: "" + disabled_seniors, MeetNetIncomeTest: "" + MeetNetIncomeTest, incomeTestPass: "" + incomeTestPass,
            name: firstName + " " + lastName, phone_number: phoneNumber, date_created: getDate()
        }
        CalculatorApplications.addRecord(record);
        WinJS.Navigation.back(1);


    }


})();

