export default function addClassName(className: string, element: HTMLCollectionOf<Element>){
    for (let i = 0; i < element.length; i++){
        let child = element.item(i);
        className.split(" ").map(classNameUnit=>{
            child?.classList.add(classNameUnit.trim());
        })
    }
}