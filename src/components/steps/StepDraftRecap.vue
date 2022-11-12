<template>
    <!-- Header -->
    <div class="d-flex flex-column mb-3 border h-100 justify-content-between">
    <div class="p-2 text-center bg-light">
      <h1 class="mb-3">Récapitulatif brouillon</h1>
    </div>
    <!-- Header -->
    <div class="w-50 align-self-center"><img  src="../../assets/onizuka_draft_recap.jpg" class="img-fluid"/></div>
    <h5>Bien joué, tu as terminé ton brouillon et tu es maintenant prêt à passer à l'analyse du texte et à la rédaction.
        Si tu le souhaites, tu peux exporter l'ensemble de ton brouillon en cliquant sur le bouton "Générer PDF brouillon" ci-dessous (si tu veux le transmettre à ton professeur, ou avoir tous les éléments de ton brouillon sous les yeux pour les prochaines étapes).
    </h5>

    <div>
     <MDBBtn color="dark" block class="w-25 mb-4" v-on:click="exportToPdf()">Générer PDF brouillon</MDBBtn>
     <MDBBtn color="danger" block class="w-25 mb-4" v-on:click="completeStep()">Confirmer</MDBBtn>
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
            draftRedacted: ""
        }
    },

    methods: {
        completeStep: function() {
            this.$emit('stepCompleted', 'StepDraftRecap');
        },

        exportToPdf() {
            html2pdf(this.draftRedacted, {
                margin: 15, filename: "brouillon.pdf",
            });
        }
    },

    created() {
        const draftRedactedResult = window.electronAPI.buildDraftRecap(this.projectId);
        if (draftRedactedResult) {
            this.draftRedacted = draftRedactedResult
        } else {
            this.draftRedacted = "Erreur dans la génération du brouillon !"
        }
        this.$emit('uncompleteStep', 'StepDraftRecap');
    }

});
</script>
