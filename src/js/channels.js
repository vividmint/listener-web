import $ from "jquery";
import {
    request,
    getQuery,
    init
} from './common'
import "normalize.css";
import "../assets/font-awesome/scss/font-awesome.scss";
import "../scss/index.scss";
var start = 0,
    host = " http://api.jiantingzhe.com/",
    account = "18613227075",
    limit = 3;

init (`channels?limit=${limit}&start=${start}`);

$(".more").on("click", function() {
    $.getJSON(`${host}users/${account}/channels?limit=${limit}&start=${start}`, function functionName(data) {
        console.log(data);

        var buttonText = "",
            buttonActive = "";

        if (data.list.length > 0) {
            var listHtml = '';
            for (var i = 0; i < data.list.length; i++) {
                if (data.list[i].following == true) {
                    buttonText = "√ 已监听"
                    buttonActive = "button-active"
                } else {
                    buttonText = "+ 监听"
                    buttonActive = ""
                }
                listHtml = listHtml + `<div class="channel" id=${data.list[i].id}>
                        <div class="header">
                            <div class="header-left">
                                <div class="name"><a href="/detail.html?id=${data.list[i].id}">${data.list[i].name}</a></div>
                                <div class="number">${data.list[i].followers_count}人关注</div>
                            </div>
                            <div class="header-right">
                                <button class="button sub ${buttonActive}">${buttonText}</button>
                            </div>
                        </div>
                        <div class="footer">${data.list[i].description}</div>
                    </div>`
            }
            start = start + data.list.length
            $(".list").append(listHtml);
            $(".more").removeClass("disable")
        } else {
            $(".more").addClass("disable")
            $(".hasMore").append(`<div class = "noMore">没有更多了</div>`)
                // console.log("b")
        }
    });

});

$(".container").on("click", ".sub", function(e) {
    var id = $(e.target).parent().parent().parent().attr("id"),
    number = $(e.target).parent().prev().children(".number")
    $(e.target).html('<i class="fa fa-spinner fa-spin fa-fw"></i>')
    var isSub = $(e.target).hasClass("button-active")
    console.log(isSub);
    if (isSub) {
        request(`channels/${id}/subscriptions`, `delete`, {
        }).then(function(data) {
            $(e.target).removeClass("button-active")
            $(e.target).text("+ 监听")
            number.text(`${data.channel.followers_count}人关注`)
            console.log(data);
        }).catch(function(error) {
            console.log(error);
        })
    } else {
        request(`channels/${id}/subscriptions`, `post`, {
            "allow_push": true
        }).then(function(data) {
            $(e.target).addClass("button-active")
            $(e.target).text("√ 已监听")
            number.text(`${data.channel.followers_count}人关注`)
            console.log(data);
        }).catch(function(error) {
            console.log(error);
        })
    }
})
