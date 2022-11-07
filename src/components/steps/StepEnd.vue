<template>
    <!-- Header -->
    <div class="d-flex flex-column mb-3 border h-100 justify-content-between">
    <div class="p-2 text-center bg-light">
      <h1 class="mb-3">Arrivée !</h1>
    </div>
    <!-- Header -->
    <div class="w-50 align-self-center"><img  src="../../assets/onizuka_finish.jpg" class="img-fluid"/></div>
    <h5>Bravo, tu as terminé ton commentaire de texte ! Tu peux maintenant l'exporter au format PDF en cliquant sur "Générer PDF" ci-dessous.
        Si tu préfères, tu peux copier ton commentaire depuis l'étape précédente et le coller dans un éditeur de texte.</h5>

    <div>
     <MDBBtn color="dark" block class="w-25 mb-4" v-on:click="exportToPdf()">Générer PDF</MDBBtn>
     <MDBBtn color="danger" block class="w-25 mb-4" v-on:click="completeStep()">Quitter</MDBBtn>
    </div>
     </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { MDBBtn } from 'mdb-vue-ui-kit';
import html2pdf from "html2pdf.js";

/* interface StepEndVueData
{
    
} */

export default defineComponent ({
    emits: ['stepCompleted', 'uncompleteStep'],
    props: ['projectId'],
    components: {
        MDBBtn,

    },
    data(): any {
        return {
            everythingRedacted: ""
        }
    },

    methods: {
        completeStep: function() {
            this.$emit('stepCompleted', 'StepEnd');
        },

        exportToPdf() {
            html2pdf(this.everythingRedacted, {
                margin: 15, filename: "commentaire_de_texte.pdf",
            });
        }
    },

    created() {
        const everythingRedactedResult = window.electronAPI.getEverythingRedacted(this.projectId);
        if (everythingRedactedResult.everythingRedacted) {
            this.everythingRedacted = everythingRedactedResult.everythingRedacted
        } else {
            this.everythingRedacted = window.electronAPI.buildFinalRedaction(this.projectId);
        }
        this.$emit('uncompleteStep', 'StepEnd');
    }

});
</script>
