<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Filters & Mixins</h1>
                <!-- Exercise 1) -->
                <!-- Build a local Filter which reverses the Text it is applied on -->
                <p>{{ exampleStr }} => {{ exampleStr | reverseText }}</p>
                <!-- Exercise 2 -->
                <!-- Build a global Filter which counts the length of a word and it appends it -->
                <!-- Like this: "Test" => Gets Filtered to => "Test (4)" -->
                <p>{{ exampleStr }} => {{ exampleStr | count-letters }}</p>
                <hr>
                <!-- Exercise 3 -->
                <!-- Do the same as in Exercises 1 & 2, now with Computed Properties -->
                <p>{{ exampleStr }} => {{ reversedStr }}</p>
                <p>{{ exampleStr }} => {{ countedStr }}</p>
                <!-- Exercise 4 -->
                <!-- Share the Computed Property rebuilding Exercise 2 via a Mixin -->
                <p>{{ exampleStr }} => {{ countedStrMixin }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {countMixin} from './countMixin';

    export default {
        mixins: [countMixin],
        computed: {
            reversedStr() { return this.exampleStr.split("").reverse().join(""); },
            countedStr() { return this.exampleStr + " ("+(this.exampleStr.length+")"); }
        },
        filters: {
            reverseText(str) {
                return str.split("").reverse().join("");
            }
        }
    }
</script>

<style>
</style>
