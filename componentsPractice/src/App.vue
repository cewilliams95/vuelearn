<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <nya-header></nya-header>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-xs-12 col-sm-6">
                <nya-server-list></nya-server-list>
            </div>
            <div class="col-xs-12 col-sm-6">
                <nya-server-status></nya-server-status>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-xs-12">
                <nya-footer></nya-footer>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from './components/Shared/Header.vue'
    import ServerItems from './components/Server/ServerItems.vue'
    import ServerStatus from './components/Server/ServerStatus.vue'
    import Footer from './components/Shared/Footer.vue'

    export default {
        components: {
            'nya-header': Header,
            'nya-server-list': ServerItems,
            'nya-server-status': ServerStatus,
            'nya-footer': Footer
        }
    }
</script>