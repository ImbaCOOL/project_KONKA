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

class Cart {
    constructor() {}
    init() {
        this.renderCart();
    }
    renderCart() {
        $.ajax({
            type: "get",
            url: "../../../server/php/cart.php",
            dataType: "json",
            success: function (response) {
                if (response.empty == "empty") {
                    let html =
                        `
                        <!-- 购物车空 -->
                        <div class="jumbotron" style="overflow:hidden;">
                            <div class="ju-left pull-left">
                                <img src="https://www.konka.com/themes/pc/konka/images/shoppingNone.png?vcdd7">
                            </div>
                            <div class="ju-right pull-left" style="margin:15px 0 0 15px;">
                                <h3 style="font-weight:600;">您的购物车还是空的！</h3>
                                <p>您的购物车当前并未选购任何商品。</p>
                                <p><a class="btn btn-danger btn-lg shoppingRed" href="../html/home.html">马上去购物 »</a></p>
                            </div>
                        </div>
                        `;
                    $(".main-container").html(html);
                } else {
                    let tmp = response.map(ele =>
                        `
                        <!-- 商品 -->
                        <div class="cart-body myCart">
                            <div class="row goods_959 cart-item enabled">
                                <!-- 选择 -->
                                <div class="col-xs-1 c-ci-check">
                                    <label class="control-label">
                                        <input type="checkbox" checked="true" class="check">
                                    </label>
                                </div>
                                <!-- 详情 -->
                                <div class="col-xs-5 c-ci-title">
                                    <div class="row">
                                        <div class="col-xs-3">
                                            <a>
                                                <img class="img-thumbnail"
                                                    src="${ele.src}">
                                            </a>
                                        </div>
                                        <div class="col-xs-9">
                                            <h5>
                                                <a>${ele.title}</a>
                                            </h5>
                                            <p class="brief" style="margin-bottom: 0;">
                                                ${ele.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-1 c-ci-price">${ele.price}</div>
                                <!-- 数量 -->
                                <div class="col-xs-2 c-ci-quantity">
                                    <div class="product-quantity input-group input-group-sm">
                                        <div class="spinner-buttons input-group-btn">
                                            <button type="button" class="btn btn-default sub">
                                                -
                                            </button>
                                        </div>
                                        <input type="text" class="spinner-input form-control" 
                                                value="${ele.count}">
                                        <div class="spinner-buttons input-group-btn">
                                            <button type="button" class="btn btn-default add">
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <!-- 小计 -->
                                <div class="col-xs-1 c-ci-amount">
                                    <strong>${ele.price*ele.count}.00</strong>
                                </div>
                                <!-- 删除 -->
                                <div class="col-xs-2 c-ci-opt">
                                    <ul class="list-unstyled">
                                        <li><a class="btn btn-link btn-xs" data-id="${ele.id}">删除</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        `).join("");

                    let tpl =
                        `
                        <div class="page-header">
                            <h1>购物车<small>Shopping Cart</small></h1>
                        </div>
                        <div class="cart-container">
                            <!-- 顶部功能 -->
                            <div class="row cart-header">
                                <!-- 全选 -->
                                <div class="col-xs-1 c-ch-check">
                                    <label class="control-label">
                                        <input type="checkbox" class="allCheck"> 全选
                                    </label>
                                </div>
                                <div class="col-xs-5 c-ch-title">商品</div>
                                <div class="col-xs-1 c-ch-price">单价</div>
                                <div class="col-xs-2 c-ch-quantity">数量</div>
                                <div class="col-xs-1 c-ch-amount">小计</div>
                                <div class="col-xs-2 c-ch-opt">操作</div>
                            </div>
                            ${tmp}
                            <!-- 底部功能 -->
                            <div class="row cart-footer">
                                <!-- 全选 -->
                                <div class="col-xs-1 c-cf-check">
                                    <label class="control-label">
                                        <input type="checkbox" class="allCheck"> 全选
                                    </label>
                                </div>
                                <!-- 删除选中 -->
                                <div class="col-xs-4 c-cf-opt">
                                    <a class="btn btn-link btn-xs">删除选中</a>
                                </div>
                                <!-- 总价 -->
                                <div class="col-xs-5 c-cf-amount text-right">
                                    <ul class="list-unstyled">
                                        <li>
                                            已选择<span style="margin:0 10px;"></span>件商品，总金额：
                                            <strong class="text-danger" style="color:#ed1c24;"></strong>
                                        </li>
                                    </ul>
                                </div>
                                <!-- 结算 -->
                                <div class="col-xs-2 c-cf-opt">
                                    <a class="checkout-btn btn btn-lg btn-danger">去结算</a>
                                </div>
                            </div>
                        </div>
                        `;
                    $(".main-container").html(tpl);

                    // 初始化
                    // 全选框
                    let result = true;
                    for (let i = 0; i < $(".check").length; i++) {
                        if ($(".check").eq(i).prop("checked") == false) {
                            result = false;
                            break;
                        }
                    }
                    if (result == true) {
                        $(".allCheck").each((index, ele) => {
                            $(ele).prop("checked", true);
                        });

                        // 总价
                        let sum = 0;
                        for (let i = 0; i < $(".c-ci-amount").length; i++) {
                            sum += $(".c-ci-amount").eq(i).children().text() * 1;
                        }
                        $(".text-danger").text(sum + ".00");
                        $(".text-danger").siblings().text($(".check").length);
                    } else {
                        $(".allCheck").each((index, ele) => {
                            $(ele).prop("checked", false);
                        });
                    }

                    // 复选框
                    $(".check").click(function () {
                        if ($(this).prop("checked") == true) {
                            $(this).parents(".cart-item").css("background", "#fffeec");
                        } else {
                            $(this).parents(".cart-item").css("background", "#ffffff");
                        }

                        // 全选框
                        let result = true;
                        for (let i = 0; i < $(".check").length; i++) {
                            if ($(".check").eq(i).prop("checked") == false) {
                                result = false;
                                break;
                            }
                        }
                        if (result == true) {
                            $(".allCheck").each((index, ele) => {
                                $(ele).prop("checked", true);
                            });
                        } else {
                            $(".allCheck").each((index, ele) => {
                                $(ele).prop("checked", false);
                            });
                        }

                        // 总价
                        let sum = 0;
                        let count = 0;
                        for (let i = 0; i < $(".check").length; i++) {
                            if ($(".check").eq(i).prop("checked") == true) {
                                sum += $(".c-ci-amount").eq(i).children().text() * 1;
                                count++;
                            }
                        }
                        $(".text-danger").text(sum + ".00");
                        $(".text-danger").siblings().text(count);

                        // 结算按钮
                        result = false;
                        for (let i = 0; i < $(".check").length; i++) {
                            if ($(".check").eq(i).prop("checked") == true) {
                                result = true;
                                break;
                            }
                        }
                        if (result == false) {
                            $(".checkout-btn").css("background", "#c13e2c");
                        } else {
                            $(".checkout-btn").css("background", "#ed1c24");
                        }
                    });

                    // 全选框
                    $(".allCheck").click(function () {
                        if ($(this).prop("checked")) {
                            $(".allCheck").eq(0).prop("checked", true);
                            $(".allCheck").eq(1).prop("checked", true);
                            for (let i = 0; i < $(".check").length; i++) {
                                $(".check").eq(i).prop("checked", true);
                                $(".check").eq(i).parents(".cart-item").css("background", "#fffeec");
                            }

                            let sum = 0;
                            for (let i = 0; i < $(".c-ci-amount").length; i++) {
                                sum += $(".c-ci-amount").eq(i).children().text() * 1;
                            }
                            $(".text-danger").text(sum + ".00");
                            $(".text-danger").siblings().text($(".check").length);

                            $(".checkout-btn").css("background", "#ed1c24");
                        } else {
                            $(".allCheck").eq(0).prop("checked", false);
                            $(".allCheck").eq(1).prop("checked", false);
                            for (let i = 0; i < $(".check").length; i++) {
                                $(".check").eq(i).prop("checked", false);
                                $(".check").eq(i).parents(".cart-item").css("background", "#ffffff");
                            }

                            $(".text-danger").text("0.00");
                            $(".text-danger").siblings().text(0);

                            $(".checkout-btn").css("background", "#c13e2c");
                        }
                    });

                    // 删除选中
                    $(".c-cf-opt .btn-xs").click(function () {
                        // 数据库操作
                        let arr = [];
                        let num = 0;
                        for (let i = 0; i < $(".check").length; i++) {
                            if ($(".check").eq(i).prop("checked") == true) {
                                arr.push($(".list-unstyled .btn-xs").eq(i).data("id"));
                            }
                        }
                        if (arr.length != 0) {
                            $.ajax({
                                type: "get",
                                url: "../../../server/php/cart_del.php",
                                data: {
                                    arr,
                                    num
                                },
                                success: function (response) {
                                    alert(response);
                                }
                            });
                        } else {
                            alert("请选择要删除的商品");
                        }

                        $(".check").each((index, ele) => {
                            if ($(ele).prop("checked") == true) {
                                $(ele).parents(".cart-body").remove();
                            }
                        })

                        // 全选框
                        if ($(".check").length == 0) {
                            $(".allCheck").each((index, ele) => {
                                $(ele).prop("checked", false);
                            });
                        }

                        // 总价
                        let sum = 0;
                        let count = 0;
                        for (let i = 0; i < $(".check").length; i++) {
                            if ($(".check").eq(i).prop("checked") == true) {
                                sum += $(".c-ci-amount").eq(i).children().text() * 1;
                                count++;
                            }
                        }
                        $(".text-danger").text(sum + ".00");
                        $(".text-danger").siblings().text(count);

                        // 结算按钮
                        result = false;
                        for (let i = 0; i < $(".check").length; i++) {
                            if ($(".check").eq(i).prop("checked") == true) {
                                result = true;
                                break;
                            }
                        }
                        if (result == false) {
                            $(".checkout-btn").css("background", "#c13e2c");
                        } else {
                            $(".checkout-btn").css("background", "#ed1c24");
                        }
                    });

                    // 删除单个
                    $(".list-unstyled .btn-xs").click(function () {
                        // 数据库操作
                        let arr = [];
                        let num = 0;
                        arr.push($(this).data("id"));
                        $.ajax({
                            type: "get",
                            url: "../../../server/php/cart_del.php",
                            data: {
                                arr,
                                num
                            },
                            success: function (response) {
                                alert(response);
                            }
                        });
                        $(this).parents(".cart-body").remove();

                        // 全选框
                        let result = true;
                        for (let i = 0; i < $(".check").length; i++) {
                            if ($(".check").eq(i).prop("checked") == false) {
                                result = false;
                                break;
                            }
                        }
                        if (result == true) {
                            $(".allCheck").each((index, ele) => {
                                $(ele).prop("checked", true);
                            });
                        } else {
                            $(".allCheck").each((index, ele) => {
                                $(ele).prop("checked", false);
                            });
                        }
                        if ($(".check").length == 0) {
                            $(".allCheck").each((index, ele) => {
                                $(ele).prop("checked", false);
                            });
                        }

                        // 总价
                        let sum = 0;
                        let count = 0;
                        for (let i = 0; i < $(".check").length; i++) {
                            if ($(".check").eq(i).prop("checked") == true) {
                                sum += $(".c-ci-amount").eq(i).children().text() * 1;
                                count++;
                            }
                        }
                        $(".text-danger").text(sum + ".00");
                        $(".text-danger").siblings().text(count);

                        // 结算按钮
                        result = false;
                        for (let i = 0; i < $(".check").length; i++) {
                            if ($(".check").eq(i).prop("checked") == true) {
                                result = true;
                                break;
                            }
                        }
                        if (result == false) {
                            $(".checkout-btn").css("background", "#c13e2c");
                        } else {
                            $(".checkout-btn").css("background", "#ed1c24");
                        }
                    });

                    // 增加数量
                    $(".add").click(function () {
                        let count = $(this).parent().siblings(".spinner-input").val();
                        let price = $(this).parents(".c-ci-quantity").siblings(".c-ci-price").text() * 1;

                        if (count >= 1 && count < 99) {
                            $(this).parent().siblings(".spinner-input").val(++count);
                        } else if (count < 1) {
                            $(this).parent().siblings(".spinner-input").val(1);
                        } else {
                            $(this).parent().siblings(".spinner-input").val(99);
                        }
                        count = $(this).parent().siblings(".spinner-input").val() * 1;
                        $(this).parents(".c-ci-quantity").siblings(".c-ci-amount").children().text(price * count + ".00");

                        // 总价
                        let sum = 0;
                        let num = 0;
                        for (let i = 0; i < $(".check").length; i++) {
                            if ($(".check").eq(i).prop("checked") == true) {
                                sum += $(".c-ci-amount").eq(i).children().text() * 1;
                                num++;
                            }
                        }
                        $(".text-danger").text(sum + ".00");
                        $(".text-danger").siblings().text(num);

                        // 数据库操作
                        let arr = [];
                        num = count;
                        arr.push($(this).parents(".c-ci-quantity").siblings(".c-ci-opt").find("a").data("id"));
                        $.ajax({
                            type: "get",
                            url: "../../../server/php/cart_del.php",
                            data: {
                                arr,
                                num
                            },
                            success: function (response) {}
                        });
                    });

                    // 减少数量
                    $(".sub").click(function () {
                        let count = $(this).parent().siblings(".spinner-input").val();
                        let price = $(this).parents(".c-ci-quantity").siblings(".c-ci-price").text() * 1;

                        if (count > 1 && count < 100) {
                            $(this).parent().siblings(".spinner-input").val(--count);
                        } else if (count <= 1) {
                            $(this).parent().siblings(".spinner-input").val(1);
                        } else {
                            $(this).parent().siblings(".spinner-input").val(99);
                        }
                        count = $(this).parent().siblings(".spinner-input").val() * 1;
                        $(this).parents(".c-ci-quantity").siblings(".c-ci-amount").children().text(price * count + ".00");

                        // 总价
                        let sum = 0;
                        let num = 0;
                        for (let i = 0; i < $(".check").length; i++) {
                            if ($(".check").eq(i).prop("checked") == true) {
                                sum += $(".c-ci-amount").eq(i).children().text() * 1;
                                num++;
                            }
                        }
                        $(".text-danger").text(sum + ".00");
                        $(".text-danger").siblings().text(num);

                        // 数据库操作
                        let arr = [];
                        num = count;
                        arr.push($(this).parents(".c-ci-quantity").siblings(".c-ci-opt").find("a").data("id"));
                        $.ajax({
                            type: "get",
                            url: "../../../server/php/cart_del.php",
                            data: {
                                arr,
                                num
                            },
                            success: function (response) {}
                        });
                    });

                    // 设定数量
                    $(".spinner-input").blur(function () {
                        let count = $(this).val();
                        let price = $(this).parents(".c-ci-quantity").siblings(".c-ci-price").text() * 1;

                        if (count < 1 || count > 99) {
                            alert("请输入1~99的商品数量");
                            $(this).val(1);
                            return;
                        }
                        count = $(this).val() * 1;
                        $(this).parents(".c-ci-quantity").siblings(".c-ci-amount").children().text(price * count + ".00");

                        // 总价
                        let sum = 0;
                        let num = 0;
                        for (let i = 0; i < $(".check").length; i++) {
                            if ($(".check").eq(i).prop("checked") == true) {
                                sum += $(".c-ci-amount").eq(i).children().text() * 1;
                                num++;
                            }
                        }
                        $(".text-danger").text(sum + ".00");
                        $(".text-danger").siblings().text(num);

                        // 数据库操作
                        let arr = [];
                        num = count;
                        arr.push($(this).parents(".c-ci-quantity").siblings(".c-ci-opt").find("a").data("id"));
                        $.ajax({
                            type: "get",
                            url: "../../../server/php/cart_del.php",
                            data: {
                                arr,
                                num
                            },
                            success: function (response) {}
                        });
                    });
                }
            }
        });
    }
}