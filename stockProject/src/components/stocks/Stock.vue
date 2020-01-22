<template>
<div class="col-sm-6 col-md-4">
    <div class="card card-success">
        <div class="card-header bg-success text-white">
            <h3 class="card-title">
                {{stock.name}}
                <small>(Price: {{stock.price}})</small>
            </h3>
        </div>
        <div class="card-body">
            <div class="pull-left">
                <input type="number" 
                class="form-control" 
                placeholder="Quantity"
                v-model="quantity">
            </div>
            <div class="pull-right">
                <button 
                class="btn"
                :class="insufficientFunds ? 'btn-warning' : 'btn-success'"
                @click="buyStock"
                :disabled="insufficientFunds || quantity <= 0 || !Number.isInteger(quantity*1)"
                >{{ insufficientFunds ? 'Insufficient Funds' : 'Buy' }}
                </button>
            </div>
        </div>
    </div>
</div>  
</template>
<script>
export default {
    props: ['stock'],
    data() {
        return {
            quantity: 0
        }
    },
    computed: {
        funds() { return this.$store.getters.funds; },
        insufficientFunds() {
            return this.quantity * this.stock.price > this.funds;
        }
    },
    methods: {
        buyStock() {
            const order = {
                stockId: this.stock.id,
                stockPrice: this.stock.price,
                quantity: this.quantity
            }
            this.$store.dispatch('buyStock', order);
            this.quantity = 0;
        }
    }
}
</script>
<style scoped>
div.card { margin-bottom: 30px;}
div.card-body { display: flex; }
</style>