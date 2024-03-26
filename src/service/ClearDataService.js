// 清除数据的全局 mixin 或者服务
import { reactive, isRef, isReactive, ref } from 'vue';

export default {
    methods: {
        clearAllData() {
            // 遍历所有的 ref 和 reactive 数据，将它们设为 null 或者 undefined
            const clear = (obj) => {
                if (isRef(obj)) {
                    obj.value = null;
                } else if (isReactive(obj)) {
                    for (const key in obj) {
                        clear(obj[key]);
                    }
                }
            };

            clear(this.$data); // 清除当前组件实例中的数据
        }
    }
};
