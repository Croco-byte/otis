<template>
    <!-- Header -->
    <div class="p-5 text-center bg-light">
      <h1 class="mb-3">Brouillon: éléments de base</h1>
    </div>
    <!-- Header -->
     <MDBBtn color="danger" block class="w-25 mb-4" v-on:click="completeStep()">Confirmer</MDBBtn>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { MDBBtn } from 'mdb-vue-ui-kit'

interface StepDraftBasicsVueData
{
    
}

export default defineComponent ({
    emits: ['stepCompleted', 'uncompleteStep'],
    components: {
        MDBBtn
    },
    data(): StepDraftBasicsVueData {
        return {
        }
    },

    methods: {
        completeStep: function() {
            this.$emit('stepCompleted', 'StepDraftBasics');
        }
    },

    created() {
        this.$emit('uncompleteStep', 'StepDraftBasics');
    }

});
</script>
