<script setup >
import {onMounted, onUnmounted, reactive, ref} from "vue";
import store from "@/store/index.js";
import {QuillEditor} from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import ImageCut from "@/components/imageCut.vue";
import PlatformFooter from "@/components/platformFooter.vue";
import SelfDialog from "@/components/selfDialog.vue";
import HaSelect from "@/components/ha-select.vue";
import {cloudList} from "@/utils/constants.js";
import {
  agree,
  checkClick,
  closeCoverDialog,
  closeLinkDialog,
  cloudLink, quillEditor,
  CloudLinkSvgName,
  columns,
  defaultCategory,
  defaultColumn,
  deleteCloudLinkItem,
  deleteLabel,
  DESC_MAX_INPUT,
  descNum,
  dialog,
  getQuillNum,
  getSelectedColumn,
  handleEnterKey,
  LABEL_MAX_NUMBER,
  labelNum,
  labelText,
  modules,
  onEditorChange,
  openDialog,
  quillNumber,
  riseCloudLink,
  saveInfo,
  showCategory,
  showColumnId,
  showMoreConfig,
  submit,
  sureDialog,
  sureRegion,
  TITLE_MAX_INPUT,
  titleNum,
  toggleAgree,
  updateSelectedId, handleLabelMouseEnter, handleLabelMouseLeave, labelTouchId
} from "@/special_assets/js/contribute/contribute_send.js";



onMounted(()=>{
  store.commit('page/setContributePage',0)
})

// 未完成目标：图片删除，为每个图片添加一个pid
</script>

<template>
  <div class="platform_popover">
    <div class="platform_entry max_entry">
      <div class="platform_entry_top_wrap platform_entry_padding">
        <div class="left_part">
          <svg-icon icon-name="send_article" class-name="send_article_svg"></svg-icon>
          <span class="send_article_test">文章投稿</span>
        </div>
      </div>
      <div class="platform_entry_main_wrap platform_entry_padding">
        <div class="article_put_cover_wrap">
          <div class="article_put_cover">
            <svg-icon icon-name="title" class-name="title_svg"></svg-icon>
            <span class="article_put_test">封面</span>
          </div>
          <div class="article_put_cover_style" @click="openDialog('image')">
            <div class="article_put_cover_svg_wrap" >
              <svg-icon  class-name="contribute_send_large_svg" icon-name="contribute_send"></svg-icon>
            </div>
            <img v-if="saveInfo.cover" :src="saveInfo.cover" alt="">
            <self-dialog v-show="dialog.image">
              <image-cut class="image_cut_position" :dialog="dialog.image" @closeDialog="closeCoverDialog" @getBackCoverData="sureDialog('cover',$event)"></image-cut>
            </self-dialog>
          </div>
        </div>
        <div class="article_put_title_wrap">
          <div class="article_put_title">
            <svg-icon icon-name="title" class-name="title_svg"></svg-icon>
            <span class="article_put_test">标题</span>
          </div>
          <div class="article_put_input">
            <input placeholder="请输入标题（建议30字以内）" :maxlength="TITLE_MAX_INPUT" v-model="saveInfo.content.title">
            <span class="article_input_text_count">{{ titleNum }}/{{ TITLE_MAX_INPUT }}</span>
          </div>
        </div>
        <div class="article_put_desc_wrap">
          <div class="article_put_desc">
            <svg-icon icon-name="describe" class-name="desc_svg"></svg-icon>
            <span class="article_put_test">简介</span>
          </div>
          <div class="article_put_input">
            <textarea placeholder="请输入简介（建议100字以内）" :maxlength="DESC_MAX_INPUT" v-model="saveInfo.content.desc"/>
            <span class="article_input_text_count desc">{{descNum}}/{{DESC_MAX_INPUT}}</span>
          </div>
        </div>
        <div class="article_put_content_wrap">
          <div class="article_put_content">
            <svg-icon icon-name="article_main" class-name="article_main_svg"></svg-icon>
            <span class="article_put_test">主要内容</span>
          </div>
          <QuillEditor theme="snow" placeholder="请输入具体内容" ref="quillEditor" content-type="html" @editorChange="onEditorChange" @textChange="getQuillNum"  :modules="modules" toolbar="full"  v-model:content="saveInfo.content.quillContent"/>
          <div class="quill_editor_count_wrap">
            <span class="quill_editor_count">已输入{{ quillNumber }}字</span>
          </div>
        </div>
        <div class="article_put_more_config_wrap">
          <div v-if="showMoreConfig" class="more_config_entry">
              <div class="column_config">
                <span>请设置专栏分类</span>
                <div v-oclick="checkClick" class="column_item_container">
                  <div  v-for="(column,index) in columns" :key="index" class="column_item">
                    <span  class="column_click_box" :class="{selected:saveInfo.region.rid === index}" @click="getSelectedColumn(index)">{{ column.name }}</span>
                    <col-transition>
                      <div class="column_item_category" v-show="showCategory && showColumnId === index">
                        <div class="column_item_category_inner">
                          <div v-for="(single,ind) in column.category" :class="{selected:saveInfo.region.cid === ind}" @click="sureRegion(index,ind,column.name,single)" class="column_category_item">{{single}}</div>
                        </div>
                      </div>
                    </col-transition>
                  </div>
                </div>
                <div class="column_config_tip">
                  <span>当前选择的分类：</span>
                  <span style="color: var(--Lb5_u)">{{saveInfo.region.column}} / {{saveInfo.region.category}}</span>
                </div>
                <div class="column_config_tip mt_10">
                  <svg-icon icon-name="info" class-name="info_svg"></svg-icon>
                  <span>非必选，默认选择【{{defaultColumn}} / {{defaultCategory}}】</span>
                </div>
              </div>
              <div class="label_config">
                <div class="label_title">
                  <span>请添加标签</span>
                  <span class="label_desc">（还可以添加{{ LABEL_MAX_NUMBER - labelNum }}个标签）</span>
                </div>
                <div class="label_display_entry">
                  <div class="label_item" v-for="(item,index) in saveInfo.labels" :data-index="index"
                       @mouseenter="handleLabelMouseEnter(index)" @mouseleave="handleLabelMouseLeave" @click="deleteLabel(index)">
                    {{item}}
                    <transition name="labelDelete">
                      <div class="label_item_svg_box" v-if="labelTouchId===index">
                        <svg-icon  icon-name="delete" class-name="delete_svg"></svg-icon>
                      </div>
                    </transition>
                  </div>
                  <div class="label_input_wrap" v-if="labelNum<LABEL_MAX_NUMBER">
                    <input type="text" placeholder="例如：游戏" v-model="labelText" @keyup.enter="handleEnterKey" maxlength="12">
                    <span>按回车Enter创建标签</span>
                  </div>
                </div>
                <div class="label_config_tip mt_10">
                  <svg-icon icon-name="info" class-name="info_svg"></svg-icon>
                  <span>非必选，默认为选择的专栏类别，且不可删除</span>
                </div>
              </div>
              <div class="hyperlink_config mt_40">
                <span class="config_title_text">请添加相关下载链接</span>
                <div class="hyperlink_content mt_20">
                  <div class="mt_20">
                    <div class="determine_link">
                      <div v-for="(item,index) in saveInfo.cloudLinks" class="determine_link_item">
                        <div class="determine_link_item__cloud">
                          <svg-icon :icon-name="CloudLinkSvgName(item)" class-name="determine_link_item_svg cloud_svg"></svg-icon>
                          <span class="cloud_test">{{cloudList[item.cloud]}}</span>
                        </div>
                        <split height="20px" background-color="var(--line_contribute)"></split>
                        <div class="determine_link_item__link">
                          <svg-icon icon-name="link" class-name="determine_link_item_svg link_svg"></svg-icon>
                          <span>链接：</span>
                          <input v-model="item.link" @click.stop="console.log(7)" class="cloud_link_input">
                        </div>
                        <split height="20px" background-color="var(--line_contribute)"></split>
                        <div class="determine_link_item__code">
                          <svg-icon icon-name="withdraw_code" class-name="determine_link_item_svg withdraw_code_svg"></svg-icon>
                          <span>提取码：</span>
                          <input @click.stop="console.log(8)" v-model="item.code" class="cloud_code_input">
                        </div>
                        <div class="determine_link_item__delete" @click.stop="deleteCloudLinkItem(index)">
                          <div class="determine_link_item__delete_inner" style="width: 30px;height: 30px">
                            <svg-icon class-name="delete_svg" icon-name="delete"></svg-icon>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="hyperlink_content_inner" @click.prevent="openDialog('link')">
                      <svg-icon icon-name="plus" class-name="plus_svg"></svg-icon>
                    </div>
                    <diy-dialog title="添加相关下载链接" v-if="dialog.link" @closeDialog="closeLinkDialog" @sureDialog="sureDialog('link',$event)">
                      <slot>
                        <div class="hyperlink_put_wrap">
                          <div class="hyperlink_put_inner">
                            <div class="hyperlink_item" v-for="item in cloudLink">
                              <ha-select @updateSelectedId="updateSelectedId(item,$event)" class="ha-select-diy" :selected-list="cloudList" placeholder="选择相应网盘"></ha-select>
                              <span style="margin-left: 20px">链接：</span>
                              <input v-model="item.link" type="text" class="hyperlink_item_link" placeholder="输入相关链接">
                              <span>提取码：</span>
                              <input v-model="item.code" type="text" class="hyperlink_code" placeholder="提取码" maxlength="4">
                            </div>
                            <div class="hyperlink_put_more mt_20" @click="riseCloudLink">
                              <svg-icon icon-name="plus" class-name="plus_svg"></svg-icon>
                              <span>新增</span>
                            </div>
                            <div class="hyperlink_put_tip">
                              <svg-icon  icon-name="info" class-name="info_svg"></svg-icon>
                              <span>若无提取码，则可空余</span>
                            </div>
                          </div>
                        </div>
                      </slot>
                    </diy-dialog>
                  </div>
                </div>
              </div>
              <div class="agreement_config">
                <div class="agreement_allow_wrap" @click="toggleAgree" :class="{selected:agree}">
                  <svg-icon v-if="agree" class-name="selected_svg" icon-name="selected"></svg-icon>
                </div>
                <div class="agreement_text">
                  <span @click="toggleAgree">我已阅读并接受</span>
                  <span class="agreement_content">《哈哩哈皮文章上传协议》</span>
                  <span @click="toggleAgree">和</span>
                  <span class="agreement_content">《哈哩哈皮文章规范》</span>
                </div>
              </div>
            </div>
          <div class="more_config_tip" v-if="!showMoreConfig">
            <div class="more_config_tip_inner" @click="showMoreConfig=true">
              <span>更多设置</span>
              <svg-icon icon-name="arrow" class-name="arrow_svg"></svg-icon>
            </div>
            <div class="more_config_tip_test">
              <svg-icon icon-name="info" class-name="info_svg"></svg-icon>
              <span>分类、标签、链接、上传协议等</span>
            </div>
          </div>

        </div>
        <div class="article_put_upload_wrap">
          <form @submit.prevent="submit">
            <button value="upload" class="upload_btn" :class="{disabled:!agree}" :disabled="!agree">提交文章</button>
            <button value="sketch">存草稿箱</button>
            <button value="preview">网页预览</button>
          </form>
        </div>
      </div>
      <platform-footer/>
    </div>

  </div>
</template>

<style src="@/special_assets/css/articleSend.css" scoped>

</style>

