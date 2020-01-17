<?php
    $con = mysqli_connect("127.0.0.1","root","","konka");

    // 解决乱码问题
    if ($con->connect_error) {
        die("连接失败: " . $con->connect_error);
    }
    $con->query("SET NAMES 'UTF8'");

    $src = $_REQUEST["src"];
    $title = $_REQUEST["title"];
    $desc = $_REQUEST["desc"];
    $price = $_REQUEST["price"];
    $count = $_REQUEST["count"];

    $sql = "SELECT * FROM cart WHERE title = '$title'";
    $result = mysqli_query($con,$sql);

    if(mysqli_num_rows($result) == 0){
        $sql = "INSERT INTO cart(`src`, `title`, `desc`, `price`, `count`) VALUES ('$src','$title','$desc','$price','$count')";
        $result = mysqli_query($con,$sql);
        echo "加入购物车成功";
    }else{
        $sql = "UPDATE cart SET `count`=`count`+'$count' WHERE title = '$title'";
        $result = mysqli_query($con,$sql);
        echo "加入购物车成功";
    }
?>