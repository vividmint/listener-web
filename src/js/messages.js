import $ from "jquery";
import {
    request,
    getQuery
} from './common'
import "normalize.css";
import "../assets/font-awesome/scss/font-awesome.scss";
import "../scss/common.scss";
import "../scss/messages.scss";
import moment from 'moment';
moment.locale('zh-cn', {
    relativeTime: {
        future: " %s",
        past: "%s前",
        s: "秒",
        m: "a分钟",
        mm: "%d分钟",
        h: "一个小时",
        hh: "%小时",
        d: "一天",
        dd: "%d天",
        M: "a月",
        MM: "%d月",
        y: "a年",
        yy: "%d年"
    }
});
var start = 0,
    host = "http://192.168.31.172:3000/",
    account = "18613227075",
    limit = 4;
$.getJSON(`${host}users/${account}/messages?limit=${limit}&start=${start}`, function(data, status) {
    console.log(data);
    if (status != "success") {
        alert(data.id);
        return;
    }
    var listHtml = '';
    if (data.list.length > 0) {
        for (var i = 0; i < data.list.length; i++) {
            listHtml = listHtml + `<div class="channel">
            <div class="header">
                <div class="header-left"><a href="/detail.html?id=${data.list[i].channel.id}"><img src="${data.list[i].channel.avatar}"></a></div>
                <div class="header-right">
                <div class="name"><a href="/detail.html?id=${data.list[i].channel.id}">${data.list[i].channel.name}</a></div>
                <div class="time">${moment(data.list[i].channel.created*1000).fromNow()}</div>
                </div>
            </div>
            <div class="footer">${data.list[i].text}
            </div>
        </div>`

        }
        start = start + data.list.length
        $(".list").html(listHtml);
        $(".more").removeClass("disable")
    } else {
        $(".list").text("目前没有新消息")
    }

});

$(".more").on("click", function() {
    $.getJSON(`${host}users/${account}/messages?limit=${limit}&start=${start}`, function(data) {
        console.log(data);
        var listHtml = '';
        if (data.list.length > 0) {
            for (var i = 0; i < data.list.length; i++) {
                listHtml = listHtml + `<div class="channel">
                <div class="header">
                    <div class="header-left"><a href="/detail.html?id=${data.list[i].channel.id}"><img src="${data.list[i].channel.avatar}"></a></div>
                    <div class="header-right">
                    <div class="name"><a href="/detail.html?id=${data.list[i].channel.id}">${data.list[i].channel.name}</a></div>
                    <div class="time">${moment(data.list[i].channel.created*1000).fromNow()}</div>
                    </div>
                </div>
                <div class="footer">${data.list[i].text}
                </div>
            </div>`

            }
            start = start + data.list.length
            $(".list").append(listHtml);
            $(".more").removeClass("disable")
        } else {
            $(".more").addClass("disable")
            $(".hasMore").append(`<div class = "noMore">没有更多了</div>`)
        }
    });
});
