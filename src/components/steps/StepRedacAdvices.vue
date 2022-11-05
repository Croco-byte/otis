<template>
    <div class="d-flex flex-column mb-3 border h-100 justify-content-between">
    <!-- Header -->
    <div class="p-2 text-center bg-light">
      <h1 class="mb-3">Rédaction: quelques conseils ...</h1>
    </div>
    <!-- Header -->
    <div class="w-50 align-self-center"><img  src="../../assets/onizuka_writing.jpg" class="img-fluid"/></div>
    <div class="w-75 text-start align-self-center">
        <br/><h5>Il est maintenant temps de commencer à rédiger le commentaire de texte. Si tu as bien rassemblé tous les éléments au cours des étapes précédentes, il s'agit de la partie la plus facile ! Quelques conseils à garder en tête :</h5>
        <MDBListGroup light numbered style="min-width: 22rem">
            <MDBListGroupItem>Ne cherche pas à faire des phrases compliquées : cherche à faire des phrases courtes et claires ! </MDBListGroupItem>
            <MDBListGroupItem>Chaque fois que tu as fini un paragraphe, relis-le pour vérifier que les phrases sont compréhensibles, s'enchaînent bien et pour éliminer un maximum d'erreurs orthographiques.</MDBListGroupItem>
        </MDBListGroup>
    </div>
    <div>
         <MDBBtn color="danger" block class="w-25 mb-4" v-on:click="completeStep()">Confirmer</MDBBtn>
    </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { MDBBtn, MDBListGroup, MDBListGroupItem } from 'mdb-vue-ui-kit'

interface StepRedacAdvicesVueData
{
    
}

export default defineComponent ({
    emits: ['stepCompleted', 'uncompleteStep'],
    components: {
        MDBBtn,
        MDBListGroup,
        MDBListGroupItem
    },
    data(): StepRedacAdvicesVueData {
        return {
        }
    },

    methods: {
        completeStep: function() {
            this.$emit('stepCompleted', 'StepRedacAdvices');
        }
    },

    created() {
        this.$emit('uncompleteStep', 'StepRedacAdvices');
    }

});
</script>
