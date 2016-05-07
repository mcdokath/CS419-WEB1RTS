<?php

ini_set('display_errors', 'On');
//Connects to the database
$mysqli = new mysqli("oniddb.cws.oregonstate.edu","leima-db","eKnU5NE4WonEgXyl","leima-db");
if($mysqli->connect_errno){
    echo "Connection error " . $mysqli->connect_errno . " " . $mysqli->connect_error;
    }


$stmt = $mysqli->prepare("SELECT robot_id, x_coord, y_coord FROM unit;");

if(!$stmt->execute()){
        echo "Execute failed: "  . $mysqli->connect_errno . " " . $mysqli->connect_error;
    }

if(!$stmt->bind_result($robot_id, $x_coord, $y_coord)){
        echo "Bind failed: "  . $mysqli->connect_errno . " " . $mysqli->connect_error;
    }

$data = [];

while($stmt->fetch()) {
	array_push($data, $robot_id, $x_coord, $y_coord);
}
echo json_encode($data);
$stmt->close();



?>