import $ from "jquery";
import {
    request,
    getQuery
} from './common'
import "normalize.css";
import "../assets/font-awesome/scss/font-awesome.scss";
import "../scss/common.scss";
import "../scss/detail.scss";
const alias = getQuery('id'),
    account = "18613227075";
request(`channels/${alias}?user_id=${account}`).then(function(data) {
    console.log(data)
    var buttonText = "",
        buttonActive = "";

    if (data.following == true) {
        buttonText = "√ 已监听"
        buttonActive = "button-active"
    } else {
        buttonText = "+ 监听"
    }
    var detailHtml = `<div class="header">
        <div class="header-left"><img src="${data.avatar}"></div>
        <div class="header-right">
            <div class="name">${data.name}</div>
            <div class="description">${data.description}</div>
        </div>
    </div>
    <div class="footer">
        <div class="footer-left">
            <div class="number">${data.followers_count}人关注</div>
        </div>
        <div class="footer-right">
            <i class="fa fa-cog setting-icon"></i>
            <button class="button sub ${buttonActive}">${buttonText}</button>
        </div>
    </div>`

    $(".detail").html(detailHtml);

}).catch(function(e) {
    $(".detail").text("没有找到该主题！")

});
$(".container").on("click", ".sub", function() {
    $(".sub").html('<i class="fa fa-spinner fa-spin fa-fw"></i>')
    var isSub = $(".sub").hasClass("button-active")
    console.log(isSub);
    if (isSub) {
        request(`channels/${alias}/subscriptions`, `delete`, {
            "user_id": account
        }).then(function(data) {
            $(".sub").removeClass("button-active")
            $(".sub").text("+ 监听")
            $(".number").text(`${data.channel.followers_count}人关注`)
            console.log(data);
        }).catch(function(error) {
            console.log(error);
        })
    } else {
        request(`channels/${alias}/subscriptions`, `post`, {
            "user_id": account,
            "allow_push": true
        }).then(function(data) {
            $(".sub").addClass("button-active")
            $(".sub").text("√ 已监听")
            $(".number").text(`${data.channel.followers_count}人关注`)
            console.log(data);
        }).catch(function(error) {
            console.log(error);
        })
    }
})
