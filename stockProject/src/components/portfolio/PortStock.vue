<template>
<div class="col-sm-6 col-md-4">
    <div class="card card-success">
        <div class="card-header bg-primary text-white">
            <h3 class="card-title">
                {{stock.name}}
                <small>(Price: {{stock.price}} | Quantity: {{stock.quantity}})</small>
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
                :class="lowQuantity ? 'btn-warning' : 'btn-primary'"
                @click="sellStock"
                :disabled="lowQuantity || quantity <= 0 || !Number.isInteger(quantity*1)">{{ lowQuantity ? 'Not enough' : 'Sell' }}</button>
            </div>
        </div>
    </div>
</div>  
</template>
<script>
import {mapActions} from 'vuex';

export default {
    props: ['stock'],
    data() {
        return {
            quantity: 0
        }
    },
    computed: {
        lowQuantity() {
            return this.quantity > this.stock.quantity;
        }
    },
    methods: {
        ...mapActions({sell: 'sellStock'}),
        sellStock() {
            const order = {
                stockId: this.stock.id,
                stockPrice: this.stock.price,
                quantity: this.quantity
            };
            this.sell(order);
        }
    }
}
</script>
<style scoped>
div.card { margin-bottom: 30px;}
div.card-body { display: flex; }
</style>