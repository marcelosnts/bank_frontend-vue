<template>
    <div class="container mx-auto px-20">
        <div class="flex justify-between bg-brand-info">
            <div class="flex flex-col">
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
                    class="px-3 py-1 my-6 font-bold text-white rounded-full bg-brand-secondary focus:outline-none mr-10"
                >
                    <span>Logout</span>
                </button>
            </div>
        </div>
        <div class="flex justify-center mt-10">
            <div>
                <div class="flex flex-row ">
                    <div class="col-4 mx-2 p-2 border rounded bg-brand-primary">
                        Deposits: <br>
                        {{state.deposits}}
                    </div>
                    <div class="col-4 mx-2 p-2 border rounded bg-brand-secondary">
                        Withdraws: <br>
                        {{state.withdraws}}
                    </div>
                    <div class="col-4 mx-2 p-2 border rounded bg-brand-info">
                        Balance: <br>
                        {{state.balance}}
                    </div>
                </div>
                <div class="container mt-10">
                    <table class="table-fixed">
                        <thead>
                            <tr>
                                <th class="w-1/6 w-1/2 px-4 py-2 text-light-blue-600">Operation</th>
                                <th class="w-1/6 w-1/2 px-4 py-2 text-light-blue-600">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr 
                                class="border border-light-blue-500 px-4 py-2 text-light-blue-600 font-medium bg-blue-200"
                                v-for="(transaction) in state.transactions"
                                :key="transaction.id"
                            >
                                <td class="col-3">{{transaction.type == 1 ? 'Deposit' : 'Withdraw'}}</td>
                                <td class="col-3">{{transaction.value}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
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
                
                state.balance = data.balance
                state.deposits = data.deposits
                state.withdraws = data.withdraws 
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