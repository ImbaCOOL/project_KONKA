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
    /* 图形验证码 */
    let imgCodeTarget;
    let captcha = new Captcha({
        lineNum: 10,
        fontSize: 30,
        content: "0123456789"
    });
    captcha.draw(document.querySelector('#captcha'), r => {
        imgCodeTarget = r;
    });

    $("#submit").click(function () {
        let username = $.trim($("#input_uname").val());
        let password = $.trim($("#input_password").val());

        if (username.length == 0) {
            alert("请输入账号");
            return;
        }

        if (password.length == 0) {
            alert("请输入密码");
            return;
        }

        if ($("#input_vcode").val() == "") {
            alert("请输入验证码");
            return;
        } else if ($("#input_vcode").val() != imgCodeTarget) {
            alert("请输入正确的验证码");
            return;
        }

        let data = {
            username,
            password
        };

        $.ajax({
            type: "post",
            url: "../../../server/php/login.php",
            data,
            dataType: "json",
            success: function (response) {
                if (response.status == "success") {
                    if ($("#checkbox").prop("checked")) {
                        Cookie.setItem("username", username, 7);
                        Cookie.setItem("password", password, 7);
                    } else {
                        Cookie.setItem("username", username);
                        Cookie.setItem("password", password);
                    }
                    alert(response.msg);
                    window.history.go(-1);
                } else {
                    alert(response.msg);
                }
            }
        });

    })
}