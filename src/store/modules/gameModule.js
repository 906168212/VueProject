const state = {
    gamePage: 1
}
const mutations = {
    setGamePage(state,value){
        state.gamePage = value
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
