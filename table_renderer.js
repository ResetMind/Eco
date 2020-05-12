radioOnCheck();
initTable(0);
initTable(1);
initTable(2);
function radioOnCheck() {
    let radios = document.querySelectorAll("input[type=\"radio\"]")
    let content0 = document.querySelector(".content0");
    let content1 = document.querySelector(".content1");
    let content2 = document.querySelector(".content2");
    for (let i = 0; i < radios.length; i++) {
        radios[i].addEventListener('change', function() {
            if (i == 0) {
                content0.style.display = "block";
                content1.style.display = "none";
                content2.style.display = "none";
            } else if (i == 1) {
                content1.style.display = "block";
                content0.style.display = "none";
                content2.style.display = "none";
            } else if (i == 2) {
                content2.style.display = "block";
                content0.style.display = "none";
                content1.style.display = "none";
            } 
        });
    }
}

function initTable(n) {
    let table_header = document.querySelector("#table" + n + "_header");
    let invisible_table_header = document.querySelector("#invisible_table" + n + "_header");
    invisible_table_header.innerHTML = table_header.innerHTML;
    let headers = document.querySelectorAll("#invisible_table" + n + "_header th");
    let cells = document.querySelectorAll("#table" + n + "_body td");
    let table = document.querySelectorAll("#table" + n);
    let add_span = document.querySelectorAll(".add")[n];
    let new_tr_html = table[2].querySelector("tbody").innerHTML;
    let content = document.querySelector(".content" + n);
    const border_width = 1;
    let isDrag = false;
    cellOnFocus();

    function cellOnFocus() {
        for (let i = 0; i < cells.length; i++) {
            cells[i].onfocus = function(e) {
                let row = parseInt(i / headers.length);
                let col = i % headers.length;
                table[2].querySelector("tr:nth-child(" + (row + 1) + ")").style.background = "#2a2a2a";
            }
            cells[i].onblur = function(e) {
                let row = parseInt(i / headers.length);
                let col = i % headers.length;
                table[2].querySelector("tr:nth-child(" + (row + 1) + ")").style.background = "transparent";
            }
        }
    }

    add_span.onclick = function() {
        let new_tr = document.createElement("tr");
        new_tr.innerHTML = new_tr_html;
        table[2].querySelector("tbody").appendChild(new_tr);
        table = document.querySelectorAll("#table" + n);
        cells = document.querySelectorAll("#table" + n + "_body td");
        cellOnFocus();
    }

    content.onscroll = function() {
        invisible_table_header.style.left = (-content.scrollLeft + 5) + "px";
    };

    invisible_table_header.onmousemove = function(e) {
        if (e.target.closest("#invisible_table" + n + "_header thead")) {
            let target = e.target.closest("#invisible_table" + n + "_header thead");
            let target_coords = target.getBoundingClientRect();
            let x_coord = e.clientX - target_coords.left;
            let column = isBorder(x_coord);
            if (column !== -1) {
                invisible_table_header.style.cursor = "col-resize";
                invisible_table_header.onmousedown = function(e) {
                    isDrag = true;
                    let start = e.clientX;
                    let tbl_start_width = table[0].getBoundingClientRect().width + 1;
                    let col_start_width = headers[column].getBoundingClientRect().width - 10;
                    document.body.onselectstart = function() {
                        return false;
                    };
                    document.onmousemove = function(e) {
                        document.body.style.cursor = "col-resize";
                        let new_col_width = col_start_width + (e.clientX - start);
                        if (new_col_width > 15) {
                            let new_tbl_width = tbl_start_width + (e.clientX - start);
                            table[0].style.width = new_tbl_width + "px";
                            table[1].style.width = new_tbl_width + "px";
                            table[2].style.width = new_tbl_width + "px";
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
                invisible_table_header.style.cursor = "auto";
                invisible_table_header.onmousedown = null;
            }
        }
    };

    invisible_table_header.ondragstart = function() {
        return false;
    };

    function isBorder(x) {
        headers = document.querySelectorAll("#invisible_table" + n + "_header th");
        let x_sum = 0;
        for (let i = 0; i < headers.length; i++) {
            x_sum += headers[i].getBoundingClientRect().width;
            if (x >= x_sum - border_width * 5 && x <= x_sum + border_width * 5) {
                return i;
            }
        }
        return -1;
    }
}