<template>
    <!-- Header -->
    <div class="p-2 text-center bg-light">
      <h1 class="mb-3">Relecture</h1>
    </div>
    <!-- Header -->
    <div>
    <h5>Tu trouveras ci-dessous l'ensemble de ton commentaire de texte, formaté. Tu peux directement modifier le texte et le style.</h5>
    <QuillEditor ref="quillEditor" theme="snow" v-model:content="everythingRedacted" contentType="html" toolbar="full"/>
    <br/>
    <p> Utilise ce bouton "Réinitialiser" si tu as fait des modifications mais que tu veux réinitialiser le contenu rédigé ci-dessus (attention, toutes tes modifications seront perdues).</p>
    <MDBBtn color="dark" block class="w-25 mb-4" v-on:click="resetRedactedText()">Réinitialiser</MDBBtn>
    </div>

    <hr/>
     <div>
        <MDBBtn color="dark" block class="w-25 mb-4" v-on:click="saveStep()">Sauvegarder</MDBBtn>
        <MDBBtn color="danger" block class="w-25 mb-4" v-on:click="completeStep()">Confirmer ➤</MDBBtn>
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { MDBBtn } from 'mdb-vue-ui-kit';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

/* interface StepProofReadingVueData
{
    
} */

export default defineComponent ({
    emits: ['stepCompleted', 'uncompleteStep'],
    props: ['projectId'],
    components: {
        MDBBtn,
        QuillEditor
    },
    data(): any {
        return {
            everythingRedacted: ""
        }
    },

    methods: {
        completeStep: function() {
            this.saveStep();
            this.$emit('stepCompleted', 'StepProofReading');
        },

        saveStep: function() {
            const result = window.electronAPI.saveEverythingRedacted(this.projectId, this.everythingRedacted);
            if (result > 0) { this.$toast.success('Sauvegardé avec succès !'); }
            else { this.$toast.error('Erreur lors de la sauvegarde :('); }
        },

        resetRedactedText: function() {
            this.everythingRedacted = window.electronAPI.buildFinalRedaction(this.projectId);
            this.editor.setHTML(this.everythingRedacted);
            this.$toast.success('Contenu du texte rédigé réinitialisé !');
        }
    },

    computed: {
        editor() {
            return this.$refs.quillEditor;
        }
    },

    created() {
        const everythingRedactedResult = window.electronAPI.getEverythingRedacted(this.projectId);
        if (everythingRedactedResult.everythingRedacted) {
            this.everythingRedacted = everythingRedactedResult.everythingRedacted
        } else {
            this.everythingRedacted = window.electronAPI.buildFinalRedaction(this.projectId);
        }

        this.$emit('uncompleteStep', 'StepProofReading');
    }

});
</script>
