<template>
    <div class="container mx-auto">
        <div class="flex justify-between bg-brand-primary">
            <div class="flex flex-col text-white">
                <div class="flex pt-3 mt-3 mx-10">
                    <span class="font-bold">Hello {{state.user.name}}!!</span>
                </div>
                <small>{{state.user.email}}</small>
            </div>
            <div class="flex">
                <button
                    @click="handleNewTransaction"
                    class="px-3 py-1 my-6 font-bold text-white rounded-full bg-brand-primary focus:outline-none mr-10"
                >
                    <span>New Transaction</span>
                </button>
                <button
                    @click="handleLogout"
                    class="px-3 py-1 my-6 font-bold rounded-full bg-brand-secondary focus:outline-none mr-10"
                >
                    <span>Logout</span>
                </button>
            </div>
        </div>

        <div class="flex space-x-4 mt-20">
            <div class="flex-1 p-2 border rounded bg-brand-primary">
                <p class="font-bold text-white">Deposits:</p> <br>
                <span class="text-white">$ {{state.deposits}}</span>
            </div>
            <div class="flex-1 p-2 border rounded bg-brand-secondary">
                <p class="font-bold">Withdraws:</p> <br>
                <span>$ {{state.withdraws}}</span>
            </div>
            <div class="flex-1 p-2 border rounded bg-brand-info">
                <p class="font-bold">Balance:</p> <br>
                <span>$ {{state.balance}}</span>
            </div>
        </div>

        <table class="mx-auto table-fixed mt-10">
            <thead>
                <tr>
                    <th class="w-1/6 w-1/2 px-4 py-2 text-light-blue-600">Operation</th>
                    <th class="w-1/6 w-1/2 px-4 py-2 text-light-blue-600">Value</th>
                </tr>
            </thead>
            <tbody>
                <tr 
                    class="border border-light-blue-500 px-4 py-2 font-medium"
                    :class="transaction.type == 1 ? 'bg-brand-primary text-white' : 'bg-brand-secondary'"
                    v-for="(transaction) in state.transactions"
                    :key="transaction.id"
                >
                    <td class="col-3">{{transaction.type == 1 ? 'Deposit' : 'Withdraw'}}</td>
                    <td class="col-3">
                        <p class="float-left pl-6 mx-10">$ </p>
                        {{transaction.type == 1 ? '' : '-'}} {{transaction.value}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import { reactive, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import services from '../../services'
    import useModal from '../../hooks/useModal'

    export default {
        setup () {
            const modal = useModal()
            const router = useRouter()
            const state = reactive({
                balance: 0,
                deposits: 0,
                withdraws: 0,
                transactions: {},
                user: {},
            })

            onMounted(async () => {
                const { data } = await services.transactions.history()
                const user = await services.auth.getMe()
                
                state.balance = (data.balance).toFixed(2)
                state.deposits = (data.deposits).toFixed(2)
                state.withdraws = (data.withdraws).toFixed(2) 
                state.transactions = data.transactions
                state.user = user.data
            })

            function handleNewTransaction() {
                modal.open({
                    component: 'ModalTransaction'
                })
            }

            async function handleLogout() {
                await services.auth.logout()
                window.localStorage.removeItem('token')
                router.push({ name: 'Home' })
            }

            return {
                state,
                handleNewTransaction,
                handleLogout
            }
        }
    }
</script>