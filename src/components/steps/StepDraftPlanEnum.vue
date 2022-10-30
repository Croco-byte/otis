<template>
    <!-- Header -->
    <div class="p-5 text-center bg-light">
      <h1 class="mb-3">Brouillon introduction: repérage pour le plan</h1>
    </div>
    <!-- Header -->
    <div class="w-75 text-start align-self-center">
        <br/>
        <h5>Il est maintenant temps d'élaborer ton plan. Pour cela, commençons par faire un peu de repérage.</h5>
        <br/>
        <span><i class="fas fa-chevron-circle-right"></i> Liste ci-dessous, en vrac, tout ce qui te paraît important dans le texte (thèmes, registre, énonciation, etc.), sous la forme d'un mot ou d'une courte phrase qui représente l'élément. Essaie d'avoir une liste d'environ 6-10 éléments. Tu peux avoir besoin de relire le texte plusieurs fois.</span>
        <br/>
        <div v-for="(element, index) in elements" :key="`${index}`">
            <MDBTextarea rows="2" v-model="elements[index]" wrapperClass="mb-4"/>
        </div>
        <p v-on:click="this.elements.push('')"><i class="fa fa-plus-circle fa-3x"></i></p>
    </div>
    <br/>
     <MDBBtn color="danger" block class="w-25 mb-4" v-on:click="completeStep()">Confirmer</MDBBtn>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { MDBBtn, MDBTextarea } from 'mdb-vue-ui-kit'

/*interface StepDraftPlanVueData
{
    
} */

export default defineComponent ({
    emits: ['stepCompleted', 'uncompleteStep'],
    props: ['projectId'],
    components: {
        MDBBtn,
        MDBTextarea,
    },
    data(): any {
        return {
            elements: ["", "", ""]
        }
    },

    methods: {
        completeStep: function() {
            console.log(this.elements);
            //this.$emit('stepCompleted', 'StepDraftPlan');
        }
    },

    created() {
        this.$emit('uncompleteStep', 'StepDraftPlan');
    }

});
</script>
