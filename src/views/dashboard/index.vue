<template>
    <div class="dashboard-container" v-waves>
        <div>
            <div class="orbit-spinner inline">
                <div class="orbit"></div>
                <div class="orbit"></div>
                <div class="orbit"></div>
            </div>
            <div class="fingerprint-spinner inline">
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
            </div>
            <div class="breeding-rhombus-spinner inline">
                <div class="rhombus child-1"></div>
                <div class="rhombus child-2"></div>
                <div class="rhombus child-3"></div>
                <div class="rhombus child-4"></div>
                <div class="rhombus child-5"></div>
                <div class="rhombus child-6"></div>
                <div class="rhombus child-7"></div>
                <div class="rhombus child-8"></div>
                <div class="rhombus big"></div>
            </div>
        </div>
        <div v-randomColor class="dashboard-text">name:{{name}}</div>
        <div class="dashboard-text" v-randomBgColor>roles:
            <span v-for='role in roles' :key='role'>{{role}}</span>
        </div>
        <el-button class="ljt-btn tiffany-btn" @click="openModal">测试</el-button>
        <!-- <user-ext-table ref="table" type="selection" @selection-change="checkedChange" @row-click="rowClick"></user-ext-table> -->
        <role-table :draggable="true" ref="roleTable"></role-table>
        <template>
            <!-- <user-duty-base ref="base"></user-duty-base> -->
            <!-- <user-duty-manege ref="manege"></user-duty-manege> -->
            <!-- <user-ext-base ref="extBase"></user-ext-base> -->
            <!-- <user-ext-manege ref="extManage"></user-ext-manege> -->
            <role-base ref="roleBase"></role-base>
            <add-user ref="addUser"></add-user>
        </template>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import userDutyBase from "@/components/Dialog/UserDuty/base";
// import userDutyManege from "@/components/Dialog/UserDuty/manage";
// import userExtBase from "@/components/Dialog/UserExt/base"; // 用户扩展属性
// import userExtManege from "@/components/Dialog/UserExt/manage"; // 用户扩展属性
// import userExtTable from "@/components/Table/UserExt/index"; // 用户扩展属性
import roleTable from '@/components/Table/Role/index' // 角色
import roleBase from '@/components/Dialog/Role/base' // 角色
import addUser from '@/components/Dialog/User/chooseUserWithOrg'
import waves from '@/directive/waves'

export default {
    components: {
        // userDutyBase,
        // userDutyManege,
        // userExtBase,
        // userExtManege,
        // userExtTable,
        roleTable,
        roleBase,
        addUser
    },
    directives: { waves },
    name: 'dashboard',
    computed: {
        ...mapGetters(['name', 'roles'])
    },
    data() {
        return {
            test: '皮卡丘'
        }
    },
    methods: {
        openModal() {
            // this.$refs.base.open();
            // this.$refs.base.onClosed = args => {
            //     console.log(args);
            // };
            // this.$refs.extManage.open();
            // this.$refs.roleTable.remove();
            // this.$refs.roleBase.open();
            this.$refs.addUser.open()
            // let 皮卡丘 = [
            //     {
            //         id: 1,
            //         code: "YEZHU",
            //         name: "业主"
            //     },
            //     {
            //         id: 2,
            //         code: "SHIGONG",
            //         name: "施工"
            //     },
            //     {
            //         id: 3,
            //         code: "JIANLI",
            //         name: "监理"
            //     },
            //     {
            //         id: 4,
            //         code: "ZHIZAO",
            //         name: "制造"
            //     }
            // ];

            // let 杰尼龟 = {};
            // 皮卡丘.forEach(v => {
            //     杰尼龟[v.name] = v.code;
            // });

            // console.log(JSON.stringify(杰尼龟['监理']));
        },
        checkedChange() {},
        rowClick() {}
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
    &-container {
        margin: 30px;
    }
    &-text {
        font-size: 30px;
        line-height: 46px;
    }
}

.inline{
    display: inline-block;
}

.orbit-spinner,
.orbit-spinner * {
    box-sizing: border-box;
}

.orbit-spinner {
    height: 55px;
    width: 55px;
    border-radius: 50%;
    perspective: 800px;
}

.orbit-spinner .orbit {
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 50%;
}

.orbit-spinner .orbit:nth-child(1) {
    left: 0%;
    top: 0%;
    animation: orbit-spinner-orbit-one-animation 1200ms linear infinite;
    border-bottom: 3px solid #ff1d5e;
}

.orbit-spinner .orbit:nth-child(2) {
    right: 0%;
    top: 0%;
    animation: orbit-spinner-orbit-two-animation 1200ms linear infinite;
    border-right: 3px solid #ff1d5e;
}

.orbit-spinner .orbit:nth-child(3) {
    right: 0%;
    bottom: 0%;
    animation: orbit-spinner-orbit-three-animation 1200ms linear infinite;
    border-top: 3px solid #ff1d5e;
}

@keyframes orbit-spinner-orbit-one-animation {
    0% {
        transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
    }
    100% {
        transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
    }
}

@keyframes orbit-spinner-orbit-two-animation {
    0% {
        transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
    }
    100% {
        transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
    }
}

@keyframes orbit-spinner-orbit-three-animation {
    0% {
        transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
    }
    100% {
        transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
    }
}

.fingerprint-spinner,
.fingerprint-spinner * {
    box-sizing: border-box;
}

.fingerprint-spinner {
    height: 64px;
    width: 64px;
    padding: 2px;
    overflow: hidden;
    position: relative;
}

.fingerprint-spinner .spinner-ring {
    position: absolute;
    border-radius: 50%;
    border: 2px solid transparent;
    border-top-color: #ff1d5e;
    animation: fingerprint-spinner-animation 1500ms
        cubic-bezier(0.68, -0.75, 0.265, 1.75) infinite forwards;
    margin: auto;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
}

.fingerprint-spinner .spinner-ring:nth-child(1) {
    height: calc(60px / 9 + 0 * 60px / 9);
    width: calc(60px / 9 + 0 * 60px / 9);
    animation-delay: calc(50ms * 1);
}

.fingerprint-spinner .spinner-ring:nth-child(2) {
    height: calc(60px / 9 + 1 * 60px / 9);
    width: calc(60px / 9 + 1 * 60px / 9);
    animation-delay: calc(50ms * 2);
}

.fingerprint-spinner .spinner-ring:nth-child(3) {
    height: calc(60px / 9 + 2 * 60px / 9);
    width: calc(60px / 9 + 2 * 60px / 9);
    animation-delay: calc(50ms * 3);
}

.fingerprint-spinner .spinner-ring:nth-child(4) {
    height: calc(60px / 9 + 3 * 60px / 9);
    width: calc(60px / 9 + 3 * 60px / 9);
    animation-delay: calc(50ms * 4);
}

.fingerprint-spinner .spinner-ring:nth-child(5) {
    height: calc(60px / 9 + 4 * 60px / 9);
    width: calc(60px / 9 + 4 * 60px / 9);
    animation-delay: calc(50ms * 5);
}

.fingerprint-spinner .spinner-ring:nth-child(6) {
    height: calc(60px / 9 + 5 * 60px / 9);
    width: calc(60px / 9 + 5 * 60px / 9);
    animation-delay: calc(50ms * 6);
}

.fingerprint-spinner .spinner-ring:nth-child(7) {
    height: calc(60px / 9 + 6 * 60px / 9);
    width: calc(60px / 9 + 6 * 60px / 9);
    animation-delay: calc(50ms * 7);
}

.fingerprint-spinner .spinner-ring:nth-child(8) {
    height: calc(60px / 9 + 7 * 60px / 9);
    width: calc(60px / 9 + 7 * 60px / 9);
    animation-delay: calc(50ms * 8);
}

.fingerprint-spinner .spinner-ring:nth-child(9) {
    height: calc(60px / 9 + 8 * 60px / 9);
    width: calc(60px / 9 + 8 * 60px / 9);
    animation-delay: calc(50ms * 9);
}

@keyframes fingerprint-spinner-animation {
    100% {
        transform: rotate(360deg);
    }
}

.breeding-rhombus-spinner {
    height: 65px;
    width: 65px;
    position: relative;
    transform: rotate(45deg);
}

.breeding-rhombus-spinner,
.breeding-rhombus-spinner * {
    box-sizing: border-box;
}

.breeding-rhombus-spinner .rhombus {
    height: calc(65px / 7.5);
    width: calc(65px / 7.5);
    animation-duration: 2000ms;
    top: calc(65px / 2.3077);
    left: calc(65px / 2.3077);
    background-color: #ff1d5e;
    position: absolute;
    animation-iteration-count: infinite;
}

.breeding-rhombus-spinner .rhombus:nth-child(2n + 0) {
    margin-right: 0;
}

.breeding-rhombus-spinner .rhombus.child-1 {
    animation-name: breeding-rhombus-spinner-animation-child-1;
    animation-delay: calc(100ms * 1);
}

.breeding-rhombus-spinner .rhombus.child-2 {
    animation-name: breeding-rhombus-spinner-animation-child-2;
    animation-delay: calc(100ms * 2);
}

.breeding-rhombus-spinner .rhombus.child-3 {
    animation-name: breeding-rhombus-spinner-animation-child-3;
    animation-delay: calc(100ms * 3);
}

.breeding-rhombus-spinner .rhombus.child-4 {
    animation-name: breeding-rhombus-spinner-animation-child-4;
    animation-delay: calc(100ms * 4);
}

.breeding-rhombus-spinner .rhombus.child-5 {
    animation-name: breeding-rhombus-spinner-animation-child-5;
    animation-delay: calc(100ms * 5);
}

.breeding-rhombus-spinner .rhombus.child-6 {
    animation-name: breeding-rhombus-spinner-animation-child-6;
    animation-delay: calc(100ms * 6);
}

.breeding-rhombus-spinner .rhombus.child-7 {
    animation-name: breeding-rhombus-spinner-animation-child-7;
    animation-delay: calc(100ms * 7);
}

.breeding-rhombus-spinner .rhombus.child-8 {
    animation-name: breeding-rhombus-spinner-animation-child-8;
    animation-delay: calc(100ms * 8);
}

.breeding-rhombus-spinner .rhombus.big {
    height: calc(65px / 3);
    width: calc(65px / 3);
    animation-duration: 2000ms;
    top: calc(65px / 3);
    left: calc(65px / 3);
    background-color: #ff1d5e;
    animation: breeding-rhombus-spinner-animation-child-big 2s infinite;
    animation-delay: 0.5s;
}

@keyframes breeding-rhombus-spinner-animation-child-1 {
    50% {
        transform: translate(-325%, -325%);
    }
}

@keyframes breeding-rhombus-spinner-animation-child-2 {
    50% {
        transform: translate(0, -325%);
    }
}

@keyframes breeding-rhombus-spinner-animation-child-3 {
    50% {
        transform: translate(325%, -325%);
    }
}

@keyframes breeding-rhombus-spinner-animation-child-4 {
    50% {
        transform: translate(325%, 0);
    }
}

@keyframes breeding-rhombus-spinner-animation-child-5 {
    50% {
        transform: translate(325%, 325%);
    }
}

@keyframes breeding-rhombus-spinner-animation-child-6 {
    50% {
        transform: translate(0, 325%);
    }
}

@keyframes breeding-rhombus-spinner-animation-child-7 {
    50% {
        transform: translate(-325%, 325%);
    }
}

@keyframes breeding-rhombus-spinner-animation-child-8 {
    50% {
        transform: translate(-325%, 0);
    }
}

@keyframes breeding-rhombus-spinner-animation-child-big {
    50% {
        transform: scale(0.5);
    }
}
</style>
