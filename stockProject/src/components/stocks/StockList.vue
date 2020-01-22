<template>
<div id="stockwrap" class="container">
    <h1>StockList</h1>
    <div class="row">
    <app-stock v-for="stock in stocks" :stock="stock"></app-stock>
    </div>
</div>    
</template>
<script>
import Stock from './Stock.vue';

export default {
    data() {
        return {
            
        }
    },
    components: {
        'app-stock': Stock
    },
    computed: {
        stocks() {
            return this.$store.getters.stocks;
        }
    }
}
</script>
<style scoped>

</style>