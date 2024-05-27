import {on} from './utils'
const nodeList = new Map()


on(document,'click',(e)=>{
    for (const {documentHandler} of nodeList.values()) {
        documentHandler(e)
    }
})

const createDocumentHandler=(el,binding)=>{
    return function (click){
        const isBound = !binding || !binding.instance;
        const isTargetExits = !click.target
        const isContainsByEL = el.contains(click.target)
        const isSelf = el === click.target
        // console.log('isBound:',isBound,' isTargetExits:',isTargetExits,' isContainsByEL:',isContainsByEL,' isSelf:',isSelf)

        if(isBound || isTargetExits || isContainsByEL || isSelf){
            return;
        }
        binding.value()
    }
}

const ClickOutSide = {
    beforeMount(el,binding){
        nodeList.set(el,{
            documentHandler: createDocumentHandler(el,binding),
            bindingFn:binding.value
        })
    },
    updated(el,binding){
        nodeList.set(el, {
            documentHandler: createDocumentHandler(el, binding),
            bindingFn: binding.value,
        })
    },
    unmounted(el) {
        nodeList.delete(el);
    }
}

export default ClickOutSide


