<script setup>
import {Swiper,SwiperSlide} from "swiper/vue";
import 'swiper/swiper-bundle.css';
import {
  currentSlideIndex,
  getColorPalette, indexArticle,
  noticeSwiper,
  pictureChiefColor,
  restData,
  swiper_chart,
  swiper_notice,
  swiper_recommended,
  swiperImage,
  updateCaption
} from "@/special_assets/js/index/index_main_part.js";
import {onMounted, onUnmounted} from "vue";
import Card from "@/components/card.vue";
import Image_banner from "@/components/image_banner.vue";

onMounted(()=>{
  getColorPalette();
})
onUnmounted(()=>{
  restData()
})


</script>

<template>
  <div id="index_main_part" class="index-main-wrap">
    <div class="index_test_part recommended-container_floor-aside">
      <div class="index-container">
        <div class="recommended-swipe grid-anchor">
          <div class="recommended-swipe-core">
            <div class="recommended-swipe-shim" style="--cover_radio:56.25%;">
              <div class="feed_card_popover">
                <div class="card_skeleton">
                  <div class="card_skeleton__cover"></div>
                  <div class="card_skeleton__info">
                    <div class="card_skeleton__info_inner">
                      <p class="card_skeleton__info_test"></p>
                      <p class="card_skeleton__info_test short"></p>
                      <p class="card_skeleton__info_light"></p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="feed_card_popover">
                <div class="card_skeleton">
                  <div class="card_skeleton__cover"></div>
                  <div class="card_skeleton__info">
                    <div class="card_skeleton__info_inner">
                      <p class="card_skeleton__info_test"></p>
                      <p class="card_skeleton__info_test short"></p>
                      <p class="card_skeleton__info_light"></p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="shim_card"></div>
              <div class="shim_card"></div>
            </div>
            <div class="recommended-swipe-body">
              <div class="carousel-area swiper-no-swiping">
                <swiper
                    style="cursor:pointer;" :loop="swiper_recommended.loop"
                    :autoplay="swiper_recommended.autoplay" :pagination="swiper_recommended.pagination"
                    :navigation="swiper_recommended.navigation" @slideChange="updateCaption">
                  <swiper-slide v-for="(slide,index) in swiperImage" :key="index" >
                    <picture class="v-image"><img :src="slide.src" :alt="slide.alt"/></picture>
                  </swiper-slide>
                </swiper>
                <div class="carousel-footer">
                  <div class="carousel-mask" :style="{'background-color': pictureChiefColor[currentSlideIndex] }"></div>
                  <div class="carousel-tool not-gray">
                    <a><span>{{ swiperImage[currentSlideIndex].alt }}</span></a>
                    <div class="not-gray_li"></div>
                  </div>
                  <div class="carousel-bottoms not-gray">
                    <div>
                      <button class="swiper-button-prev swiper-button-style"></button>
                      <button class="swiper-button-next swiper-button-style"></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="notice-wrap">
            <div class="notice-wrap__inner">
              <div class="notice-icon">
                <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="30" height="30"><path d="M295.2192 394.79296h-183.296c-17.92 0-32.768-14.848-32.768-32.768 0-17.92 14.848-32.768 32.768-32.768h183.296c17.92 0 32.768 14.848 32.768 32.768s-14.848 32.768-32.768 32.768z" fill="#0972E7" ></path><path d="M111.9232 598.56896c-17.92 0-32.768-14.848-32.768-32.768v-203.776c0-17.92 14.848-32.768 32.768-32.768 17.92 0 32.768 14.848 32.768 32.768v203.776c0 17.92-14.336 32.768-32.256 32.768 0 0.512-0.512 0.512-0.512 0zM630.5792 642.60096c-17.92 0-32.768-14.848-32.768-32.768v-410.624c0-2.048-1.536-3.584-3.072-3.584h-0.512c-0.512 0-1.024 0-1.536 0.512-0.512 0.512-1.024 0.512-1.536 1.024l-276.992 192c-15.36 10.24-35.84 5.632-46.08-9.216-9.728-14.848-6.144-34.304 7.68-44.544l279.04-194.048c1.024-0.512 1.536-1.024 3.072-1.536 10.752-6.656 23.552-10.24 36.352-10.24 37.888 0 69.12 31.232 69.12 69.12v411.136c1.024 17.408-12.8 32.256-30.208 33.28-1.024-0.512-1.536-0.512-2.56-0.512zM295.2192 754.21696h-183.296c-17.92 0-32.768-14.848-32.768-32.768 0-17.92 14.848-32.768 32.768-32.768h183.296c17.92 0 32.768 14.848 32.768 32.768 0 18.432-14.848 32.768-32.768 32.768z" fill="#0972E7" p-id="3277"></path><path d="M111.9232 754.21696c-17.92 0-32.768-14.848-32.768-32.768v-203.776c0-17.92 14.848-32.768 32.768-32.768 17.92 0 32.768 14.848 32.768 32.768v203.776c0 17.92-14.848 32.768-32.768 32.768zM594.7392 954.92096c-12.8 0-25.6-3.584-36.864-10.24-1.024-0.512-1.536-1.024-3.072-1.536l-279.04-194.048c-14.848-10.752-17.408-31.744-6.656-46.08 10.24-13.824 30.208-17.408 44.544-7.68l276.992 193.024c0.512 0.512 1.024 0.512 1.536 1.024 0.512 0.512 1.024 0.512 1.536 0.512 2.048 0 3.584-1.536 3.584-3.584v-411.136c0-17.92 14.848-32.768 32.768-32.768 17.92 0 32.768 14.848 32.768 32.768v410.624c0.512 37.888-29.696 69.12-67.584 69.632 0.512-0.512 0-0.512-0.512-0.512z" fill="#0972E7" p-id="3278"></path><path d="M693.0432 697.38496c-17.92 0-32.768-14.848-32.768-32.768 0-15.872 11.264-29.184 27.136-32.256 49.664-8.704 82.944-55.808 74.24-105.472-6.656-37.888-36.352-67.584-74.24-74.24-17.92-2.56-30.208-19.456-27.648-37.376s19.456-30.208 37.376-27.648c0.512 0 1.024 0 1.536 0.512 85.504 14.848 142.848 96.256 128 181.76-11.264 65.536-62.464 116.736-127.488 128-2.048-0.512-4.096-0.512-6.144-0.512zM971.0592 574.50496h-99.328c-17.92 0-32.768-14.848-32.768-32.768 0-17.92 14.848-32.768 32.768-32.768h99.328c17.92 0 32.768 14.848 32.768 32.768 0 17.92-14.336 32.768-32.768 32.768zM841.0112 260.13696c-8.704 0-16.896-3.584-23.04-9.728-12.8-12.8-12.8-33.792 0-46.592l68.096-68.096c13.312-12.288 34.304-11.776 46.592 1.536 11.776 12.8 11.776 32.256 0 45.056l-68.096 68.096c-6.144 6.144-14.848 9.728-23.552 9.728zM909.1072 957.48096c-8.704 0-16.896-3.584-23.04-9.728l-68.096-68.096c-12.288-13.312-11.776-34.304 1.536-46.592 12.8-11.776 32.256-11.776 45.056 0l68.096 68.096c12.8 12.8 12.8 33.792 0 46.592-6.656 6.656-14.848 9.728-23.552 9.728z" fill="#0972E7" p-id="3279"></path><path d="M394.752 383.488l114.176-51.2c31.744 0 57.344 25.6 57.344 57.344v302.592c0 31.744-25.6 57.344-57.344 57.344l-114.176-51.2c-31.744 0-57.344-25.6-57.344-57.344V440.832c0-31.744 25.6-57.344 57.344-57.344z" fill="#CAE4FF" ></path></svg>
              </div>
              <div class="notice-wrap_content swiper-no-swiping">
                <swiper
                    style="height:100%" :loop="swiper_notice.loop" :direction="swiper_notice.direction" :autoplay="swiper_notice.autoplay">
                  <swiper-slide style="display: flex;align-items: center;" v-for="(notice,notice_index) in noticeSwiper" :key="notice_index">
                    <a class="notice_swiper_a">{{notice}}</a>
                  </swiper-slide>
                </swiper>
              </div>
            </div>
          </div>
        </div>
        <card v-for="per in indexArticle" :article="per"></card>
      </div>
    </div>
    <image_banner :show-image="true"/>
    <div class="index_columns_part">
      <div class="index_columns_logo">
        <svg viewBox="0 0 192 54" height="30" style="margin-right: 5px">
          <g transform="translate(-25,85) scale(0.100000,-0.100000)" fill="var(--normal_blue)">
            <path d="M270 575 l0 -215 45 0 45 0 -6 115 -7 115 51 0 52 0 0 -115 0 -115 45 0 45 0 0 117 c0 113 -1 118 -27 145 -24 25 -33 28 -95 28 l-68 0 0 70 0 70 -40 0 -40 0 0 -215z"/>
            <path d="M900 698 c0 -51 -3 -150 -7 -220 l-6 -128 49 0 49 0 -2 157 c-2 87 -5 186 -9 221 l-6 62 -34 0 -34 0 0 -92z"/>
            <path d="M1170 575 l0 -215 45 0 45 0 -6 115 -7 115 51 0 52 0 0 -115 0 -115 45 0 45 0 0 117 c0 113 -1 118 -27 145 -24 25 -33 28 -95 28 l-68 0 0 70 0 70 -40 0 -40 0 0 -215z"/>
            <path d="M1040 725 l0 -45 39 0 39 0 4 45 3 45 -42 0 -43 0 0 -45z"/>
            <path d="M2100 725 l0 -45 39 0 39 0 4 45 3 45 -42 0 -43 0 0 -45z"/>
            <path d="M628 663 l-48 -4 0 -108 c0 -60 -3 -129 -6 -155 l-7 -46 55 0 c30 0 96 3 146 6 l92 7 0 28 c0 15 -6 29 -12 31 -9 3 -14 36 -16 106 -5 144 -14 150 -204 135z m122 -153 l0 -90 -40 0 -40 0 0 53 c0 28 -3 69 -6 90 l-7 37 47 0 46 0 0 -90z"/>
            <path d="M1528 663 l-48 -4 0 -108 c0 -60 -3 -129 -6 -155 l-7 -46 55 0 c30 0 96 3 146 6 l92 7 0 28 c0 15 -6 29 -12 31 -9 3 -14 36 -16 106 -5 144 -14 150 -204 135z m122 -153 l0 -90 -40 0 -40 0 0 53 c0 28 -3 69 -6 90 l-7 37 47 0 46 0 0 -90z"/>
            <path d="M1843 663 l-53 -4 0 -189 c0 -103 3 -195 6 -204 4 -11 19 -16 45 -16 l39 0 0 75 0 75 90 0 90 0 0 113 c0 163 -3 165 -217 150z m127 -133 l0 -70 -45 0 -45 0 0 70 0 70 45 0 45 0 0 -70z"/>
            <path d="M1045 628 c-2 -7 -6 -73 -8 -145 l-6 -133 49 0 49 0 -5 133 c-3 72 -7 138 -10 145 -2 6 -17 12 -34 12 -17 0 -32 -6 -35 -12z"/>
            <path d="M2105 628 c-2 -7 -6 -73 -8 -145 l-6 -133 49 0 49 0 -5 133 c-3 72 -7 138 -10 145 -2 6 -17 12 -34 12 -17 0 -32 -6 -35 -12z"/>
          </g>
        </svg>
        <svg class="icon" viewBox="0 0 1920 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"  height="30">
          <path fill="var(--normal_blue)" d="M358.848 341.312l30.464-85.184h442.112V138.752H431.104L458.432 64H329.024l-27.328 74.752H46.208v117.376h214.592l-31.36 85.12H5.184v117.376h183.232l-71.488 198.528h473.344l-66.688 131.84c-125.312-20.16-270.08-34.56-431.616-43.456v118.144c229.12 8.896 460.608 40.96 694.464 95.616V840.32a4624.832 4624.832 0 0 0-143.04-31.36l135.808-269.248H288.064l29.76-81.216 40.96-117.312v0.128z m39.424 0l-41.856 117.312h516.8V341.312H398.208zM1035.2 335.104c0 220.928-15.68 412.16-48.64 573.76h112.192c16.448-88.256 27.2-178.048 32.96-271.232 5.824-92.352 8.32-193.728 8.32-302.528h-104.832z m348.8-41.216V171.84h-94.016V64.704h-131.072v107.136h-154.176v122.048h159.872V960h126.976V568.448l81.664 64.256V483.52L1291.52 419.264V293.952l92.352-0.064z m7.36 511.936v128.64h522.688v-128.64H1391.36z m432-609.28l26.432-126.976h-125.44l-25.472 126.976V321.92h195.328V196.544H1823.36z m-243.2-126.976h-124.48l25.6 126.976h-70.144V321.92h253.568V196.544h-58.112l-26.432-126.976z m-139.328 410.56v124.48h423.68V480.128h-423.68z" ></path>
        </svg>
      </div>
<!--      <div class="index_columns_split_line"></div>-->
      <div class="index_columns_content">
        <div class="index_columns__entry recommend">
          <div class="index_columns_entry_header">
            <div class="index_columns_entry_header_icon_box recommend">
              <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"  height="25" width="25">
                <g>
                  <path d="M513.472 676.288l-92.448 48.608a32 32 0 0 1-46.4-33.76l17.632-102.912a32 32 0 0 0-9.184-28.32L308.288 487.04a32 32 0 0 1 17.728-54.56l103.36-15.04a32 32 0 0 0 24.064-17.504l46.208-93.632a32 32 0 0 1 57.408 0l46.208 93.632a32 32 0 0 0 24.096 17.536l103.36 15.008a32 32 0 0 1 17.696 54.56l-74.752 72.896a32 32 0 0 0-9.216 28.32l17.664 102.912a32 32 0 0 1-46.432 33.76l-92.448-48.608a32 32 0 0 0-29.76 0z" fill="#FFFFFF"></path>
                  <path d="M497.92 660.736l-92.448 48.576a32 32 0 0 1-46.432-33.728l17.664-102.912a32 32 0 0 0-9.216-28.32l-74.784-72.896a32 32 0 0 1 17.76-54.592l103.328-15.008a32 32 0 0 0 24.096-17.504l46.208-93.632a32 32 0 0 1 57.376 0l46.208 93.632a32 32 0 0 0 24.096 17.504l103.36 15.04a32 32 0 0 1 17.728 54.56l-74.784 72.896a32 32 0 0 0-9.184 28.32l17.632 102.912a32 32 0 0 1-46.4 33.728l-92.448-48.576a32 32 0 0 0-29.76 0z" fill="#FFFFFF"></path>
                  <path d="M659.616 330.336l-3.904 2.08a10.496 10.496 0 0 1-15.232-11.072l0.768-4.352a32 32 0 0 0-9.216-28.32l-3.168-3.104a10.496 10.496 0 0 1 5.824-17.888l4.384-0.64a32 32 0 0 0 24.096-17.504l1.92-3.968a10.496 10.496 0 0 1 18.848 0l1.92 3.968a32 32 0 0 0 24.128 17.504l4.384 0.64a10.496 10.496 0 0 1 5.792 17.92l-3.168 3.072a32 32 0 0 0-9.184 28.32l0.736 4.352a10.496 10.496 0 0 1-15.232 11.072l-3.904-2.08a32 32 0 0 0-29.76 0zM729.12 407.456a5.248 5.248 0 0 1-7.616-5.536 20.224 20.224 0 0 0-5.824-17.888 5.248 5.248 0 0 1 2.912-8.96 20.224 20.224 0 0 0 15.232-11.04 5.248 5.248 0 0 1 9.408 0c2.944 5.984 8.64 10.112 15.2 11.072a5.248 5.248 0 0 1 2.912 8.96 20.224 20.224 0 0 0-5.824 17.856 5.248 5.248 0 0 1-7.584 5.536 20.224 20.224 0 0 0-18.816 0z" fill="#FFFFFF" ></path>
                </g>
              </svg>
            </div>
            <span class="index_columns_entry_header_title">精华推荐</span>
            <div class="index_columns_entry_header_chart_type"></div>
            <a class="index_columns_entry_header_all">
              <svg class="recommend" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M414.47619 121.904762a73.142857 73.142857 0 0 1 73.142858 73.142857v292.571429H195.047619a73.142857 73.142857 0 0 1-73.142857-73.142858V195.047619a73.142857 73.142857 0 0 1 73.142857-73.142857h219.428571z m0 73.142857H195.047619v219.428571h219.428571V195.047619z m73.142858 341.333333v292.571429a73.142857 73.142857 0 0 1-73.142858 73.142857H195.047619a73.142857 73.142857 0 0 1-73.142857-73.142857v-219.428571a73.142857 73.142857 0 0 1 73.142857-73.142858h292.571429zM195.047619 609.52381v219.428571h219.428571v-219.428571H195.047619zM719.238095 121.904762a182.857143 182.857143 0 1 1 0 365.714286 182.857143 182.857143 0 0 1 0-365.714286z m0 73.142857a109.714286 109.714286 0 1 0 0 219.428571 109.714286 109.714286 0 0 0 0-219.428571zM828.952381 536.380952a73.142857 73.142857 0 0 1 73.142857 73.142858v219.428571a73.142857 73.142857 0 0 1-73.142857 73.142857h-219.428571a73.142857 73.142857 0 0 1-73.142858-73.142857V536.380952h292.571429z m-219.428571 292.571429h219.428571v-219.428571h-219.428571v219.428571z"></path></svg>
            </a>
          </div>
          <div class="index_columns_item_box">
            <div class="column_item">
              <span class="item_left">精华推荐测试模块-1</span>
              <span class="item_right">今天 8:04</span>
            </div>
            <div class="column_item">
              <span class="item_left">精华推荐测试模块-2</span>
              <span class="item_right">昨天 9:08</span>
            </div>
            <div class="column_item">
              <span class="item_left">精华推荐测试模块-3</span>
              <span class="item_right">前天 21:12</span>
            </div>
            <div class="column_item">
              <span class="item_left">精华推荐测试模块-4</span>
              <span class="item_right">2024-2-15</span>
            </div>
            <div class="column_item">
              <span class="item_left">精华推荐测试模块-5</span>
              <span class="item_right">2024-2-15</span>
            </div>
            <div class="column_item">
              <span class="item_left">精华推荐测试模块-6</span>
              <span class="item_right">2024-2-15</span>
            </div>
            <div class="column_item">
              <span class="item_left">精华推荐测试模块-7</span>
              <span class="item_right">2024-2-15</span>
            </div>
            <div class="column_item">
              <span class="item_left">精华推荐测试模块-8</span>
              <span class="item_right">2024-2-15</span>
            </div>
            <div class="column_item">
              <span class="item_left">精华推荐测试模块-9</span>
              <span class="item_right">2024-2-15</span>
            </div>
            <div class="column_item">
              <span class="item_left">精华推荐测试模块-10</span>
              <span class="item_right">2024-2-15</span>
            </div>
          </div>
        </div>
        <div class="index_columns__entry new">
          <div class="index_columns_entry_header">
            <div class="index_columns_entry_header_icon_box new">
              <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="25" height="25">
                <path fill="#FFFFFF" d="M1006.762667 443.682133l-129.0752 324.488533-109.806933 0c4.864-39.645867 12.151467-91.886933 21.8624-156.740267-10.5472 28.535467-22.186667 57.309867-34.9696 86.3232l-30.3616 70.417067-110.062933 0 45.806933-324.488533 87.1936 0c-1.655467 8.482133-11.2128 70.417067-28.689067 185.838933 4.352-11.8784 28.859733-73.8304 73.5232-185.838933l83.7632 0L845.653333 629.504c18.0736-54.272 42.734933-116.206933 74.001067-185.838933L1006.762667 443.665067zM608.768 603.8016l-138.666667 0-20.309333 78.4384c-4.2496 16.401067-5.8368 26.965333-4.7616 31.709867 1.0752 4.744533 4.881067 7.099733 11.4176 7.099733 8.123733 0 14.370133-3.140267 18.7392-9.4208 4.369067-6.280533 8.891733-18.449067 13.550933-36.488533l12.3904-47.8208 101.546667 0-6.929067 26.7776c-5.802667 22.408533-11.6224 39.6288-17.476267 51.6608-5.853867 12.032-15.581867 24.866133-29.201067 38.536533-13.6192 13.6704-29.0304 23.9104-46.267733 30.737067-17.237333 6.826667-37.512533 10.257067-60.842667 10.257067-22.6304 0-41.728-3.3792-57.309867-10.103467-15.581867-6.741333-26.658133-15.991467-33.245867-27.733333-6.587733-11.758933-9.915733-24.695467-9.966933-38.8096-0.0512-14.114133 3.413333-34.6624 10.3936-61.627733l27.374933-105.762133c8.209067-31.709867 18.8416-56.712533 31.880533-75.025067 13.038933-18.312533 30.293333-32.341333 51.729067-42.0864 21.435733-9.745067 44.4416-14.626133 69.000533-14.626133 30.0544 0 53.316267 5.870933 69.802667 17.629867 16.4864 11.758933 26.146133 27.323733 28.996267 46.728533 2.833067 19.4048-0.290133 46.6944-9.386667 81.851733L608.768 603.8016zM520.209067 473.719467c-7.424 0-12.629333 2.321067-15.581867 6.9632-2.9696 4.642133-7.099733 17.169067-12.373333 37.5808L485.376 544.768l31.2832 0 6.8608-26.504533c4.864-18.773333 7.0144-30.890667 6.485333-36.352C529.493333 476.450133 526.216533 473.719467 520.209067 473.719467zM431.342933 400.503467c-23.6032 10.376533-42.5984 25.2928-56.951467 44.782933-14.370133 19.490133-26.077867 46.08-35.106133 79.8208l-30.1568 112.5376c-7.68 28.689067-11.502933 50.551467-11.434667 65.570133 0.068267 15.018667 3.720533 28.791467 10.973867 41.284267 7.253333 12.509867 19.456 22.340267 36.608 29.508267 0.7168 0.290133 1.536 0.494933 2.2528 0.785067l-2.884267 10.496-128.529067 0-7.867733-248.4736L139.844267 785.271467 17.237333 785.271467l150.493867-546.56 122.606933 0 14.4384 246.101333 67.771733-246.101333 122.606933 0-42.427733 154.112C445.457067 394.990933 438.289067 397.448533 431.342933 400.503467z"></path>
              </svg>
            </div>
            <span class="index_columns_entry_header_title">最新发布</span>
            <div class="index_columns_entry_header_chart_type"></div>
            <a class="index_columns_entry_header_all">
              <svg class="new" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M414.47619 121.904762a73.142857 73.142857 0 0 1 73.142858 73.142857v292.571429H195.047619a73.142857 73.142857 0 0 1-73.142857-73.142858V195.047619a73.142857 73.142857 0 0 1 73.142857-73.142857h219.428571z m0 73.142857H195.047619v219.428571h219.428571V195.047619z m73.142858 341.333333v292.571429a73.142857 73.142857 0 0 1-73.142858 73.142857H195.047619a73.142857 73.142857 0 0 1-73.142857-73.142857v-219.428571a73.142857 73.142857 0 0 1 73.142857-73.142858h292.571429zM195.047619 609.52381v219.428571h219.428571v-219.428571H195.047619zM719.238095 121.904762a182.857143 182.857143 0 1 1 0 365.714286 182.857143 182.857143 0 0 1 0-365.714286z m0 73.142857a109.714286 109.714286 0 1 0 0 219.428571 109.714286 109.714286 0 0 0 0-219.428571zM828.952381 536.380952a73.142857 73.142857 0 0 1 73.142857 73.142858v219.428571a73.142857 73.142857 0 0 1-73.142857 73.142857h-219.428571a73.142857 73.142857 0 0 1-73.142858-73.142857V536.380952h292.571429z m-219.428571 292.571429h219.428571v-219.428571h-219.428571v219.428571z"></path></svg>
            </a>
          </div>
          <div class="index_columns_item_box">
            <div class="column_item">
              <span class="item_left">精华推荐测试模块-1</span>
              <span class="item_right">今天 8:04</span>
            </div>
            <div class="column_item">
              <span class="item_left">精华推荐测试模块-2</span>
              <span class="item_right">昨天 9:08</span>
            </div>
            <div class="column_item">
              <span class="item_left">精华推荐测试模块-3</span>
              <span class="item_right">前天 21:12</span>
            </div>
            <div class="column_item">
              <span class="item_left">精华推荐测试模块-4</span>
              <span class="item_right">2024-2-15</span>
            </div>
            <div class="column_item">
              <span class="item_left">精华推荐测试模块-5</span>
              <span class="item_right">2024-2-15</span>
            </div>
            <div class="column_item">
              <span class="item_left">精华推荐测试模块-6</span>
              <span class="item_right">2024-2-15</span>
            </div>
            <div class="column_item">
              <span class="item_left">精华推荐测试模块-7</span>
              <span class="item_right">2024-2-15</span>
            </div>
            <div class="column_item">
              <span class="item_left">精华推荐测试模块-8</span>
              <span class="item_right">2024-2-15</span>
            </div>
            <div class="column_item">
              <span class="item_left">精华推荐测试模块-9</span>
              <span class="item_right">2024-2-15</span>
            </div>
            <div class="column_item">
              <span class="item_left">精华推荐测试模块-10</span>
              <span class="item_right">2024-2-15</span>
            </div>
          </div>
        </div>
        <div class="index_columns__entry chart">
          <div class="index_columns_entry_header">
            <div class="index_columns_entry_header_icon_box queue">
              <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="25" height="25">
                <path fill="#FFFFFF" d="M315.597609 894.219711c-62.13867 0-124.393261 0-188.573147 0 0-126.355131 0-252.968887 0-382.249435 63.490354 0 125.046818 0 188.573147 0C315.597609 639.418067 315.597609 765.974062 315.597609 894.219711zM603.685685 893.767018c-60.901509 0-122.853905 0-186.300688 0 0-254.759673 0-508.683912 0-766.051617 62.799822 0 123.42252 0 186.300688 0C603.685685 382.423109 603.685685 637.024689 603.685685 893.767018zM895.189246 894.492526c-62.46245 0-124.032506 0-187.932981 0 0-174.161518 0-348.696784 0-525.524295 61.721953 0 123.860622 0 187.932981 0C895.189246 543.870248 895.189246 718.462275 895.189246 894.492526z"></path>
              </svg>
            </div>
            <span class="index_columns_entry_header_title" style="margin-right: 10px">排行榜</span>
            <div class="index_columns_entry_header_chart_type">
              <div class="index_columns_entry_header_chart_type_content">
                <div class="diy_pagination"></div>
                <div class="swiper-scrollbar diy_scrollbar"></div>
              </div>
            </div>
            <a class="index_columns_entry_header_all" style="margin-left: 10px">
              <svg class="chart" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M414.47619 121.904762a73.142857 73.142857 0 0 1 73.142858 73.142857v292.571429H195.047619a73.142857 73.142857 0 0 1-73.142857-73.142858V195.047619a73.142857 73.142857 0 0 1 73.142857-73.142857h219.428571z m0 73.142857H195.047619v219.428571h219.428571V195.047619z m73.142858 341.333333v292.571429a73.142857 73.142857 0 0 1-73.142858 73.142857H195.047619a73.142857 73.142857 0 0 1-73.142857-73.142857v-219.428571a73.142857 73.142857 0 0 1 73.142857-73.142858h292.571429zM195.047619 609.52381v219.428571h219.428571v-219.428571H195.047619zM719.238095 121.904762a182.857143 182.857143 0 1 1 0 365.714286 182.857143 182.857143 0 0 1 0-365.714286z m0 73.142857a109.714286 109.714286 0 1 0 0 219.428571 109.714286 109.714286 0 0 0 0-219.428571zM828.952381 536.380952a73.142857 73.142857 0 0 1 73.142857 73.142858v219.428571a73.142857 73.142857 0 0 1-73.142857 73.142857h-219.428571a73.142857 73.142857 0 0 1-73.142858-73.142857V536.380952h292.571429z m-219.428571 292.571429h219.428571v-219.428571h-219.428571v219.428571z"></path></svg>
            </a>
          </div>
          <div class="index_columns_item_box">
            <swiper :space-between="swiper_chart.spaceBetween" :scrollbar="swiper_chart.scrollbar" :pagination="swiper_chart.pagination">
              <swiper-slide>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-1</span>
                  <span class="item_right">今天 8:04</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-2</span>
                  <span class="item_right">昨天 9:08</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-3</span>
                  <span class="item_right">前天 21:12</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-4</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-5</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-6</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-7</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-8</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-9</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-10</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-11</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-12</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-13</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-14</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-15</span>
                  <span class="item_right">2024-2-15</span>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-1</span>
                  <span class="item_right">今天 8:04</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-2</span>
                  <span class="item_right">昨天 9:08</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-3</span>
                  <span class="item_right">前天 21:12</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-4</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-5</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-6</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-7</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-8</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-9</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-10</span>
                  <span class="item_right">2024-2-15</span>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-1</span>
                  <span class="item_right">今天 8:04</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-2</span>
                  <span class="item_right">昨天 9:08</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-3</span>
                  <span class="item_right">前天 21:12</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-4</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-5</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-6</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-7</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-8</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-9</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-10</span>
                  <span class="item_right">2024-2-15</span>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-1</span>
                  <span class="item_right">今天 8:04</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-2</span>
                  <span class="item_right">昨天 9:08</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-3</span>
                  <span class="item_right">前天 21:12</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-4</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-5</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-6</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-7</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-8</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-9</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-10</span>
                  <span class="item_right">2024-2-15</span>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-1</span>
                  <span class="item_right">今天 8:04</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-2</span>
                  <span class="item_right">昨天 9:08</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-3</span>
                  <span class="item_right">前天 21:12</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-4</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-5</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-6</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-7</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-8</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-9</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-10</span>
                  <span class="item_right">2024-2-15</span>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-1</span>
                  <span class="item_right">今天 8:04</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-2</span>
                  <span class="item_right">昨天 9:08</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-3</span>
                  <span class="item_right">前天 21:12</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-4</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-5</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-6</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-7</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-8</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-9</span>
                  <span class="item_right">2024-2-15</span>
                </div>
                <div class="column_item">
                  <span class="item_left">精华推荐测试模块-10</span>
                  <span class="item_right">2024-2-15</span>
                </div>
              </swiper-slide>
            </swiper>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="@/special_assets/css/index_test_partStyles.css" scoped></style>
<style>
.swiper-bullet{
  position: relative;
  display: inline-block;
  width: 8px;
  height: 8px;
  margin: 4px;
  border-radius: 50%;
  background-color: rgba(255,255,255,.4);
  overflow: hidden;
  cursor: pointer;
}
.swiper-pagination-bullet-active{
  background-color: #FFFFFF;
}

.diy_scrollbar_drag{
  height: 100%;
  position: relative;
  background: rgba(251, 114, 153, 0.5);
  border-radius: 10px;
  left: 0;
  top: 0;
}

.index_columns_content .diy_pagination_bullet{
  cursor: pointer;
  transition: color.3s;
}

.index_columns_content .diy_pagination_bullet.diy_pagination_bullet_active{

}

.index_columns_content .diy_pagination_bullet:hover{
  color: var(--normal_blue);
}

</style>
