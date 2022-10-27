<template>
    <!-- Header -->
    <div class="p-5 text-center bg-light">
      <h1 class="mb-3">Brouillon: élaborer ton plan</h1>
    </div>
    <!-- Header -->
     <MDBBtn color="danger" block class="w-25 mb-4" v-on:click="completeStep()">Confirmer</MDBBtn>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { MDBBtn } from 'mdb-vue-ui-kit'

interface StepDraftPlanVueData
{
    
}

export default defineComponent ({
    emits: ['stepCompleted', 'uncompleteStep'],
    components: {
        MDBBtn
    },
    data(): StepDraftPlanVueData {
        return {
        }
    },

    methods: {
        completeStep: function() {
            this.$emit('stepCompleted', 'StepDraftPlan');
        }
    },

    created() {
        this.$emit('uncompleteStep', 'StepDraftPlan');
    }

});
</script>
