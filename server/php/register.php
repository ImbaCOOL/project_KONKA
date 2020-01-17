<?php
    # 001-连接数据库
    $db = mysqli_connect("127.0.0.1", "root", "", "project_KONKA");

    # 002-获取客户端提交的参数
    $username = $_REQUEST["username"];
    $password = $_REQUEST["password"];

    # 003-对数据库执行操作(寻找是否有此用户)
    $sql = "SELECT * FROM user WHERE username = '$username'";
    $result = mysqli_query($db,$sql);

    if(mysqli_num_rows($result) == 0)
    {
        # 该用户不存在可以直接注册
        $sql = "INSERT INTO `user` (`id`, `username`, `password`) VALUES (NULL, '$username', '$password')";
        $result = mysqli_query($db, $sql);

        echo '{"status":"success","msg":"恭喜你，注册成功"}';
    }
    else{
        # 该用户已经存在，不能再注册
        echo '{"status":"error","msg":"抱歉，该账号已经被注册"}';
    }
?>