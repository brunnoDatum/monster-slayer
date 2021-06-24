function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: []
        }
    },
    methods: {
        attackMonster() {
            this.currentRound++;
            const damage = getRandomNumber(5, 12);
            this.monsterHealth -= damage;
            this.addLogMessage('player', 'attack', damage);
            this.attackPlayer();
        },
        attackPlayer() {
            const damage = getRandomNumber(8, 15);
            this.playerHealth -= damage;
            this.addLogMessage('monster', 'attack', damage);
        },
        specialAttackMonster() {
            this.currentRound++;
            const damage = getRandomNumber(10, 15);
            this.monsterHealth -= damage;
            this.addLogMessage('player', 'specialAttack', damage);
            this.attackPlayer();
        },
        healPlayer() {
            this.currentRound++;
            const heal = getRandomNumber(8, 20);
            if (this.playerHealth + heal > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += heal;
            }
            this.addLogMessage('player', 'heal', heal);
            this.attackPlayer();
        },
        startGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.logMessages = [];
        },
        surrender() {
            this.winner = 'monster';
        },
        addLogMessage(by, type, value) {
            this.logMessages.unshift({
                actionBy: by,
                actionType: type,
                actionValue: value
            });
        }
    },
    computed: {
        monsterBarStyles() {
            if (this.monsterHealth < 0) {
                return {
                    width: '0%'
                };
            }
            return {
                width: this.monsterHealth + '%'
            };
        },
        playerBarStyles() {
            if (this.playerHealth < 0) {
                return {
                    width: '0%'
                };
            }
            return {
                width: this.playerHealth + '%'
            };
        },
        isSpecialAttackAvailable() {
            return this.currentRound % 3 !== 0;
        },
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'monster';
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'player';
            }
        }
    },
});

app.mount('#game');