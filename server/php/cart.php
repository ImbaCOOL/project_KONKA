<?php
    $con = mysqli_connect("127.0.0.1","root","","konka");

    // 解决乱码问题
    if ($con->connect_error) {
        die("连接失败: " . $con->connect_error);
    }
    $con->query("SET NAMES 'UTF8'");

    // 渲染购物车
    $sql = "SELECT * FROM cart";
    $result = mysqli_query($con,$sql);

    if(mysqli_num_rows($result) == 0){
        $data = array("empty"=>"empty");
        echo json_encode($data,true);
    }else{
        $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
        echo json_encode($data,true);
    }
?>