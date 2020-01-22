<template>
    <div>
        <h1>The User Page</h1>
        <button @click="goToHome">Go to home</button>
        <hr>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {}
    },
    methods: {
        goToHome() {
            this.$router.push('/');
        }
    }
}
</script>