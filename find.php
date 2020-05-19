<?php
header("Content-Type: charset=utf-8");
$link = mysqli_connect("localhost", "root", "", "eco");
if (!$link) {
	echo "Не могу соединиться с сервером баз данных.";
	exit();
}
mysqli_query($link, "SET NAMES 'utf8mb4'");
find($link);
mysqli_close($link);

function find($link) {
	$arr = array();
	if ($_GET['year1'] != "") {
		$arr[] = "year >= " . $_GET['year1'];
	}
	if ($_GET['year2'] != "") {
		$arr[] = "year <= " . $_GET['year2'];
	}
	if ($_GET['culture'] != "") {
		$arr[] = "culture like '%" . $_GET['culture'] . "%'";
	}
	if ($_GET['field'] != "") {
		$arr[] = "field like '%" . $_GET['field'] . "%'";
	}
	$l = count($arr);
	if ($l == 0) {
		echo "Совпадений не найдено.";
		exit();
	}
	$request = "";
	for ($i = 0; $i < $l; $i++) {
		if ($i < count($arr) - 1) {
			$request .= $arr[$i] . " and ";
		} else {
			$request .= $arr[$i];
		}
	}
	$rows = "SELECT * from factors where " . $request;
	if (!$result = mysqli_query($link, $rows)) {
		echo "Не могу выполнить запрос.";
		exit();
	}
	if ($row = mysqli_fetch_assoc($result)) {
		$result = "<tbody>";
		$result .= "<tr>";
		$result .= "<th>id</th>";
		$result .= "<th>Название_фильма</th>";
		$result .= "<th>Год_выхода</th>";
		$result .= "<th>Страна</th>";
		$result .= "<th>Режиссер</th>";
		$result .= "<th>Сценарист</th>";
		$result .= "<th>Актеры</th>";
		$result .= "<th>Бюджет</th>";
		$result .= "<th>Сборы</th>";
		$result .= "<th>Дата_выхода</th>";
		$result .= "<th>Рейтинг</th>";
		$result .= "</tr>";
		do {
			$result .= "<tr>";
			$result .= "<td>" . $top_row['id'] . "</td>";
			$result .= "<td>" . $top_row['Название_фильма'] . "</td>";
			$result .= "<td>" . $top_row['Год_выхода'] . "</td>";
			$result .= "<td>" . $top_row['Страна'] . "</td>";
			$result .= "<td>" . $top_row['Режиссер'] . "</td>";
			$result .= "<td>" . $top_row['Сценарист'] . "</td>";
			$arr = explode("\n", $top_row['Актеры']);
			$result .= "<td>";
			for ($i = 0; $i < count($arr); $i++) {
				$result .= "<span id=\"actors\">" . $arr[$i] . "</span><br/>";
			}
			$result .= "</td>";
			$result .= "<td>" . $top_row['Бюджет'] . "</td>";
			$result .= "<td>" . $top_row['Сборы'] . "</td>";
			$result .= "<td>" . $top_row['Дата_выхода'] . "</td>";
			$result .= "<td>" . $top_row['Рейтинг'] . "</td>";
			$result .= "</tr>";
		} while ($top_row = mysqli_fetch_assoc($top_result));
		$result .= "</tbody>";
		echo $result;
	} else {
		echo "Совпадений не найдено.<br/>";
	}
}
?>