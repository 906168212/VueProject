import {createStore} from "vuex";
import headerModule from "@/store/modules/headerModule.js";
import redirectModule from "@/store/modules/redirectModule.js";

const store = createStore({
    modules:{
        header:headerModule,
        redirect:redirectModule,
        //其他模块
    },
});

export default store;
