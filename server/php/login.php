<?php
    $username = $_REQUEST["username"];
    $password = $_REQUEST["password"];

    $db = mysqli_connect("127.0.0.1","root","","project_KONKA");
    $sql =  "SELECT * FROM user WHERE username = '$username'";
    $result = mysqli_query($db,$sql);

    if(mysqli_num_rows($result) == 0)
    {
        // 用户不存在
        echo '{"status":"error","msg":"该账号不存在"}';
    }else{
        $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
        $_password = $data[0]["password"];
        if($_password != $password)
        {
            // 密码不正确
            echo '{"status":"error","msg":"密码不正确"}';
        }else{
            // 密码正确
            echo '{"status":"success","msg":"登录成功"}';
        }
    }
?>