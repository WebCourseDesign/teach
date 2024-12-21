<template>
  <div style="height: 100%;overflow: scroll;">
    <!-- 当登录成功后显示此DIV -->
    <div style="height: 100%" v-if="
      userInfo.username &&
      userInfo.username.length > 0 &&
      systemConfig.showLeftMeun
    ">
      <el-container style="height: 100%">
        <el-header class="header" style="height: 70px; position: relative;">

          <!-- 从正中央移动到左侧 -->
          <div class="logo-container animate-slide">
            <img src="/logo.png" alt="Logo" class="logo" />
            <span class="welcome-text">教学管理系统</span>
          </div>

          <!-- 在最右侧，逐渐出现 -->
          <div class="right-content animate-fade">
            <el-dropdown @command="handleCommand">
              <div style="display:flex; align-items: center;">
                <img class="icon1" referrerpolicy="no-referrer" :src="imgStr1 || defaultAvatar" alt="Profile" />
                <span class="info" style="margin-left: 10px;color: aliceblue;">
                  {{ userInfo.perName }}({{ userInfo.username }})
                </span>
              </div>
              <template #dropdown>
                <el-dropdown-menu slot="dropdown" class="dropdown-menu">
                  <el-dropdown-item command="profile"
                    v-if="appStore.$state.userInfo.roles.includes('ROLE_STUDENT')">个人中心</el-dropdown-item>
                  <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
                  <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

            <div class="section4 flex-col"></div>

            <div class="section5" @click="refreshPage">
              <div class="shuxinImage"></div>
              <div class="shuaxin">刷新</div>
            </div>

            <div class="section6" @click="logout()">
              <div class="tuichuImage"></div>
              <div class="shuaxin">退出</div>
            </div>
          </div>
        </el-header>

        <!-- 主页面的中心区域 -->
        <el-container>
          <!-- 竖型导航栏 -->
          <el-aside style="width: 150px; height: 100%">
            <el-scrollbar class="scrollar animate-fade">
              <el-menu background-color="#409EFF" text-color="#ffffff" active-text-color="#ffd04b"
                :default-active="activeMenu" :default-openeds="openMenus" class="el-menu-vertical-demo" router
                @open="handleOpen" @close="handleClose">
                <!-- 动态生成一级菜单和二级菜单 -->
                <template v-for="(v, i) in systemConfig.naviList" :key="i">
                  <!-- 如果该一级菜单有子菜单 -->
                  <template v-if="v.sList && v.sList.length > 0">
                    <el-sub-menu :index="v.id" :class="['menu-item-animate', `delay-${i}`]">
                      <template #title>
                        <i class="el-icon-location"></i>
                        <span>{{ v.title }}</span>
                      </template>
                      <!-- 遍历该一级菜单的子菜单项 -->
                      <el-menu-item v-for="(subItem, j) in v.sList" :key="j" :index="'/' + subItem.id"
                        @click="routerName(subItem.name)" :class="['menu-item-animate', `delay-${i}-${j}`]">
                        {{ subItem.title }}
                      </el-menu-item>
                    </el-sub-menu>
                  </template>

                  <!-- 如果该一级菜单没有子菜单 -->
                  <template v-else>
                    <el-menu-item :index="'/' + v.id" @click="routerName(v.name)"
                      :class="['menu-item-animate', `delay-${i}`]">
                      <i class="el-icon-menu"></i>
                      <span>{{ v.title }}</span>
                    </el-menu-item>
                  </template>
                </template>
              </el-menu>
            </el-scrollbar>
          </el-aside>

          <!-- 页面内容显示区域 -->
          <el-main>
            <router-view style="overflow: scroll;" />
          </el-main>
        </el-container>
      </el-container>
    </div>
    <!--  当登录前显示此DIV router-view 控制显示VUE页面，VUE会根据路由路径不同.vue文件的内容， 初始路由路径为/，显示Login.vue内容 -->
    <div style="height: 100%" v-else>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
// 引入使用的组件、函数和数据接口
import { mapState } from "pinia";
import { defineComponent, ref } from "vue";
import { useAppStore } from "~/stores/app";
import router from "~/router";
import { type MenuInfo } from "~/models/general";
import { formatTime } from "~/tools/comMethod";
import { getStudentInfo } from "~/services/personServ";
import { generalRequest } from "~/services/genServ";
import { getPhotoImageStr } from "~/services/infoServ";
// vue3中新增了 defineComponent ，它并没有实现任何的逻辑，只是把接收的 Object 直接返回，它的存在就是完全为了服务 TypeScript 而存在的。
// 我都知道普通的组件就是一个普通的对象，既然是一个普通的对象，那自然就不会获得自动的提示，

const info = ref();
const imgStr = ref();

export default defineComponent({


  // templte中使用的数据
  data: () => ({
    activeMenu: "/MainPage",
    openMenus: JSON.parse(localStorage.getItem('openMenus') || '[]') as string[],
    isCollapse: false,
    leList: [] as MenuInfo[],
    funId: "",
    showLeftList: true,
    timer: null as any,
    currentTime: formatTime(new Date()),
    appStore: useAppStore(),
    defaultAvatar: '/user.png',
    imgStr1: imgStr
  }),
  //生命周期函数  mounted() 在实例挂载之后调用， 设置定期刷新控制台时间
  async mounted() {
    if (this.timer) {
      clearInterval(this.timer);
    } else {
      this.timer = setInterval(() => {
        this.currentTime = formatTime(new Date());
      }, 1000);
    }
    const store = useAppStore();

    // 只在首次加载时进行重定向，而不是每次刷新都重定向
    if (!sessionStorage.getItem('initialLoadDone')) {
      if (
        store.userInfo.username &&
        store.userInfo.username.length > 0 &&
        store.systemConfig.showLeftMeun
      ) {

        if (store.userInfo.roles == "ROLE_STUDENT") {
          router.push({ path: "/StudentMainPage" });
          const res = getStudentInfo(store.$state.userInfo.id - 1);
        }
        else if (store.userInfo.roles == "ROLE_TEACHER") {
          router.push({ path: "/TeacherMainPage" });
        }
        else router.push({ path: "/MainPage" });
      } else {
        router.push({ path: "/Login" });
      }
      sessionStorage.setItem('initialLoadDone', 'true');

      const res = await generalRequest("/api/base/getByUsername", {
        username: store.$state.userInfo.username,
      })
      info.value = res.data;
      console.log("mark1" + info.value)
      if (info.value.personId) {
        const photoRes = await getPhotoImageStr(info.value.personId + '.jpg')
        imgStr.value = photoRes.data // 使用 .value 赋值
        if (imgStr.value != null) imgStr.value = imgStr.value.replace('data:image/png;base64', 'data:image/jpeg;base64')
      }

    }
  },

  // 生命周期函数  unmounted() 在实例销毁之后调用，清除定期刷新控制台时间
  unmounted() {
    clearInterval(this.timer);
  },
  // 计算属性 用于计算属性，计算属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算 当用户信息和菜单更新后页面会重新显然，显示主界面
  computed: {
    ...mapState(useAppStore, ["systemConfig"]),
    ...mapState(useAppStore, ["userInfo"]),
  },
  watch: {
    // 添加这个watch
    openMenus: {
      handler(newVal) {
        localStorage.setItem('openMenus', JSON.stringify(newVal));
      },
      deep: true
    },
    userInfo: {
      async handler(newVal, oldVal) {
        const store = useAppStore();
        const res = await generalRequest("/api/base/getByUsername", {
          username: store.$state.userInfo.username,
        })
        info.value = res.data;
        console.log("mark1" + info.value)
        if (info.value.personId) {
          const photoRes = await getPhotoImageStr(info.value.personId + '.jpg')
          imgStr.value = photoRes.data // 使用 .value 赋值
          if (imgStr.value != null) imgStr.value = imgStr.value.replace('data:image/png;base64', 'data:image/jpeg;base64')
        }

      },
      deep: true
    }
  },
  methods: {
    handleCommand(command) {
      if (command === "profile") {
        router.push({ path: "/StudentMainPage" });
      } else if (command === "changePassword") {
        router.push({ path: "/Password" });
      } else if (command === "logout") {
        this.logout();
      }
    },
    // 退出登录
    logout() {
      imgStr.value = null;
      localStorage.setItem('openMenus', '[]');
      const store = useAppStore();
      store.logout();
      router.push({ path: "/Login" });
    },
    // 获取二级菜单
    getSecondList(id: number) {
      const store = useAppStore();
      store.setLeftList(id);
      router.push({ path: "/MainPage" });
    },
    // 路由跳转 如果路由名为ProjectHtml或者ProjectVideo则打开新的窗口 其他的路由跳转到对应的页面
    routerName(name: string) {
      if (name == null || name == undefined || name == "") {
        return;
      }
      if (name == "ProjectHtml") {
        this.openProjectHtml();
        return;
      }
      if (name == "ProjectVideo") {
        this.openProjectVideo();
        return;
      }
      router.push({ path: "/" + name });
    },
    // 打开新窗口 显示projectDoc.html内容，这个文件在public目录下,同学要修改该页面的内容，作为项目详细介绍的页面，用于检查作业的老师直接打开该页面即可看到作业的详细介绍
    openProjectHtml() {
      window.open("projectDoc.html");
    },
    // 打开新窗口 显示projectVideo.html内容，这个文件在public目录下,同学要录制项目特色视频，作为项目特色介绍视频包房，用于检查作业的老师直接打开该页面查看项目特色
    openProjectVideo() {
      window.open("projectVideo.html");
    },
    isIncluded(name: string) {
      console.log(this.openMenus)
      for (let i = 0; i < this.openMenus.length; i++) {
        if (this.openMenus[i] == name) {
          return true;
        }
      }
      return false
    },

    async refreshPage() {
      console.log("刷新页面")

      localStorage.setItem('openMenus', JSON.stringify(this.openMenus));
      window.location.reload();

    },
    // 添加菜单展开/收起处理方法
    handleOpen(key: string) {
      if (!this.openMenus.includes(key)) {
        this.openMenus.push(key);
      }
    },

    handleClose(key: string) {
      const index = this.openMenus.indexOf(key);
      if (index > -1) {
        this.openMenus.splice(index, 1);
      }
    }
  },
});
</script>
<!-- 这个是系统主页面的样式，同学可以根据自己的喜好修改 -->
<style lang="scss" scoped>
.el-menu-item.is-active {
  background-color: #7a0b10 !important; // Darker shade of primary color
}

.el-menu--horizontal>.el-menu-item {
  height: 44px;
  line-height: 44px;
  font-family: SourceHanSansCN-Regular;
  font-size: 16px;
  color: #ffffff;
  letter-spacing: 0;
  font-weight: 400;
}

.el-menu--horizontal>.el-menu-item.is-active {
  background-color: #7a0b10 !important;
}

.topHeader {
  padding: 0px;
}

.m-header {
  height: 60px !important;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.header {
  background: #930e14;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  /* 添加相对定位 */
}

.right-content {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.animate-slide {
  animation: slideFromCenter 0.5s ease-out forwards;
  position: absolute;
  /* 使用绝对定位确保动画起始位置正确 */
  left: 20px;
  /* 最终位置 */
}

.animate-fade {
  opacity: 0;
  animation: fadeIn 0.5s ease-out 0.1s forwards;
}

@keyframes slideFromCenter {
  from {
    left: 50%;
    transform: translateX(-50%);
    /* 确保从正中间开始 */
  }

  to {
    left: 20px;
    transform: translateX(0);
    /* 移动到目标位置 */
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.logo {
  height: 40px;
  margin-right: 10px;
}

.welcome-text {
  font-size: 16px;
}

.right {
  cursor: pointer;
  display: flex;
  flex-direction: row;
}

.scrollar {
  height: 100%;
  overflow-x: hidden;
  background-color: #a81f26e0; // Slightly lighter than primary for sidebar
}

.pername {
  margin-top: 15px;
  font-size: 20px;
  color: gray;
  font-weight: bold;
}

.right-header {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #47474a;
  letter-spacing: 0;
  font-weight: 400;
  margin-top: 20px;
  margin-right: 30px;
}

.shuxian {
  margin-top: 5px;
  margin-bottom: 5px;
  height: 50px;
  width: 1px;
  background: #cfd2d7;
  margin-right: 30px;
}

.tuichu {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #47474a;
  letter-spacing: 0;
  font-weight: 400;
  margin-top: 20px;
  margin-right: 30px;
}

.icon_tuichu {
  margin-top: 23px;
  margin-right: 10px;
  background: url("/loginOut.png");
  width: 14px;
  height: 14px;
}

.image {
  width: 30px;
  margin-top: 15px;
  margin-right: 20px;
  height: 30px;
}

.search {
  margin-top: 23px;
  margin-right: 30px;
  background: url("/serch.png");
  width: 18px;
  height: 18px;
}

.question {
  margin-top: 23px;
  margin-right: 30px;
  background: url("/question.png");
  width: 18px;
  height: 18px;
}

.alarm {
  margin-top: 23px;
  margin-right: 80px;
  background: url("/alarm.png");
  width: 18px;
  height: 18px;
}

.leftIcon {
  cursor: pointer;
  margin-top: 23px;
  margin-left: 18px;
  background: url("/leftright.png");
  width: 18px;
  height: 18px;
}

.outer1 {
  background-color: rgba(255, 255, 255, 1);
  height: 70px;
  width: 100%;
}

.block1 {
  width: 95%;
  height: 44px;
  margin: 13px 0 0 35px;
}

.section1 {
  width: 135px;
  height: 40px;
  background: url("/sdu.png") 100% no-repeat;
  margin-top: 2px;
}

.section2 {
  background-color: rgba(147, 14, 20, 1);
  width: 1px;
  height: 35px;
  margin: 5px 0 0 26px;
}

.txt1 {
  width: 216px;
  height: 29px;
  overflow-wrap: break-word;
  color: rgba(147, 14, 20, 1);
  font-size: 24px;
  font-family: jiangxizhuokai;
  text-align: right;
  white-space: nowrap;
  line-height: 29px;
  display: block;
  margin: 8px 0 0 19px;
}

.icon1 {
  width: 40px;
  height: 40px;
  margin: 5px 0 0 10px;
  border-radius: 50%;
  border-color: #42b8dd;
  cursor: pointer;
}

.section3 {
  width: 140px;
  height: 33px;
  margin: 7px 0 0 14px;

  //background-color: rgba(255, 255, 255, 1);
  .word1,
  .info {
    color: #ffffff;
  }
}

.section4 {
  background-color: rgba(229, 227, 227, 1);
  width: 1px;
  height: 33px;
  margin: 7px 0 0 25px;
}

.section5 {
  width: 20px;
  height: 33px;
  margin: 9px 0 0 35px;
  cursor: pointer;

  .shuaxin {
    color: #ffffff;
  }

  &:hover {
    opacity: 0.8;
  }
}

.section6 {
  width: 20px;
  height: 32px;
  margin: 9px 0 0 25px;
  cursor: pointer;

  .shuaxin {
    color: #ffffff;
  }

  &:hover {
    opacity: 0.8;
  }
}

.info2 {
  width: 20px;
  height: 10px;
  overflow-wrap: break-word;
  color: rgb(255, 255, 255);
  font-size: 10px;
  font-family: SourceHanSansCN-Regular;
  text-align: right;
  white-space: nowrap;
  line-height: 10px;
  margin-top: 8px;
  display: block;
}

.flex-col {
  display: flex;
  flex-direction: column;
}

.flex-row {
  display: flex;
  flex-direction: row;
}

.justify-between {
  display: flex;
  justify-content: space-between;
}

.shuaxin {
  width: 20px;
  height: 10px;
  overflow-wrap: break-word;
  color: rgba(45, 45, 45, 1);
  font-size: 10px;
  text-align: right;
  white-space: nowrap;
  line-height: 10px;
  margin-top: 8px;
}

.shuxinImage {
  width: 16px;
  height: 14px;
  background: url("/refresh.png");
  margin-left: 3px;
}

.tuichuImage {
  width: 14px;
  height: 14px;
  background: url("/tuichu.png");
  margin-left: 5px;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

// Update menu styles
:deep(.el-menu) {
  background-color: #a81f26 !important;

  .el-menu-item {
    &:hover {
      background-color: #7a0b10 !important;
    }
  }

  .el-sub-menu__title {
    &:hover {
      background-color: #7a0b10 !important;
    }
  }
}

// Update dropdown styles
:deep(.el-dropdown-menu) {
  background-color: #ffffff;
  border: 1px solid #930e14;

  .el-dropdown-menu__item {
    color: #930e14;

    &:hover {
      background-color: #fef0f0;
      color: #7a0b10;
    }
  }
}

// Update menu styles with better hierarchy
:deep(.el-menu) {
  background-color: #a81f26 !important;

  .el-menu-item {
    &:hover {
      background-color: #7a0b10 !important;
    }
  }

  .el-sub-menu {
    .el-sub-menu__title {
      &:hover {
        background-color: #7a0b10 !important;
      }
    }

    // Add styles for sub-menu items
    .el-menu-item {
      background-color: #b8272e !important; // Lighter than parent
      padding-left: 45px !important; // Increase indentation
      position: relative;

      &::before {
        content: '';
        position: absolute;
        left: 25px;
        top: 50%;
        width: 4px;
        height: 4px;
        background-color: #ffffff;
        border-radius: 50%;
        transform: translateY(-50%);
      }

      &:hover {
        background-color: #8f1419 !important; // Darker on hover
        padding-left: 48px !important; // Slight indent on hover
        transition: all 0.3s ease;
      }

      &.is-active {
        background-color: #7a0b10 !important;
        border-right: 3px solid #ffd04b;
      }
    }
  }
}

// Add these new styles at the end of your style section
.menu-item-animate {
  animation: slideInLeft 0.5s ease forwards;
  opacity: 0;
  transform: translateX(-50px);
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

// Generate delay classes for menu items
@for $i from 0 through 10 {
  .delay-#{$i} {
    animation-delay: #{$i * 0.1}s;
  }

  // For submenu items
  @for $j from 0 through 10 {
    .delay-#{$i}-#{$j} {
      animation-delay: #{($i * 0.1 + $j * 0.1 + 0.1)}s;
    }
  }
}
</style>
