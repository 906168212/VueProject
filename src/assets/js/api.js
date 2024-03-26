const User = {
    "name": null,
    "role": null,
    "expireTime": null
}

let logoutFlag = false

const token =sessionStorage.getItem("access_token");

function logout(){
    axios.get('http://localhost:88/api/auth/logout',{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(({data})=>{
        if (data.code === 200){
            logoutFlag = true
            window.location.href ='/login.html'
        }else
        {
            log.error(data.message)
        }
    })
    window.onunhandledrejection = function (error){
        log.error(error.reason.code)
    }
}


function username(){
    User.name = getQueryString("username")
    User.role = getQueryString("role")
    User.expireTime = getQueryString("expireTime")
    if (User.name === null){
        alert("请先登录！")
        window.location.href='/login.html'
    }else {
        document.getElementById('name').innerText = User.name
        document.getElementById('role').innerText = User.role
    }
    window.onunhandledrejection = function (error){
        log.error(error.reason.code)
    }
}




function getQueryString(name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    const r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}


