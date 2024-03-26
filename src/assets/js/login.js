const LoginAxios =  axios.create({
    baseURL: 'http://localhost:88/api/auth',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }
})

const Login = new Vue({
    el:'#Login__inner',
    data(){
        return{
            userInfo:{
                username:'',
                password:''
            },
            errorInfo:'',
            InfoValid:false,
            ShowPassword:false,
            AgreeStatus:false,
        }
    },
    methods:{
        clickAgree(){
            this.AgreeStatus = !this.AgreeStatus;
        },
        hideUsernameError(){
            this.InfoValid = false;
        },
        checkAllError(event){
            if(InputNone(this.userInfo.username)||InputNone(this.userInfo.password)){
                this.errorInfo = '内容不得为空';
                this.InfoValid = true;
                event.preventDefault()
            }else {
                this.errorInfo = '';
                this.InfoValid = false;
            }
        },
        clickToRegister(){
          window.location.href = '/register.html'
        },
        submitForm(){
            LoginAxios.post('/login',{
                username: this.userInfo.username,
                password: this.userInfo.password
            }).then(({data}) =>{
                if(data.code === 200){
                    this.InfoValid = false;
                    this.errorInfo = '';
                    sessionStorage.setItem("access_token",data.data.token);
                    const queryParams = {
                        username: encodeURIComponent(data.data.username),
                        role: encodeURIComponent(data.data.role),
                        expireTime: encodeURIComponent(data.data.expireTime)
                    }
                    window.location.href = '/index.html?'
                            +Object.entries(queryParams).map(([key,value]) => `${key}=${value}`).join('&');
                }else {
                    this.InfoValid = true;
                    this.errorInfo = data.message;
                }
            }).catch(handleRequestError)
        }
    }
})

