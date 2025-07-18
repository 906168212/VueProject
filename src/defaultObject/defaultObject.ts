import {cardInfo} from "@/interface/interface";

export const DefaultCardInfo = ():cardInfo => ({
    aid : 0,
    author : '默认用户',
    title : '默认标题',
    desc : '默认描述',
    stat : {
        sid : 0,
        like : 0,
        visitor : 0,
        collect : 0,
        review : 0
    },
    coverSrc : '',
    category : {
        id : {
            rid : 0,
            cid : 0
        },
        name : ''
    },
    pubDate : 0
})

// 生成若干个默认文章

