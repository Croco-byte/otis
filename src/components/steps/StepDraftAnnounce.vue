<template>
    <!-- Header -->
    <div class="p-2 text-center bg-light">
      <h1 class="mb-3">Brouillon: l'annonce de plan</h1>
    </div>
    <h5>Voici un résumé de ton plan !</h5>
    <br/>
    
    <DisplayPlan :projectId="projectId"/>

    <br/><br/>
    <h5>Si cela te convient, il est maintenant temps de rédiger ton annonce de plan. Fais des phrases simples et claires pour annoncer tes parties (seulement les parties, les sous-parties ne sont pas concernées). Pense à utiliser des connecteurs logiques (tout d'abord, dans un premier temps, pour commencer / puis, dans un second temps, deuxièmement / enfin, finalement, dans un dernier temps).</h5>
    <br/>
    <MDBTextarea rows="5" label="Ton annonce de plan" v-model="draftAnnounce" wrapperClass="mb-4"/>

    <div>
        <MDBBtn color="dark" block class="w-25 mb-4" v-on:click="saveStep()">Sauvegarder</MDBBtn>
        <MDBBtn color="danger" block class="w-25 mb-4" v-on:click="completeStep()">Confirmer ➤</MDBBtn>
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { MDBBtn, MDBTextarea } from 'mdb-vue-ui-kit';
import DisplayPlan from '../tools/DisplayPlan.vue';

/*interface StepDraftAnnounceVueData
{
    
}*/

export default defineComponent ({
    emits: ['stepCompleted', 'uncompleteStep'],
    props: ['projectId'],
    components: {
        MDBBtn,
        MDBTextarea,
        DisplayPlan
    },
    data(): any {
        return {
            draftAnnounce: "",
        }
    },

    methods: {
        completeStep: function() {
            this.saveStep();
            this.$emit('stepCompleted', 'StepDraftAnnounce');
        },

        saveStep: function() {
            const result = window.electronAPI.saveDraftAnnounce(this.projectId, this.draftAnnounce);
            if (result > 0) { this.$toast.success('Sauvegardé avec succès !'); }
            else { this.$toast.error('Erreur lors de la sauvegarde :('); }
        }
    },

    created() {
        const announceResult = window.electronAPI.getDraftAnnounce(this.projectId);
        if (announceResult.draftAnnounce) {
            this.draftAnnounce = announceResult.draftAnnounce
        }

        this.$emit('uncompleteStep', 'StepDraftAnnounce');
    }

});
</script>
