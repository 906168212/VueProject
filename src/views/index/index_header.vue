<script setup lang="ts">
import {
  animationEnd, animationStart, formattedMemberCount, futureCoinForOneFixed,
  handleHeaderSearchBlur, handleHeaderSearchFocus, header_left,
  headerSearchFocus, links, logout,
  mouse, mouseEnter_animation, mouseEnter_normal, mouseLeave_animation,
  mouseLeave_normal, pointForOneFixed, resetData, scrollBarStatus,
  scrollChannelStatus, search, searchClean, user
} from "@/special_assets/js/index/index_header";
import {onUnmounted} from "vue";
import SvgIcon from "@/components/svgIcon/index.vue";

onUnmounted(()=>{
  resetData()
})
const props = defineProps({
  selectedLinkId:{
    type: Number,
    default: 0
  }
})

</script>

<template>
  <div class="header-wrap_index" >
    <div class="header-wrap_index__bar" :class="{slideDown:scrollBarStatus}">
      <ul class="header-wrap_index_hd">
        <li v-if="!scrollBarStatus">
          <a class="header_hd_default_title" href="/index">
            <svg-icon icon-name="index_small_logo" class-name="logo"></svg-icon>
            <span>首页</span>
          </a>
        </li>
        <li v-if="scrollBarStatus" class="v-popover-wrap">
          <a class="index_hd_title" href="/index">
            <svg-icon icon-name="halihapi" class-name="mini-header__logo"></svg-icon>
            <div class="mini-header__title">
              <span>首页</span>
              <svg-icon icon-name="arrow" class-name="mini-header__arrow"></svg-icon>
            </div>
          </a>
        </li>
        <li v-for="name in header_left" class="v-popover-wrap">
          <a class="header_hd_item">
            <span>{{ name }}</span>
          </a>
        </li>
      </ul>
      <div class="header_center_search_container">
        <div class="header_center_search_bar">
          <form id="header_search_form" class="header_search_form" :class="{'is-focus':headerSearchFocus}" @submit.prevent="">
            <div class="search_content">
              <input id="search_input" class="search_input" type="text" autocomplete="off"
                     accesskey="s" maxlength="100" :placeholder="search.placeHolder" :title="search.placeHolder"
                     v-model="search.content"
                     @focus="handleHeaderSearchFocus" @blur="handleHeaderSearchBlur">
              <div class="search_clean" :class="{'has-keyword':search.content}" @click="searchClean">
                <svg-icon icon-name="search_clean" class-name="search_clean_svg"></svg-icon>
              </div>
            </div>
            <div class="search_btn">
              <svg-icon icon-name="search_btn" class-name="search_btn_svg"></svg-icon>
            </div>
          </form>
        </div>
      </div>
      <ul class="header-wrap_index_bd">
        <li class="v-popover-wrap header-wrap__user_box" @mouseenter="mouseEnter_animation('avatar')" @mouseleave="mouseLeave_animation('avatar')">
          <div class="header-wrap__user_box_container"
               :class="{'mini-avatar__init':mouse.avatar===null,'mini-avatar__small':mouse.avatar===false,'mini-avatar__large':mouse.avatar===true}">
            <a class="header-wrap__user_inner header-entry-mini">
              <picture class="v-img">
                <img src="@/assets/image/default_user_icon.avif" alt="">
              </picture>
            </a>
            <a class="header-entry-avatar">
              <div class="user_large_avatar">
                <img class="avatar_large_face" alt="" src="@/assets/image/default_user_icon.avif">
              </div>
            </a>
          </div>
          <transition name="userInfo"  @before-leave="animationStart('avatar')" @after-leave="animationEnd('avatar')">
            <div v-show="mouse.avatar" class="header-wrap__user_large_container">
              <div class="header-wrap__user_large_content avatar-popover">
                <div class="avatar-panel-popover">
                  <a class="large_avatar"></a>
                  <a class="header_nickname" :class="{nickname_vip_color:user.vip_status}">{{user.nickName}}</a>
                  <div class="vip_normal_item">
                    <a class="user_level_name">{{user.current_level_name}}</a>
                    <a class="user_level_content">
                      <svg-icon :icon-name="`user_level_${user.current_level}`" class-name="user_level_svg"></svg-icon>
                    </a>
                    <a class="user_vip_content">
                      <svg-icon :icon-name="`vip_${user.current_vip}`" class-name="user_vip_svg"></svg-icon>
                    </a>
                  </div>
                  <div class="coins-item">
                    <div class="point_coins_box">
                      <a class="user_point_content">
                        <svg-icon icon-name="point" class-name="user_point_svg"></svg-icon>
                        <span class="user_coins_test">积分:</span>
                        <span class="user_coins_num">{{pointForOneFixed}}</span>
                      </a>
                    </div>
                    <div class="future_coins_box">
                      <a class="user_future_coins_content">
                        <svg-icon icon-name="future_coin" class-name="user_future_coins_svg"></svg-icon>
                        <span class="user_coins_test">F币:</span>
                        <span class="user_coins_num">{{futureCoinForOneFixed}}</span>
                      </a>
                    </div>
                  </div>
                  <div class="counts-item">
                    <a class="single-count-item">
                      <span class="count-sum change_blue">{{user.motion_num}}</span>
                      <span class="count-test change_blue">动态</span>
                    </a>
                    <a class="single-count-item">
                      <span class="count-sum change_blue">{{user.concerned_num}}</span>
                      <span class="count-test change_blue">关注</span>
                    </a>
                    <a class="single-count-item">
                      <span class="count-sum">{{user.fan_num}}</span>
                      <span class="count-test">粉丝</span>
                    </a>
                  </div>
                  <div class="vip-entry-container">
                    <div class="vip-entry-desc">
                      <p class="title">开通会员，尊享特权</p>
                      <p class="subtitle">新人立享首次优惠</p>
                    </div>
                    <button class="vip-entry-btn">开通会员</button>
                  </div>
                  <div class="links-item">
                    <a class="single-link-item">
                      <div class="link-title">
                        <svg-icon icon-name="personal_center" class-name="link-icon"></svg-icon>
                        <span>个人中心</span>
                      </div>
                      <svg-icon icon-name="arrow" class-name="link-icon--right"></svg-icon>
                    </a>
                    <a class="single-link-item">
                      <div class="link-title">
                        <svg-icon icon-name="send_article_manage" class-name="link-icon"/>
                        <span>投稿管理</span>
                      </div>
                      <svg-icon icon-name="arrow" class-name="link-icon--right"></svg-icon>
                    </a>
                    <div class="other_service_item" @mouseenter="()=>mouseEnter_animation('otherService')" @mouseleave="()=>mouseLeave_animation('otherService')">
                      <a class="single-link-item" >
                        <div class="link-title">
                          <svg-icon icon-name="other_service" class-name="link-icon"/>
                          <span>其余服务</span>
                        </div>
                        <svg-icon icon-name="arrow" class-name="link-icon--right"></svg-icon>
                      </a>
                      <transition name="other_service_animation"  @before-leave="animationStart('otherService')" @after-leave="animationEnd('otherService')">
                        <div class="other_service_item_is-right" v-if="mouse.otherService" >
                          <div class="sub-links-item">
                            <a class="single-link-item sub-link-item">
                              <div class="link-title">
                                <svg-icon icon-name="order_center" class-name="link-icon"/>
                                <span>订单中心</span>
                              </div>
                            </a>
                            <a class="single-link-item sub-link-item">
                              <div class="link-title">
                                <svg-icon icon-name="rich_manage" class-name="link-icon"/>
                                <span>财富管理</span>
                              </div>
                            </a>
                            <a class="single-link-item sub-link-item">
                              <div class="link-title">
                                <svg-icon icon-name="task_center" class-name="link-icon"/>
                                <span>任务中心</span>
                              </div>
                            </a>
                            <a class="single-link-item sub-link-item">
                              <div class="link-title">
                                <svg-icon icon-name="send_article_manage" class-name="link-icon"/>
                                <span>投稿管理</span>
                              </div>
                            </a>
                          </div>
                        </div>
                      </transition>
                    </div>


                  </div>
                  <div class="split-line"></div>
                  <div class="logout-item" @click="logout">
                    <svg-icon icon-name="logout" class-name="link-icon"/>
                    <span>退出登录</span>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </li>
        <li class="v-popover-wrap">
          <a class="header-wrap_bd_item bd_icon_box" >
            <svg class="header_bd_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="37537" width="20" height="20"><path class="header_bd_svg" d="M512.027591 995.555556a155.875556 155.875556 0 0 1-116.906667-52.935112L39.224036 538.282667a157.866667 157.866667 0 0 1-12.401778-192.170667L174.648036 126.008889A155.619556 155.619556 0 0 1 303.984924 56.888889H719.95648c51.911111 0 100.266667 25.827556 129.336889 69.12l147.939555 220.103111a157.866667 157.866667 0 0 1-12.401777 192.170667L628.962702 942.648889A155.875556 155.875556 0 0 1 512.027591 995.555556z m-53.589333-109.425778c13.824 15.616 32.711111 24.263111 53.589333 24.263111s39.765333-8.647111 53.589333-24.263111l355.84-404.337778a72.277333 72.277333 0 0 0 5.688889-87.978667l-147.854222-220.131555a71.025778 71.025778 0 0 0-59.221333-31.630222H303.984924c-23.836444 0-45.966222 11.776-59.221333 31.630222l-147.825778 220.131555c-18.346667 27.249778-15.928889 63.431111 5.632 87.978667l355.84 404.337778zM512.027591 789.191111a123.960889 123.960889 0 0 1-92.814222-41.984L163.92448 457.102222a42.666667 42.666667 0 0 1 3.697778-60.017778 42.040889 42.040889 0 0 1 59.648 3.697778l255.288889 290.076445a38.684444 38.684444 0 0 0 29.468444 13.340444 38.684444 38.684444 0 0 0 29.468445-13.368889l255.288888-290.076444a42.040889 42.040889 0 0 1 59.676445-3.697778 42.666667 42.666667 0 0 1 3.669333 60.046222L604.841813 747.235556A123.960889 123.960889 0 0 1 512.027591 789.191111z" p-id="37538"></path></svg>
            <span class="header_wrap_bd__test">会员</span>
          </a>
        </li>
        <li class="v-popover-wrap" @mouseenter="mouseEnter_animation('message')" @mouseleave="mouseLeave_animation('message')">
          <a class="header-wrap_bd_item bd_icon_box" >
            <svg class="header_bd_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path class="header_bd_svg" d="M500.363636 914.618182h-395.636363c-60.509091 0-102.4-44.218182-102.4-102.4C0 605.090909 0 404.945455 0 211.781818c0-58.181818 46.545455-100.072727 109.381818-102.4h791.272727c79.127273 0 121.018182 39.563636 121.018182 121.018182V539.927273c0 6.981818 0 13.963636-4.654545 18.618182-9.309091 11.636364-18.618182 20.945455-27.927273 20.945454-13.963636 0-27.927273-13.963636-32.581818-23.272727-4.654545-9.309091-2.327273-18.618182-2.327273-27.927273V232.727273c-4.654545 2.327273-6.981818 6.981818-9.309091 9.309091L563.2 572.509091c-13.963636 11.636364-23.272727 18.618182-34.909091 18.618182s-20.945455-6.981818-34.909091-18.618182L79.127273 237.381818c-4.654545-4.654545-9.309091-6.981818-13.963637-11.636363V791.272727c0 41.890909 16.290909 58.181818 58.181819 58.181818h774.981818c44.218182 0 58.181818-16.290909 60.509091-60.50909v-18.618182-39.563637c0-20.945455 11.636364-34.909091 32.581818-34.909091 20.945455 0 32.581818 13.963636 32.581818 34.909091V814.545455c-4.654545 55.854545-46.545455 97.745455-104.727273 97.745454-139.636364 2.327273-279.272727 2.327273-418.909091 2.327273z m27.927273-397.963637L914.618182 176.872727H114.036364l414.254545 339.781818z" ></path></svg>
            <span class="header_wrap_bd__test">消息</span>
          </a>
          <transition name="message" @before-leave="animationStart('message')" @after-leave="animationEnd('message')">
            <div class="v-popover header_bar_bd_bottom location" v-show="mouse.message">
              <div class="v-popover-content message_box">
                <div class="message_content_list">
                  <a class="message_content_list_item">回复我的</a>
                  <a class="message_content_list_item">收到的赞</a>
                  <a class="message_content_list_item">系统消息</a>
                  <a class="message_content_list_item">我的消息</a>
                </div>
              </div>
            </div>
          </transition>
        </li>
        <li class="v-popover-wrap">
          <a class="header-wrap_bd_item bd_icon_box">
            <svg class="header_bd_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="38934" width="20" height="20"><path class="header_bd_svg" d="M599.33184 20.48c-15.39072 0-34.54976 5.2224-56.70912 16.15872l-46.74048 23.22432C415.65696 99.7376 329.92256 187.12064 305.24416 253.98784c-24.67328 67.06176 9.87136 141.96224 76.84096 166.64064a104.35072 104.35072 0 0 0 36.29056 6.38464c57.38496 0 116.224-45.19424 141.6704-114.3808l72.0896-195.66592C654.58688 56.18688 639.68256 20.48 599.33184 20.48z m-24.832 75.19232L502.38976 291.38944c-17.92 48.71168-55.82848 74.17856-84.0192 74.17856a42.83904 42.83904 0 0 1-15.03232-2.5856c-35.32288-13.01504-53.4528-52.39296-40.43264-87.7824 17.2288-46.67904 87.3216-124.04224 160.32256-160.32256l46.73536-23.2192c2.51904-1.24416 4.864-2.32448 7.04512-3.27168-0.7168 2.24768-1.54112 4.66944-2.5088 7.28576zM981.87264 544.50688l-23.22944-46.73536c-39.86432-80.22016-127.25248-165.9648-194.11968-190.6432a127.2064 127.2064 0 0 0-44.61056-8.03328c-52.83328 0-102.76864 32.512-122.03008 84.86912-24.67328 66.96448 23.90528 147.09248 107.89888 177.95584l195.67104 72.09472c19.26656 7.07072 35.90656 10.44992 49.83808 10.44992 46.7456 0 61.2608-38.12864 30.58176-99.95776z m-59.25376 31.82592L727.02464 504.2688c-27.24864-10.01472-50.33984-28.10368-63.40608-49.64352-6.10304-10.07616-15.27808-29.89056-8.08448-49.41824 9.83552-26.73152 35.70176-44.672 64.37888-44.672 7.94112 0 15.73888 1.40288 23.17824 4.1728 46.89408 17.3056 124.25216 87.3984 160.53248 160.40448l23.22944 46.74048c1.2544 2.52416 2.34496 4.86912 3.29728 7.05024a164.84352 164.84352 0 0 1-7.53152-2.57024zM310.84032 458.28096L115.26656 386.28864c-19.25632-7.0656-35.9936-10.45504-49.83296-10.45504-46.83776 0-61.2608 38.12864-30.58688 99.968l23.22432 46.73024c39.87456 80.2304 127.2576 165.96992 194.1248 190.63808a127.80544 127.80544 0 0 0 44.5184 7.94624c52.83328 0 102.77376-32.52736 122.02496-84.87936 24.68352-66.95424-23.90016-147.08224-107.89888-177.95584z m50.24768 156.70784c-9.83552 26.752-35.70176 44.69248-64.37888 44.69248-8.0128 0-15.80032-1.3824-23.14752-4.11136-46.83264-17.28-124.1856-87.36768-160.47104-160.37888l-23.22432-46.72512a159.88224 159.88224 0 0 1-3.29728-7.06048c2.31424 0.72192 4.82304 1.57184 7.53664 2.56512l195.51232 71.97184c27.23328 10.0096 50.3296 28.09856 63.39072 49.6384 6.10816 10.07616 15.27808 29.89056 8.07936 49.408zM634.55744 599.7824a102.22592 102.22592 0 0 0-36.29568-6.58944c-57.38496 0-116.224 45.19424-141.66528 114.38592l-72.09472 195.67616c-22.35904 60.76928-7.45472 96.57344 32.896 96.57344 15.38048 0 34.54464-5.2224 56.70912-16.1536l46.73536-23.22432c80.22528-39.87456 165.95968-127.26784 190.63808-194.12992 24.6784-66.95936-9.96352-141.86496-76.92288-166.53824z m19.2768 145.28512c-17.23904 46.70976-87.34208 124.07296-160.33792 160.35328l-46.73024 23.22432c-2.56512 1.26464-4.95104 2.36544-7.168 3.32288 0.72192-2.30912 1.57184-4.80768 2.56-7.51104l72.08448-195.65056c17.91488-48.7168 55.81824-74.18368 84.01408-74.18368 5.13536 0 9.9072 0.86016 14.592 2.63168 17.46432 6.43584 31.06304 19.05664 38.7584 35.70688 7.69024 16.64 8.47872 35.14368 2.2272 52.10624z" p-id="38935"></path></svg>
            <span class="header_wrap_bd__test">动态</span>
          </a>
        </li>
        <li class="v-popover-wrap">
          <a class="header-wrap_bd_item bd_icon_box">
            <svg class="header_bd_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><g class="header_bd_svg"><path d="M896 266.666667a42.666667 42.666667 0 0 0 42.666667-42.666667V128a42.666667 42.666667 0 0 0-42.666667-42.666667H128a42.666667 42.666667 0 0 0-42.666667 42.666667v768a42.666667 42.666667 0 0 0 42.666667 42.666667h768a42.666667 42.666667 0 0 0 42.666667-42.666667V416a42.666667 42.666667 0 0 0-85.333334 0V853.333333H170.666667V170.666667h682.666666v53.333333a42.666667 42.666667 0 0 0 42.666667 42.666667z"></path> <path d="M677.973333 402.773333L436.48 644.053333 346.026667 554.666667a42.666667 42.666667 0 0 0-60.373334 60.373333l120.746667 120.533333a42.666667 42.666667 0 0 0 60.373333 0l271.573334-272.426666a42.666667 42.666667 0 0 0-60.373334-60.373334z"> </path></g></svg>
            <span class="header_wrap_bd__test">签到</span>
          </a>
        </li>
        <li class="v-popover-wrap">
          <a class="header-wrap_bd_item bd_icon_box">
            <svg class="header_bd_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path class="header_bd_svg" d="M340.010667 317.952l85.973333-173.632a96 96 0 0 1 172.053333 0l85.952 173.632 191.68 28.096a96 96 0 0 1 53.184 163.626667l-138.56 135.402666 32.512 190.997334a96 96 0 0 1-139.221333 101.12L512 847.296l-171.584 89.941333A96 96 0 0 1 201.173333 836.053333l32.512-190.997333-138.56-135.381333a96 96 0 0 1 53.184-163.648l191.68-28.096z m186.197333-159.722667a32 32 0 0 0-42.88 14.506667L394.88 351.36a53.333333 53.333333 0 0 1-40.064 29.098667l-197.205333 28.906666a32 32 0 0 0-17.728 54.549334l142.570666 139.306666a53.333333 53.333333 0 0 1 15.296 47.104l-33.450666 196.48a32 32 0 0 0 46.4 33.706667l176.533333-92.522667a53.333333 53.333333 0 0 1 49.536 0l176.533333 92.544a32 32 0 0 0 46.4-33.706666l-33.450666-196.501334a53.333333 53.333333 0 0 1 15.296-47.104l142.570666-139.306666a32 32 0 0 0-17.706666-54.549334l-197.226667-28.906666a53.333333 53.333333 0 0 1-40.064-29.098667l-88.448-178.645333a32 32 0 0 0-14.464-14.485334z" ></path></svg>
            <span class="header_wrap_bd__test">收藏</span>
          </a>
        </li>
        <li class="v-popover-wrap">
          <a class="header-wrap_bd_item bd_icon_box">
            <svg class="header_bd_icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path class="header_bd_svg"  d="M512.61025 108.624553A402.765197 402.765197 0 1 0 915.375447 512.61025 403.253397 403.253397 0 0 0 512.61025 108.624553z m0 732.300358A329.535161 329.535161 0 1 1 842.145411 512.61025 329.779261 329.779261 0 0 1 512.61025 840.924911z m172.578785-358.583075H549.225268v-143.530871a36.615018 36.615018 0 0 0-73.230036 0v180.145888a36.615018 36.615018 0 0 0 36.615018 36.615018h172.578785a36.615018 36.615018 0 0 0 0-73.230035z" ></path></svg>
            <span class="header_wrap_bd__test" >历史</span>
          </a>
        </li>
        <li class="v-popover-wrap">
          <a class="header-wrap_bd_item bd_icon_box">
            <svg class="header_bd_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="42084" width="20" height="20"><path class="header_bd_svg"  d="M846.5 569.5l-3.7-25.5c-4.1-28.2-11.8-55.6-22.8-81.6-16.8-39.7-40.9-75.5-71.5-106.2-8.4-8.4-25.1-24.2-36.7-33.3l-14.9-11.7c3.8-14.3 5.8-29.2 5.8-44.7 0-96.2-78.2-174.4-174.4-174.4s-174.4 78.2-174.4 174.3c0 9.2 0.7 18.2 2.1 27.1l-16.4 10.4c-23.1 14.7-48.8 37.4-63.8 52.4-30.8 30.8-54.9 66.6-71.6 106.2-11.5 27.2-19.3 55.6-23.1 84.5l-2.9 21.6C115.5 595 71.4 657.1 71.4 729.3c0 96.2 78.2 174.4 174.4 174.4 33.4 0 64.6-9.4 91.1-25.7l19.5 10.2c9 4.7 17.4 8.7 25.6 12.1 41.2 17.5 85 26.3 130.1 26.3 45.1 0 88.8-8.9 130-26.3 6.9-2.9 14-6.2 21.7-10.1l23-11.7c26.3 15.9 57.1 25.1 90 25.1 96.2 0 174.4-78.2 174.4-174.4-0.1-71.3-43.2-132.7-104.7-159.7z m-600.7 60.4c54.8 0 99.4 44.6 99.4 99.4 0 54.8-44.6 99.4-99.4 99.4-54.8 0-99.4-44.6-99.4-99.4 0-54.8 44.6-99.4 99.4-99.4z m530.9 198.8c-54.8 0-99.4-44.6-99.4-99.4 0-54.8 44.6-99.4 99.4-99.4 54.7 0 99.3 44.6 99.4 99.4 0 54.9-44.6 99.4-99.4 99.4zM528.3 167.1c54.8 0 99.4 44.5 99.4 99.3s-44.6 99.4-99.4 99.4c-54.8 0-99.4-44.5-99.4-99.3s44.6-99.4 99.4-99.4z m0 273.7c53.4 0 101.2-24.1 133.2-62l8.1 6.6c49 40.1 86.3 101 97.2 158.8l2 10.8c-92.5 4.1-166.5 80.7-166.5 174.2 0 34.7 10.2 67 27.7 94.2l-10 4.6c-34.2 15.7-70.5 23.6-107.9 23.6-39.1 0-76.6-8.5-111.5-25.3l-7.6-3.7c17.2-27 27.2-59 27.2-93.3 0-92.9-73-169.1-164.7-174.1l1.5-8.2c12.2-68.6 57.6-136.4 118.3-176.8l8.8-5.9c31.5 46.2 84.3 76.5 144.2 76.5z" p-id="42085"></path></svg>
            <span class="header_wrap_bd__test" >任务中心</span>
          </a>
        </li>
        <li class="right-entry-item" @mouseenter="()=>mouseEnter_animation('contribute')" @mouseleave="()=>mouseLeave_animation('contribute')">
          <div class="v-popover-wrap">
            <a>
              <div class="header-upload-entry">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="header-upload-entry__icon"><path d="M12.0824 10H14.1412C15.0508 10 15.7882 10.7374 15.7882 11.6471V12.8824C15.7882 13.792 15.0508 14.5294 14.1412 14.5294H3.84707C2.93743 14.5294 2.20001 13.792 2.20001 12.8824V11.6471C2.20001 10.7374 2.93743 10 3.84707 10H5.90589" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8.99413 11.2353L8.99413 3.82353" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12.0823 6.29413L8.9941 3.20589L5.90587 6.29413" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                <span class="header-upload-entry__text">投稿</span>
              </div>
            </a>
            <transition name="contribute"  @before-leave="animationStart('contribute')" @after-leave="animationEnd('contribute')">
              <div v-if="mouse.contribute" class="is-bottom-end" >
                <div class="v-popover-content">
                  <div class="right-panel-popover__inner upload-panel-popover">
                    <a class="upload-item">
                      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" class="item-icon"><rect opacity="0.01" x="1" y="1" width="24" height="24" fill="#C4C4C4"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 3.5H15.5C17.9853 3.5 20 5.51472 20 8V12.5C20 13.0523 20.4477 13.5 21 13.5C21.5523 13.5 22 13.0523 22 12.5V11.5C22 11.4989 22 11.4977 22 11.4966V8C22 4.41015 19.0899 1.5 15.5 1.5H5.5C4.11929 1.5 3 2.61929 3 4V21C3 22.3807 4.11929 23.5 5.5 23.5H14.2615H15H15.2615C15.8138 23.5 16.2615 23.0523 16.2615 22.5C16.2615 21.9477 15.8138 21.5 15.2615 21.5H15H14.2615H5.5C5.22386 21.5 5 21.2761 5 21V4C5 3.72386 5.22386 3.5 5.5 3.5Z" fill="var(--text2)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M7 10C7 9.44772 7.44772 9 8 9H14C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11H8C7.44772 11 7 10.5523 7 10Z" fill="var(--text2)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C7 13.4477 7.44772 13 8 13H11C11.5523 13 12 13.4477 12 14C12 14.5523 11.5523 15 11 15H8C7.44772 15 7 14.5523 7 14Z" fill="var(--text2)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M22.0502 15.348C21.4644 14.7622 20.5146 14.7622 19.9288 15.348L17.454 17.8228C17.0634 18.2134 17.0634 18.8465 17.454 19.237C17.8445 19.6276 18.4777 19.6276 18.8682 19.237L20.9895 17.1157L23.1108 19.237C23.5013 19.6276 24.1345 19.6276 24.525 19.237C24.9156 18.8465 24.9156 18.2134 24.525 17.8228L22.0502 15.348Z" fill="var(--text2)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M20.9895 14.9758C21.5418 14.9758 21.9895 15.4235 21.9895 15.9758L21.9895 22.5C21.9895 23.0523 21.5418 23.5 20.9895 23.5C20.4372 23.5 19.9895 23.0523 19.9895 22.5L19.9895 15.9758C19.9895 15.4235 20.4372 14.9758 20.9895 14.9758Z" fill="var(--text2)"></path></svg>
                      <div class="item-title">文章投稿</div>
                    </a>
                    <a class="upload-item">
                      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" class="item-icon"><rect opacity="0.01" x="0.5" y="1" width="24" height="24" fill="#C4C4C4"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M5 3.5H15C17.4853 3.5 19.5 5.51472 19.5 8V11.5V12.5C19.5 13.0523 19.9477 13.5 20.5 13.5C21.0523 13.5 21.5 13.0523 21.5 12.5V11.5V8C21.5 4.41015 18.5899 1.5 15 1.5H5C3.61929 1.5 2.5 2.61929 2.5 4V21C2.5 22.3807 3.61929 23.5 5 23.5H13.5H14.0802H14.5C15.0523 23.5 15.5 23.0523 15.5 22.5C15.5 21.9477 15.0523 21.5 14.5 21.5H14.0802H13.5H5C4.72386 21.5 4.5 21.2761 4.5 21V4C4.5 3.72386 4.72386 3.5 5 3.5Z" fill="var(--text2)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M21.5611 15.348C20.9753 14.7622 20.0255 14.7622 19.4397 15.348L16.9649 17.8228C16.5743 18.2134 16.5743 18.8465 16.9649 19.237C17.3554 19.6276 17.9886 19.6276 18.3791 19.237L20.5004 17.1157L22.6217 19.237C23.0122 19.6276 23.6454 19.6276 24.0359 19.237C24.4265 18.8465 24.4265 18.2134 24.0359 17.8228L21.5611 15.348Z" fill="var(--text2)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M20.5004 14.9758C21.0527 14.9758 21.5004 15.4235 21.5004 15.9758L21.5004 22.5C21.5004 23.0523 21.0527 23.5 20.5004 23.5C19.9481 23.5 19.5004 23.0523 19.5004 22.5L19.5004 15.9758C19.5004 15.4235 19.9481 14.9758 20.5004 14.9758Z" fill="var(--text2)"></path><path d="M12.7504 9.54767V12.5477" stroke="var(--text2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8.75037 13.9222C8.75037 13.1631 9.39507 12.5477 10.1904 12.5477H12.7504V14.1731C12.7504 14.9323 12.1057 15.5477 11.3104 15.5477H10.1904C9.39507 15.5477 8.75037 14.9323 8.75037 14.1731V13.9222Z" stroke="var(--text2)" stroke-width="2" stroke-linejoin="round"></path><path d="M15.2504 10.0477L12.7504 9.54767" stroke="var(--text2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                      <div class="item-title">音频投稿</div>
                    </a>
                    <a class="upload-item">
                      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" class="item-icon"><rect opacity="0.01" x="1.55603" width="24" height="24" fill="#C4C4C4"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M21.556 10.1866C21.0037 10.1866 20.556 10.6343 20.556 11.1866V12.5712C20.556 13.1234 21.0037 13.5712 21.556 13.5712C22.1083 13.5712 22.556 13.1234 22.556 12.5712V11.1866C22.556 10.6343 22.1083 10.1866 21.556 10.1866ZM14.556 20.5C14.0037 20.5 13.556 20.9477 13.556 21.5C13.556 22.0523 14.0037 22.5 14.556 22.5H15.556C16.1083 22.5 16.556 22.0523 16.556 21.5C16.556 20.9477 16.1083 20.5 15.556 20.5H14.556Z" fill="var(--text2)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M22.6093 15.348C22.0235 14.7622 21.0738 14.7622 20.488 15.348L18.0131 17.8229C17.6226 18.2134 17.6226 18.8465 18.0131 19.2371C18.4037 19.6276 19.0368 19.6276 19.4274 19.2371L21.5487 17.1158L23.67 19.2371C24.0605 19.6276 24.6937 19.6276 25.0842 19.2371C25.4747 18.8465 25.4747 18.2134 25.0842 17.8229L22.6093 15.348Z" fill="var(--text2)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M21.5487 14.9759C22.101 14.9759 22.5487 15.4236 22.5487 15.9759L22.5487 22.5C22.5487 23.0523 22.101 23.5 21.5487 23.5C20.9964 23.5 20.5487 23.0523 20.5487 22.5L20.5487 15.9759C20.5487 15.4236 20.9964 14.9759 21.5487 14.9759Z" fill="var(--text2)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M3.20868 5.5H19.556C20.1083 5.5 20.556 5.94771 20.556 6.5V11.8911H22.556V6.5C22.556 4.84315 21.2129 3.5 19.556 3.5H3.20868C1.55183 3.5 0.208679 4.84315 0.208679 6.5V19.5C0.208679 21.1569 1.55182 22.5 3.20868 22.5H15.453V20.5H3.20868C2.65639 20.5 2.20868 20.0523 2.20868 19.5V6.5C2.20868 5.94772 2.6564 5.5 3.20868 5.5Z" fill="var(--text2)"></path><path d="M13.3617 12.134C14.0284 12.5189 14.0284 13.4811 13.3617 13.866L10.3617 15.5981C9.69503 15.983 8.86169 15.5019 8.86169 14.7321V11.2679C8.86169 10.4981 9.69503 10.017 10.3617 10.4019L13.3617 12.134Z" fill="var(--text2)"></path></svg>
                      <div class="item-title">视频投稿</div>
                    </a>
                    <a class="upload-item">
                      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" class="item-icon"><rect opacity="0.01" x="1.5" y="1" width="24" height="24" fill="#C4C4C4"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M16 3.5H6C5.72386 3.5 5.5 3.72386 5.5 4V21C5.5 21.2761 5.72386 21.5 6 21.5H10.5H11.5C12.0523 21.5 12.5 21.9477 12.5 22.5C12.5 23.0523 12.0523 23.5 11.5 23.5H10.5H6C4.61929 23.5 3.5 22.3807 3.5 21V4C3.5 2.61929 4.61929 1.5 6 1.5H16C19.5899 1.5 22.5 4.41015 22.5 8V11.2806V11.818V12.2806C22.5 12.8329 22.0523 13.2806 21.5 13.2806C20.9477 13.2806 20.5 12.8329 20.5 12.2806V11.818V11.2806V8C20.5 5.51472 18.4853 3.5 16 3.5ZM15 10.634C15.6667 11.0189 15.6667 11.9811 15 12.366L12 14.0981C11.3333 14.483 10.5 14.0019 10.5 13.2321V9.76795C10.5 8.99815 11.3333 8.51702 12 8.90192L15 10.634ZM23.9227 20.238C24.2799 19.6192 24.2799 18.8568 23.9227 18.238L22.3274 15.4748C21.9701 14.856 21.3098 14.4748 20.5953 14.4748H17.4047C16.6902 14.4748 16.0299 14.856 15.6727 15.4748L14.0774 18.238C13.7201 18.8568 13.7201 19.6192 14.0774 20.238L15.6727 23.0011C16.0299 23.6199 16.6902 24.0011 17.4047 24.0011H20.5953C21.3098 24.0011 21.9701 23.6199 22.3274 23.0011L23.9227 20.238ZM17.2604 16.7248C17.3497 16.5701 17.5148 16.4748 17.6934 16.4748H20.3066C20.4853 16.4748 20.6503 16.5701 20.7397 16.7248L22.0463 18.988C22.1356 19.1427 22.1356 19.3333 22.0463 19.488L20.7397 21.7511C20.6503 21.9058 20.4853 22.0011 20.3066 22.0011H17.6934C17.5148 22.0011 17.3497 21.9058 17.2604 21.7511L15.9538 19.488C15.8644 19.3333 15.8644 19.1427 15.9538 18.988L17.2604 16.7248ZM19 17.9879C18.3096 17.9879 17.75 18.5476 17.75 19.2379C17.75 19.9283 18.3096 20.4879 19 20.4879C19.6904 20.4879 20.25 19.9283 20.25 19.2379C20.25 18.5476 19.6904 17.9879 19 17.9879Z" fill="var(--text2)"></path></svg>
                      <div class="item-title">投稿管理</div>
                    </a>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </li>
      </ul>
    </div>
    <slot name="videoBanner"></slot>
    <slot name="pictureBanner"></slot>
    <div class="header-wrap_index__channel">
      <div class="header-wrap_index__channel_hd">
        <a class="header-wrap_index__channel_hd_item">
          <div class="icon-bg icon-bg__good">
            <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="25" height="25"><path d="M683.281067 702.737067c-54.272 34.816-118.784 55.022933-188.0064 55.022933a346.5216 346.5216 0 0 1-187.869867-55.022933c-6.280533 58.231467-13.1072 125.952-20.343467 201.250133l209.237334-102.741333 18.090666 8.874666 189.166934 93.866667c-7.236267-75.707733-14.1312-143.428267-20.2752-201.250133z m75.229866-65.262934c8.328533 73.864533 18.158933 169.710933 28.808534 281.941334 3.072 34.952533-19.797333 68.676267-54.203734 75.776-16.247467 3.345067-33.041067 0.136533-42.325333-6.485334l-194.696533-96.187733-191.829334 93.866667c-32.1536 21.2992-73.454933 8.192-91.886933-24.644267a73.045333 73.045333 0 0 1-9.079467-42.325333c10.581333-111.4112 20.48-207.121067 28.808534-281.873067a348.16 348.16 0 1 1 526.336 0zM495.274667 675.84a266.24 266.24 0 1 0 0-532.48 266.24 266.24 0 0 0 0 532.48z" fill="#ffffff" ></path></svg>
          </div>
          <span class="header-wrap_index__channel_hd_item_test">精华</span>
        </a>
        <a class="header-wrap_index__channel_hd_item">
          <div class="icon-bg icon-bg__popular">
            <svg width="25" height="25" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-bg--icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.89054 17.272L4.89277 17.2742C6.49674 18.8782 8.66472 19.7888 10.9624 19.7888C13.2503 19.7888 15.2113 19.0539 16.6107 17.6108L16.6108 17.6108L16.6128 17.6086C18.0002 16.1345 18.7835 14.182 18.7421 12.1819C18.7852 11.3835 18.6916 9.36321 17.4088 6.75488L17.4082 6.7537C17.209 6.35523 16.8163 6.06598 16.3391 5.96993C15.8904 5.87103 15.4021 6.01997 15.061 6.35741C14.9094 6.48781 14.7796 6.61755 14.6655 6.7317L14.6637 6.73348L14.6329 6.76426C14.2107 3.35588 12.6083 1.7368 11.1654 1.00465C11.148 0.987812 11.1265 0.967972 11.1036 0.950782C11.0775 0.931205 11.0311 0.900467 10.9694 0.888912C10.2276 0.608301 9.41043 1.01168 9.1237 1.77629L9.12314 1.7778C8.50566 3.46558 7.35287 4.62281 6.16627 5.76704C4.51756 7.33121 2.75938 9.03623 2.80163 12.093C2.75906 14.055 3.54464 15.8826 4.89054 17.272ZM3.04999 13.0648C3.01092 12.7459 2.99439 12.4218 3.00168 12.0939C2.95933 9.12977 4.6531 7.47834 6.30453 5.9116C7.49017 4.76831 8.67581 3.58267 9.31098 1.84655C9.56504 1.16904 10.2849 0.830288 10.9201 1.08435C10.9624 1.08435 11.0048 1.1267 11.0471 1.16904C11.9267 1.60884 12.8853 2.39635 13.5753 3.77299C12.8853 2.39633 11.9267 1.6088 11.0471 1.16901C11.0047 1.12666 10.9624 1.08432 10.9201 1.08432C10.2849 0.830251 9.56503 1.16901 9.31097 1.84651C8.6758 3.58263 7.49016 4.76827 6.30452 5.91157C4.65309 7.47831 2.95932 9.12973 3.00166 12.0938C2.99438 12.4218 3.01092 12.7459 3.04999 13.0648ZM14.477 7.18189C14.477 7.1819 14.477 7.18192 14.477 7.18193C14.5828 7.09724 14.6887 6.99138 14.8052 6.87493C14.9216 6.75849 15.0486 6.63146 15.1968 6.50442C15.4932 6.20801 15.9167 6.08098 16.2978 6.16567C16.7212 6.25036 17.06 6.50443 17.2294 6.84318C17.3088 7.0046 17.3835 7.16371 17.4539 7.32035C17.3835 7.1637 17.3087 7.00458 17.2294 6.84314C17.06 6.50439 16.7212 6.25032 16.2978 6.16563C15.9167 6.08094 15.4932 6.20798 15.1968 6.50439C15.0486 6.63142 14.9216 6.75845 14.8051 6.87489L14.8051 6.8749C14.7557 6.92437 14.7081 6.97191 14.6617 7.01675C14.5988 7.07745 14.5379 7.13318 14.477 7.18189ZM12.6977 6.35925C12.8428 7.15476 12.8833 7.97963 12.8679 8.74864C12.8679 8.79032 12.8704 8.8315 12.8754 8.87195C12.8704 8.83151 12.8679 8.79035 12.8679 8.74867C12.8833 7.97966 12.8428 7.15478 12.6977 6.35925ZM16.7358 10.6654C16.8108 11.1478 16.8483 11.6393 16.8483 12.1362V12.1786C16.8483 13.703 16.2978 15.2274 15.2392 16.3283C14.0535 17.4293 12.5291 18.0221 10.9201 17.9374C9.1416 17.9374 7.44783 17.2175 6.21984 15.9472C5.82743 15.5548 5.50448 15.1119 5.25584 14.6331C5.50447 15.1119 5.82743 15.5548 6.21983 15.9472C7.44782 17.2175 9.14159 17.9373 10.9201 17.9373C12.5291 18.022 14.0535 17.4292 15.2392 16.3283C16.2978 15.2273 16.8483 13.7029 16.8483 12.1785V12.1362C16.8483 11.6393 16.8108 11.1478 16.7358 10.6654ZM10.9306 17.7376C12.4802 17.8192 13.9509 17.2497 15.0989 16.1856C16.1154 15.1261 16.6483 13.655 16.6483 12.1785V12.1362C16.6483 10.8624 16.3969 9.6266 15.8955 8.49474C15.2436 9.11663 14.7845 9.49093 14.4179 9.68717C14.2122 9.79725 14.0268 9.85633 13.846 9.86789C13.6644 9.8795 13.5028 9.84219 13.3473 9.78249C12.9207 9.62211 12.6679 9.20129 12.6679 8.74864V8.74464L12.6679 8.74464C12.6889 7.69735 12.6046 6.55594 12.2954 5.53554C12.01 4.59379 11.5372 3.76766 10.7904 3.20655C9.96581 4.94926 8.72521 6.18561 7.58695 7.28323L7.50836 7.35967C5.97191 8.85397 4.81321 9.98087 4.85306 12.1325L4.85313 12.1362H4.85309C4.85309 13.5239 5.38326 14.8277 6.36125 15.8057L6.36365 15.8081L6.36363 15.8082C7.55387 17.0394 9.19573 17.7374 10.9201 17.7374H10.9306L10.9306 17.7376Z" fill="#ffffff"></path></svg>
          </div>
          <span class="header-wrap_index__channel_hd_item_test">热门</span>
        </a>
      </div>
      <div class="header-wrap_index__channel_bd">
        <div class="header-wrap_index__channel_bd_left">
          <a v-for="link in links" :href=link.href :key="link.id" :class="{selectedLink:link.id===selectedLinkId}" class="header-wrap__channel_link">{{link.name}}</a>
        </div>
        <div class="header-wrap_index__channel_bd_right">
          <a class="header_visitors" style="padding-bottom: 10px">
            <div class="icon-bg icon-bg__visitor channel_bd_right_icon">
              <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M512 534.4c86.6 0 156.8-70.2 156.8-156.8 0-86.6-70.2-156.8-156.8-156.8S355.2 291 355.2 377.6c0 86.6 70.2 156.8 156.8 156.8z m0-268.8c61.9 0 112 50.1 112 112s-50.1 112-112 112-112-50.1-112-112 50.1-112 112-112zM349.5 598L246.3 770c-8.8 14.6 1.8 33.3 18.8 33.3h493.6c17.1 0 27.6-18.6 18.8-33.3l-103-172c-5.1-8.5-15.3-12.6-24.9-9.8l-23.1 6.6c-74.8 21.4-154.2 21.4-229 0l-23.1-6.6c-9.5-2.8-19.7 1.2-24.9 9.8z m30.7 29.4c85.6 28.5 178.1 28.5 263.6 0l76.9 131.8H303.3l76.9-131.8z" fill="#ffffff" ></path><path d="M937.6 243.2c12.4 0 22.4-10 22.4-22.4v-112c0-24.7-20.1-44.8-44.8-44.8H108.8C84.1 64 64 84.1 64 108.8v806.4c0 24.7 20.1 44.8 44.8 44.8h806.4c24.7 0 44.8-20.1 44.8-44.8V400c0-12.4-10-22.4-22.4-22.4-12.4 0-22.4 10-22.4 22.4v492.8c0 12.4-10 22.4-22.4 22.4H131.2c-12.4 0-22.4-10-22.4-22.4V131.2c0-12.4 10-22.4 22.4-22.4h761.6c12.4 0 22.4 10 22.4 22.4v89.6c0 12.4 10 22.4 22.4 22.4z" fill="#ffffff"></path></svg>
            </div>
            <span class="channel_bd_right_test">今日访问量</span>
            <span class="channel_bd_right_test_number">000001</span>
          </a>
          <a class="header_visitors">
            <div class="icon-bg icon-bg__vip channel_bd_right_icon">
              <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M311.114667 371.242667L471.146667 169.098667a52.106667 52.106667 0 0 1 81.706666 0l160.032 202.144 153.152-65.632a52.106667 52.106667 0 0 1 71.541334 58.474666l-89.44 430.933334a112.416 112.416 0 0 1-110.08 89.568H285.941333a112.416 112.416 0 0 1-110.08-89.568l-89.429333-430.933334a52.106667 52.106667 0 0 1 71.541333-58.474666l153.152 65.632zM512 220.608L355.648 418.101333a52.106667 52.106667 0 0 1-61.376 15.552l-140.544-60.234666 84.8 408.586666a48.416 48.416 0 0 0 47.402667 38.581334h452.138666a48.416 48.416 0 0 0 47.402667-38.581334l84.8-408.586666-140.544 60.234666a52.106667 52.106667 0 0 1-61.376-15.552L512 220.608z" fill="#ffffff"></path></svg>            </div>
            <span class="channel_bd_right_test">全站会员数</span>
            <span class="channel_bd_right_test_number">{{formattedMemberCount}}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
  <div class="header_channel" v-show="scrollChannelStatus">
    <div class="header_channel_fixed" @mouseenter="mouseEnter_normal('headerChannel')" @mouseleave="mouseLeave_normal('headerChannel')"
    :class="{'header_channel_fixed_down':mouse.headerChannel}">
      <div class="header_channel_fixed_left only_two_entry">
        <a>
          <div class="left_fixed_channel">
            <svg class="left_one_entry" width="22" height="22" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" ><path d="M683.281067 702.737067c-54.272 34.816-118.784 55.022933-188.0064 55.022933a346.5216 346.5216 0 0 1-187.869867-55.022933c-6.280533 58.231467-13.1072 125.952-20.343467 201.250133l209.237334-102.741333 18.090666 8.874666 189.166934 93.866667c-7.236267-75.707733-14.1312-143.428267-20.2752-201.250133z m75.229866-65.262934c8.328533 73.864533 18.158933 169.710933 28.808534 281.941334 3.072 34.952533-19.797333 68.676267-54.203734 75.776-16.247467 3.345067-33.041067 0.136533-42.325333-6.485334l-194.696533-96.187733-191.829334 93.866667c-32.1536 21.2992-73.454933 8.192-91.886933-24.644267a73.045333 73.045333 0 0 1-9.079467-42.325333c10.581333-111.4112 20.48-207.121067 28.808534-281.873067a348.16 348.16 0 1 1 526.336 0zM495.274667 675.84a266.24 266.24 0 1 0 0-532.48 266.24 266.24 0 0 0 0 532.48z" fill="var(--text2)" ></path></svg>
            精华
          </div>
        </a>
        <a>
          <div class="left_fixed_channel">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" class="channel-icon popular"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.89054 17.272L4.89277 17.2742C6.49674 18.8782 8.66472 19.7888 10.9624 19.7888C13.2503 19.7888 15.2113 19.0539 16.6107 17.6108L16.6108 17.6108L16.6128 17.6086C18.0002 16.1345 18.7835 14.182 18.7421 12.1819C18.7852 11.3835 18.6916 9.36321 17.4088 6.75488L17.4082 6.7537C17.209 6.35523 16.8163 6.06598 16.3391 5.96993C15.8904 5.87103 15.4021 6.01997 15.061 6.35741C14.9094 6.48781 14.7796 6.61755 14.6655 6.7317L14.6637 6.73348L14.6329 6.76426C14.2107 3.35588 12.6083 1.7368 11.1654 1.00465C11.148 0.987812 11.1265 0.967972 11.1036 0.950782C11.0775 0.931205 11.0311 0.900467 10.9694 0.888912C10.2276 0.608301 9.41043 1.01168 9.1237 1.77629L9.12314 1.7778C8.50566 3.46558 7.35287 4.62281 6.16627 5.76704C4.51756 7.33121 2.75938 9.03623 2.80163 12.093C2.75906 14.055 3.54464 15.8826 4.89054 17.272ZM3.04999 13.0648C3.01092 12.7459 2.99439 12.4218 3.00168 12.0939C2.95933 9.12977 4.6531 7.47834 6.30453 5.9116C7.49017 4.76831 8.67581 3.58267 9.31098 1.84655C9.56504 1.16904 10.2849 0.830288 10.9201 1.08435C10.9624 1.08435 11.0048 1.1267 11.0471 1.16904C11.9267 1.60884 12.8853 2.39635 13.5753 3.77299C12.8853 2.39633 11.9267 1.6088 11.0471 1.16901C11.0047 1.12666 10.9624 1.08432 10.9201 1.08432C10.2849 0.830251 9.56503 1.16901 9.31097 1.84651C8.6758 3.58263 7.49016 4.76827 6.30452 5.91157C4.65309 7.47831 2.95932 9.12973 3.00166 12.0938C2.99438 12.4218 3.01092 12.7459 3.04999 13.0648ZM14.477 7.18189C14.477 7.1819 14.477 7.18192 14.477 7.18193C14.5828 7.09724 14.6887 6.99138 14.8052 6.87493C14.9216 6.75849 15.0486 6.63146 15.1968 6.50442C15.4932 6.20801 15.9167 6.08098 16.2978 6.16567C16.7212 6.25036 17.06 6.50443 17.2294 6.84318C17.3088 7.0046 17.3835 7.16371 17.4539 7.32035C17.3835 7.1637 17.3087 7.00458 17.2294 6.84314C17.06 6.50439 16.7212 6.25032 16.2978 6.16563C15.9167 6.08094 15.4932 6.20798 15.1968 6.50439C15.0486 6.63142 14.9216 6.75845 14.8051 6.87489L14.8051 6.8749C14.7557 6.92437 14.7081 6.97191 14.6617 7.01675C14.5988 7.07745 14.5379 7.13318 14.477 7.18189ZM12.6977 6.35925C12.8428 7.15476 12.8833 7.97963 12.8679 8.74864C12.8679 8.79032 12.8704 8.8315 12.8754 8.87195C12.8704 8.83151 12.8679 8.79035 12.8679 8.74867C12.8833 7.97966 12.8428 7.15478 12.6977 6.35925ZM16.7358 10.6654C16.8108 11.1478 16.8483 11.6393 16.8483 12.1362V12.1786C16.8483 13.703 16.2978 15.2274 15.2392 16.3283C14.0535 17.4293 12.5291 18.0221 10.9201 17.9374C9.1416 17.9374 7.44783 17.2175 6.21984 15.9472C5.82743 15.5548 5.50448 15.1119 5.25584 14.6331C5.50447 15.1119 5.82743 15.5548 6.21983 15.9472C7.44782 17.2175 9.14159 17.9373 10.9201 17.9373C12.5291 18.022 14.0535 17.4292 15.2392 16.3283C16.2978 15.2273 16.8483 13.7029 16.8483 12.1785V12.1362C16.8483 11.6393 16.8108 11.1478 16.7358 10.6654ZM10.9306 17.7376C12.4802 17.8192 13.9509 17.2497 15.0989 16.1856C16.1154 15.1261 16.6483 13.655 16.6483 12.1785V12.1362C16.6483 10.8624 16.3969 9.6266 15.8955 8.49474C15.2436 9.11663 14.7845 9.49093 14.4179 9.68717C14.2122 9.79725 14.0268 9.85633 13.846 9.86789C13.6644 9.8795 13.5028 9.84219 13.3473 9.78249C12.9207 9.62211 12.6679 9.20129 12.6679 8.74864V8.74464L12.6679 8.74464C12.6889 7.69735 12.6046 6.55594 12.2954 5.53554C12.01 4.59379 11.5372 3.76766 10.7904 3.20655C9.96581 4.94926 8.72521 6.18561 7.58695 7.28323L7.50836 7.35967C5.97191 8.85397 4.81321 9.98087 4.85306 12.1325L4.85313 12.1362H4.85309C4.85309 13.5239 5.38326 14.8277 6.36125 15.8057L6.36365 15.8081L6.36363 15.8082C7.55387 17.0394 9.19573 17.7374 10.9201 17.7374H10.9306L10.9306 17.7376Z" fill="var(--text2)"></path></svg>
            热门
          </div>
        </a>
      </div>
      <div class="header_channel_split_line"></div>
      <div class="header_channel_fixed_right">
        <a v-for="link in links" :href=link.href :key="link.id" :class="{selectedLink:link.id===selectedLinkId}" class="header_channel_fixed_right_item">{{link.name}}</a>
      </div>
      <div class="header_channel_fixed_arrow">
        <svg width="10" height="10" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.50588 3.40623C7.40825 3.3086 7.24996 3.3086 7.15232 3.40623L4.41244 6.14612L1.67255 3.40623C1.57491 3.3086 1.41662 3.3086 1.31899 3.40623C1.22136 3.50386 1.22136 3.66215 1.31899 3.75978L4.11781 6.5586C4.28053 6.72132 4.54434 6.72132 4.70706 6.5586L7.50588 3.75978C7.60351 3.66215 7.60351 3.50386 7.50588 3.40623Z" fill="currentColor"></path><path d="M7.15232 3.40623L7.50588 3.75978L7.50588 3.75978L7.15232 3.40623ZM7.50588 3.40623L7.15232 3.75978L7.15233 3.75978L7.50588 3.40623ZM4.41244 6.14612L4.05888 6.49967C4.15265 6.59344 4.27983 6.64612 4.41244 6.64612C4.54504 6.64612 4.67222 6.59344 4.76599 6.49967L4.41244 6.14612ZM1.67255 3.40623L2.0261 3.05268L2.0261 3.05268L1.67255 3.40623ZM1.31899 3.40623L0.965439 3.05268L0.965439 3.05268L1.31899 3.40623ZM1.31899 3.75978L1.67255 3.40623V3.40623L1.31899 3.75978ZM4.11781 6.5586L3.76425 6.91215L4.11781 6.5586ZM4.70706 6.5586L4.35351 6.20505L4.70706 6.5586ZM7.50588 3.75978L7.15233 3.40623L7.15232 3.40623L7.50588 3.75978ZM7.50588 3.75978C7.40825 3.85742 7.24996 3.85742 7.15232 3.75978L7.85943 3.05268C7.56654 2.75978 7.09166 2.75978 6.79877 3.05268L7.50588 3.75978ZM4.76599 6.49967L7.50588 3.75978L6.79877 3.05268L4.05888 5.79257L4.76599 6.49967ZM1.31899 3.75978L4.05888 6.49967L4.76599 5.79257L2.0261 3.05268L1.31899 3.75978ZM1.67254 3.75979C1.57491 3.85742 1.41662 3.85742 1.31899 3.75979L2.0261 3.05268C1.73321 2.75978 1.25833 2.75978 0.965439 3.05268L1.67254 3.75979ZM1.67255 3.40623C1.77018 3.50386 1.77018 3.66215 1.67255 3.75978L0.965439 3.05268C0.672546 3.34557 0.672546 3.82044 0.965439 4.11334L1.67255 3.40623ZM4.47136 6.20505L1.67255 3.40623L0.965439 4.11334L3.76425 6.91215L4.47136 6.20505ZM4.35351 6.20505C4.38605 6.1725 4.43882 6.1725 4.47136 6.20505L3.76425 6.91215C4.12223 7.27013 4.70264 7.27013 5.06062 6.91215L4.35351 6.20505ZM7.15232 3.40623L4.35351 6.20505L5.06062 6.91215L7.85943 4.11334L7.15232 3.40623ZM7.15233 3.75978C7.05469 3.66215 7.05469 3.50386 7.15233 3.40623L7.85943 4.11334C8.15233 3.82045 8.15233 3.34557 7.85943 3.05268L7.15233 3.75978Z" fill="currentColor"></path></svg>
      </div>
    </div>
  </div>
</template>

<style src="@/special_assets/css/index_headerStyles.css" scoped>

</style>

