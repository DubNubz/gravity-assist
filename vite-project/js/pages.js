import { DOMSelectors } from "./domselectors";

function insertHome () {
    DOMSelectors.app.insertAdjacentHTML("beforeend", 
    `<
    `)
};

export { insertHome };
