<template>
    <div style="margin: 0 auto; padding: 50px; text-align: center;">
        <div class="form-group">
            <label for="username">username</label>
            <input id="username" type="text" v-model="user.username"></input>
        </div>
        <div class="form-group">
            <label for="email">email</label>
            <input id="email" type="email" v-model="user.email"></input>
        </div>
        <button id="submit" class="btn btn-primary" @click="submit">Submit</button>
        <hr>
        <button class="btn btn-primary" style="margin-bottom: 20px;" @click="getData">Get Data</button>
        <ul class="list-group">
            <li class="list-group-item" v-for="u in users">{{u.username}} - {{u.email}}</li>
        </ul>
    </div>
</template>
<script>
    import axios from 'axios';
    export default {
        data () {
            return {
                user: {
                    username: '',
                    email: ''
                },
                users: [],
                info: null,
                apiUrl: 'https://api.nasa.gov/planetary/apod',
                apiKey: 'bkNhsa6GHr2cyMOw4PUjqfzpxHXpK1VC0nqgQZcp'
            }
        },
        methods: {
            getData() {
                axios.get("")
                .then(response => {
                    console.log(response);
                    const resultArray = [];
                    for(let key in response.data) {
                        resultArray.push(response.data[key]);
                    }
                    this.users = resultArray;
                });
            },
            submit() {
                axios.post("", this.user)
                .then(
                response => {
                    alert("User submitted");
                    console.log(response);
                },
                error => {
                    console.log(error);
                });
                
            }
        },
        mounted () {
            axios
            .get(this.apiUrl+'?'
                +'api_key='+this.apiKey
                +'')
            .then(response => (this.info = response))
        }
    }
</script>

<style>
</style>
