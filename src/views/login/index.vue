<template>
    <div class="login-container">
        <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
            <h3 class="title">欢迎登陆</h3>
            <el-form-item prop="mobile">
                <span class="svg-container svg-container_login">
                    <svg-icon icon-class="user" />
                </span>
                <el-input name="mobile" type="text" v-model="loginForm.user.mobile" autoComplete="on" placeholder="mobile" />
            </el-form-item>
            <el-form-item prop="password">
                <span class="svg-container">
                    <svg-icon icon-class="password"></svg-icon>
                </span>
                <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="password">
                </el-input>
                <span class="show-pwd" @click="showPassword">
                    <svg-icon icon-class="eye" />
                </span>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">登陆</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import User from '@/model/User'

export default {
    name: 'login',
    data() {
        const user = new User() // user对象
        user.mobile = '17333333333'

        return {
            loginForm: {
                user,
                password: '111111'
            },
            loginRules: {
                mobile: [
                    // { required: true, trigger: "blur", validator: validatorOf(new Regex(/^1[34578]\d{9}$/, '无效的手机号')) }
                    { required: true, trigger: 'blur', validator: user.validatorOf('mobile') }
                ],
                password: [
                    { required: true, trigger: 'blur', message: '密码不能为空' }
                ]
            },
            loading: false,
            pwdType: 'password'
        }
    },
    methods: {
        showPassword() {
            if (this.pwdType === 'password') {
                this.pwdType = ''
            } else {
                this.pwdType = 'password'
            }
        },
        async handleLogin() {
            const valid = await this.$refs.loginForm.validate()
            if (valid) {
                this.loading = true
                try {
                    const userInfo = {
                        username: this.loginForm.user.mobile,
                        password: this.loginForm.password
                    }
                    await this.$store.dispatch('Login', userInfo)
                    this.$router.push({ path: '/' })
                } finally {
                    this.loading = false
                }
            }
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/mixin.scss";
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
    @include relative;
    height: 100vh;
    //   background-color: $bg;
    background: url(../../assets/loginBg.jpg) no-repeat center;
    input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
        -webkit-text-fill-color: #fff !important;
    }
    input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
    }
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;
    }
    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;
    }
    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
        &_login {
            font-size: 20px;
        }
    }
    .title {
        font-size: 26px;
        font-weight: 400;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
    }
    .login-form {
        background-color: $bg;
        position: absolute;
        // left: 0;
        right: 15%;
        top: 18%;
        width: 400px;
        padding: 35px 35px 15px 35px;
        margin: 120px auto;
        opacity: 0.6;
        &:hover {
            opacity: 0.8;
        }
    }
    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }
    .thirdparty-button {
        position: absolute;
        right: 35px;
        bottom: 28px;
    }
}
</style>
