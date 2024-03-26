import {ref} from "vue";

const state = {
    redirectCode: null
}
const mutations = {
    setRedirectCode(state,value){
        state.redirectCode = value
    },
    clearRedirectCode(state){
        state.redirectCode = null
    }
}
const actions = {
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
