import { v4 as uuid } from "uuid";

export class Todo{

    /**
     * 
     * @param {String} decription 
     */
    constructor( decription ){
        this.id = uuid(); 
        this.decription = decription;
        this.done = false;
        this.createdAt = new Date();
    }

}