<template>
    <div class="container">
        <div>
            <b-navbar toggleable="lg" type="dark" id="navColor">
                <b-navbar-brand href="#">
                    <img id="logo" src="../ist.png" alt="IST">
                </b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>

                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto">
                        <b-nav-form>
                            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                        </b-nav-form>

                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>
        <h3 align="center">Dexter</h3>
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
                        <select v-model="selected1">
                            <option disabled value="">Please select one</option>
                            <option value="1">Förskola 1-2år, mer än 15 tim</option>
                            <option value="2">Förskola 1-2år, max 15 tim</option>
                            <option value="3">Allmän förskola 3-5år, mer än 15 tim</option>
                            <option value="4">Fritidshem 6-10år</option>
                            <option value="5">Allmän förskola 3-5år, max 15 tim</option>
                        </select>
                    </td>
                    <td>
                        <span>{{ amountBarn1 }}:SEK</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ 2 }}</td>
                    <td>
                        <select v-model="selected2">
                            <option disabled value="">Please select one</option>
                            <option value="1">Förskola 1-2år, mer än 15 tim</option>
                            <option value="2">Förskola 1-2år, max 15 tim</option>
                            <option value="3">Allmän förskola 3-5år, mer än 15 tim</option>
                            <option value="4">Fritidshem 6-10år</option>
                            <option value="5">Allmän förskola 3-5år, max 15 tim</option>
                        </select>
                    </td>
                    <td>
                        <span>{{ amountBarn2 }}:SEK</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ 3 }}</td>
                    <td>
                        <select v-model="selected3">
                            <option disabled value="">Please select one</option>
                            <option value="1">Förskola 1-2år, mer än 15 tim</option>
                            <option value="2">Förskola 1-2år, max 15 tim</option>
                            <option value="3">Allmän förskola 3-5år, mer än 15 tim</option>
                            <option value="4">Fritidshem 6-10år</option>
                            <option value="5">Allmän förskola 3-5år, max 15 tim</option>
                        </select>
                    </td>
                    <td>
                        <span>{{ amountBarn3 }}:SEK</span>
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="row">
                <button class="btn btn-info" v-on:click="calculate()">
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
                selected1: "",
                selected2: "",
                selected3: "",
                billings: [{number: 1 }, {number: 2},{number: 3}],
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
        },
        methods: {
            calculate() {
                const BarnTyp = {
                    income: this.income,
                    barn1Typ: this.selected1,
                    barn2Typ: this.selected2,
                    barn3Typ: this.selected3,
                };
                fetch('http://localhost:8080/calculate-sum', {
                    method: "POST", // or 'PUT'
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(BarnTyp)
                })
                    .then(response => response.json())
                    .then(data => {
                        this.amountBarn1 = data.amountBarn1,
                            this.amountBarn2 = data.amountBarn2,
                            this.amountBarn3 = data.amountBarn3
                        console.log("Success:", BarnTyp, data);
                    })
                    .catch(error => {
                        console.error("Error:", error);
                    });
            },
        },
    };
</script>
<style>
    .btn{
        background: steelblue;
    }
    #logo {
        height: 60px;
        border-radius: 3px;
    }
    #navColor {
        background: steelblue;
    }
</style>