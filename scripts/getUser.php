<?php
    $user_email = $_GET['email'];
    $user_name = $_GET['name'];
    $user_token = $_GET['id_token'];

    $servername="localhost";
    $username = "root";
    $password = "chip*two";
    $dbname = "dnd2fg";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    //echo "Connected successfully";

    $sql = "SELECT user_name, user_paid FROM users WHERE user_email='" . $user_email . "'";
    #$sql = "SELECT * FROM users";0
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            print $row["user_paid"];
        }
    } else {
        # Can we insert the user here instead of creating a new script.
        $sqlInsert = "INSERT INTO users (user_name, user_id_token, user_email) VALUES ('" . $user_name . "','" . $user_token . "','" . $user_email . "')";
        $result = $conn->query($sqlInsert);
        print "0";
    }
    $conn->close();
?>
