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
}
