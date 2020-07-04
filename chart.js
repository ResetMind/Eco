let xaxes_select = document.querySelector("#xaxes");
let yaxes_select = document.querySelector("#yaxes");
let xaxes_options = document.querySelectorAll("#xaxes option");
let yaxes_options = document.querySelectorAll("#yaxes option");
let chart_error = document.querySelector("#chart_error");
let chart_holder = document.querySelector("#chart_holder");
let used_charts = document.querySelector(".used_charts");
let add_button = document.querySelector(".add");
let x_arr_sorted, y_arr_sorted, new_win, data = new Array();
let headers = window.opener.document.querySelectorAll("#invisible_table3_header th");
let cells = window.opener.document.querySelectorAll("#table3_body td");
let layout = { showlegend: true };
newPlot();

add_button.addEventListener("click", function() {
    let used_chart = document.querySelectorAll(".used_chart .chart_info");
    let n1 = xaxes_select.selectedIndex;
    let n2 = yaxes_select.selectedIndex;
    let sel1_text = xaxes_options[n1].text;
    let sel2_text = yaxes_options[n2].text;
    let chart_name = sel1_text + " и " + sel2_text;
    for (let i = 0; i < used_chart.length; i++) {
        if (used_chart[i].innerHTML == chart_name) {
            chart_error.innerHTML = "Данный график уже построен. Выберите другие параметры."
            return;
        }
    }
    arraysForChart(n1, n2);
    if (addChart(chart_name)) {
        let div = document.createElement("div");
        div.className = "used_chart";
        div.innerHTML = "<span class=\"chart_info\">" + chart_name + "</span><span class=\"delete_chart\"> &times;</span>";
        used_charts.append(div);
        createDeleteLisneners();
    }
})

function createDeleteLisneners() {
    let delete_chart_buttons = document.querySelectorAll(".delete_chart");
    for (let i = 0; i < delete_chart_buttons.length; i++) {
        delete_chart_buttons[i].onclick = function f() {
            used_charts.childNodes[i].remove();
            console.log(data.length);
            refreshCharts(i);
            console.log(data.length);
            delete_chart_buttons[i].removeEventListener("click", f);
            createDeleteLisneners();
        }
    }
}

function addChart(chart_name) {
    if (x_arr_sorted.length > 1 && y_arr_sorted.length > 1) {
        chart_error.innerHTML = "";
        let trace1 = {
            x: x_arr_sorted,
            y: y_arr_sorted,
            type: "scatter",
            mode: "lines+markers",
            name: chart_name
        };
        data.push(trace1);
        newPlot();
        return true;
    } else {
        chart_error.innerHTML = "Недостаточно данных для построения";
        return false;
    }
}

function refreshCharts(i) {
    data.splice(i, 1);
    newPlot();
}

function arraysForChart(n1, n2) {
    let sel1_val = xaxes_options[n1].value;
    let sel2_val = yaxes_options[n2].value;
    let x_arr = new Array();
    let y_arr = new Array();
    cells = window.opener.document.querySelectorAll("#table3_body td");
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
    //сортировка по возрастанию х
    x_arr_sorted = x_arr.slice();
    y_arr_sorted = new Array();
    x_arr_sorted.sort(function(a, b) { return a - b });
    for (let i = 0; i < x_arr.length; i++) {
        let old_index = x_arr.indexOf(x_arr_sorted[i]);
        y_arr_sorted.push(y_arr[old_index]);
        x_arr[old_index] = null;
    }
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

function newPlot() {
    Plotly.newPlot(chart_holder, data, layout, { scrollZoom: true, responsive: true });
}