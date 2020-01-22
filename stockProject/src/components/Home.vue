<template>
<div id="home-wrap">
    <h1>Trade or View Your Portfolio</h1>
    <p>You may Save & Load your data.</p>
    <p>Click 'End Day' to start a new day.</p>
    <hr>
    <h3>Your funds: {{ funds | currency }}</h3>
</div>    
</template>
<script>
export default {
    computed: {
        funds() {
            return this.$store.getters.funds;
        }
    }
}
</script>
<style scoped>

</style>