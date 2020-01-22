export const countMixin = {
    data() {
        return {
            exampleStr: "petrichor"
        }
    },
    computed: {
        countedStrMixin() { return this.exampleStr + " ("+(this.exampleStr.split("").length+")"); } 
    }
};