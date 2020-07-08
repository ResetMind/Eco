var d3colors = Plotly.d3.scale.category10();
let xaxes_select = document.querySelector("#xaxes");
let yaxes_select = document.querySelector("#yaxes");
let xaxes_options = document.querySelectorAll("#xaxes option");
let yaxes_options = document.querySelectorAll("#yaxes option");
let chart_error = document.querySelector("#chart_error");
let chart_holder = document.querySelector("#chart_holder");
let used_charts = document.querySelector(".used_charts");
let add_button = document.querySelector(".add");
let x_arr_sorted, y_arr_sorted, year_arr_sorted, new_win, data = new Array(),
    data2 = new Array(),
    years = new Array(),
    div_index, chart_info, trend_index;
let headers = window.opener.document.querySelectorAll("#invisible_table3_header th");
let cells = window.opener.document.querySelectorAll("#table3_body td");
let layout = { showlegend: true };
let modal = document.querySelector(".modal");
let modal_body_left = document.querySelector(".modal_body_left");
let close_modal_btn = document.querySelector(".close_modal");
let overlay = document.querySelector(".overlay");
let checkboxes, checkall_checkbox, radios;
let trend_type_select = document.querySelector("#trend_type");
let trend_type_options = document.querySelectorAll("#trend_type option");
newPlot();
/*let a = [
    [0.38, -0.05, 0.01, 0.02, 0.07],
    [0.052, 0.595, 0, -0.04, 0.04],
    [0.03, 0, 0.478, -0.14, 0.08],
    [-0.06, 1.26, 0, 0.47, -0.02],
    [0.25, 0, 0.09, 0.01, 0.56]
];
let b = [0.75, -0.858, 3.16, -1.802, 2.91];
holeckiy(a, b);*/

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
            refreshChartsAfterDelete(i);
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
            connectgaps: true,
            name: chart_name
        };
        let trend_start = -1;
        for (k = 0; k < data.length; k++) {
            if (data[k].name.includes("тренд")) {
                trend_start = k;
                break;
            }
        }
        //данные-нетренды всегда должны быть все слева
        if (trend_start != -1) {
            data.splice(trend_start, 0, trace1);
        } else {
            data.push(trace1);
        }
        years.push(year_arr_sorted);
        newPlot();
        return true;
    } else {
        chart_error.innerHTML = "Недостаточно данных для построения";
        return false;
    }
}

function refreshChartsAfterDelete(i) {
    // на случай если удаляешь чарт, для которого построен тренд. Чтобы оба удалились
    let chart_name = data[i].name;
    for (let k = i + 1; k < data.length; k++) {
        if (data[k].name.includes(chart_name + " тренд")) {
            data.splice(k, 1);
            break;
        }
    }
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
    div_index = i;
    chart_info = div.querySelector(".chart_info").innerHTML;
    trend_index = findTrendIndex();
    let x_name = chart_info.split(" и ")[0];
    let y_name = chart_info.split(" и ")[1];
    let inner_html = "Используемые данные:<table id=\"table_modal_left\" align=\"center\"><thead><tr><th><input type=\"checkbox\" class=\"checkall_checkbox\"></th>";
    if (x_name != "Год" && y_name != "Год") {
        inner_html += "<th>Год</th>";
    }
    inner_html += "<th>" + x_name + "</th>" + "<th>" + y_name + "</th></tr></thead><tbody>";
    for (let k = 0; k < data[i].x.length; k++) {
        inner_html += "<tr><td><input type=\"checkbox\" class=\"td_checkbox\"></td>";
        if (x_name != "Год" && y_name != "Год") {
            inner_html += "<td>" + years[i][k] + "</td>";
        }
        inner_html += "<td>" + data[i].x[k] + "</td>";
        inner_html += "<td>" + data[i].y[k] + "</td></tr>";
    }
    inner_html += "</tbody></table>";
    modal_body_left.innerHTML = inner_html;
    checkboxes = modal_body_left.querySelectorAll("input[type=\"checkbox\"].td_checkbox");
    checkall_checkbox = modal_body_left.querySelector("input[type=\"checkbox\"].checkall_checkbox");
    let checked_count = 0;
    for (let k = 0; k < checkboxes.length; k++) {
        if (!data[i].x[k].includes("span")) {
            checkboxes[k].checked = true;
            checked_count++;
        } else {
            checkboxes[k].checked = false;
        }
        checkboxes[k].addEventListener("change", onCheckboxChange);
    }
    if (checked_count == checkboxes.length) {
        checkall_checkbox.checked = true;
    }
    checkall_checkbox.addEventListener("change", onCheckboxChange);
}

function onCheckboxChange() {
    let e = window.event;
    let checkbox = e.currentTarget;
    let checked_count = 0;
    if (checkbox != checkall_checkbox) {
        for (let k = 0; k < checkboxes.length; k++) {
            if (checkboxes[k].checked) {
                removeSpans(k, div_index);
                checked_count++;
            } else if (!data[div_index].x[k].includes("span")) {
                addSpans(k, div_index);
                checkall_checkbox.checked = false;
            }
        }
        if (trend_index != -1) {
            onTrendTypeChangeListener();
        }
    } else {
        if (checkall_checkbox.checked) {
            for (let k = 0; k < checkboxes.length; k++) {
                removeSpans(k, div_index);
                checkboxes[k].checked = true;
            }
            if (trend_index != -1) {
                onTrendTypeChangeListener();
            }
        } else {
            for (let k = 0; k < checkboxes.length; k++) {
                addSpans(k, div_index);
                checkboxes[k].checked = false;
            }
            if (trend_index != -1) {
                onTrendTypeChangeListener();
            }
        }
    }
    if (checked_count == checkboxes.length) {
        checkall_checkbox.checked = true;
    }
    newPlot();

    function removeSpans(k, index) {
        data[index].x[k] = data[index].x[k].replace("<span>", "");
        data[index].x[k] = data[index].x[k].replace("</span>", "");
    }

    function addSpans(k, index) {
        if (!data[index].x[k].includes("span")) {
            data[index].x[k] = "<span>" + data[index].x[k] + "</span>";
        }
    }
}

trend_type_select.addEventListener("change", onTrendTypeChangeListener);

function onTrendTypeChangeListener() {
    let n = trend_type_select.selectedIndex;
    let value = trend_type_options[n].value;
    trend_index = findTrendIndex();
    if (value == 0 && trend_index != -1) {
        // тут удаляем тренд выбранной линии если есть
        data.splice(trend_index, 1);
        trend_index = findTrendIndex();
        newPlot();
        console.log("TREND INDEX " + trend_index);
        console.log("DATA LENGTH " + data.length);
        return;
    }
    let x = new Array();
    let y = new Array();
    for (let k = 0; k < data[div_index].x.length; k++) {
        if (!data[div_index].x[k].includes("span")) {
            x.push(parseFloat(data[div_index].x[k]));
            y.push(parseFloat(data[div_index].y[k]));
        }
    }
    if (value == 1) {
        /*if (isItTheSameTrend("прямая")) {
            return;
        }*/
        if (x.length != 0) {
            y = linear(x, y);
        } else {
            x.push(null);
            y.push(null);
        }
        addTrendToChart(x, y);
        trend_index = findTrendIndex();
    }

    console.log("TREND INDEX " + trend_index);
    console.log("DATA LENGTH " + data.length);

    function addTrendToChart(x_arr, y_arr) {
        let trace1 = {
            x: x_arr,
            y: y_arr,
            type: "scatter",
            mode: "lines+markers",
            connectgaps: true,
            name: chart_info + " тренд (прямая)"
        };
        // если какой-то тренд уже есть, заменяем его на новый
        if (trend_index == -1) {
            data.push(trace1);
        } else {
            data[trend_index] = trace1;
        }
        newPlot();
    }

    function isItTheSameTrend(type) {
        if (trend_index != -1) {
            if (data[trend_index].name.includes(type)) {
                return true;
            }
        }
        return false;
    }
}

function findTrendIndex() {
    let index = -1;
    for (let k = div_index + 1; k < data.length; k++) {
        if (data[k].name.includes(chart_info)) {
            index = k;
        }
    }
    return index;
}

function closeModal() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    for (let k = 0; k < checkboxes.length; k++) {
        checkboxes[k].removeEventListener("change", onCheckboxChange);
    }
    checkall_checkbox.removeEventListener("change", onCheckboxChange);
}

close_modal_btn.onclick = function() {
    closeModal();
}

overlay.onclick = function() {
    closeModal();
}