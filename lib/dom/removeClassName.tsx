export default function removeClassName(className: string, element: HTMLCollectionOf<Element>){
    for (let i = 0; i < element.length; i++){
        let child = element.item(i);
        className.split(" ").map(classNameUnit=>{
            child?.classList.remove(classNameUnit.trim());
        })
    }
}