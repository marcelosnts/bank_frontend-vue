<template>
    <header class="header">
        <div class="header-group">
            <div class="flex items-center justify-between py-10 bg-brand-primary px-10">
                <div class="w-28 lg:w-36">
                    <img class="w-full" src="../../assets/images/logo.png" alt="logo">
                </div>

                <div class="flex">
                    <button
                        @click="handleAccountCreate"
                        class="px-6 py-2 font-bold rounded-full text-white focus:outline-none"
                    >
                        Signup!
                    </button>
                    <button
                        @click="handleLogin"
                        class="px-6 py-2 font-bold bg-white rounded-full text-brand-main focus:outline-none"
                    >
                        Login
                    </button>
                </div>
            </div>
            <div class="flex flex-col mt-28 text-left">
                <h1 class="text-4xl font-black text-white">
                    Use your account the way <br>
                    you want to! <br class="hidden lg:inline-block">
                </h1>
                <p class="text-lg font-medium text-white pt-4">
                    Deposit and withdraw without <br class="hidden lg:inline-block">
                    any limitation or delay
                </p>
                <div>
                    <button
                        @click="handleAccountCreate"
                        class="px-6 py-2 mt-10 font-bold bg-white rounded-full text-brand-main focus:outline-none"
                    >
                        Create a free account!
                    </button>
                </div>
            </div>
        </div>
    </header>

    <div class="flex justify-center w-full bg-brand-secondary">
        <div class="flex flex-col items-center w-4/5 max-w-6xl my-16">
            <h1 class="text-4xl font-black text-center text-white">
                Not fast enough?
            </h1>
            <p class="text-lg text-center font-regular">
                Needing a transaction right now? Your money in no time!
            </p>
        </div>
    </div>
    
    <div class='flex justify-center py-2'>
        <p class='font-medium text-center text-gray-800'><strong>frontendbanco</strong> &#169; 2021</p>
    </div>
</template>

<script>
    import { onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    
    import useModal from '../../hooks/useModal'

    export default {
        setup (_, {emit}) {
            const router = useRouter()
            const modal = useModal()

            onMounted(() => {
                const token = window.localStorage.getItem('token')
                
                if (token) {
                    router.push({ name: 'History' })
                }
            })
    
            function handleLogin () {
                modal.open({
                    component: 'ModalLogin'
                })
            }

            function handleAccountCreate () {
                modal.open({
                    component: 'ModalCreateAccount'
                })
            }

            return {
                emit,
                handleLogin,
                handleAccountCreate
            }
        }
    }
</script>

<style lang="postcss" scoped>
    .header {
        @apply bg-brand-primary w-full flex justify-center;
        height: 700px;
    }
    .header-group {
        @apply flex flex-col w-4/5 max-w-6xl;
    }
    @media (min-width: 640px){
        .header-group {
            background-image: url(../../assets/images/home.png);
            background-size: 512px;
            background-position: 80% 95%;
            background-repeat: no-repeat;
        }
    }
</style>