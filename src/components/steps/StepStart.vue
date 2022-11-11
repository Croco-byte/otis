<template>
<div class="d-flex flex-column mb-3 border h-100 justify-content-between">
    <!-- Header -->
    <div class="p-2 text-center bg-light">
      <h1 class="mb-3">Départ !</h1>
    </div>
    <!-- Header -->
    <div class="w-50 align-self-center"><img  src="../../assets/onizuka_studying_start.jpg" class="img-fluid"/></div>
    <div class="w-75 text-start align-self-center">
        <br/><h5>Quelques indications avant de commencer ...</h5>
        <MDBListGroup light numbered style="min-width: 22rem">
            <MDBListGroupItem>Le menu à gauche de l'écran indique les différentes étapes que tu devras suivre afin de produire le document final.</MDBListGroupItem>
            <MDBListGroupItem>A chaque fois que tu penses avoir terminé une étape, tu pourras cliquer sur le bouton "Confirmer" qui se trouve en bas de l'écran, ce qui finalisera l'étape actuelle, et te fera passer à la suivante, en sauvegardant ton travail pour cette étape.</MDBListGroupItem>
            <MDBListGroupItem>Tu peux sauvegarder ton travail avant de compléter toute l'étape (si tu veux faire une pause par exemple) en cliquant sur le bouton "Sauvegarder" qui sera à côté du bouton de confirmation. Pense bien à sauvegarder régulièrement !</MDBListGroupItem>
            <MDBListGroupItem>L'icône <i class="fas fa-edit"></i> indique l'étape actuelle.</MDBListGroupItem>
            <MDBListGroupItem>Il est recommandé, autant que possible, de faire les étapes dans l'ordre.</MDBListGroupItem>
            <MDBListGroupItem>Si tu es bloqué, tu peux cependant sauter une ou plusieurs étapes afin de passer directement à une étape ultérieure, en utilisant le menu de gauche.</MDBListGroupItem>
            <MDBListGroupItem>De même, si tu souhaites revenir sur une étape que tu as précédemment complétée, tu peux cliquer sur le menu à gauche pour le faire.</MDBListGroupItem>
        </MDBListGroup>

    </div>

    <div>
        <MDBBtn color="danger" v-on:click="completeStep()">Confirmer ➤</MDBBtn>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { MDBBtn, MDBListGroup, MDBListGroupItem } from 'mdb-vue-ui-kit'

interface StepStartVueData
{
    
}

export default defineComponent ({
    emits: ['stepCompleted', 'uncompleteStep'],
    components: {
        MDBBtn,
        MDBListGroup,
        MDBListGroupItem
    },
    data(): StepStartVueData {
        return {
        }
    },

    methods: {
        completeStep: function() {
            this.$emit('stepCompleted', 'StepStart');
        }
    },

    created() {
        this.$emit('uncompleteStep', 'StepStart');
    }

});
</script>
