<template>
  <div class="system-card">
    <div class="blue_column"></div>
    <div class="system-title">· 系统总体介绍</div>
    <div class="introduce-content">
      <h2>· 主要功能：</h2>
      <ul class="system-part">
        <li>个人管理，实现了包括修改密码、个人主页设计等操作</li>
        <li>人员管理，实现了包括教师、学生、用户等个人信息的管理</li>
        <li>教务管理，实现了包括选课、考勤、作业、以及日常活动等信息的管理</li>
      </ul>
      <h2>· 技术栈:</h2>
      <p>本系统基于以下技术构建：</p>
      <ul class="system-part">
        <li>Vue 3: 渐进式框架，支持组合 API，性能提升，适合构建复杂用户界面。</li>
        <li>Element Plus: 基于 Vue 3 的 UI 组件库，提供丰富的组件，设计简洁现代，适合企业应用。</li>
        <li>Vite: 现代构建工具，支持快速热重载，配置简单，提升开发效率，适合多种框架。</li>
        <li>TypeScript: JavaScript 超集，添加静态类型，减少错误，提升代码智能提示和重构能力。</li>
        <li>Axios: 基于 Promise 的 HTTP 客户端，简单易用，支持请求拦截和响应处理，适合 API 交互。</li>
      </ul>
      <h2 style="color: #dc2424">· 开发团队</h2>
      <p>&nbsp;本系统由以下成员共同开发：</p>
      <ul class="team-list">
        <li class="member-introduce">
          <img class="member-img" src="/member-wzk.jpg" alt="WZK"/>
          <div class="member-details">
            <span class="member-name">王志凯</span>
            <p class="member-bio">
              <span>爱好：看动漫，打游戏</span>
              <br/>
              <span>个人简介：</span>
              <br/>
              <span>如果人生是一条命运的河流，那么谁会是你生命的摆渡人。
                希望在未来的日子里，我能继续坚持我的信念，勇敢追求梦想，同时也能带给周围的人更多的正能量。
                让我们一起努力，创造美好的明天！</span>
            </p>
          </div>
        </li>
        <li class="member-introduce">
          <img class="member-img" src="/member-tst.jpg" alt="TST"/>
          <div class="member-details">
            <span class="member-name">谭绍庭</span>
            <p class="member-bio">
              <span>爱好：卷绩点，卷综测，卷死你们hhhhhhhh</span>
              <br/>
              <span>个人简介：</span>
              <br/>
              <span>tst到此一游——除了工作，我还热衷于学习，这些兴趣让我保持创造力和灵感。
                我认为，生活中的每一次经历都是成长的机会，因此我努力从每一个挑战中汲取教训。
我的目标是不断提升自己，追求卓越，同时也希望能激励身边的人一起进步。期待与大家分享更多的故事与经验！</span>
            </p>
          </div>
        </li>
        <li class="member-introduce">
          <img class="member-img" src="/member-why.jpg" alt="WHY"/>
          <div class="member-details">
            <span class="member-name">吴恒宇</span>
            <p class="member-bio">
              <span>爱好：球类运动，打游戏</span>
              <br/>
              <span>个人简介：</span>
              <br/>
              <span>无论遇到什么挑战，我都坚信“困难是成功的必经之路”，这句名言时刻激励着我。在我看来，生活就像一场旅程，重要的不是目的地，而是沿途的风景和成长。
我相信每一天都是新的开始，充满无限可能。正如爱默生所说：“生活的伟大不在于我们所拥有的，而在于我们所成为的。”我努力追求知识，不断提升自我，以更好地面对未来。
在生活中，我始终保持乐观的态度，遇到困难时，我会选择微笑面对，寻找解决方案。我喜欢与人交流，分享彼此的故事与经验，因为我坚信：“分享是快乐的源泉。”</span>
            </p>
          </div>
        </li>
        <li class="member-introduce">
          <img class="member-img" src="/member-lxy.jpg" alt="LXY"/>
          <div class="member-details">
            <span class="member-name">李翔宇</span>
            <p class="member-bio">
              <span>爱好：学习，运动</span>
              <br/>
              <span>个人简介：</span>
              <br/>
              <span>我是一名对技术与创新充满热情的专业人士，专注于计算机科学领域的研究与应用，尤其是人工智能、机器学习及网络安全方向。
                我拥有扎实的理论基础和丰富的实践经验，曾参与多项技术项目，涵盖数据分析、模型开发和系统优化。我的研究兴趣在于利用前沿技术解决复杂问题，特别是在入侵检测系统（IDS）和物联网（IoT）安全领域。
                我致力于通过技术创新推动行业发展，同时对知识的传播和团队协作充满热忱，希望为未来的科技进步贡献自己的一份力量</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({});
</script>

<style scoped>
.system-card {
  margin: 20px auto;
  background: #f9f9f9;
  border-radius: 15px;
  max-width: 95%;
  padding-left: 100px;
}

.introduce-content {
  width: 100%;
}

.blue_column {
  height: 16px;
}

.system-title {
  font-size: 29px;
  font-weight: bold;
  margin-left: 480px;
  color: #594ef1;
}

h2 {
  font-size: 24px;
  font-weight: bold;
  color: #3e87d0;
  margin-bottom: 10px;
}

p {
  font-size: 16px;
  color: #555;
}

.system-part li {
  list-style-type: disc;
  padding-left: 20px;
  font-weight: bold;
  color: #555;
}

ul.team-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
}

.member-introduce {
  display: flex;
  margin-right: 100px;
  gap: 10px;
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.member-img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #3498db;
}

.member-details {
  display: flex;
  flex-direction: column;
  margin-right: 10px;
}

.member-name {
  font-size: 18px;
  font-weight: bold;
  color: #5280d7;
  margin-top: 10px;
}

.member-bio {
  font-size: 14px;
  color: #154294;
  line-height: 1.3;
}
</style>
