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
    incomeTestPass = "no";
    WinJS.UI.Pages.define("/pages/calculator/calculator.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.

            $("#complete_button").click(storeData);

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
                    L = G - H - I - J - K;
                    $("#L").val(G - H - I - J - K);

                }
            });
            $(".M3_val").change(function () {
                var empty = $(this).parent().find(".M3_val").filter(function () {
                    return this.value === "";
                });
                if (empty.length) { }
                else {
                    $("#M3").val(M1 * (HH_b) / (HH_b + HH_c) + M2 * HH_b / (HH_a + HH_c));
                    M3 = (M1 * (HH_b) / (HH_b + HH_c) + M2 * HH_b / (HH_a + HH_c));
                    $("#N2").val(N2);
                    $("#O").val(M3 + N2);
                    O = (M3 + N2);
                    $("#P").val(0.5 * L);
                    P = (0.5 * L);
                    $("#Q").val(O - P);
                    Q = (O - P);
                    if (disabled_seniors == "no" && Q > 490) {
                        $("#R").val(490);
                        R = 490;
                    }
                    else {
                        $("#R").val(Q);
                        R = Q;
                    }

                    if (homeless == "yes") {
                        S = L;
                        $("#S").val(L);
                    } else {
                        S = L - R;
                        $("#S").val(L - R);
                    }

                    meetNetIncomeTest();

                    $("#T").val(S * 0.3);
                    T = (S * 0.3);
                    $("#U").val(Math.round(T));
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
                    $("#AB").val(AA / 30);
                    AB = AA / 30
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
        switch (HH_b) {
            case 1: $("#V").val(194);
                V = (194);
                break;
            case 2: $("#V").val(357);
                V = (357);
                break;
            case 3: $("#V").val(511);
                V = (511);
                break;
            case 4: $("#V").val(649);
                V = (649);
                break;
            case 5: $("#V").val(771);
                V = (711);
                break;
            case 6: $("#V").val(925);
                V = (925);
                break;
            case 7: $("#V").val(1022);
                V = (1022);
                break;
            case 8: $("#V").val(1169);
                V = (1169);
                break;
            default: var temp = HH_b - 8;
                var num = temp * 146;
                $("#V").val(1169 + num);
                V = (1169 + num);
                break;
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
    function storeData() {

    }
})();

