// 禁用回退按钮
history.pushState(null, null, location.href);
window.onpopstate = function(event) {
    history.go(1);
};
