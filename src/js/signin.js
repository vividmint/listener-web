import $ from "jquery";
import {
    request,
    getQuery
} from './common'
import "normalize.css";
import "../assets/font-awesome/scss/font-awesome.scss";
import "../scss/signin.scss";
import 'notie/src/notie.scss';
import notie from 'notie';

document.querySelector(".container").innerHTML = `  <div class="header">
      <div class="left">
          <div class="phone-icon">
              <i class="fa fa-user"></i>
          </div>
          <input type="text" id="tel" class="input" autofocus>
          <button class="button valid">获取验证码</button>
      </div>
  </div>
  <div class="footer">
      <div class="left">
          <div class="password-icon">
              <i class="fa fa-lock"></i>
          </div>
          <input type="text" id="validCode" class="input">
      </div>
  </div>
  <div class="signin">
      <button class="button login">登录</button>
  </div>`
var tel = $.trim($('#tel').val());
console.log(tel);

$(".valid").on("click", async function() {
    tel = $.trim($('#tel').val());
    console.log(`tel/${tel}/code`);

    if (tel == "") {
        notie.alert(3, "手机号码不能为空！", 3);
        return false;
    }

    var r = await request(`tel/${tel}/code`, "post");
    console.log(r);
    var second = 4;
    var timer = setInterval(function() {
        console.log(second);
        $(".valid").text(`${second}s后重新发送`)
        second = second - 1;
        if (second === 0) {
            console.log('');
            clearInterval(timer);
            $(".valid").text(`重新发送`)
            $(".valid").removeClass("disabled")
        }
    }, 1000)
    $(".valid").text(`5s后重新发送`)
    $(".valid").addClass("disabled")
})

$(".login").on("click", async function() {

        var validCode = $('#validCode').val();
        tel = $('#tel').val();
        console.log(`users/${tel}/sessions`);
        try {
            var loginR = await request(`users/${tel}/sessions`, "post", {
                "token": validCode,
                "type": "tel"
            });
        } catch (e) {
            if (e.id === 'not_found') {
                try {
                    var userR = await request(`users`, "post", {
                        "account": tel,
                        "token": validCode,
                        "type": "tel"
                    })
                    var userLoginR = await request(`users/${tel}/sessions`, "post", {
                        "token": userR.token,
                        "type": "tel"
                    });
                    localStorage.setItem("token", userLoginR.token)
                    location.href = `/index.html`;

                } catch (ee) {
                    console.log(ee);

                    if (ee.id === "unauthorized") {
                        notie.alert("验证码错误！")
                    }
                    return;
                }
                console.log(userLoginR);

                return;
            }
            console.log(e);
            return;
        }
        console.log(loginR);


    })
    //
    // setTimeout(function(){
    //   console.log("a");
    // },1000);
    //
    // setTimeout(function(){
    //   console.log("b");
    // },2000);
