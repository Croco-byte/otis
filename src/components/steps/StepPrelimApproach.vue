<template>
<div class="d-flex flex-column mb-3 border h-100 justify-content-between">
    <!-- Header -->
    <div class="p-2 text-center bg-light">
      <h1 class="mb-3">Aborder le texte</h1>
    </div>
    <!-- Header -->
    <div class="w-75 text-start align-self-center">
        <br/><h5>Avant toute chose, commence par lire le texte attentivement !</h5>
        <p>Quelques conseils de lecture :</p>
        <MDBListGroup light numbered style="min-width: 22rem">
            <MDBListGroupItem>Pas de panique si tu ne comprends pas tout du premier coup.</MDBListGroupItem>
            <MDBListGroupItem>Lis doucement, ralentis et reviens en arrière si besoin.</MDBListGroupItem>
            <MDBListGroupItem>Le secret: la <b>concentration</b>.</MDBListGroupItem>
        </MDBListGroup>
        <br/>
        <p>Une fois que tu t'es bien approprié le texte, tu peux passer à l'étape suivante.</p>
    </div>

    <div>
        <MDBBtn color="danger" v-on:click="completeStep()">Confirmer ➤</MDBBtn>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { MDBBtn, MDBListGroup, MDBListGroupItem } from 'mdb-vue-ui-kit'

interface StepPrelimApproachVueData
{
    
}

export default defineComponent ({
    emits: ['stepCompleted', 'uncompleteStep'],
    components: {
        MDBBtn,
        MDBListGroup,
        MDBListGroupItem
    },
    data(): StepPrelimApproachVueData {
        return {
        }
    },

    methods: {
        completeStep: function() {
            this.$emit('stepCompleted', 'StepPrelimApproach');
        }
    },

    created() {
        this.$emit('uncompleteStep', 'StepPrelimApproach');
    }

});
</script>
