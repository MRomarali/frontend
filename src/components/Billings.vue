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
                        {{  }}: SEK</td>
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
    import BillingService from "../service/BillingService";
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
                errors: []
            }
        },
        computed: {
            id() {
                return this.$route.params.id;
            }
        },
        methods: {
            calculate() {
                console.log(this.income);
                console.log(this.barn1Typ);
                console.log(this.barn2Typ);
                console.log(this.barn3Typ);
                const exampleData = {
                    income: this.income,
                    barn1Typ: this.barn1Typ  * this.income,
                    barn2Typ: this.barn2Typ  * this.income,
                    barn3Typ: this.barn3Typ  * this.income
                };

                fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: "POST", // or 'PUT'
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(exampleData)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log("Success:", data);
                    })
                    .catch(error => {
                        console.error("Error:", error);
                    });
            },
            postBillingDetails(){
                BillingService.createBilling(this.name).then(res =>{
                    this.income = res.data.income;
                    this.barn1Typ = res.data.barn1Typ;
                    this.barn2Typ = res.data.barn2Typ;
                    this.barn3Typ = res.data.barn3Typ;
                }).then(() =>{
                    this.$router.push('/calculate-sum');
                });
            },
            refreshBillingDetails() {
                BillingService.retrieveBillings(this.name).then(res => {
                    this.income = res.data.income;
                    this.barn1Typ = res.data.barn1Typ;
                    this.barn2Typ = res.data.barn2Typ;
                    this.barn3Typ = res.data.barn3Typ;
                });
            }
        },
        created() {
            this.refreshBillingDetails();
            this.postBillingDetails();
        }
    };
</script>