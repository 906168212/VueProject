import {ref} from "vue";

const state = {
    scrolled_bar : ref(false),
    scrolled_channel:ref(false)
}
const mutations = {
    SET_SCROLLED_BAR(state,value){
        state.scrolled_bar = value
    },
    SET_SCROLLED_CHANNEL(state,value){
        state.scrolled_channel = value
    }
}
const actions = {
    noScrolledBar({commit}){
        commit('SET_SCROLLED_BAR',false)
    },
    canScrolledBar({commit}){
        commit('SET_SCROLLED_BAR',true)
    },
    noScrolledChannel({commit}){
        commit('SET_SCROLLED_CHANNEL',false)
    },
    canScrolledChannel({commit}){
        commit('SET_SCROLLED_CHANNEL',true)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
