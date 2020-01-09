<template>
    <li
    class="list-group-item"
    style="cursor: pointer"
    @click="serverClicked"
    >
       Server #{{ server.id }}
    </li>
</template>
<script>
import { eventBus } from '../../main';

export default {
    props: ['server'],
    methods: {
        serverClicked: function() { 
            eventBus.serverShowDetails(this.server);
        }
    }
}
</script>