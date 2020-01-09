<template>
    <div>
        <label for="fname">First Name</label>
        <input
                type="text"
                id="fname"
                class="form-control"
                :value="firstName"
                @input="updateName(true,$event)">
        <label for="lname">Last Name</label>
        <input
                type="text"
                id="lname"
                class="form-control"
                :value="lastName"
                @input="updateName(false,$event)">
    </div>
</template>
<script>
export default {
    methods: {
        updateName(isFirst, event) {
            let name = '';
            if(isFirst) {
                name = event.target.value + ' ' + this.lastName;
            }
            else {
                name += this.firstName + ' ' + event.target.value;
            }
            this.value = name;
            this.$emit('input', this.value);
        }
    },
    computed: {
        firstName() { return this.value.split(" ")[0]; },
        lastName() { return this.value.split(" ")[1]; }
    },
    props: ['value'] 
}
</script>