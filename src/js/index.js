import $ from "jquery";
import {
    request,
    getQuery,
    init,
    loadMore
} from './common'
import "normalize.css";
import "../assets/font-awesome/scss/font-awesome.scss";
import "../scss/index.scss";
var start = 0,
    host = " http://api.jiantingzhe.com/",
    account = "18613227075",
    limit = 3;


init(`timelines?limit=${limit}&start=${start}`,function(length){
  start+=length;
});

$(".more").on("click", function() {
            loadMore(`timelines?limit=${limit}&start=${start}`,function(length){
              start = start+length;
            });
        })

        $(".container").on("click", ".sub", function(e) {
            var id = $(e.target).parent().parent().parent().attr("id"),
                number = $(e.target).parent().prev().children(".number")
            $(e.target).html('<i class="fa fa-spinner fa-spin fa-fw"></i>')
            var isSub = $(e.target).hasClass("button-active")
            console.log(isSub);
            if (isSub) {
                request(`channels/${id}/subscriptions`, `delete`, {}).then(function(data) {
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
