import {createStore} from "vuex";
import headerModule from "@/store/modules/headerModule.js";
import redirectModule from "@/store/modules/redirectModule.js";
import createPersistedState from 'vuex-persistedstate'
import pageModule from "@/store/modules/pageModule.js";

const store = createStore({
    modules:{
        header:headerModule,
        redirect:redirectModule,
        page:pageModule
        //其他模块
    },
    plugins: [createPersistedState({
        paths:["page"]
    })]
});

export default store;
