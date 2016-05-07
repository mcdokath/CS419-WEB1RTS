<?php

ini_set('display_errors', 'On');
//Connects to the database
$mysqli = new mysqli("oniddb.cws.oregonstate.edu","leima-db","eKnU5NE4WonEgXyl","leima-db");
if($mysqli->connect_errno){
    echo "Connection error " . $mysqli->connect_errno . " " . $mysqli->connect_error;
    }
    
if(!($stmt = $mysqli->prepare("INSERT INTO unit (robot_id, x_coord, y_coord) VALUES (?, ?, ?)"))){
    echo "Prepare failed: "  . $stmt->errno . " " . $stmt->error;
}
if(!($stmt->bind_param("sss", $_POST['robot_id'], $_POST['x_coord'], $_POST['y_coord']))){
    echo "Bind failed: "  . $stmt->errno . " " . $stmt->error;
}

if(!$stmt->execute()){
    echo "Execute failed: "  . $stmt->errno . " " . $stmt->error;
} else {
    echo "Saved " . $stmt->affected_rows . " coordinates.";
}
$stmt->close();



?>