<template>
    <div class="container">
        <h3>Dexter</h3>
        <div v-if="message" class="alert alert-success">{{this.message}}</div>
        <div class="container">
            <input type="number" class="form-control" v-model="billings.income" placeholder="Enter income">
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
                    <td>{{billings.number}}</td>
                    <td>
                        <select>
                            <option value="${fee1}">Förskola 1-2år, mer än 15 tim</option>
                            <option value="${fee2}">Förskola 1-2år, max 15 tim</option>
                            <option value="${fee3}">Allmän förskola 3-5år, mer än 15 tim</option>
                            <option value="${fee4}">Fritidshem 6-10år</option>
                            <option value="${fee5}">Allmän förskola 3-5år, max 15 tim</option>
                        </select>
                    </td>
                    <td>{{billings.income}}: SEK</td>
                </tr>
                </tbody>
            </table>
            <div class="row">
                <button class="btn btn-success" v-on:click="calculate">Calculate</button>
            </div>
        </div>
    </div>
</template>
<script>
    import BillingService from '../service/BillingService';
    export default {
        name: "Billings",
        data() {
            return {
                billings: [{number: 1},{number: 2},{number: 3}],
                message: "",
                INSTRUCTOR: "Omar"
            }
        },
        methods: {
            calculate: function(){
              this.$http.post('http://jsonplaceholder.typicode.com/posts',{
                  income: this.billings.income,
              }).then(function (data) {
                 console.log(data)
              })
            },

            refreshBillings() {

            },
            Calculate() {

            },
            createBillings(id) {
                BillingService.createBillings(this.INSTRUCTOR, id)
                    .then(() => {
                        this.refreshBillings();
                    });
            },
        },
        created() {
            this.refreshBillings();
        }
    }
</script>