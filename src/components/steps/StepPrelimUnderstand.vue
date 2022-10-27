<template>
<div class="d-flex flex-column mb-3 border h-100 justify-content-between">
    <!-- Header -->
    <div class="p-2 text-center bg-light">
      <h1 class="mb-3">Comprendre le texte</h1>
    </div>
    <!-- Header -->
    <div class="w-50 align-self-center"><img  src="../../assets/onizuka_thinking.jpg" class="img-fluid"/></div>
    <div class="w-75 text-start align-self-center">
        <br/><h5>Maintenant que tu as lu le texte, essaie d'en comprendre le sens général !</h5>
        <p>Quelques conseils pour une meilleure compréhension :</p>
        <MDBListGroup light numbered style="min-width: 22rem">
            <MDBListGroupItem>Je repère ce que je comprends.</MDBListGroupItem>
            <MDBListGroupItem>Je déduis ce que je ne comprends pas.</MDBListGroupItem>
        </MDBListGroup>
        <br/>
        <p>Prend le temps de te poser pour cette étape. Tu n'as pas besoin de noter quoi que ce soit, mais imprègne toi bien du texte et de son sens.</p>
    </div>

    <div>
        <MDBBtn color="danger" v-on:click="completeStep()">Confirmer ➤</MDBBtn>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { MDBBtn, MDBListGroup, MDBListGroupItem } from 'mdb-vue-ui-kit'

interface StepPrelimUnderstandVueData
{
    
}

export default defineComponent ({
    emits: ['stepCompleted', 'uncompleteStep'],
    components: {
        MDBBtn,
        MDBListGroup,
        MDBListGroupItem
    },
    data(): StepPrelimUnderstandVueData {
        return {
        }
    },

    methods: {
        completeStep: function() {
            this.$emit('stepCompleted', 'StepPrelimUnderstand');
        }
    },

    created() {
        this.$emit('uncompleteStep', 'StepPrelimUnderstand');
    }

});
</script>
