<?php
    $con = mysqli_connect("127.0.0.1","root","","konka");

    // 解决乱码问题
    if ($con->connect_error) {
        die("连接失败: " . $con->connect_error);
    }
    $con->query("SET NAMES 'UTF8'");

    $src = $_REQUEST["src"];
    $sql = "SELECT * FROM goods WHERE src = '$src'";
    $result = mysqli_query($con,$sql);
    $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($data,true);
?>