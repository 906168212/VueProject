import {createStore} from "vuex";
import headerModule from "@/store/modules/headerModule.js";
import redirectModule from "@/store/modules/redirectModule.js";
import gameModule from "@/store/modules/gameModule.js";
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
    modules:{
        header:headerModule,
        redirect:redirectModule,
        game:gameModule
        //其他模块
    },
    plugins: [createPersistedState()]
});

export default store;
