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
                            <option  v-for="option in options" v-bind:key="option">
                                {{ option }}
                            </option>
                        </select>
                    </td>
                    <td>
                        {{ income }}: SEK</td>
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
        name: "billings",
        data() {
            return {
                billings: [{ number: 1 }, { number: 2 }, { number: 3 }],
                options: {
                    opt1: "Förskola 1-2år, mer än 15 tim",
                    opt2: "Förskola 1-2år, max 15 tim",
                    opt3: "Allmän förskola 3-5år, mer än 15 tim",
                    opt4: "Fritidshem 6-10år",
                    opt5: "Allmän förskola 3-5år, max 15 tim"
                },
                message: "",
                income: "",
                errors: []
            };
        },
        computed: {
            id() {
                return this.$route.params.id;
            }
        },
        methods: {
            calculate() {
                console.log(this.income);

                const exampleData = {
                    income: this.income,
                    children: this.billings.length,
                    amount: [100,200,300]
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
            refreshBillingDetails() {
                BillingService.retrieveBillings(this.id).then(res => {
                    this.income = res.data.income;
                });
            }
        },
        created() {
            this.refreshBillingDetails();
        }
    };
</script>