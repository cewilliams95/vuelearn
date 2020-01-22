<template>
    <div class="navwrap navbar navbar-default">
        <ul class="left-wrap">
            <router-link tag="li" class="navbar-brand" to="/" activeClass="active">Stock Trader</router-link>
            <router-link tag="li" class="btn btn-dark" style="margin-right: 10px;" to="/portfolio" activeClass="active">Portfolio</router-link>
            <router-link tag="li" class="btn btn-dark" to="/stocks" activeClass="active">Stocks</router-link>
        </ul>
        <ul class="right-wrap">
            <li class="btn btn-dark" @click="endDay">End day</li>
            <li class="dropdown">
                <button 
                class="btn btn-dark dropdown-toggle"
                @click="dropopen = !dropopen"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                    Save & Load <span class="caret"></span>
                </button>
                <div class="dropdown-menu" :class="{show: dropopen}" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="#" @click="saveData">Save state</a>
                    <a class="dropdown-item" href="#" @click="loadData">Load state</a>
                </div>
            </li>
            <li class="fundswrap">Funds: {{ funds | currency }}</li>
        </ul>
    </div>    
</template>
<script>
import {mapActions} from 'vuex';
import axios from 'axios';

export default {
    data() {
        return {
            dropopen: false
        }
    },
    computed: {
        funds() {
            return this.$store.getters.funds;
        }
    },
    methods: {
        ...mapActions({
            randomizeStocks: 'randomizeStocks',
            fetchData: 'loadData'
        }),
        endDay() {
            this.randomizeStocks();
        },
        saveData() {
            const data = {
                funds: this.$store.getters.funds,
                stockPortfolio: this.$store.getters.stockPortfolio,
                stocks: this.$store.getters.stocks
            };
            axios.put("data.json", data).then(response => {

            });
        },
        loadData() {
            this.fetchData();
        }
    }
}
</script>
<style scoped>
.navwrap {
    display: flex;
    justify-content: space-around;
}
.navbar-brand { cursor: pointer; }
.left-wrap, .right-wrap {
    display: flex;
    align-items: center;
    list-style: none;
}
li.dropdown { margin: 0 5px; color: white; }
</style>