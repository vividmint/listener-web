import $ from "jquery";
import {
    request,
    getQuery
} from './common'
import "normalize.css";
import "../assets/font-awesome/scss/font-awesome.scss";
import "../scss/common.scss";
import "../scss/users.scss";

var host = "http://192.168.31.172:3000/",
    account = "18613227075";

$.getJSON(`${host}users/${account}/channels`, function(data, status) {
    if (status != "success") {
        alert(data.id);
        return;
    }
    var containerHtml = `<div class="user-detail">
          <div class="avatar"><img src="http://ww4.sinaimg.cn/mw690/006bEpFbjw8eztmzf8bphj30yi0yiabf.jpg" />
          </div>
          <div class="user-name">小明plus
          </div>
      </div>
         <a href="/channels.html">
         <div class="items">
          <div class="left">
              <div class="channels">全部主题</div>
          </div>
          <div class="right">
              <div class="enter-icon"><i class="fa fa-chevron-right"></i></div>
          </div>
      </div>
        </a>`

    $(".container").html(containerHtml);

}).catch(function(e) {
    $(".container").text("没有找到该用户！")

});
