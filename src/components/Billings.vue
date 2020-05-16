<template>
    <div class="container">
        <h3>Dexter</h3>
        <div v-if="message" class="alert alert-success">{{ this.message }}</div>
        <div class="container">
            <input type="number"
                   class="form-control"
                   v-model="income"
                   placeholder="Enter income"/>
            <table class="table">
                <thead>
                <tr>
                    <th>Barn</th>
                    <th>Typ av barnomsorg</th>
                    <th>Avgift per barn</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="billings in billings" v-bind:key="billings.id">
                    <td>
                        {{ billings.number }}</td>
                    <td>
                        <select>
                            <option v-for="option in options" v-bind:key="option">
                                {{ option }}
                            </option>
                        </select>
                    </td>
                    <td>
                        <input type="number" id="result" v-model="result">: SEK</td>
                </tr>
                </tbody>
            </table>
            <div class="row">
                <button class="btn btn-success" v-on:click="calculate()">
                    Calculate
                </button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "calculate",
        data() {
            return {
                billings: [{number: 1 }, {number: 2},{number: 3}],
                options: ['Förskola 1-2år, mer än 15 tim',
                    'Förskola 1-2år, max 15 tim',
                    'Allmän förskola 3-5år, mer än 15 tim',
                    'Fritidshem 6-10år',
                    'Allmän förskola 3-5år, max 15 tim'],
                message: "",
                income: "",
                barn1Typ: "",
                barn2Typ: "",
                barn3Typ: "",
                amountBarn1: "",
                amountBarn2: "",
                amountBarn3: "",
                errors: []
            }
        },
        computed: {
            id() {
                return this.$route.params.id;
            },
            result: function(){
                let maxAmount = 40000;
                let barnTyp1 = 0.02;
                let barnTyp2 = 0.04;
                if (this.income < maxAmount){
                    return this.income * barnTyp1;
                } else if (this.income > maxAmount) {
                    return this.income * barnTyp2;
                }
                return 0;
            }
        },
        methods: {
            calculate() {
                /**
                 *
                 */
                console.log(this.income);
                console.log(this.barn1Typ);
                console.log(this.barn2Typ);
                console.log(this.barn3Typ);
                console.log(this.amountBarn1);
                console.log(this.amountBarn2);
                console.log(this.amountBarn3);
                const exampleData = {
                    income: this.income,
                    barn1Typ: this.barn1Typ,
                    barn2Typ: this.barn2Typ,
                    barn3Typ: this.barn3Typ,
                };
                fetch('http://localhost:8080/calculate-sum', {
                    method: "POST", // or 'PUT'
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(exampleData)
                })
                    .then(response => response.json())
                    .then(data => {
                        this.income = data.income;
                            //this.amountBarn1 = data.amountBarn1,
                            //this.amountBarn2 = data.amountBarn2,
                            //this.amountBarn3 = data.amountBarn3
                            console.log("Success:", exampleData, data);
                    })
                    .catch(error => {
                        console.error("Error:", error);
                    });
            },
        },
    };
</script>