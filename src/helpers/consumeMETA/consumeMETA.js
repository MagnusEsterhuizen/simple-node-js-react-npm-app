
/**
 * (User Function) Updates page title and meta tags and load js and css
 * @param META  - object of meta parameters
 */
export default (META) => {
    if(META.title){
        document.getElementsByTagName("title")[0].innerHTML = META.title;
    }

    if (META.head) {
        META.head.map((head) => {
            for (const el in head) {
                let element = document.createElement(el);
                for (const key in head[el]) {
                    let attribute = document.createAttribute(key);
                    attribute.value = head[el][key];
                    element.setAttributeNode(attribute);
                }
                document.getElementsByTagName("head")[0].appendChild(element);
            }
        });
    }

    if (META.body) {
        META.body.map((body) => {
            for (const el in body) {
                let element = document.createElement(el);
                for (const key in body[el]) {
                    let attribute = document.createAttribute(key);
                    attribute.value = body[el][key];
                    element.setAttributeNode(attribute);
                }
                document.getElementsByTagName("body")[0].appendChild(element);
            }
        });
    }
}