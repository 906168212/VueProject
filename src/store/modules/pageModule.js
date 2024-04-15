const state = {
    gamePage: 1,
    contributePage:0
}
const mutations = {
    setGamePage(state,value){
        state.gamePage = value
    },
    setContributePage(state,value){
        state.contributePage = value
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
