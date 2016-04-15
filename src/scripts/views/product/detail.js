var key = Symbol("a");


export default class Detail{
    constructor(){
         //a="a1";
         this[key] = "a-a";
         console.log("aaa",Symbol("aaa"));
         
         let c = "c1";
         this.b = "b";
    }
    getName(){
        this[key] = "a-a-11111";
        console.log("name:",this[key]);
    }
}



