import axios from "axios";
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
axios.interceptors.request.use(function (config) {
    // 在post请求前统一添加X-CSRFToken的header信息
    let cookie = document.cookie;
    if(cookie && config.method == 'post'){
      let csrftoken = getCookie('csrftoken');
      // alert("csrftoken:"+csrftoken)
      config.headers['X-CSRFToken'] = csrftoken;
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });