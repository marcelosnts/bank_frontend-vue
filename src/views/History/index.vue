<template>
    <h1>History</h1>
    {{state}}
</template>

<script>
    import { reactive, onMounted } from 'vue'
    import services from '../../services'

    export default {
        setup () {
            const state = reactive({
                balance: 0,
                deposits: 0,
                withdraws: 0,
                transactions: {}
            })

            onMounted(async () => {
                const { data } = await services.transactions.history()
                
                state.balance = data.balance
                state.deposits = data.deposits
                state.withdraws = data.withdraws 
                state.transactions = data.transactions
            })

            return {
                state
            }
        }
    }
</script>