let table1_header = document.querySelector("#table1_header");
let invisible_table1_header = document.querySelector("#invisible_table1_header");
invisible_table1_header.innerHTML = table1_header.innerHTML;
let headers = document.querySelectorAll("#invisible_table1_header th");
let cells = document.querySelectorAll("#table1_body td");
let table1 = document.querySelectorAll("#table1");
let add_span = document.querySelector(".add");
let new_tr_html = table1[2].querySelector("tbody").innerHTML;
let content1 = document.querySelector(".content1");
let content2 = document.querySelector(".content2");
const border_width = 1;
let isDrag = false;
cellOnFocus();
radioOnCheck();

function cellOnFocus() {
    for(let i = 0; i < cells.length; i++) {
        cells[i].onfocus = function(e) {
            let row = parseInt(i / headers.length);
            let col = i % headers.length;
            table1[2].querySelector("tr:nth-child(" + (row + 1) + ")").style.background = "#2a2a2a";
        }
        cells[i].onblur = function(e) {
            let row = parseInt(i / headers.length);
            let col = i % headers.length;
            table1[2].querySelector("tr:nth-child(" + (row + 1) + ")").style.background = "transparent";
        }
    }
}

add_span.onclick = function() {
    let new_tr = document.createElement("tr");
    new_tr.innerHTML = new_tr_html;
    table1[2].querySelector("tbody").appendChild(new_tr);
    table1 = document.querySelectorAll("#table1");
    cells = document.querySelectorAll("#table1_body td");
    cellOnFocus();
}

content1.onscroll = function(event) {
    invisible_table1_header.style.left = (-content1.scrollLeft + 5) + "px";
};

invisible_table1_header.onmousemove = function(e) {
    if (e.target.closest("#invisible_table1_header thead")) {
        let target = e.target.closest("#invisible_table1_header thead");
        let target_coords = target.getBoundingClientRect();
        let x_coord = e.clientX - target_coords.left;
        let column = isBorder(x_coord);
        if (column !== -1) {
            invisible_table1_header.style.cursor = "col-resize";
            invisible_table1_header.onmousedown = function(e) {
                isDrag = true;
                let start = e.clientX;
                let tbl_start_width = table1[0].getBoundingClientRect().width + 1;
                let col_start_width = headers[column].getBoundingClientRect().width - 10;
                document.body.onselectstart = function() {
                    return false;
                };
                document.onmousemove = function(e) {
                    document.body.style.cursor = "col-resize";
                    let new_col_width = col_start_width + (e.clientX - start);
                    if (new_col_width > 15) {
                        let new_tbl_width = tbl_start_width + (e.clientX - start);
                        table1[0].style.width = new_tbl_width + "px";
                        table1[2].style.width = new_tbl_width + "px";
                        headers[column].style.width = new_col_width + "px";
                        cells[column].style.width = new_col_width + "px";
                    }
                }
                document.onmouseup = function() {
                    document.onmousemove = null;
                    document.onmouseup = null;
                    document.body.onselectstart = null;
                    document.body.style.cursor = "auto";
                    isDrag = false;
                }
            }
        } else if (!isDrag) {
            invisible_table1_header.style.cursor = "auto";
            invisible_table1_header.onmousedown = null;
        }
    }
};

invisible_table1_header.ondragstart = function() {
    return false;
};

function isBorder(x) {
    headers = document.querySelectorAll("#invisible_table1_header th");
    let x_sum = 0;
    for (let i = 0; i < headers.length; i++) {
        x_sum += headers[i].getBoundingClientRect().width;
        if (x >= x_sum - border_width && x <= x_sum + border_width) {
            return i;
        }
    }
    return -1;
}

function radioOnCheck() {
    let radios = document.querySelectorAll("input[type=\"radio\"]")
    for(let i = 0; i < radios.length; i++) {
        radios[i].addEventListener('change', function() {
            if(i == 0) {
                content1.style.display = "block";
                content2.style.display = "none";
            } else if(i == 1) {
                content2.style.display = "block";
                content1.style.display = "none";
            }
        });
    }
}

/*table1_body.onclick = function(e) {
    let cell = e.target;
    let row = cell.parentElement;
    let rows = row.parentElement.children;
    for (var i = 0; i < rows.length; i++) {
        if (rows[i] === row) {
            break;
        }
    }
    let columns = row.children;
    for (var j = 0; j < columns.length; j++) {
        if (columns[j] === cell) {
            break;
        }
    }
    alert('Row: ' + i + ', Column: ' + j);
    table1_body.querySelector("tr:nth-child(" + (i + 1) + ")").style.background = "#3a3a3a";
}*/