<?php
    $db = mysqli_connect("127.0.0.1", "root", "", "konka");

    $sql = "SELECT * FROM goods";

    $result = mysqli_query($db, $sql);
    $size = mysqli_num_rows($result);

    # 假设每页现实20个商品数据 
    $count = ceil($size / 20);

    $data = array("count"=>$count);
    echo json_encode($data,true);
?>