<template>
  <div class="flex justify-between">
    <h1 class="text-4xl font-black text-gray-800">
      New Transaction
    </h1>

    <button
      @click="close"
      class="text-4xl text-gray-600 focus:outline-none"
    >
      &times;
    </button>
  </div>

  <div class="mt-16">
    <form @submit.prevent="handleSubmit">
        <label class="block">
            <span>Type</span>
            <select
                type="email"
                class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
            >
                <option value="1">Deposit</option>
                <option value="2">Withdraw</option>
            </select>
        </label>
        <label class="block mt-5">
            <span class="text-lg font-medium text-gray-800">Value</span>
            <input
                type="text"
                class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
                placeholder="100.00"
            >
        </label>

        <button
            type="submit"
            class="px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-primary focus:outline-none"
        >
            <span>Submit</span>
        </button>
    </form>
  </div>
</template>

<script>
    import useModal from '../../hooks/useModal'
    
    export default {
    setup () {
        const modal = useModal()

        async function handleSubmit () {
        
        }

        return {
            close: modal.close,
            handleSubmit
        }
    }
    }
</script>
