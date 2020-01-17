class Default {
    constructor() {}
    init() {
        this.listeningScrollY();
    }
    listeningScrollY() {
        $(window).scroll(function () {
            if (window.scrollY >= 500) {
                $(".anchor").css("display", "block");
            } else {
                $(".anchor").css("display", "none");
            }
        });
    }
}

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

class Menu {
    constructor(data) {
        this.data = data;
    }
    init() {
        this.renderMenu();
        this.eventMenu();
    }
    renderMenu() {
        let tpl = this.data.map(ele => {
            let tmp = ele.map(ele =>
                `
                <li>
                    <a href="../html/goods_list.html" class="link" rel="nofollow noopener noreferrer" target="_blank">
                        <img class="layz banW"
                            width="40" height="40"
                            src = "${ele.src}"
                            style="display: inline;">
                        <span>${ele.title}</span>
                    </a>
                </li>
                `).join("");
            return `<div class="children clearfix ">
                        <div class="children-wrapper">
                            <ul class="children-list clearfix">${tmp}</ul>
                        </div>
                    </div>
                    `;
        });

        $(`${tpl[0]}`).appendTo("#TV2");
        $(`${tpl[1]}`).appendTo("#frige2");
        $(`${tpl[2]}`).appendTo("#wash2");
        $(`${tpl[3]}`).appendTo("#live2");
        $(`${tpl[4]}`).appendTo("#kitchen2");
        $(`${tpl[5]}`).appendTo("#smart2");
        $(`${tpl[6]}`).appendTo("#home");
        $(`${tpl[7]}`).appendTo("#kara2");
        $(`${tpl[8]}`).appendTo("#rim");
    }
    eventMenu() {
        $(".category-item").mouseenter(function () {
            $(this).addClass("category-item-active");
        });
        $(".category-item").mouseleave(function () {
            $(this).removeClass("category-item-active");
        });
    }
}

class Banner {
    constructor(data) {
        this.data = data;
        this.index = 0;
        this.len = null;
        this.bannerBoxItemWidth = 1920;
        this.timer = null;
    }
    init() {
        this.renderBanner();
        this.bannerPrev();
        this.bannerNext();
        this.bannerAutoPlayer();
        this.bannerMouse();
        this.bannerClick();
        this.bannerSwitchNav();
        this.bannerClickNav();
    }
    renderBanner() {
        let tpl1 = this.data.map(ele => `<li class="banner-box-item"><img src="${ele}"></li>`).join("");
        let tpl2 = this.data.map((ele, index) => `<li class="banner-nav-item${index==0?" active":""}"></li>`).join("");

        $(`<ul class="banner-box">${tpl1}</ul>
            <div class="banner-control">
                <span class="prev">&lt;</span>
                <span class="next">&gt;</span>
            </div>
            <ol class="banner-nav">${tpl2}</ol>`).appendTo("#banner");

        this.len = this.data.length;
    }
    bannerNext() {
        this.index++;
        if (this.index == this.len) {
            this.index = 0;
        }
        $(".banner-box").css("left", -this.index * this.bannerBoxItemWidth);
        this.bannerSwitchNav();
    }
    bannerPrev() {
        this.index--;
        if (this.index == -1) {
            this.index = this.len - 1
        }
        $(".banner-box").css("left", -this.index * this.bannerBoxItemWidth);
        this.bannerSwitchNav();
    }
    bannerAutoPlayer() {
        this.timer = setInterval(() => this.bannerNext(), 2000);
    }
    bannerMouse() {
        $(".banner").mouseenter(() => {
            clearInterval(this.timer);
        });
        $(".banner").mouseleave(() => {
            this.bannerAutoPlayer();
        });
    }
    bannerClick() {
        $(".prev").click(() => {
            this.bannerPrev();
        });

        $(".next").click(() => {
            this.bannerNext();
        });
    }
    bannerClickNav() {
        $(".banner-nav").children().each((index, ele) => {
            $(ele).click(e => {
                e.preventDefault();
                this.index = index;
                $(".banner-box").css("left", -this.index * this.bannerBoxItemWidth);
                this.bannerSwitchNav();
            });
        });
    }
    bannerSwitchNav() {
        $(".banner-nav").children().each((index, ele) => {
            $(ele).removeClass("active");
        })
        $(".banner-nav").children().eq(this.index).addClass("active");
    }

}

class Star {
    constructor(data) {
        this.data = data;
    }
    init() {
        this.renderStar();
        this.eventTurnPage();
    }
    renderStar() {
        let tpl = this.data.map(ele =>
            `
            <div class="col-xs-4">
                <div class="figure">
                    <a href="../html/goods_list.html" title="${ele.title}" target="_blank">
                        <img class="layz" src="${ele.src}">
                    </a>
                </div>
                <h4 class="text-uppercase ellipsis">${ele.title}</h4>
                <div class="figure-title ellipsis">${ele.desc}</div>
                <p>${ele.price}</p>
            </div>
            `).join("");

        $(`<div class="container-fluid star-rolling">
                <div class="row star-row">${tpl}</div>
            </div>`).appendTo("#star");
    }
    eventTurnPage() {
        let left = 1140;
        let index = 0;
        $(".arr-left").click(function (e) {
            e.preventDefault();
            index--;
            if (index < 0) {
                index = 0;
            }
            $(".star-row").css("left", -index * left);
        });
        $(".arr-right").click(function (e) {
            e.preventDefault();
            index++;
            if (index > 1) {
                index = 1;
            }
            $(".star-row").css("left", -index * left);
        });
    }
}

class List {
    constructor(data) {
        this.data = data;
    }
    init() {
        this.renderList();
    }
    renderList() {
        let tpl = this.data.map(ele => {
            let tmp = ele.map(ele =>
                `
                <div class="col-xs-3">
                    <div class="figure">
                        <a href="../html/goods_list.html" title="${ele.title}" target="_blank">
                            <img class="layz" src="${ele.src}" style="display: inline;">
                        </a>
                    </div>
                    <h4 class="text-uppercase ellipsis">${ele.title}</h4>
                    <div class="figure-title ellipsis">${ele.desc}</div>
                    <p class="price">${ele.price}</p>
                </div>
                `).join("");
            return `
                    <div class="container-fluid">
                        <div class="row">${tmp}</div>
                    </div>
                    `;
        });

        $(`${tpl[0]}`).appendTo("#television");
        $(`${tpl[1]}`).appendTo("#Refrigerator");
    }
}