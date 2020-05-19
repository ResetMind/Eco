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
	} else {
        $arr[] = "year >= 0";
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
	if (!$rows_result = mysqli_query($link, $rows)) {
		echo "Не могу выполнить запрос.";
		exit();
	}
	if ($row = mysqli_fetch_assoc($rows_result)) {
		$result = "<tbody>";
		do {
			$result .= "<tr>";
            $result .= "<td>". $row['year']."</td>";
            $result .= "<td>". $row['sumO']."</td>";
            $result .= "<td>". $row['sumT']."</td>";
            $result .= "<td>X1</td>";
            $result .= "<td>". $row['sumO']."</td>";
            $result .= "<td>". $row['sumT10']."</td>";
            $result .= "<td>X2</td>";
            $result .= "<td>". $row['sumO']."</td>";
            $result .= "<td>". $row['sumT15']."</td>";
            $result .= "<td>X3</td>";
            $result .= "<td>". $row['sumO']."</td>";
            $result .= "<td>". $row['sumT20']."</td>";
            $result .= "<td>X4</td>";
            $result .= "<td>". $row['sumO2']."</td>";
            $result .= "<td>". $row['sumT']."</td>";
            $result .= "<td>X5</td>";
            $result .= "<td>". $row['sumO2']."</td>";
            $result .= "<td>". $row['sumT10']."</td>";
            $result .= "<td>X6</td>";
            $result .= "<td>". $row['sumO2']."</td>";
            $result .= "<td>". $row['sumT15']."</td>";
            $result .= "<td>X7</td>";
            $result .= "<td>". $row['sumO2']."</td>";
            $result .= "<td>". $row['sumT20']."</td>";
            $result .= "<td>X8</td>";
            $result .= "<td>". $row['sumB']."</td>";
            $result .= "<td>". $row['sumT']."</td>";
            $result .= "<td>X9</td>";
            $result .= "<td>". $row['sumB']."</td>";
            $result .= "<td>". $row['sumT10']."</td>";
            $result .= "<td>X10</td>";
            $result .= "<td>". $row['sumB']."</td>";
            $result .= "<td>". $row['sumT15']."</td>";
            $result .= "<td>X11</td>";
            $result .= "<td>". $row['sumB']."</td>";
            $result .= "<td>". $row['sumT20']."</td>";
            $result .= "<td>X12</td>";
            $result .= "<td>". $row['sumB40']."</td>";
            $result .= "<td>". $row['sumT']."</td>";
            $result .= "<td>X13</td>";
            $result .= "<td>". $row['sumB45']."</td>";
            $result .= "<td>". $row['sumT']."</td>";
            $result .= "<td>X14</td>";
            $result .= "<td>". $row['sumB50']."</td>";
            $result .= "<td>". $row['sumT']."</td>";
            $result .= "<td>X15</td>";
            $result .= "<td>". $row['sumB40']."</td>";
            $result .= "<td>". $row['sumT10']."</td>";
            $result .= "<td>X16</td>";
            $result .= "<td>". $row['sumB40']."</td>";
            $result .= "<td>". $row['sumT15']."</td>";
            $result .= "<td>X17</td>";
            $result .= "<td>". $row['sumB40']."</td>";
            $result .= "<td>". $row['sumT20']."</td>";
            $result .= "<td>X18</td>";
            $result .= "<td>". $row['sumB45']."</td>";
            $result .= "<td>". $row['sumT10']."</td>";
            $result .= "<td>X19</td>";
            $result .= "<td>". $row['sumB45']."</td>";
            $result .= "<td>". $row['sumT15']."</td>";
            $result .= "<td>X20</td>";
            $result .= "<td>". $row['sumB45']."</td>";
            $result .= "<td>". $row['sumT20']."</td>";
            $result .= "<td>X21</td>";
            $result .= "<td>". $row['sumB50']."</td>";
            $result .= "<td>". $row['sumT10']."</td>";
            $result .= "<td>X22</td>";
            $result .= "<td>". $row['sumB50']."</td>";
            $result .= "<td>". $row['sumT15']."</td>";
            $result .= "<td>X23</td>";
            $result .= "<td>". $row['sumB50']."</td>";
            $result .= "<td>". $row['sumT20']."</td>";
            $result .= "<td>X24</td>";
            $result .= "<td>". $row['chdO']."</td>";
            $result .= "<td>". $row['chdT10']."</td>";
            $result .= "<td>X25</td>";
            $result .= "<td>". $row['chdO']."</td>";
            $result .= "<td>". $row['chdT15']."</td>";
            $result .= "<td>X26</td>";
            $result .= "<td>". $row['chdO']."</td>";
            $result .= "<td>". $row['chdT20']."</td>";
            $result .= "<td>X27</td>";
            $result .= "<td>". $row['chdO2']."</td>";
            $result .= "<td>". $row['chdT10']."</td>";
            $result .= "<td>X28</td>";
            $result .= "<td>". $row['chdO2']."</td>";
            $result .= "<td>". $row['chdT15']."</td>";
            $result .= "<td>X29</td>";
            $result .= "<td>". $row['chdO2']."</td>";
            $result .= "<td>". $row['chdT20']."</td>";
            $result .= "<td>X30</td>";
            $result .= "<td>". $row['chdB40']."</td>";
            $result .= "<td>". $row['chdT10']."</td>";
            $result .= "<td>X31</td>";
            $result .= "<td>". $row['chdB40']."</td>";
            $result .= "<td>". $row['chdT15']."</td>";
            $result .= "<td>X32</td>";
            $result .= "<td>". $row['chdB40']."</td>";
            $result .= "<td>". $row['chdT20']."</td>";
            $result .= "<td>X33</td>";
            $result .= "<td>". $row['chdB45']."</td>";
            $result .= "<td>". $row['chdT10']."</td>";
            $result .= "<td>X34</td>";
            $result .= "<td>". $row['chdB45']."</td>";
            $result .= "<td>". $row['chdT15']."</td>";
            $result .= "<td>X35</td>";
            $result .= "<td>". $row['chdB45']."</td>";
            $result .= "<td>". $row['chdT20']."</td>";
            $result .= "<td>X36</td>";
            $result .= "<td>". $row['chdB50']."</td>";
            $result .= "<td>". $row['chdT10']."</td>";
            $result .= "<td>X37</td>";
            $result .= "<td>". $row['chdB50']."</td>";
            $result .= "<td>". $row['chdT15']."</td>";
            $result .= "<td>X38</td>";
            $result .= "<td>". $row['chdB50']."</td>";
            $result .= "<td>". $row['chdT20']."</td>";
            $result .= "<td>X39</td>";
            $result .= "</tr>";
		} while ($row = mysqli_fetch_assoc($rows_result));
		$result .= "</tbody>";
		echo $result;
	} else {
		echo "Совпадений не найдено.";
	}
}
