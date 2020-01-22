<template>
    <div class="container">
        <app-navbar></app-navbar>
        <router-view></router-view>
    </div>
</template>

<script>
    import Navbar from './components/Navbar.vue';
    export default {
        components: {
            'app-navbar': Navbar
        },
        created() {
            this.$store.dispatch('initStocks');
        }
    }
</script>

<style>

</style>
