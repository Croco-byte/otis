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

     <MDBBtn color="danger" block class="w-25 mb-4" v-on:click="completeStep()">Confirmer</MDBBtn>
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
            window.electronAPI.saveDraftAnnounce(this.projectId, this.draftAnnounce);
            this.$emit('stepCompleted', 'StepDraftAnnounce');
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
