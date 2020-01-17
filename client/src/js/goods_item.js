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

class Item {
    constructor(data) {
        this.data = data;
    }
    init() {
        this.renderItem();
        this.zoomIn();
        this.addCart();
    }
    renderItem() {
        let html =
            `
            <!-- 标题 -->
            <ol class="breadcrumb">
                <li><a href="./goods_list.html">电视</a></li>
                <li class="active">${this.data.title}</li>
            </ol>
            <div class="product-page">
                <div class="row">

                    <!-- 放大镜 -->
                    <div class="col-xs-7" id="mousele">

                        <!-- 小图片 -->
                        <div class="product-main-image" style="position: relative; overflow: hidden;">
                            <img src="${this.data.src}" alt="${this.data.title}">
                            <div class="mask"></div>
                        </div>

                        <!-- 大图片 -->
                        <div class="max-img">
                            <img src="${this.data.src}">
                        </div>

                        <div class="updown">
                            <i class="glyphicon arrowUp" style="color: rgb(96, 96, 96);">↑</i>
                            <div class="box">

                                <!-- 图片列表 -->
                                <ul class="product-other-images list-inline">
                                    <li class="current">
                                        <a>
                                            <img src="${this.data.src}">
                                        </a>
                                    </li>
                                    <li><a><img src="../img/01.jpg"></a></li>
                                    <li><a><img src="../img/02.jpg"></a></li>
                                    <li><a><img src="../img/03.jpg"></a></li>
                                    <li><a><img src="../img/04.jpg"></a></li>
                                    <li><a><img src="../img/05.jpg"></a></li>
                                    <li><a><img src="../img/06.jpg"></a></li>
                                    <li><a><img src="../img/07.jpg"></a></li>
                                    <li><a><img src="../img/08.jpg"></a></li>
                                </ul>
                            </div>
                            <i class="glyphicon arrowDown" style="color: rgb(96, 96, 96);">↓</i>
                        </div>
                    </div>

                    <!-- 购物区 -->
                    <div class="col-xs-5">
                        <h3>${this.data.title}</h3>
                        <div>${this.data.desc}</div>
                        <div class="price-availability-block clearfix">
                            <span class="price">
                                <strong>￥${this.data.price}</strong>
                            </span>
                        </div>

                        <div class="product-page-cart">
                            <div class="product-quantity input-group" style="width:250px;">
                                <dl class="dl-horizontal">
                                    <dt>数量</dt>
                                </dl>
                                <div class="spinner-buttons input-group-btn">
                                    <button type="button" class="btn btn-default" id="sub">-</button>
                                </div>
                                <input type="text" class="spinner-input" id="numBer" value="1">
                                <div class="spinner-buttons input-group-btn">
                                    <button type="button" class="btn btn-default" id="add">+</button>
                                </div>
                                <span style="margin-left:14px;">最大值为99</span>
                            </div>
                            <div class="row">
                                <button class="btn btn-warning favorite distanceRight" id="addCart">
                                    加入购物车
                                </button>
                                <a class="btn btn-danger favorite btn-buy distanceRight" id="go2cart">
                                    立即购买
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;

        $(html).appendTo(".product-page");
    }
    zoomIn() {
        let len = $(".product-other-images li").length - 5;
        let index = 0;
        let h = 82;

        // 切换图片
        $(".product-other-images li").click(function (e) {
            e.preventDefault();
            $(this).addClass("current").siblings().removeClass("current");
            $(".product-main-image img,.max-img img").prop("src", $(this).find("img").prop("src"));
        });

        // 上一页
        $(".arrowUp").click(function (e) {
            e.preventDefault();
            index--;
            if (index < 0) {
                index = 0;
            }
            $(".product-other-images").css("top", -index * h);
        });

        // 下一页
        $(".arrowDown").click(function (e) {
            e.preventDefault();
            index++;
            if (index > len) {
                index = len;
            }
            $(".product-other-images").css("top", -index * h);
        });

        // 鼠标控制放大镜
        $(".product-main-image img").hover(function () {
            // over
            $(".max-img").css("display", "block");
            $(".mask").css("display", "block");
        }, function () {
            // out
            $(".max-img").css("display", "none");
            $(".mask").css("display", "none");
        });
        $(".product-main-image img").mousemove(function (e) {

            // 小图移动
            let x = e.offsetX - $(".mask")[0].offsetWidth / 2 + 120;
            let y = e.offsetY - $(".mask")[0].offsetHeight / 2 + 120;

            // 边值检查
            if (x < 120) {
                x = 120;
            }
            if (y < 120) {
                y = 120;
            }
            var maxX = $(".product-main-image img")[0].offsetWidth - $(".mask")[0].offsetWidth + 120;
            var maxY = $(".product-main-image img")[0].offsetHeight - $(".mask")[0].offsetHeight + 120;
            if (x > maxX) {
                x = maxX;
            }
            if (y > maxY) {
                y = maxY;
            }

            $(".mask").css({
                left: x,
                top: y
            })

            // 大图移动
            let tmpX = ($(".max-img img")[0].offsetWidth - $(".max-img")[0].offsetWidth + 120) / maxX;
            let tmpY = ($(".max-img img")[0].offsetHeight - $(".max-img")[0].offsetHeight + 120) / maxY;

            $(".max-img img").css({
                left: -(x - 120) * tmpX,
                top: -(y - 120) * tmpY
            })
        });
    }
    addCart() {
        let count = $("#numBer").val();

        $("#sub").click(function (e) {
            e.preventDefault();
            count = $("#numBer").val();
            if (count > 1 && count < 100) {
                $("#numBer").val(--count);
            } else if (count <= 1) {
                $("#numBer").val(1);
            } else {
                $("#numBer").val(99);
            }
        });
        $("#add").click(function (e) {
            e.preventDefault();
            count = $("#numBer").val();
            if (count >= 1 && count < 99) {
                $("#numBer").val(++count);
            } else if (count < 1) {
                $("#numBer").val(1);
            } else {
                $("#numBer").val(99);
            }
        });
        $("#addCart").click(function (e) {
            e.preventDefault();
            count = $("#numBer").val();
            if (count < 1 || count > 99) {
                alert("请输入正确的商品数量");
                return;
            }

            $.ajax({
                type: "get",
                url: "../../../server/php/cart_add.php",
                data: {
                    src: $(this).parents(".col-xs-5").siblings("#mousele").find("img").eq(2).attr(
                        "src"),
                    title: $(this).parents(".col-xs-5").find("h3").text(),
                    desc: $(this).parents(".col-xs-5").find("div").eq(0).text(),
                    price: $(this).parents(".col-xs-5").find("strong").text().slice(1),
                    count
                },
                success: function (response) {
                    alert(response);
                }
            });
        });
        $("#go2cart").click(function (e) {
            e.preventDefault();
            count = $("#numBer").val();
            if (count < 1 || count > 99) {
                alert("请输入正确的商品数量");
                return;
            }

            $.ajax({
                type: "get",
                url: "../../../server/php/cart_add.php",
                data: {
                    src: $(this).parents(".col-xs-5").siblings("#mousele").find("img").eq(2).attr(
                        "src"),
                    title: $(this).parents(".col-xs-5").find("h3").text(),
                    desc: $(this).parents(".col-xs-5").find("div").eq(0).text(),
                    price: $(this).parents(".col-xs-5").find("strong").text().slice(1),
                    count
                },
                success: function (response) {
                    alert(response);
                    window.location.href = "../html/cart.html";
                }
            });
        });
    }
}