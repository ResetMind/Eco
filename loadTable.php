<?php
header("Content-Type: charset=utf-8");
$link = mysqli_connect("localhost", "root", "", "eco");
if (!$link) {
    echo "<br/>Не могу соединиться с сервером баз данных.<br/>";
    exit();
}
mysqli_query($link, "SET NAMES 'utf8mb4'");
$n = $_GET["table"];
if ($n == 0) {
    getFactors($link);
} else if ($n == 1) {
    getSquares($link);
} else if ($n == 2) {
    getCultures($link);
}
mysqli_close($link);

function getFactors($link)
{
    $rows = "SELECT * FROM factors";
    if (!$factors_result = mysqli_query($link, $rows)) {
        echo "<br/>Не могу выполнить запрос.<br/>";
        exit();
    }
    $result = "<tbody>";
    $row = mysqli_fetch_assoc($factors_result);
    do {
        $result .= "<tr>";
        $result .= "<td contenteditable>" . $row['year'] . "</td>";
        $result .= "<td id=\"set_culture\" tabindex=\"0\">" . $row['culture'] . "</td>";
        $result .= "<td id=\"set_square\" tabindex=\"0\">" . $row['square'] . "</td>";
        $result .= "<td contenteditable>" . $row['sumO'] . "</td>";
        $result .= "<td contenteditable>" . $row['sumT'] . "</td>";
        $result .= "<td contenteditable>" . $row['sumT10'] . "</td>";
        $result .= "<td contenteditable>" . $row['sumT15'] . "</td>";
        $result .= "<td contenteditable>" . $row['sumT20'] . "</td>";
        $result .= "<td contenteditable>" . $row['sumO2'] . "</td>";
        $result .= "<td contenteditable>" . $row['sumB'] . "</td>";
        $result .= "<td contenteditable>" . $row['sumB40'] . "</td>";
        $result .= "<td contenteditable>" . $row['sumB45'] . "</td>";
        $result .= "<td contenteditable>" . $row['sumB50'] . "</td>";
        $result .= "<td contenteditable>" . $row['chdO'] . "</td>";
        $result .= "<td contenteditable>" . $row['chdT10'] . "</td>";
        $result .= "<td contenteditable>" . $row['chdT15'] . "</td>";
        $result .= "<td contenteditable>" . $row['chdT20'] . "</td>";
        $result .= "<td contenteditable>" . $row['chdO2'] . "</td>";
        $result .= "<td contenteditable>" . $row['chdB40'] . "</td>";
        $result .= "<td contenteditable>" . $row['chdB45'] . "</td>";
        $result .= "<td contenteditable>" . $row['chdB50'] . "</td>";
        $result .= "</tr>";
    } while ($row = mysqli_fetch_assoc($factors_result));
    $result .= "</tbody>";
    echo $result;
}

function getSquares($link) {
    $rows = "SELECT * FROM squares";
    if (!$squares_result = mysqli_query($link, $rows)) {
        echo "<br/>Не могу выполнить запрос.<br/>";
        exit();
    }
    $result = "<tbody>";
    $row = mysqli_fetch_assoc($squares_result);
    do {
        $result .= "<tr>";
        $result .= "<td class=\"id_cell\">" . $row['id'] . "</td>";
        $result .= "<td contenteditable>" . $row['cadastral'] . "</td>";
        $result .= "<td contenteditable>" . $row['coordinates'] . "</td>";
        $result .= "<td contenteditable>" . $row['owner'] . "</td>";
        $result .= "</tr>";
    } while ($row = mysqli_fetch_assoc($squares_result));
    $result .= "</tbody>";
    echo $result;
}

function getCultures($link) {
    $rows = "SELECT * FROM cultures";
    if (!$cultures_result = mysqli_query($link, $rows)) {
        echo "<br/>Не могу выполнить запрос.<br/>";
        exit();
    }
    $result = "<tbody>";
    $row = mysqli_fetch_assoc($cultures_result);
    do {
        $result .= "<tr>";
        $result .= "<td class=\"id_cell\">" . $row['id'] . "</td>";
        $result .= "<td contenteditable>" . $row['name'] . "</td>";
        $result .= "</tr>";
    } while ($row = mysqli_fetch_assoc($cultures_result));
    $result .= "</tbody>";
    echo $result;
}
