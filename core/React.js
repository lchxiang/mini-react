const createTextNode = function(text){
    return {
        type:'TEXT_ELEMENT',
        props:{
            nodeValue:text,
            children:[]
        }
    }
}

const createElement = function(type,props={},...children){
    return {
        type,
        props:{
            ...props,
            children:children.map(item=>{
                return typeof item==='string'?createTextNode(item):item
            })
        }
    }
}


const render = function(el,container){
    const dom = el.type==='TEXT_ELEMENT'?document.createTextNode(""):document.createElement(el.type)
    Object.entries(el.props||{}).forEach(([key,value])=>{
        if(key!=='children'){
            dom[key]=value
        }
    })

    if(el.props.children&&el.props.children.length>0){
        el.props.children.forEach(child=>{
            render(child,dom)
        })
    }
    container.append(dom)
}

const React = {
    render,
    createTextNode,
    createElement   
}

export default React

