<?php
    $con = mysqli_connect("127.0.0.1","root","","konka");

    // 解决乱码问题
    if ($con->connect_error) {
        die("连接失败: " . $con->connect_error);
    }
    $con->query("SET NAMES 'UTF8'");

    $arr = $_REQUEST["arr"];
    $num = $_REQUEST["num"];

    if($num == 0){
        for($i = 0;$i<count($arr);$i++)
        {
            $sql = "DELETE FROM `cart` WHERE id = '$arr[$i]'";
            $result = mysqli_query($con,$sql);
        }
        echo "删除成功";
    }else{
        $sql = "UPDATE cart SET `count`='$num' WHERE id = '$arr[0]'";
        $result = mysqli_query($con,$sql);
    }
?>