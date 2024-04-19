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
    constructor(id, name, href,count) {
        this.id = id;
        this.name = name;
        this.href = href;
        this.count = count;
    }
}

export const links = [
    new Links(0,'动漫','/animation',0),
    new Links(1,'漫画','/comic',0),
    new Links(2,'游戏','/game',0),
    new Links(3,'吃瓜','/melon',0),
    new Links(4,'热点','/hot',0),
    new Links(5,'资讯','/news',0),
    new Links(6,'影视','/movie',0),
    new Links(7,'美食','/food',0),
    new Links(8,'旅游','/travel',0),
    new Links(9,'知识','/knowledge',0),
    new Links(10,'单机游戏','/dan',0),
    new Links(11,'生活','/life',0),
    new Links(12,'工具','/tool',0),
    new Links(13,'ASMR','/asmr',0),
    new Links(14,'网址大全','/website',0),
    new Links(15,'精品','/goods',0)
]

