<?php
header("Content-Type: charset=utf-8");
$link = mysqli_connect("localhost", "root", "", "eco");
if (!$link) {
    echo "Не могу соединиться с сервером баз данных.";
    exit();
}
mysqli_query($link, "SET NAMES 'utf8mb4'");
save($link);
mysqli_close($link);

function save($link)
{
    //culture
    $delete = "DROP TABLE cultures";
    if (!mysqli_query($link, $delete)) {
        echo "Не могу удалить таблицу.";
        exit();
    }
    $create = "CREATE TABLE cultures(id int not null primary key AUTO_INCREMENT, 
    name varchar(150))";
    if (!mysqli_query($link, $create)) {
        echo "Не могу создать таблицу.";
        exit();
    }
    $name = $_POST["Название_культуры"];
    for ($i = 0; $i < count($name); $i++) {
        $new_rows = "INSERT INTO cultures (id, name) values (null, '" . $name[$i] . "')";
        if (!mysqli_query($link, $new_rows)) {
            echo "Не могу добавить строку";
            exit();
        }
    }
    //squares
    $delete = "DROP TABLE squares";
    if (!mysqli_query($link, $delete)) {
        echo "Не могу удалить таблицу.";
        exit();
    }
    $create = "CREATE TABLE squares(id int not null primary key AUTO_INCREMENT, 
    cadastral varchar(50), coordinates varchar(100), owner varchar (200))";
    if (!mysqli_query($link, $create)) {
        echo "Не могу создать таблицу.";
        exit();
    }
    $cadastral = $_POST["Кадастровый_номер"];
    $coordinates = $_POST["Географические_координаты"];
    $owner = $_POST["Владелец"];
    for ($i = 0; $i < count($cadastral); $i++) {
        $new_rows = "INSERT INTO squares (id, cadastral, coordinates, owner) 
        values (null, '" . $cadastral[$i] . "', '" . $coordinates[$i] . "', 
        '" . $owner[$i] . "')";
        if (!mysqli_query($link, $new_rows)) {
            echo "Не могу добавить строку";
            exit();
        }
    }
    //factors
    $delete = "DROP TABLE factors";
    if (!mysqli_query($link, $delete)) {
        echo "Не могу удалить таблицу.";
        exit();
    }
    $create = "CREATE TABLE factors(id int not null primary key AUTO_INCREMENT, 
    year int, culture varchar(100), square varchar(100), sumO float, sumT int, 
    sumT10 int, sumT15 int, sumT20 int, sumO2 float, sumB int, sumB40 int, 
    sumB45 int, sumB50 int, chdO int, chdT10 int, chdT15 int, chdT20 int, 
    chdO2 int, chdB40 int, chdB45 int, chdB50 int)";
    if (!mysqli_query($link, $create)) {
        echo "Не могу создать таблицу.";
        exit();
    }

    function ifEmpty($arr) {
        for($i = 0; $i < count($arr); $i++) {
            if($arr[$i] == "") {
                $arr[$i] = "null";
            } else {
                $arr[$i] = "'" . $arr[$i] . "'";
            }
        }
        return $arr;
    }

    $year = ifEmpty($_POST["Год"]);
    $culture = ifEmpty($_POST["Культура"]);
    $square = ifEmpty($_POST["Поле"]);
    $sumO = ifEmpty($_POST["∑О,мм"]);
    $sumT = ifEmpty($_POST["∑t,°C"]);
    $sumT10 = ifEmpty($_POST["∑t≥10°C"]);
    $sumT15 = ifEmpty($_POST["∑t≥15°C"]);
    $sumT20 = ifEmpty($_POST["∑t≥20°C"]);
    $sumO2 = ifEmpty($_POST["∑О≥2мм"]);
    $sumB = ifEmpty($_POST["∑В,%"]);
    $sumB40 = ifEmpty($_POST["∑В≥40%"]);
    $sumB45 = ifEmpty($_POST["∑В≥45%"]);
    $sumB50 = ifEmpty($_POST["∑В≥50%"]);
    $chdO = ifEmpty($_POST["ЧД(О)"]);
    $chdT10 = ifEmpty($_POST["ЧД(t≥10°C)"]);
    $chdT15 = ifEmpty($_POST["ЧД(t≥15°C)"]);
    $chdT20 = ifEmpty($_POST["ЧД(t≥20°C)"]);
    $chdO2 = ifEmpty($_POST["ЧД(О≥2мм)"]);
    $chdB40 = ifEmpty($_POST["ЧД(В≥40%)"]);
    $chdB45 = ifEmpty($_POST["ЧД(В≥45%)"]);
    $chdB50 = ifEmpty($_POST["ЧД(В≥50%)"]);
    for ($i = 0; $i < count($year); $i++) {
        $new_rows = "INSERT INTO factors (id, year, culture, square, sumO, sumT, 
        sumT10, sumT15, sumT20, sumO2, sumB, sumB40, sumB45, sumB50, chdO, chdT10, 
        chdT15, chdT20, chdO2, chdB40, chdB45, chdB50) 
        values (null, " . $year[$i] . ", " . $culture[$i] . ", 
        " . $square[$i] . ", " . $sumO[$i] . ", " . $sumT[$i] . ", 
        " . $sumT10[$i] . ", " . $sumT15[$i] . ", " . $sumT20[$i] . ", 
        " . $sumO2[$i] . ", " . $sumB[$i] . ", " . $sumB40[$i] . ", 
        " . $sumB45[$i] . ", " . $sumB50[$i] . ", " . $chdO[$i] . ", 
        " . $chdT10[$i] . ", " . $chdT15[$i] . ", " . $chdT20[$i] . ", 
        " . $chdO2[$i] . ", " . $chdB40[$i] . ", " . $chdB45[$i] . ", 
        " . $chdB50[$i] . ")";
        if (!mysqli_query($link, $new_rows)) {
            echo "Не могу добавить строку";
            exit();
        }
    }
    echo "ok";
}
