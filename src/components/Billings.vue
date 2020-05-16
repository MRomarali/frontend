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
                <tr>
                    <td>
                        {{ 1 }}</td>
                    <td>
                        <select>
                            <option>Förskola 1-2år, mer än 15 tim</option>
                            <option>Förskola 1-2år, max 15 tim</option>
                            <option>Allmän förskola 3-5år, mer än 15 tim</option>
                            <option>Fritidshem 6-10år</option>
                            <option>Allmän förskola 3-5år, max 15 tim</option>
                        </select>
                    </td>
                    <td>
                        {{ amountBarn1 }}:SEK</td>
                </tr>
                <tr>
                    <td>
                        {{ 2 }}</td>
                    <td>
                        <select>
                            <option>Förskola 1-2år, mer än 15 tim</option>
                            <option>Förskola 1-2år, max 15 tim</option>
                            <option>Allmän förskola 3-5år, mer än 15 tim</option>
                            <option>Fritidshem 6-10år</option>
                            <option>Allmän förskola 3-5år, max 15 tim</option>
                        </select>
                    </td>
                    <td>
                        {{ amountBarn2 }}:SEK</td>
                </tr>
                <tr>
                    <td>
                        {{ 3 }}</td>
                    <td>
                        <select>
                            <option>Förskola 1-2år, mer än 15 tim</option>
                            <option>Förskola 1-2år, max 15 tim</option>
                            <option>Allmän förskola 3-5år, mer än 15 tim</option>
                            <option>Fritidshem 6-10år</option>
                            <option>Allmän förskola 3-5år, max 15 tim</option>
                        </select>
                    </td>
                    <td>
                        {{ amountBarn3 }}:SEK</td>
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
                /**
                 * options: ['Förskola 1-2år, mer än 15 tim',
                 'Förskola 1-2år, max 15 tim',
                 'Allmän förskola 3-5år, mer än 15 tim',
                 'Fritidshem 6-10år',
                 'Allmän förskola 3-5år, max 15 tim'],
                 */
                /**
                 * options: {
                    1: "Förskola 1-2år, mer än 15 tim",
                    2: "Förskola 1-2år, max 15 tim",
                    3: "Allmän förskola 3-5år, mer än 15 tim",
                    4: "Fritidshem 6-10år",
                    5: "Allmän förskola 3-5år, max 15 tim",
                },
                 */

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
                return this.amountBarn1;
            }
        },
        methods: {

            calculate() {


                const exampleData = {
                    income: this.income,
                    barn1Typ: 1,
                    barn2Typ: 1,
                    barn3Typ: 1,
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
                            this.amountBarn1 = data.amountBarn1,
                            this.amountBarn2 = data.amountBarn2,
                            this.amountBarn3 = data.amountBarn3
                            console.log("Success:", exampleData, data);
                    })
                    .catch(error => {
                        console.error("Error:", error);
                    });
            },
        },
    };
</script>