<template>
    <!-- Header -->
    <div class="p-2 text-center bg-light">
      <h1 class="mb-3">Rédaction: la conclusion</h1>
    </div>
    <!-- Header -->
    <div class="w-75 text-start">
    <h5>Une conclusion se rédige généralement en trois étapes :</h5>
    <MDBListGroup light numbered style="min-width: 22rem">
            <MDBListGroupItem>Un résumé de ce qu'on a pu démontrer dans l'ensemble du commentaire de texte.</MDBListGroupItem>
            <MDBListGroupItem>La réponse à la problématique, qui découle de ce résumé.</MDBListGroupItem>
            <MDBListGroupItem>Une ouverture, c'est-à-dire un élément qui pourrait avoir un lien avec le texte et ta démonstration, et appelle à d'autres réflexions (cette étape est <b>optionnelle</b>).</MDBListGroupItem>
        </MDBListGroup>
    <br/>
    <p>Le résumé</p>
    <MDBTextarea rows="4" v-model="summary" />
    <br/>
    <p>La réponse à la problématique</p>
    <MDBTextarea rows="4" v-model="issueAnswer" />
    <br/>
    <p>L'ouverture</p>
    <MDBTextarea rows="4" v-model="opening" />
    </div>


     <MDBBtn color="danger" block class="w-25 mb-4" v-on:click="completeStep()">Confirmer</MDBBtn>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { MDBBtn, MDBTextarea, MDBListGroup, MDBListGroupItem } from 'mdb-vue-ui-kit'

/* interface StepRedacConclusionVueData
{
    
} */

export default defineComponent ({
    emits: ['stepCompleted', 'uncompleteStep'],
    props: ['projectId'],
    components: {
        MDBBtn,
        MDBTextarea,
        MDBListGroup,
        MDBListGroupItem
    },
    data(): any {
        return {
            // Les éléments de la conclusion rédigée
            summary: "",
            issueAnswer: "",
            opening: "",


            // Problématique
            issue: "",
        }
    },

    methods: {
        completeStep: function() {
            window.electronAPI.saveIntroRedacted(this.projectId, this.intro);
            this.$emit('stepCompleted', 'StepRedacConclusion');
        }
    },

    created() {
        const basicsResult = window.electronAPI.getDraftBasics(this.projectId);
        if (basicsResult.draftBasics) {
            const basics = JSON.parse(basicsResult.draftBasics);
            this.issue = basics.issue;
        }

        this.$emit('uncompleteStep', 'StepRedacConclusion');
    }

});
</script>
