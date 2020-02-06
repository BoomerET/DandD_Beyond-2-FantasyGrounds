<?php
    $charID = $_GET['charID'];

    $xmlData = @file_get_contents('https://www.dndbeyond.com/character/' . $charID . '/json');
    if($xmlData === FALSE) {
        print '{"errorCode":404,"errorMessage":"Resource Not Found"}';
    } else {
        print  $xmlData;
    }

?>

