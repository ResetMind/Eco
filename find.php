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
		$arr[] = "square like '%" . $_GET['field'] . "%'";
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
            $result .= "<td tabindex=\"0\">". $row['year']."</td>";
            $result .= "<td tabindex=\"0\">". $row['sumO']."</td>";
            $result .= "<td tabindex=\"0\">". $row['sumT']."</td>";
            $result .= "<td tabindex=\"0\">X1</td>";
            $result .= "<td tabindex=\"0\">". $row['sumO']."</td>";
            $result .= "<td tabindex=\"0\">". $row['sumT10']."</td>";
            $result .= "<td tabindex=\"0\">X2</td>";
            $result .= "<td tabindex=\"0\">". $row['sumO']."</td>";
            $result .= "<td tabindex=\"0\">". $row['sumT15']."</td>";
            $result .= "<td tabindex=\"0\">X3</td>";
            $result .= "<td tabindex=\"0\">". $row['sumO']."</td>";
            $result .= "<td tabindex=\"0\">". $row['sumT20']."</td>";
            $result .= "<td tabindex=\"0\">X4</td>";
            $result .= "<td tabindex=\"0\">". $row['sumO2']."</td>";
            $result .= "<td tabindex=\"0\">". $row['sumT']."</td>";
            $result .= "<td tabindex=\"0\">X5</td>";
            $result .= "<td tabindex=\"0\">". $row['sumO2']."</td>";
            $result .= "<td tabindex=\"0\">". $row['sumT10']."</td>";
            $result .= "<td tabindex=\"0\">X6</td>";
            $result .= "<td tabindex=\"0\">". $row['sumO2']."</td>";
            $result .= "<td tabindex=\"0\">". $row['sumT15']."</td>";
            $result .= "<td tabindex=\"0\">X7</td>";
            $result .= "<td tabindex=\"0\">". $row['sumO2']."</td>";
            $result .= "<td tabindex=\"0\">". $row['sumT20']."</td>";
            $result .= "<td tabindex=\"0\">X8</td>";
            $result .= "<td tabindex=\"0\">". $row['sumB']."</td>";
            $result .= "<td tabindex=\"0\">". $row['sumT']."</td>";
            $result .= "<td tabindex=\"0\">X9</td>";
            $result .= "<td tabindex=\"0\">". $row['sumB']."</td>";
            $result .= "<td tabindex=\"0\">". $row['sumT10']."</td>";
            $result .= "<td tabindex=\"0\">X10</td>";
            $result .= "<td tabindex=\"0\">". $row['sumB']."</td>";
            $result .= "<td tabindex=\"0\">". $row['sumT15']."</td>";
            $result .= "<td tabindex=\"0\">X11</td>";
            $result .= "<td tabindex=\"0\">". $row['sumB']."</td>";
            $result .= "<td tabindex=\"0\">". $row['sumT20']."</td>";
            $result .= "<td tabindex=\"0\">X12</td>";
            $result .= "<td tabindex=\"0\">". $row['sumB40']."</td>";
            $result .= "<td tabindex=\"0\">". $row['sumT']."</td>";
            $result .= "<td tabindex=\"0\">X13</td>";
            $result .= "<td tabindex=\"0\">". $row['sumB45']."</td>";
            $result .= "<td tabindex=\"0\">". $row['sumT']."</td>";
            $result .= "<td tabindex=\"0\">X14</td>";
            $result .= "<td tabindex=\"0\">". $row['sumB50']."</td>";
            $result .= "<td tabindex=\"0\">". $row['sumT']."</td>";
            $result .= "<td tabindex=\"0\">X15</td>";
            $result .= "<td tabindex=\"0\">". $row['sumB40']."</td>";
            $result .= "<td tabindex=\"0\">". $row['sumT10']."</td>";
            $result .= "<td tabindex=\"0\">X16</td>";
            $result .= "<td tabindex=\"0\">". $row['sumB40']."</td>";
            $result .= "<td tabindex=\"0\">". $row['sumT15']."</td>";
            $result .= "<td tabindex=\"0\">X17</td>";
            $result .= "<td tabindex=\"0\">". $row['sumB40']."</td>";
            $result .= "<td tabindex=\"0\">". $row['sumT20']."</td>";
            $result .= "<td tabindex=\"0\">X18</td>";
            $result .= "<td tabindex=\"0\">". $row['sumB45']."</td>";
            $result .= "<td tabindex=\"0\">". $row['sumT10']."</td>";
            $result .= "<td tabindex=\"0\">X19</td>";
            $result .= "<td tabindex=\"0\">". $row['sumB45']."</td>";
            $result .= "<td tabindex=\"0\">". $row['sumT15']."</td>";
            $result .= "<td tabindex=\"0\">X20</td>";
            $result .= "<td tabindex=\"0\">". $row['sumB45']."</td>";
            $result .= "<td tabindex=\"0\">". $row['sumT20']."</td>";
            $result .= "<td tabindex=\"0\">X21</td>";
            $result .= "<td tabindex=\"0\">". $row['sumB50']."</td>";
            $result .= "<td tabindex=\"0\">". $row['sumT10']."</td>";
            $result .= "<td tabindex=\"0\">X22</td>";
            $result .= "<td tabindex=\"0\">". $row['sumB50']."</td>";
            $result .= "<td tabindex=\"0\">". $row['sumT15']."</td>";
            $result .= "<td tabindex=\"0\">X23</td>";
            $result .= "<td tabindex=\"0\">". $row['sumB50']."</td>";
            $result .= "<td tabindex=\"0\">". $row['sumT20']."</td>";
            $result .= "<td tabindex=\"0\">X24</td>";
            $result .= "<td tabindex=\"0\">". $row['chdO']."</td>";
            $result .= "<td tabindex=\"0\">". $row['chdT10']."</td>";
            $result .= "<td tabindex=\"0\">X25</td>";
            $result .= "<td tabindex=\"0\">". $row['chdO']."</td>";
            $result .= "<td tabindex=\"0\">". $row['chdT15']."</td>";
            $result .= "<td tabindex=\"0\">X26</td>";
            $result .= "<td tabindex=\"0\">". $row['chdO']."</td>";
            $result .= "<td tabindex=\"0\">". $row['chdT20']."</td>";
            $result .= "<td tabindex=\"0\">X27</td>";
            $result .= "<td tabindex=\"0\">". $row['chdO2']."</td>";
            $result .= "<td tabindex=\"0\">". $row['chdT10']."</td>";
            $result .= "<td tabindex=\"0\">X28</td>";
            $result .= "<td tabindex=\"0\">". $row['chdO2']."</td>";
            $result .= "<td tabindex=\"0\">". $row['chdT15']."</td>";
            $result .= "<td tabindex=\"0\">X29</td>";
            $result .= "<td tabindex=\"0\">". $row['chdO2']."</td>";
            $result .= "<td tabindex=\"0\">". $row['chdT20']."</td>";
            $result .= "<td tabindex=\"0\">X30</td>";
            $result .= "<td tabindex=\"0\">". $row['chdB40']."</td>";
            $result .= "<td tabindex=\"0\">". $row['chdT10']."</td>";
            $result .= "<td tabindex=\"0\">X31</td>";
            $result .= "<td tabindex=\"0\">". $row['chdB40']."</td>";
            $result .= "<td tabindex=\"0\">". $row['chdT15']."</td>";
            $result .= "<td tabindex=\"0\">X32</td>";
            $result .= "<td tabindex=\"0\">". $row['chdB40']."</td>";
            $result .= "<td tabindex=\"0\">". $row['chdT20']."</td>";
            $result .= "<td tabindex=\"0\">X33</td>";
            $result .= "<td tabindex=\"0\">". $row['chdB45']."</td>";
            $result .= "<td tabindex=\"0\">". $row['chdT10']."</td>";
            $result .= "<td tabindex=\"0\">X34</td>";
            $result .= "<td tabindex=\"0\">". $row['chdB45']."</td>";
            $result .= "<td tabindex=\"0\">". $row['chdT15']."</td>";
            $result .= "<td tabindex=\"0\">X35</td>";
            $result .= "<td tabindex=\"0\">". $row['chdB45']."</td>";
            $result .= "<td tabindex=\"0\">". $row['chdT20']."</td>";
            $result .= "<td tabindex=\"0\">X36</td>";
            $result .= "<td tabindex=\"0\">". $row['chdB50']."</td>";
            $result .= "<td tabindex=\"0\">". $row['chdT10']."</td>";
            $result .= "<td tabindex=\"0\">X37</td>";
            $result .= "<td tabindex=\"0\">". $row['chdB50']."</td>";
            $result .= "<td tabindex=\"0\">". $row['chdT15']."</td>";
            $result .= "<td tabindex=\"0\">X38</td>";
            $result .= "<td tabindex=\"0\">". $row['chdB50']."</td>";
            $result .= "<td tabindex=\"0\">". $row['chdT20']."</td>";
            $result .= "<td tabindex=\"0\">X39</td>";
            $result .= "</tr>";
		} while ($row = mysqli_fetch_assoc($rows_result));
		$result .= "</tbody>";
		echo $result;
	} else {
		echo "Совпадений не найдено.";
	}
}
