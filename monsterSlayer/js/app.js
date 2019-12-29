new Vue({
    el: '#app',
    data: {
        userHealth: 100,
        enemyHealth: 100,
        isGameRunning: false,
        isTurnOver: false,
        turnLog: []
    },
    methods: {
        startGame: function() {
            this.isGameRunning = true;
            this.isTurnOver = false;
            this.userHealth = 100;
            this.enemyHealth = 100;
            this.turnLog = [];
        },
        attack: function() {
            var damage = this.diceRoll(1,20);
            this.enemyHealth -= damage;
            this.isTurnOver = true;
            if(this.enemyHealth <= 0) {
                this.enemyHealth = 0;
                this.isGameRunning = false;
                this.startDialog("You win!")
            }
            this.turnLog.unshift({ 
                isPlayer: true,
                msg: "You hit the monster for " + damage + " damage!"
            });
        },
        specialAttack: function(target) {
            // add special
            var damage = this.diceRoll(5,40);
            var healthLost = Math.floor(damage / 2);
            this.enemyHealth -= damage;
            this.userHealth -= healthLost;
            this.isTurnOver = true;
            this.turnLog.unshift({ 
                isPlayer: true,
                msg: "You hit the monster for " + damage + " damage! In your vigor you lost " + healthLost + " health!" 
            });
        },
        heal: function(target) {
            var healAmount = this.diceRoll(1,30);
            this.userHealth += healAmount;
            if(this.userHealth > 100) {
                this.userHealth = 100;
            }
            this.turnLog.unshift({
                isPlayer: true,
                msg: "You healed yourself for " + healAmount + " health!"
            });
            this.isTurnOver = true;
        },
        surrender: function() {
            this.isTurnOver = true;
            this.isGameRunning = false;
        },
        diceRoll: function(min, max) {
            return Math.max(Math.floor((Math.random() * max) + 1), min);
        },
        startDialog: function(msg) {
            if(confirm(msg + " Start new game?")) {
                this.startGame();
            }
            else {
                this.isGameRunning = false;
            }
        }
    },
    watch: {
        isTurnOver: function() {
            if(this.isTurnOver && this.isGameRunning) {
                // Enemy turn
                var vueIns = this;
                var damage;
                setTimeout(function() {
                    damage = vueIns.diceRoll(5,20);
                    vueIns.userHealth -= damage;
                    vueIns.turnLog.unshift({ 
                        isPlayer: false,
                        msg: "The monster attacks for " + damage + " damage!" 
                    });
                    vueIns.isTurnOver = false;
                    if( vueIns.userHealth <= 0 ) {
                        vueIns.userHealth = 0;
                        vueIns.isGameRunning = false;
                        vueIns.startDialog("Sorry, you lose.");
                    }
                }, 1500);
            }
        }
    },
    computed: {}
});