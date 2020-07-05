let xaxes_select = document.querySelector("#xaxes");
let yaxes_select = document.querySelector("#yaxes");
let xaxes_options = document.querySelectorAll("#xaxes option");
let yaxes_options = document.querySelectorAll("#yaxes option");
let chart_error = document.querySelector("#chart_error");
let chart_holder = document.querySelector("#chart_holder");
let used_charts = document.querySelector(".used_charts");
let add_button = document.querySelector(".add");
let x_arr_sorted, y_arr_sorted, year_arr_sorted, new_win, data = new Array(),
    years = new Array();
let headers = window.opener.document.querySelectorAll("#invisible_table3_header th");
let cells = window.opener.document.querySelectorAll("#table3_body td");
let layout = { showlegend: true };
let modal = document.querySelector(".modal");
let modal_body = document.querySelector(".modal_body");
let close_modal_btn = document.querySelector(".close_modal");
let overlay = document.querySelector(".overlay");
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
        div.innerHTML
        div.addEventListener("click", openModal);
        used_charts.append(div);
        createDeleteLisneners();
    }
})

function createDeleteLisneners() {
    let delete_chart_buttons = document.querySelectorAll(".delete_chart");
    for (let i = 0; i < delete_chart_buttons.length; i++) {
        delete_chart_buttons[i].onclick = function f() {
            used_charts.childNodes[i].removeEventListener("click", openModal);
            used_charts.childNodes[i].remove();
            refreshCharts(i);
            delete_chart_buttons[i].removeEventListener("click", f);
            createDeleteLisneners();
        }
    }
}

function createOpenModalListeners() {

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
        years.push(year_arr_sorted);
        newPlot();
        return true;
    } else {
        chart_error.innerHTML = "Недостаточно данных для построения";
        return false;
    }
}

function refreshCharts(i) {
    data.splice(i, 1);
    years.splice(i, 1);
    newPlot();
}

function arraysForChart(n1, n2) {
    let sel1_val = xaxes_options[n1].value;
    let sel2_val = yaxes_options[n2].value;
    let x_arr = new Array();
    let y_arr = new Array();
    let year_arr = new Array();
    cells = window.opener.document.querySelectorAll("#table3_body td");
    for (let i = 0; i < cells.length; i++) {
        let col = i % headers.length;
        if (col == sel1_val) {
            x_arr.push(cells[i].innerHTML);
        } else if (col == sel2_val) {
            y_arr.push(cells[i].innerHTML);
        } else if (col == 0) {
            year_arr.push(cells[i].innerHTML)
        } else {
            continue;
        }
        if (x_arr.length == y_arr.length && x_arr.length > 0) {
            let a = parseFloat(+(x_arr[x_arr.length - 1]));
            let b = parseFloat(+(y_arr[y_arr.length - 1]));
            if (x_arr[x_arr.length - 1] == "" || y_arr[y_arr.length - 1] == "" ||
                isNaN(a) || isNaN(b)) {
                x_arr.pop();
                y_arr.pop();
                year_arr.pop();
            }
        }
    }
    //сортировка по возрастанию х
    x_arr_sorted = x_arr.slice();
    y_arr_sorted = new Array();
    year_arr_sorted = new Array();
    x_arr_sorted.sort(function(a, b) { return a - b });
    for (let i = 0; i < x_arr.length; i++) {
        let old_index = x_arr.indexOf(x_arr_sorted[i]);
        y_arr_sorted.push(y_arr[old_index]);
        year_arr_sorted.push(year_arr[old_index]);
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

function openModal() {
    modal.classList.add("active");
    overlay.classList.add("active");
    let e = window.event;
    let div = e.currentTarget;
    let nodes = used_charts.childNodes;
    let i;
    for (i = 0; i < nodes.length; i++) {
        if (div == nodes[i]) {
            break;
        }
    }
    let chart_info = div.querySelector(".chart_info").innerHTML;
    let x_name = chart_info.split(" и ")[0];
    let y_name = chart_info.split(" и ")[1];
    let inner_html = "<table id=\"table_modal\" align=\"center\"><thead><tr><th></th>";
    if(x_name != "Год") {
        inner_html += "<td>Год</td>";
    }
    inner_html += "<td>" + x_name + "</td>" + "<td>" + y_name + "</td></tr></thead><tbody>";
    for(let k = 0; k < data[i].x.length; k++) {
        inner_html += "<tr><td><input type=\"checkbox\" checked></td>";
        if(x_name != "Год") {
            inner_html += "<td>" + years[i][k] + "</td>";
        }
        inner_html += "<td>" + data[i].x[k] + "</td>";
        inner_html += "<td>" + data[i].y[k] + "</td></tr>";
    }
    inner_html += "</tbody></table>";
    modal_body.innerHTML = inner_html;
}

function closeModal() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

close_modal_btn.onclick = function() {
    closeModal();
}

overlay.onclick = function() {
    closeModal();
}