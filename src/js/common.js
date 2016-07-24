import $ from "jquery";
var host = "http://192.168.31.172:3000/";
export var request = function(url, method = "get", body) {
    console.log(url);
    return new Promise(function(s, f) {
        var headers = {
            "Content-Type": "application/json"
        };

        if (localStorage.getItem('token')) {
            headers.Authorization = localStorage.getItem('token')
        }
        var options = {
            method: method,
            headers: headers
        }
        if (method !== 'get' && method !== 'head') {
            options.body = JSON.stringify(body);
        }

        fetch(`${host}${url}`, options).then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    s(data);
                    return;
                }).catch(function(e) {
                    f(e);
                    return;
                })
            } else {

                response.json().then(function(data) {
                    f(data);
                    return;
                }).catch(function(e) {
                    f(e);
                    return;
                })
            }
        }).catch(function(e) {
            // console.log(e);
            f(e);
            return;
        })
    });
}

export var getQuery = function(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export var init = async function(url,callback) {
    var start = 0,
        host = "http://192.168.31.172:3000/",
        account = "18613227075",
        limit = 3;
    var token = localStorage.getItem("token");
    if (!token) {
        location.href = `/signin.html`;
        return;

    }
    try {
        var data = await request(url);
    } catch (e) {
        console.log(e);
        return;
    }
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
        $(".list").html(listHtml);
        $(".more").removeClass("disable");
        callback(data.list.length);
    } else {
        $(".list").text("目前没有新主题");
        callback(0);
    }
}


export var loadMore = async function(url,callback) {
var token = localStorage.getItem("token");
    var data = await request(url)
    if (data.list.length > 0) {
        var listHtml = '';
        for (var i = 0; i < data.list.length; i++) {
            listHtml = listHtml + `<div class="channel" id=${data.list[i].id}>
              <div class="header">
                  <div class="header-left">
                      <div class="name"><a href="/detail.html?id=${data.list[i].id}">${data.list[i].name}</a></div>
                      <div class="number">${data.list[i].followers_count}人关注</div>
                  </div>
                  <div class="header-right">
                      <button class="button sub">+ 监听</button>
                  </div>
              </div>
              <div class="footer">${data.list[i].description}
              </div>
          </div>`
        }
        $(".list").append(listHtml);
        $(".more").removeClass("disable");
        callback(data.list.length);

    } else {
        $(".more").addClass("disable")
        $(".hasMore").append(`<div class = "noMore">没有更多了</div>`)
        callback(0);
            // console.log("b")
    }

};
