export interface LazyBindingValue {
    rid?: number,
    cid?: number
}

export interface loginInfo {
    username : string,
    password : string
}

export interface registerInfo {
    username : string,
    nickname : string,
    password : string,
    email : string,
    code : string
}



export interface cloudLink {
    cloud : number,
    link : string,
    code : string
}

export interface cardInfo {
    aid : number,
    author : string,
    title : string,
    desc : string,
    stat : {
        sid : number,
        like : number,
        visitor : number,
        collect : number,
        review : number
    }
    coverSrc : string,
    category : {
        id : {
            rid : number,
            cid : number
        },
        name : string
    },
    pubDate : number
}

export interface articleInfo extends cardInfo{
    content : string,
    labels : string[],
    cloudLinks : cloudLink[],
    pictures : string[],
    updateTime : number
}
