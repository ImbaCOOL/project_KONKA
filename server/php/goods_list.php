<?php
    $con = mysqli_connect("127.0.0.1","root","","konka");

    // 解决乱码问题
    if ($con->connect_error) {
        die("连接失败: " . $con->connect_error);
    }
    $con->query("SET NAMES 'UTF8'");

    $page = $_REQUEST["page"];
    $start = ($page - 1) * 20;
    $type = $_REQUEST["type"];

    if($type == "default")
    {
        $sql = "SELECT * FROM goods LIMIT $start,20";
    }elseif($type == "dsc")
    {
        $sql = "SELECT * FROM goods ORDER BY price DESC LIMIT $start,20";
    }elseif($type == "asc"){
        $sql = "SELECT * FROM goods ORDER BY price ASC LIMIT $start,20";
    }

    $result = mysqli_query($con,$sql);
    $data = mysqli_fetch_all($result,MYSQLI_ASSOC);

    echo json_encode($data,true);
?>