<template>
    <div>
        <h3>Income</h3>
        <div class="container">
            <form @submit="validateAndSubmit">
                <div v-if="errors.length">
                    <div class="alert alert-warning" v-bind:key="index" v-for="(error, index) in errors">{{error}}</div>
                </div>
                <fieldset class="form-group">
                    <label>Id</label>
                    <input type="text" class="form-control" v-model="id" disabled>
                </fieldset>
                <fieldset class="form-group">
                    <label>Income</label>
                    <input type="text" class="form-control" v-model="income">
                </fieldset>
                <div class="row">
                    <button class="btn btn-success" v-on:click="addCourse()">Add</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
    import BillingService from "../service/BillingService";
    export default {
        name: "Billing",
        data() {
            return {
                income: "",
                INSTRUCTOR: "Omar",
                errors: []
            };
        },
        computed: {
            id() {
                return this.$route.params.id;
            }
        },
        methods: {
            refreshCourseDetails() {
                BillingService.retrieveBillings(this.INSTRUCTOR, this.id).then(res => {
                    this.income = res.data.income;
                });
            },
            validateAndSubmit(e) {
                e.preventDefault();
                this.errors = [];
                if(!this.income) {
                    this.errors.push("Enter valid values");
                } else if(this.income.length < 5) {
                    this.errors.push("Enter at least 5 characters in Description");
                }
                if(this.errors.length === 0) {
                    if (this.id === -1) {
                        BillingService.createBillings(this.INSTRUCTOR, {
                            income: this.income
                        })
                            .then(() => {
                                this.$router.push('/billings');
                            });
                    } else {
                        BillingService.updateBillings(this.INSTRUCTOR, this.id, {
                            id: this.id,
                            income: this.income
                        })
                            .then(() => {
                                this.$router.push('/billings');
                            });
                    }
                }
            }
        },
        created() {
            this.refreshCourseDetails();
        }
    };
</script>