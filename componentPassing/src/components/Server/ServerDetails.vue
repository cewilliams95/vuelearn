<template>
    <div class="col-xs-12 col-sm-6">
        <p v-if="!server">Server Details are currently not updated</p>
        <p class="details" v-else>
            <span><h2>Server #{{ server.id }}</h2></span><br>
            <span>Status: <b>{{ server.status }}</b></span><br>
            <button @click="normalize">Normalize</button>
        </p>
    </div>

</template>

<script>
import { eventBus } from '../../main';
export default {
    data: function() {
        return {
            server: null
        };
    },
    methods: {
        normalize: function() {
            this.server.status = "Normal";
        }
    },
    created: function() {
        var vm = this;
        eventBus.$on('serverShowDetails', function(server)  {
            vm.server = server;
        });
    }
}
</script>

<style>

</style>
