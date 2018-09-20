
window.onload = function () {
    var aniShow = "pop-in";
    //a标签点击事件
    mui('body').on('tap', 'a', function() {
        if(this.classList.contains('mui-action-back')==false&&this.classList.contains('noLink')==false){
            var id = this.getAttribute("data-wid");
            if(!id) {
                id = this.getAttribute('href');
            }
            var href = this.getAttribute('href');

            //非plus环境，直接走href跳转
            if(!mui.os.plus){
                location.href = href;
                return;
            }

            var titleType = this.getAttribute("data-title-type");

            var webview_style = {
                popGesture: "close"
            }
            var extras = {};


            if(titleType == "native") {
                webview_style.statusbar = {
                    background: "#f7f7f7"
                }

                mui.openWindowWithTitle({
                    url:href,
                    id:id,
                    styles:webview_style,
                    show:{
                        event:"loaded",
                        extras:extras
                    },
                    waiting: {
                        autoShow: false
                    }
                },{
                    title:{
                        text:this.innerText.trim()
                    },
                    back:{
                        image:{
                            base64Data:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAb1BMVEUAAAAAev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8AAACubimgAAAAI3RSTlMAGfUTGfQTGPMSGPIYGhgaGBsXGxcbFxwXHBccFhwWHRYdHWufDPQAAAABYktHRACIBR1IAAAAB3RJTUUH4QETEBwooeTlkQAAAJVJREFUSMft1EkSgkAQRNFGUXFWHBDBibr/HTUwD5B/48Ig1y+io7u6MqUhf5hsNEY+j5hMgZ/FJ8Xc9ovos3T96utjbfqN/Nb0O/m96Uv5g+mP8ifTn+Ur01/ka9Nf5RvTt/I309/lH6Z/yr9Mn+Q71/MT8B34K/E58Enzv8R/K98HvnF8p3lr8F7izce7lbf3kJ/lDQp9HdBhgg3PAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTAxLTE5VDE2OjI4OjQwKzA4OjAwpTDFwQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wMS0xOVQxNjoyODo0MCswODowMNRtfX0AAAAASUVORK5CYII="
                        }
                    }
                });
            } else if(href && ~href.indexOf('.html')) {
                var extras = {};
                if(titleType && titleType=="transparent_native") {
                    webview_style.titleNView = {
                        'backgroundColor': '#f7f7f7',
                        'titleText': this.innerHTML.trim(),
                        'titleColor': '#000000',
                        type: 'transparent',
                        autoBackButton: true,
                        splitLine: {
                            color: '#cccccc'
                        }
                    }
                }else {
                    webview_style.statusbar = {
                        background: "#f7f7f7"
                    }
                }

                var webview = plus.webview.create(this.href,id,webview_style,extras);
                webview.addEventListener("titleUpdate",function () {
                    setTimeout(function () {
                        webview.show(aniShow,150);
                    },100);
                });
            }
        }

    });




    /* slider */
    var slider = mui("#slider");
    slider.slider({
        interval: 1500
    });
    /* /slider */

//顶部下拉菜单相关事件
    $(document).on('click', 'body', function(event) {
        event.stopPropagation();
        if ($(event.target).closest('.rightmenu').length == 0) {
            /*$('.rightmenu>ul>li').removeClass();*/
            $('.rightmenu .menulist').hide(10);
        }
    });
/*    $(window).on('scroll', function(event) {
        event.stopPropagation();
        $('.rightmenu ul').hide(10);
    });*/
    $(document).on('click', '.rightmenu', function() {
        $(this).find('ul').toggle(10);
    });
    $(document).on('click', '.rightmenu .menucell', function(event) {
        event.stopPropagation();
        $('.rightmenu .menulist').hide(10);
    });


//滚动导航启动
    var navSwiper = new Swiper('nav.scrollnav .swiper-container',{
        scrollContainer: true
    })
    $('nav').on('click','.nav-btnr',function(){
        navSwiper.swipeNext();
    });
};
//浏览器字体自适应
(function(doc, win) {
    var _root = doc.documentElement,
        resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize',
        resizeCallback = function() {
            var clientWidth = _root.clientWidth,
                fontSize = 100;
            if (!clientWidth) return;
            if (clientWidth < 750) {
                fontSize = 100 * (clientWidth / 375);
            } else {
                fontSize = 100 * (750 / 375);
            }
            _root.style.fontSize = fontSize + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvent, resizeCallback, false);
    doc.addEventListener('DOMContentLoaded', resizeCallback, false);
})(document, window);

