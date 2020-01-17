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

$(() => {
    let type = "default";
    let index = 1;

    $.ajax({
        type: "get",
        url: "../../../server/php/goods_page.php",
        dataType: "json",
        success: function (response) {
            let count = response.count;
            let html = "";
            for (let i = 0; i < count; i++) {
                html += `<li class="${i==0?"disabled":""}"><a>${i+1}</a></li>`;
            }
            $(".pagination").html(html);

            getPage(index, type);
        }
    });

    /* 翻页 */
    $(".pagination").on("click", "li", function () {
        index = $(this).index();
        $(this).addClass("disabled").siblings().removeClass("disabled");
        getPage(index + 1, type);
    })

    /* 排序 */
    $(".btn-group").on("click", "a", function () {
        type = $(this).data("type");
        $(this).addClass("defaultBtn").removeClass("btn-default").siblings().addClass("btn-default").removeClass("defaultBtn");
        getPage(index + 1, type);
    })

    function getPage(index, type) {
        $.ajax({
            type: "get",
            url: "../../../server/php/goods_list.php",
            data: `page=${index}&type=${type}`,
            dataType: "json",
            success: function (response) {
                renderList(response)
            }
        });
    }

    /* 数据渲染 */
    function renderList(data) {
        let tpl = data.map((ele, index) =>
            `
            <div class="col-xs-3" style="position: relative; ${index==0||index%4==0?"margin-left: 0px;":""}">
                <div class="figure">
                    <a>
                        <img class="layz"
                            alt="${ele.title}"
                            src="${ele.src}"
                            style="display: inline;">
                    </a>
                </div>
                <h4 class="text-uppercase figure-title">${ele.title}</h4>
                <div class="figure-title figureColor">${ele.desc}</div>
                <p class="price" style="display: block; opacity: 1;">￥${ele.price}</p>
                <div class="wrapper" style="display: none; opacity: 1;">
                    <a type="button" class="btn btn-default addCart">加入购物车</a>
                    <a type="button" class="btn btn-danger go2cart">立即购买</a>
                </div>
            </div>
            `).join("");
        $("#list").html(tpl);

        // 购物车
        $(".col-xs-3").hover(function () {
            // over
            $(this).find(".wrapper").css("display", "block");
            $(this).find(".price").css("display", "none");
        }, function () {
            // out
            $(this).find(".wrapper").css("display", "none");
            $(this).find(".price").css("display", "block");
        });
        $(".addCart").click(function (e) {
            e.preventDefault();
            $.ajax({
                type: "get",
                url: "../../../server/php/cart_add.php",
                data: {
                    src: $(this).parent().siblings(".figure").find("img").attr("src"),
                    title: $(this).parent().siblings(".figure").find("img").attr("alt"),
                    desc: $(this).parent().siblings(".figureColor").text(),
                    price: $(this).parent().siblings(".price").text().slice(1),
                    count: 1
                },
                success: function (response) {
                    alert(response);
                }
            });
        });
        $(".go2cart").click(function (e) {
            e.preventDefault();
            $.ajax({
                type: "get",
                url: "../../../server/php/cart_add.php",
                data: {
                    src: $(this).parent().siblings(".figure").find("img").attr("src"),
                    title: $(this).parent().siblings(".figure").find("img").attr("alt"),
                    desc: $(this).parent().siblings(".figureColor").text(),
                    price: $(this).parent().siblings(".price").text().slice(1),
                    count: 1
                },
                success: function (response) {
                    alert(response);
                    window.location.href = "../html/cart.html";
                }
            });
        });

        // 页面跳转
        $(".col-xs-3 img").click(function (e) {
            e.preventDefault();
            $.ajax({
                type: "get",
                url: "../../../server/php/goods_jump.php",
                data: {
                    src: $(this).prop("src")
                },
                dataType: "json",
                success: function (response) {
                    window.location.href = `../html/goods_item.html?id=${response[0].id}`;
                }
            });
        });
    }
})