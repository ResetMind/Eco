let table_header = document.querySelector("#table3_header");
let invisible_table_header = document.querySelector("#invisible_table3_header");
invisible_table_header.innerHTML = table_header.innerHTML;
let table = document.querySelectorAll("#table3");
let content = document.querySelector(".content3");

function find() {
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
            if(response.includes("tbody")) {
                table[2].innerHTML = response;
            } else {
                table[2].innerHTML = "<tbody><tr><td>Совпадений нет<td></tr></tbody>";
            }
        }
    });
    request.send();
}

content.onscroll = function() {
    invisible_table_header.style.left = (-content.scrollLeft + 5) + "px";
};