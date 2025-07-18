import BlotFormatter from "quill-blot-formatter";
import {uploadArticleImage} from "@/api/articleApi";
import {computed, onUnmounted, reactive, Ref, ref} from "vue";
import {links} from "@/api/dataInfo.js";
import {cloudList_Eng} from "@/utils/constants";
import ImageUploader from "quill-image-uploader";
import {QuillEditor} from "@vueup/vue-quill";
import router from "@/router";
import {uploadArticle} from "@/api/contribute/contributeResponse";


// 确保清除定时器
onUnmounted(() => {
    if (timer.value) {
        clearTimeout(timer.value);
        timer.value = null;
    }
});


interface cloudLink {
    cloud : number | null,
    link : string ,
    code :  string
}

interface saveInfo {
    content : {
        title : string,
        desc : string,
        quillContent : string
    },
    region : {
        rid : number,
        cid : number,
        region : string,
        category : string
    },
    cover : string | null,
    labels : string[],
    cloudLinks : cloudLink[]
}

export const LABEL_MAX_NUMBER = 10
export const LABEL_MAX_LENGTH = 12
export const TITLE_MAX_INPUT = 40
export const DESC_MAX_INPUT = 150

const defaultId = 2
const defaultCid = 0
const timer = ref<number | null>(null)
export const defaultRegion = links[defaultId].name
export const defaultCategory = links[defaultId].category[defaultCid]

export const columns = links;

export const cloudLinkListHasBlank = ref(false)

export const coverDialog = ref(false)
export const cloudLinkDialog = ref(false)
export const showMoreConfig = ref(false)
export const showCategory = ref(false)
export const agree = ref(true)
export const quillNumber = ref(0)
export const showColumnId = ref(defaultId)
export const quillEditor = ref<InstanceType<typeof QuillEditor> | null>(null);
export const labelTouchId  = ref<null | number>(null)
export const labelText = ref<null | string>(null)

export const saveInfo : saveInfo = reactive({
    content : {
        title : '',
        desc : '',
        quillContent : ''
    },
    region : {
        rid : defaultId,
        cid : defaultCid,
        region : defaultRegion,
        category : defaultCategory
    },
    cover : null,
    labels : [defaultRegion,defaultCategory],
    cloudLinks : []
})

export const cloudLinks : [cloudLink] = reactive([{cloud : null, link : '', code : ''}])

export const sureRegion=(rid:number,cid:number,column:string,category:string)=>{
    saveInfo.region.rid = rid
    saveInfo.region.cid = cid
    saveInfo.region.region = column
    saveInfo.region.category = category
    saveInfo.labels[0] = column
    saveInfo.labels[1] = category
    showCategory.value = false
}

export const modules = [
    {
        name: 'blotFormatter',
        module: BlotFormatter,
        options:{}
    },
    {
        name: 'imageUploader',
        module: ImageUploader,
        options: {
            upload: file=>{
                return new Promise((resolve,reject)=>{
                    const formData = new FormData();
                    formData.append('image', file)
                    // uploadArticleImage(formData,resolve,reject)
                })
            }
        }
    }
]

export const closeCoverDialog = (payload)=>{
    coverDialog.value = payload
}

export const closeCloudLinkDialog = (payload)=>{
    cloudLinkDialog.value = payload
}

export const sureDialog = (value,payload) =>{
    try {
        if (value == 'cover' && payload) {
            saveInfo.cover = payload
        }else if (value === 'link' && payload) {
            for(const item of cloudLinks){
                const isCloud = item.cloud === null
                const isLink = item.link === ''
                if(isCloud || isLink){
                    cloudLinkListHasBlank.value = true
                    log.error("内容不得为空！")
                    break;
                }else cloudLinkListHasBlank.value = false
            }
            if(!cloudLinkListHasBlank.value){
                cloudLinks.forEach(item=>{
                    saveInfo.cloudLinks.push(item)
                })
                cloudLinks.splice(0,cloudLinks.length,{cloud : null, link : '', code : ''})
                cloudLinkDialog.value = false
            }
        }else {
            throw new Error("意外的dialog参数！")
        }
    }catch (e:any){
        log.error(e.message)
        console.error(e.message)
    }
}

export const titleNum = computed(()=> saveInfo.content.title.length)
export const descNum = computed(()=>saveInfo.content.desc.length)
export const labelNum = computed(()=>saveInfo.labels.length)
export const getQuillNum =()=>{
    quillNumber.value = quillEditor.value.getText().length - 1
}

export const checkClick=()=>{
    if(showCategory.value) showCategory.value = false
}
export const getSelectedColumn=(index)=>{
    showCategory.value = true
    showColumnId.value = index
}

export const handleLabelMouseEnter=(index)=>{
    timer.value = window.setTimeout(()=>{
        if(index!==0 && index!==1)
            labelTouchId.value = index
    },100)
}

export const handleLabelMouseLeave=()=>{
    if (timer.value){
        window.clearTimeout(timer.value);
        timer.value = null;
    }
    labelTouchId.value = null
}
export const deleteLabel=(index)=>{
    if(index!==0&&index!==1){
        saveInfo.labels.splice(index,1)
        // labelTouchId.value = null
    }
}
export const handleEnterKey=()=>{
    // 按下回车键时执行的操作
    if(labelText.value){
        // 如果输入框中有文本，则创建一个新的标签并添加到 labels 数组中
        saveInfo.labels.push(labelText.value);
        // 清空内容文本
        labelText.value = null
    }
}

export const CloudLinkSvgName =(item)=>{
    return cloudList_Eng[item.cloud]+'_cloud'
}
export const deleteCloudLinkItem = (deleteIndex)=>{
    saveInfo.cloudLinks = saveInfo.cloudLinks.filter((_,index)=>index !== deleteIndex)
}
export const updateSelectedId = (item,payload)=>{
    item.cloud = payload
}
export const riseCloudLink = ()=>{
    cloudLinks.push({cloud : null, link : '', code : ''})
}
export const submit = async (event: SubmitEvent) => {
    const target = event.target as HTMLFormElement;
    const submitter = event.submitter as HTMLButtonElement;
    const value = submitter.value;
    const checkBlank = /^\s*$/.test(quillEditor.value.getText())
    if (saveInfo.content.title === '') return log.error("好歹起个标题嘛~")
    if (saveInfo.content.desc === '') return log.error("描述一下吧~")
    if (saveInfo.content.quillContent === '' || checkBlank) return log.error("正文空空呢~（不可只输入空格或换行哦）")

    // 准备提交数据
    const formData = {
        title: saveInfo.content.title,
        desc: saveInfo.content.desc,
        content: saveInfo.content.quillContent,
        coverSrc: 'https://picsum.photos/320/180.webp?'+Math.random(),
        category: {
            rid: saveInfo.region.rid,
            cid: saveInfo.region.cid,
        },
        labels: saveInfo.labels,
        cloudLinks: saveInfo.cloudLinks,
    }
    if (value === 'upload') {
        try {
            // 提交文章
            const {success, data, error} = await uploadArticle(formData)
            if (success) log.success("文章上传成功！")
            else log.error(error)
        } catch (error: any) {
            console.error('操作失败:', error)
            log.error('请求处理失败，请检查网络')
        }
    } else if (value === 'sketch') {
    } else if (value === 'preview') {
        // 将预览信息存入sessionStorage
        const data = {
            saveInfo: saveInfo,
            userInfo: {
                nickname: null,
                level: 0,
                fans: 0,
                articles: 0
            }
        }
        const info = JSON.stringify(data)
        sessionStorage.setItem('preview_info', info)
        let routerUrl = router.resolve({
            name: 'preview'
        })
        window.open(routerUrl.href, '_blank')
    }
}
