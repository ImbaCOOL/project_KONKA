class Tab {
    constructor(data) {
        this.data = data;
    }
    init() {
        this.renderTab();
        this.eventTab();
        this.listeningScrollY();
        this.eventLogin();
    }
    renderTab() {
        let tpl = this.data.map(ele => {
            let tmp = ele.map(ele =>
                `
                <div class="col-xs-2">
                    <div class="figure">
                        <a href="../html/goods_list.html" target="_blank">
                            <img src="${ele.src}">
                        </a>
                    </div>
                    <h4 class="text-uppercase ellipsis">${ele.title}</h4>
                    <div class="figure-title ellipsis">${ele.desc}</div>
                    <p>${ele.price}</p>
                </div>
                `).join("");
            return `
                    <div class="item">
                        <div class="item-children">
                            <div class="container-fluid">${tmp}</div>
                        </div>    
                    </div>                
                    `;
        });

        $(`${tpl[0]}`).appendTo("#TV");
        $(`${tpl[1]}`).appendTo("#frige");
        $(`${tpl[2]}`).appendTo("#wash");
        $(`${tpl[3]}`).appendTo("#live");
        $(`${tpl[4]}`).appendTo("#kitchen");
        $(`${tpl[5]}`).appendTo("#smart");
        $(`${tpl[6]}`).appendTo("#kara");
    }
    eventTab() {
        for (let i = 1; i < 8; i++) {
            $(".col-xs-1").eq(i).mouseenter(function () {
                $(this).children("div").addClass("item-show");
            });
            $(".col-xs-1").eq(i).mouseleave(function () {
                $(this).children("div").removeClass("item-show");
            })
        }
    }
    listeningScrollY() {
        $(window).scroll(function () {
            if (window.scrollY >= 150) {
                $(".row").eq(0).css({
                    position: "fixed",
                    top: 0,
                    background: "white",
                    width: 1140
                });
            } else {
                $(".row").eq(0).css("position", "static");
            }
        });
    }
    eventLogin() {
        if (Cookie.getItem("username") && Cookie.getItem("password")) {
            $("#register").css("display", "none").siblings().css("display", "block");
            $("#login a").eq(0).text("用户：" + Cookie.getItem("username"));
        }
        $("#login a").eq(1).click(function (e) {
            e.preventDefault();
            Cookie.removeItem("username");
            Cookie.removeItem("password");
            window.location.href = "./home.html";
        });
    }
}

function fn() {
    /* 账号 */
    $("#input_login_name").blur(function () {
        let val = $.trim($(this).val());
        if (/^[a-zA-Z]{2,10}$/.test(val)) {
            $(this).next().text("验证通过").removeClass("error-text").addClass("check-text");
            $(this).removeClass("error-border");
        } else {
            $(this).next().text("请输入正确的登录账号").removeClass("check-text").addClass("error-text");
            $(this).addClass("error-border");
        }
    })

    /* 密码 */
    $("#input_login_password").blur(function () {
        let val = $.trim($(this).val());
        if (/^[a-zA-Z0-9]{3,10}$/.test(val)) {
            $(this).next().text("验证通过").removeClass("error-text").addClass("check-text");
            $(this).removeClass("error-border");
        } else {
            $(this).next().text("请输入正确的登录密码").removeClass("check-text").addClass("error-text");
            $(this).addClass("error-border");
        }
    })

    /* 确认密码 */
    $("#input_psw_confirm").blur(function () {
        let val = $.trim($(this).val());
        if ($.trim($("#input_login_password").val()) == val && val != "") {
            $(this).next().text("验证通过").removeClass("error-text").addClass("check-text");
            $(this).removeClass("error-border");
        } else if ($.trim($("#input_login_password").val()) != val) {
            $(this).next().text("两次输入的登录密码不一致").removeClass("check-text").addClass("error-text");
            $(this).addClass("error-border");
        } else {
            $(this).next().text("密码错误").removeClass("check-text").addClass("error-text");
            $(this).addClass("error-border");
        }
    })

    /* 图形验证码 */
    let imgCodeTarget;
    let captcha = new Captcha({
        lineNum: 10,
        fontSize: 30,
        content: "0123456789"
    });
    captcha.draw(document.querySelector('#captcha'), r => {
        imgCodeTarget = r;
        /* 当用户点击图形变化验证码的时候需要重新校验 */
        $("#input_vcode").trigger("blur");
    });

    $("#input_vcode").blur(function () {
        let val = $.trim($(this).val());
        if (imgCodeTarget == val) {
            $(this).next().text("验证通过").removeClass("error-text").addClass("check-text");
            $(this).removeClass("error-border");
        } else {
            $(this).next().text("请输入正确的验证码").removeClass("check-text").addClass("error-text");
            $(this).addClass("error-border");
        }
    })

    /* 注册 */
    $("#submit").click(function () {
        /* 001-检查用户是否输入了正确的信息并且通过验证，如果没有通过那么就返回 */
        $("#input_login_name,#input_login_password,#input_psw_confirm,#input_vcode").trigger("blur");
        if ($(".error-text").length != 0) {
            return;
        }

        /* 002-检查用户是否勾选了用户协议*/
        if (!$("#checkbox").prop("checked")) {
            alert("请阅读并同意《会员注册条款》");
            return;
        }

        /* 003-发送网络请求把注册相关的信息提交给服务器 */
        let data = {
            username: $.trim($("#input_login_name").val()),
            password: $.trim($("#input_login_password").val())
        }

        $.ajax({
            type: "post",
            data,
            dataType: "json",
            url: "../../../server/php/register.php",
            success(response) {
                if (response.status == "success") {
                    Cookie.setItem("username", data.username);
                    Cookie.setItem("password", data.password);
                    alert(response.msg);
                    window.history.go(-1);
                } else {
                    alert(response.msg);
                }
            }
        })

    })
}