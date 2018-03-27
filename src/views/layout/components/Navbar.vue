<template>
    <el-menu class="navbar" mode="horizontal">
        <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
        <breadcrumb></breadcrumb>
        <div>
            <!-- <el-dropdown class="fullScreen">
                <i class="bimicon-full"></i>
            </el-dropdown> -->
            <div class="lockScreen">
                <i class="bimicon-lock"></i>
            </div>
            <div class="news">
                <div class="round">
                    <span>1</span>
                </div>
                <i class="bimicon-noticefill"></i>
            </div>
            <div class="skinPeeler" @click="skinInfo">
                <i class="bimicon-clothes"></i>
            </div>
            <el-dropdown class="avatar-container" trigger="click">
                <div class="avatar-wrapper">
                    <img class="user-avatar" :src="avatar">
                    <!-- +'?imageView2/1/w/80/h/80' -->
                    <i class="el-icon-caret-bottom"></i>
                </div>
                <el-dropdown-menu class="user-dropdown" slot="dropdown">
                    <router-link class="inlineBlock" to="/">
                        <el-dropdown-item>
                            首页
                        </el-dropdown-item>
                    </router-link>
                    <el-dropdown-item divided>
                        <span @click="logout" style="display:block;">登出</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <!-- 换肤弹窗 -->
        <!-- <template>
            <theme-base ref="themeBase"></theme-base>            
        </template>         -->
    </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
// 引换肤组件
import themeBase from '@/components/Dialog/Theme/base'

export default {
    components: {
        Breadcrumb,
        Hamburger,
        themeBase
    },
    computed: {
        ...mapGetters([
            'sidebar',
            'avatar'
        ])
    },
    methods: {
        skinInfo() {
        //     this.$refs.themeBase.open()
        //     this.$refs.themeBase.onClosed = args => {
        //     }
        },
        toggleSideBar() {
            this.$store.dispatch('ToggleSideBar')
        },
        logout() {
            this.$store.dispatch('LogOut').then(() => {
                location.reload() // 为了重新实例化vue-router对象 避免bug
            })
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
    height: 60px;
    line-height: 60px;
    border-radius: 0px !important;
    .hamburger-container {
        line-height: 66px;
        height: 60px;
        float: left;
        padding: 0 10px;
    }
    // .screenfull {
    //     position: absolute;
    //     right: 90px;
    //     top: 16px;
    //     color: red;
    // }
    .fullScreen{
        position: absolute;
        bottom: -8px;
        right: 210px;
        .bimicon-full{
            font-size: 24px;
            color: #409EFF;
            &:hover{
                color: red;
                cursor: pointer;
            }
        }        
    }
    .lockScreen{
        position: absolute;
        bottom: -8px;
        right: 170px;
        .bimicon-lock{
            font-size: 24px;
            color: #409EFF;
            &:hover{
                color: red;
                cursor: pointer;
            }
        }        
    }
    .news{
        position: absolute;
        bottom: -8px;
        right: 130px;
        .round{
            position: absolute;
            width: 12px;
            height: 12px;
            background-color: red;
            border-radius: 12px;
            top: 10px;
            left: 12px;
            span{
                position: relative;
                bottom: 24px;
                left: 2px;
                color: #ffffff;
                font-size: 10px;
            }
        }
        .bimicon-noticefill{
            font-size: 24px;
            // color: #6E7B8B;
            color: #409EFF;
            &:hover{                
                color:red;
                cursor: pointer;
            }
        }       
    }
    .skinPeeler{
        position: absolute;
        bottom: -8px;
        right: 90px;
        .bimicon-clothes{
            font-size: 24px;
            // background: -webkit-linear-gradient(left top,red,orangered,orange,yellow,lightblue,blue,navy,midnightblue);
            // background: -o-linear-gradient(bottom right,red,orangered,orange,yellow,lightblue,blue,navy,midnightblue);
            // background: -moz-linear-gradient(bottom right, red,orangered,orange,yellow,lightblue,blue,navy,midnightblue);
            // background: linear-gradient(to bottom right,red,orangered,orange,yellow,Lavender,violet,pink,lightblue,blue,navy,midnightblue); 
            // FILTER:progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#b8c4cb,endColorStr=red);

            background: -webkit-linear-gradient(left top, red,blue);
            background: -o-linear-gradient(bottom right, red,blue);
            background: -moz-linear-gradient(bottom right, red ,blue);
            background: linear-gradient(to bottom right, red,blue); 

            // background: -webkit-linear-gradient(left top,yellow, pink ,red,green,blue);
            // background: -o-linear-gradient(bottom right,yellow,pink ,red,green,blue);
            // background: -moz-linear-gradient(bottom right,yellow,pink,red ,green,blue);
            // background: linear-gradient(to bottom right,yellow,pink ,red,green,blue); 
            &:hover{
                background: -webkit-linear-gradient(left top,red,orange,yellow,green,blue,indigo,violet);
                background: -o-linear-gradient(bottom right,red,orange,yellow,green,blue,indigo,violet);
                background: -moz-linear-gradient(bottom right,red,orange,yellow,green,blue,indigo,violet);
                background: linear-gradient(to bottom right, red,orange,yellow,green,blue,indigo,violet); 
                cursor: pointer;
            }
        }
    }
    
    .avatar-container {
        height: 60px;
        display: inline-block;
        position: absolute;
        right: 35px;
        bottom: -2px;
        .avatar-wrapper {
            cursor: pointer;
            margin-top: 9px;
            position: relative;
            .user-avatar {
                width: 40px;
                height: 40px;
                border-radius: 10px;
            }
            .el-icon-caret-bottom {
                position: absolute;
                right: -20px;
                top: 25px;
                font-size: 12px;
            }
        }
    }
}
</style>

