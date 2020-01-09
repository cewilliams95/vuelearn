<template>
    <div class="container">
        <form v-if="!hasBeenSubmitted">
            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                    <!-- Exercise 1 -->
                    <!-- Create a Signup Form where you retrieve the following Information -->
                    <!-- Full Name (First Name + Last Name) -->
                    <!-- Mail -->
                    <!-- Password -->
                    <!-- Store Data? Yes/No -->
                <div class="row">
                    <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                        <div class="form-group">
                            <app-name v-model="userData.name"></app-name>
                        </div>
                        <div class="form-group">
                            <label for="email">Mail</label>
                            <input
                                    type="text"
                                    id="email"
                                    class="form-control"
                                    v-model="userData.email">
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input
                                    type="password"
                                    id="password"
                                    class="form-control"
                                    v-model="userData.password">
                        </div>
                        <div class="form-group">
                            <app-switch v-model="saveData"></app-switch>
                        </div>

                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                        <button
                                class="btn btn-primary"
                                @click.prevent="hasBeenSubmitted = true">Submit!
                        </button>
                    </div>
                </div>

                    <!-- Exercise 2 -->
                    <!-- Only display the Form if it has NOT been submitted -->
                    <!-- Display the Data Summary ONCE the Form HAS been submitted -->

                    <!-- Exercise 3 -->
                    <!-- Edit the Example from above and create a custom "Full Name" Control -->
                    <!-- which still holds the First Name and Last Name Input Field -->
                </div>
            </div>
        </form>
        <hr>
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <div class="panel panel-default" v-if="hasBeenSubmitted">
                    <div class="panel-heading">
                        <h4>Your Data</h4>
                    </div>
                    <div class="panel-body">
                        <p>Full Name: {{ userData.name }}</p>
                        <p>Mail: {{ userData.email }}</p>
                        <p>Password: {{ userData.password }}</p>
                        <p>Store in Database?: {{ saveData }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Switch from './components/Switch.vue';
    import Name from './components/Name.vue';

    export default {
        data: function() {
            return {
                userData: {
                    name: "Foo Bar",
                    email: "",
                    password: ""
                },
                saveData: true,
                hasBeenSubmitted: false
            }
        },
        methods: {
            
        },
        components: {
            appSwitch: Switch,
            appName: Name
        }
    }
</script>

<style>
</style>
