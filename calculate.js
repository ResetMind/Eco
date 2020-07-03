let table_header = document.querySelector("#table3_header");
let invisible_table_header = document.querySelector("#invisible_table3_header");
invisible_table_header.innerHTML = table_header.innerHTML;
let table = document.querySelectorAll("#table3");
let content = document.querySelector(".content3");
let headers = document.querySelectorAll("#invisible_table3_header th");
let cells = document.querySelectorAll("#table3_body td");
let xaxes_select = document.querySelector("#xaxes");
let yaxes_select = document.querySelector("#yaxes");
let xaxes_options = document.querySelectorAll("#xaxes option");
let yaxes_options = document.querySelectorAll("#yaxes option");
let chart_error = document.querySelector("#chart_error");

function find() {
    chart_error.innerHTML = "";
    let year1 = search.year1.value;
    let year2 = search.year2.value;
    let culture = search.culture.value;
    let field = search.field.value;
    const request = new XMLHttpRequest();
    const url = "find.php?year1=" + year1 + "&year2=" + year2 + "&culture=" + culture + "&field=" + field;
    request.open("GET", url);
    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200) {
            let response = request.responseText;
            if (response.includes("tbody")) {
                table[2].innerHTML = response;
                cellOnFocus();
            } else {
                table[2].innerHTML = "<tbody><tr><td>Совпадений нет<td></tr></tbody>";
            }
        }
    });
    request.send();
}

function calc() {
    cells = document.querySelectorAll("#table3_body td");
    for (let i = 0; i < cells.length; i++) {
        let col = i % headers.length;
        if (col % 3 == 0 && col != 0) {
            if (cells[i - 2].innerHTML == "" || cells[i - 1].innerHTML == "") {
                continue;
            }
            let a = parseFloat(+(cells[i - 2].innerHTML));
            let b = parseFloat(+(cells[i - 1].innerHTML));
            if (isNaN(a) || isNaN(b)) {
                continue;
            }
            if (col == 3) {
                cells[i].innerHTML = x1(a, b).toFixed(3);
            } else if (col == 6) {
                cells[i].innerHTML = x2(a, b).toFixed(3);
            } else if (col == 9) {
                cells[i].innerHTML = x3(a, b).toFixed(3);
            } else if (col == 12) {
                cells[i].innerHTML = x4(a, b).toFixed(3);
            } else if (col == 15) {
                cells[i].innerHTML = x5(a, b).toFixed(3);
            } else if (col == 18) {
                cells[i].innerHTML = x6(a, b).toFixed(3);
            } else if (col == 21) {
                cells[i].innerHTML = x7(a, b).toFixed(3);
            } else if (col == 24) {
                cells[i].innerHTML = x8(a, b).toFixed(3);
            } else if (col == 27) {
                cells[i].innerHTML = x9(a, b).toFixed(3);
            } else if (col == 30) {
                cells[i].innerHTML = x10(a, b).toFixed(3);
            } else if (col == 33) {
                cells[i].innerHTML = x11(a, b).toFixed(3);
            } else if (col == 36) {
                cells[i].innerHTML = x12(a, b).toFixed(3);
            } else if (col == 39) {
                cells[i].innerHTML = x13(a, b).toFixed(3);
            } else if (col == 42) {
                cells[i].innerHTML = x14(a, b).toFixed(3);
            } else if (col == 45) {
                cells[i].innerHTML = x15(a, b).toFixed(3);
            } else if (col == 48) {
                cells[i].innerHTML = x16(a, b).toFixed(3);
            } else if (col == 51) {
                cells[i].innerHTML = x17(a, b).toFixed(3);
            } else if (col == 54) {
                cells[i].innerHTML = x18(a, b).toFixed(3);
            } else if (col == 57) {
                cells[i].innerHTML = x19(a, b).toFixed(3);
            } else if (col == 60) {
                cells[i].innerHTML = x20(a, b).toFixed(3);
            } else if (col == 63) {
                cells[i].innerHTML = x21(a, b).toFixed(3);
            } else if (col == 66) {
                cells[i].innerHTML = x22(a, b).toFixed(3);
            } else if (col == 69) {
                cells[i].innerHTML = x23(a, b).toFixed(3);
            } else if (col == 72) {
                cells[i].innerHTML = x24(a, b).toFixed(3);
            } else if (col == 75) {
                cells[i].innerHTML = x25(a, b).toFixed(3);
            } else if (col == 78) {
                cells[i].innerHTML = x26(a, b).toFixed(3);
            } else if (col == 81) {
                cells[i].innerHTML = x27(a, b).toFixed(3);
            } else if (col == 84) {
                cells[i].innerHTML = x28(a, b).toFixed(3);
            } else if (col == 87) {
                cells[i].innerHTML = x29(a, b).toFixed(3);
            } else if (col == 90) {
                cells[i].innerHTML = x30(a, b).toFixed(3);
            } else if (col == 93) {
                cells[i].innerHTML = x31(a, b).toFixed(3);
            } else if (col == 96) {
                cells[i].innerHTML = x32(a, b).toFixed(3);
            } else if (col == 99) {
                cells[i].innerHTML = x33(a, b).toFixed(3);
            } else if (col == 102) {
                cells[i].innerHTML = x34(a, b).toFixed(3);
            } else if (col == 105) {
                cells[i].innerHTML = x35(a, b).toFixed(3);
            } else if (col == 108) {
                cells[i].innerHTML = x36(a, b).toFixed(3);
            } else if (col == 111) {
                cells[i].innerHTML = x37(a, b).toFixed(3);
            } else if (col == 114) {
                cells[i].innerHTML = x38(a, b).toFixed(3);
            } else if (col == 117) {
                cells[i].innerHTML = x39(a, b).toFixed(3);
            }
        }
    }
}

function createChart() {
    let n1 = xaxes_select.selectedIndex;
    let sel1_val = xaxes_options[n1].value;
    let sel1_text = xaxes_options[n1].text;
    let n2 = yaxes_select.selectedIndex;
    let sel2_val = yaxes_options[n2].value;
    let sel2_text = yaxes_options[n2].text;
    let x_arr = new Array();
    let y_arr = new Array();
    for (let i = 0; i < cells.length; i++) {
        let col = i % headers.length;
        if (col == sel1_val) {
            x_arr.push(cells[i].innerHTML);
        } else if (col == sel2_val) {
            y_arr.push(cells[i].innerHTML);
        } else {
            continue;
        }
        if (x_arr.length == y_arr.length && x_arr.length > 0) {
            let a = parseFloat(+(x_arr[x_arr.length - 1]));
            let b = parseFloat(+(y_arr[y_arr.length - 1]));
            if (x_arr[x_arr.length - 1] == "" || y_arr[y_arr.length - 1] == "" ||
                isNaN(a) || isNaN(b)) {
                x_arr.pop();
                y_arr.pop()
            }
        }
    }
    x_arr.sort(compare);
    let x_arr2 = x_arr.slice();
    for(let i = 0; i < x_arr2.length; i++) {
        
    }
    if (x_arr.length > 1 && y_arr.length > 1) {
        let new_win = window.open("chart.html");
        new_win.onload = function() {
            let chart_holder = new_win.document.querySelector("#chart");
            let trace1 = {
                x: x_arr,
                y: y_arr,
                type: "scatter",
                mode: "lines+markers",
                name: sel1_text + " и " + sel2_text
            };
            let data = [trace1];
            let layout = {
                title: sel1_text + " и " + sel2_text,
                showlegend: true
            };
            Plotly.newPlot(chart_holder, data, layout, { scrollZoom: true });
        }
    } else {
        chart_error.innerHTML = "Недостаточно данных для построения";
    }
}

function compare(a, b) {
    if (a > b) return 1;
    if (a == b) return 0;
    if (a < b) return -1;
}

xaxes_select.addEventListener("change", function() {
    chart_error.innerHTML = "";
    let n1 = xaxes_select.selectedIndex;
    let n2 = yaxes_select.selectedIndex;
    if (n1 == n2) {
        if (n1 == 0) {
            yaxes_select.selectedIndex = 1;
        } else {
            yaxes_select.selectedIndex = n1 - 1;
        }
    }
})

yaxes_select.addEventListener("change", function() {
    chart_error.innerHTML = "";
    let n1 = yaxes_select.selectedIndex;
    let n2 = xaxes_select.selectedIndex;
    if (n1 == n2) {
        if (n1 == 0) {
            xaxes_select.selectedIndex = 1;
        } else {
            xaxes_select.selectedIndex = n1 - 1;
        }
    }
})

content.onscroll = function() {
    invisible_table_header.style.left = (-content.scrollLeft + 5) + "px";
};

function cellOnFocus() {
    cells = document.querySelectorAll("#table3_body td");
    for (let i = 0; i < cells.length; i++) {
        cells[i].onfocus = function(e) {
            let row = parseInt(i / headers.length);
            table[2].querySelector("tr:nth-child(" + (row + 1) + ")").style.background = "#2a2a2a";
        }
        cells[i].onblur = function(e) {
            let row = parseInt(i / headers.length);
            table[2].querySelector("tr:nth-child(" + (row + 1) + ")").style.background = "transparent";
        }
    }
}

function x1(so, st) {
    return so * 10 / st;
}

function x2(so, st10) {
    return so * 10 / st10;
}

function x3(so, st15) {
    return so * 10 / st15;
}

function x4(so, st20) {
    return so * 10 / (st20 + 20);
}

function x5(so2, st) {
    return so2 * 10 / st;
}

function x6(so2, st10) {
    return so2 * 10 / st10;
}

function x7(so2, st15) {
    return so2 * 10 / st15;
}

function x8(so2, st20) {
    return so2 * 10 / (st20 + 20);
}

function x9(sv, st) {
    return sv / st;
}

function x10(sv, st10) {
    return sv / st10;
}

function x11(sv, st15) {
    return sv / st15;
}

function x12(sv, st20) {
    return sv / (st20 + 20);
}

function x13(sv40, st) {
    return sv40 / st;
}

function x14(sv45, st) {
    return sv45 / st;
}

function x15(sv50, st) {
    return sv50 / st;
}

function x16(sv40, st10) {
    return sv40 / st10;
}

function x17(sv40, st15) {
    return sv40 / st15;
}

function x18(sv40, st20) {
    return sv40 / (st20 + 20);
}

function x19(sv45, st10) {
    return sv45 / st10;
}

function x20(sv45, st15) {
    return sv45 / st15;
}

function x21(sv45, st20) {
    return sv45 / (st20 + 20);
}

function x22(sv50, st10) {
    return sv50 / st10;
}

function x23(sv50, st15) {
    return sv50 / st15;
}

function x24(sv50, st20) {
    return sv50 / (st20 + 20);
}

function x25(chdo, chdt10) {
    return chdo / chdt10;
}

function x26(chdo, chdt15) {
    return chdo / chdt15;
}

function x27(chdo, chdt20) {
    return chdo / (chdt20 + 1);
}

function x28(chdo2, chdt10) {
    return chdo2 / chdt10;
}

function x29(chdo2, chdt15) {
    return chdo2 / chdt15;
}

function x30(chdo2, chdt20) {
    return chdo2 / (chdt20 + 1);
}

function x31(chdv40, chdt10) {
    return chdv40 / chdt10;
}

function x32(chdv40, chdt15) {
    return chdv40 / chdt15;
}

function x33(chdv40, chdt20) {
    return chdv40 / (chdt20 + 1);
}

function x34(chdv45, chdt10) {
    return chdv45 / chdt10;
}

function x35(chdv45, chdt15) {
    return chdv45 / chdt15;
}

function x36(chdv45, chdt20) {
    return chdv45 / (chdt20 + 1);
}

function x37(chdv50, chdt10) {
    return chdv50 / chdt10;
}

function x38(chdv50, chdt15) {
    return chdv50 / chdt15;
}

function x39(chdv50, chdt20) {
    return chdv50 / (chdt20 + 1);
}