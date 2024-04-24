export class cardInfo {
    aid = ''
    author = '默认作者'
    category='none'
    alt = ''
    desc=''
    pic_avif = ''
    pic_webp = ''
    pic = ''
    visitor = 0
    review = 0
    like = 0
    collect = 0
    pubDate = '0-0'
}


export class Nav{
    current_level = 1
    current_vip = 0
    current_level_name = '新手上路'
    vip_status = 0
    point_num = 0.0
    future_coin_num = 0.0
    nickName = '用户_0000000'
    number = 0
}


class Links {
    constructor(id, name, href,category) {
        this.id = id;
        this.name = name;
        this.href = href;
        this.category = category;
    }
}

export const links = [
    new Links(0,'动漫','/animation',[]),
    new Links(1,'漫画','/comic',[]),
    new Links(2,'游戏','/game',['PC游戏','模拟器游戏','至高之神','手机游戏','游戏插件']),
    new Links(3,'吃瓜','/melon',[]),
    new Links(4,'热点','/hot',[]),
    new Links(5,'资讯','/news',[]),
    new Links(6,'影视','/movie',[]),
    new Links(7,'美食','/food',[]),
    new Links(8,'旅游','/travel',[]),
    new Links(9,'知识','/knowledge',[]),
    new Links(10,'单机游戏','/dan',[]),
    new Links(11,'生活','/life',[]),
    new Links(12,'工具','/tool',[]),
    new Links(13,'ASMR','/asmr',[]),
    new Links(14,'网址大全','/website',[]),
    new Links(15,'精品','/goods',[])
]

