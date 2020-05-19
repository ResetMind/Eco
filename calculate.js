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
            console.log(response);
        }
    });
    request.send();
}