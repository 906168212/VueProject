import {links} from "@/api/dataInfo.js";
import {computed, reactive, ref} from "vue";
import BlotFormatter from "quill-blot-formatter";
import ImageUploader from "quill-image-uploader";
import router from "@/router/index.js";
import {cloudList_Eng} from "@/utils/constants.js";
import {submitFileToOss} from "@/utils/AliOss.js";


const LABEL_MAX_NUMBER = 10
const TITLE_MAX_INPUT = 40
const DESC_MAX_INPUT = 150
const columns = links;

const defaultId = 2
const defaultCid = 0
const defaultColumn = links[defaultId].name
const defaultCategory = links[defaultId].category[defaultCid]

class CloudLink {
    cloud = null
    link = null
    code = null
}
class SaveInfo {
    content = {
        title:'',
        desc:'',
        quillContent:''
    }
    region = {
        rid: defaultId,
        cid: defaultCid,
        column: defaultColumn,
        category: defaultCategory
    }
    cover = null
    labels = [this.region.column,this.region.category]
    cloudLinks = []
}
class Dialog {
    image = false
    link = false
}
class Verify {
    listHasBlank = false
}

class PictureUpload{
    previousPids = []
    pids = []
    removePids = []
}

const saveInfo = reactive(new SaveInfo())
const dialog = reactive(new Dialog())
const cloudLink = reactive([new CloudLink()])
const verify = reactive(new Verify())
const pictureUpload = reactive(new PictureUpload())

const timer = ref(null)
const agree = ref(true)
const showMoreConfig = ref(false)
const quillEditor = ref(null)
const labelText = ref(null)

const showCategory = ref(false)
const quillNumber = ref(0)
const showColumnId = ref(defaultId)
const labelTouchId = ref(null)

const modules = [
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
                return new Promise(async (resolve, reject) => {
                    const url = await submitFileToOss(file);
                    if(url === null) reject("返回的url为空")
                    resolve(url)
                })
            }
        }
    }
]
const openDialog=(type)=>{
    dialog[type] = true
}
const closeCoverDialog=(payload)=>{
    dialog.image = payload
}
const closeLinkDialog=(payload)=>{
    dialog.link = payload
    cloudLink.splice(0,cloudLink.length,new CloudLink())
}

const sureDialog = (value,payload)=>{
    try {
        if(value === 'cover' && payload){
            saveInfo.cover = payload
        }else if(value === 'link' && payload){
            for(const item of cloudLink){
                const isCloud = item.cloud === null
                const isLink = item.link === null
                if(isCloud || isLink){
                    verify.listHasBlank = true
                    log.error("内容不得为空！")
                    break;
                }else verify.listHasBlank = false
            }
            if(!verify.listHasBlank){
                cloudLink.forEach(item=>{
                    saveInfo.cloudLinks.push(item)
                })
                cloudLink.splice(0,cloudLink.length,new CloudLink())
                dialog.link = false
            }
        }else {
            throw new Error("意外的dialog参数！")
        }
    }catch (e){
        log.error(e.message)
        console.error(e.message)
    }
}
const getPids=(pids,html)=> {
    let dom = document.createElement("div")
    dom.innerHTML = html
    const imgDom = dom.getElementsByTagName('img');
    // const url = HOST
    const url = 'https://upload.wikimedia.org'
    const pidArr = []
    for (let i = 0; i < imgDom.length; i++) {
        const urlParams = new URLSearchParams(imgDom[i])
        // if(imgDom[i].src.indexOf(url)!==-1 && urlParams.has('pid')){
        if (imgDom[i].src.indexOf(url) !== -1) {
            // let pid = urlParams.get('pid')
            pidArr.push(imgDom[i].src)
        }
    }
    // 找出被删除的pids
    const deletedPids = pictureUpload.previousPids.filter(prevPid => !pidArr.includes(prevPid))
    // 更新上一次的pid列表,slice用于创建浅拷贝，防止过程中pidArr出现改变
    pictureUpload.previousPids = pidArr.slice()
    if (deletedPids.length > 0){
        deletedPids.forEach(item=>{
            pictureUpload.removePids.push(item)
        })
    }
}
const onEditorChange=()=>{
    getPids(null,quillEditor.value.getHTML())
}

const handleEnterKey=()=>{
    // 按下回车键时执行的操作
    if(labelText.value){
        // 如果输入框中有文本，则创建一个新的标签并添加到 labels 数组中
        saveInfo.labels.push(labelText.value);
        // 清空内容文本
        labelText.value = null
    }
}
const handleLabelMouseEnter=(index)=>{
    timer.value = setTimeout(()=>{
        if(index!==0 && index!==1)
            labelTouchId.value = index
    },100)
}

const handleLabelMouseLeave=()=>{
    clearTimeout(timer.value)
    labelTouchId.value = null
}

const deleteLabel=(index)=>{
    if(index!==0&&index!==1){
        saveInfo.labels.splice(index,1)
        // labelTouchId.value = null
    }
}
const toggleAgree=()=>{
    agree.value = !agree.value
}

const riseCloudLink = ()=>{
    cloudLink.push(new CloudLink())
}
const updateSelectedId = (item,payload)=>{
    item.cloud = payload
}
const CloudLinkSvgName =(item)=>{
    return cloudList_Eng[item.cloud]+'_cloud'
}
const deleteCloudLinkItem = (deleteIndex)=>{
    saveInfo.cloudLinks = saveInfo.cloudLinks.filter((_,index)=>index !== deleteIndex)
}
const getQuillNum =()=>{
    quillNumber.value = quillEditor.value.getText().length - 1
}
const getSelectedColumn=(index)=>{
    showCategory.value = true
    showColumnId.value = index
}
const sureRegion=(rid,cid,column,category)=>{
    saveInfo.region.rid = rid
    saveInfo.region.cid = cid
    saveInfo.region.column = column
    saveInfo.region.category = category
    saveInfo.labels[0] = column
    saveInfo.labels[1] = category
    showCategory.value = false
}

const checkClick=()=>{
    if(showCategory.value) showCategory.value = false
}
const submit = (event)=>{
    const value = event.submitter.value
    if(value==='upload'){}
    else if(value==='sketch'){}
    else if(value==='preview'){
        const checkBlank = /^\s*$/.test(quillEditor.value.getText())
        if(saveInfo.content.title==='') return log.error("好歹起个标题嘛~")
        if(saveInfo.content.quillContent==='' || checkBlank) return log.error("正文空空呢~（不可只输入空格或换行哦）")
        // 将预览信息存入sessionStorage
        const data = {
            saveInfo:saveInfo,
            userInfo:{
                nickname:null,
                level:0,
                fans:0,
                articles:0
            }
        }
        const info = JSON.stringify(data)
        sessionStorage.setItem('preview_info',info)
        let routerUrl = router.resolve({
            name: 'preview'
        })
        window.open(routerUrl.href,'_blank')
    }
}
const titleNum = computed(()=> saveInfo.content.title.length)
const descNum = computed(()=>saveInfo.content.desc.length)
const labelNum = computed(()=>saveInfo.labels.length)

export {
    LABEL_MAX_NUMBER,
    TITLE_MAX_INPUT,
    DESC_MAX_INPUT,
    columns,
    defaultColumn,
    defaultCategory,
    modules,
    saveInfo,
    dialog,
    labelText,
    cloudLink,
    agree,
    quillEditor,
    quillNumber,
    showColumnId,
    labelTouchId,
    openDialog,
    closeCoverDialog,
    closeLinkDialog,
    sureDialog,
    onEditorChange,
    deleteLabel,
    handleEnterKey,
    CloudLinkSvgName,
    deleteCloudLinkItem,
    updateSelectedId,
    riseCloudLink,
    toggleAgree,
    submit,
    getQuillNum,
    getSelectedColumn,
    sureRegion,
    checkClick,
    handleLabelMouseEnter,
    handleLabelMouseLeave,
    showMoreConfig,
    showCategory,
    titleNum,
    descNum,
    labelNum,
}
