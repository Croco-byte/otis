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
    <p><i class="fas fa-chevron-circle-right"></i> Le résumé</p>
    <MDBTextarea rows="4" v-model="summary" />
    <br/>
    <p><i class="fas fa-chevron-circle-right"></i> La réponse à la problématique</p>
    <MDBTextarea rows="4" v-model="issueAnswer" />
    <div class="d-flex justify-content-evenly mt-3">
            <div>
                <MDBTextarea rows="6" v-model="issue" disabled id="issueHelper" />
                <div id="issueHelper" class="form-text">
                    (pour rappel, voici ta problématique).
                </div>
            </div>
        </div>
    <br/>
    <p><i class="fas fa-chevron-circle-right"></i> L'ouverture</p>
    <MDBTextarea rows="2" v-model="opening" />
    </div>
    <br/><br/>
    <hr/>
    <h5 class="text-start">Voici ce que donne ta conclusion (si cela ne te convient pas, modifie les éléments ci-dessus) :</h5>
    <MDBTextarea disabled rows="4" v-model="getRedactedConclusion" />
    <br/><br/><p>Ta conclusion te convient ? Passe à la suite !</p>
    <div>
        <MDBBtn color="dark" block class="w-25 mb-4" v-on:click="saveStep()">Sauvegarder</MDBBtn>
        <MDBBtn color="danger" block class="w-25 mb-4" v-on:click="completeStep()">Confirmer ➤</MDBBtn>
    </div>
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
            this.saveStep();
            this.$emit('stepCompleted', 'StepRedacConclusion');
        },

        saveStep: function() {
            const conclusion = { "summary": this.summary, "issueAnswer": this.issueAnswer, "opening": this.opening };
            const result = window.electronAPI.saveConclusionRedacted(this.projectId, conclusion);
            if (result > 0) { this.$toast.success('Sauvegardé avec succès !'); }
            else { this.$toast.error('Erreur lors de la sauvegarde :('); }
        }
    },

    computed: {
        getRedactedConclusion: function() {
            let result = "      " + this.summary + "\n      " + this.issueAnswer + "\n      " + this.opening;
            return result
        }
    },

    created() {
        const basicsResult = window.electronAPI.getDraftBasics(this.projectId);
        if (basicsResult.draftBasics) {
            const basics = JSON.parse(basicsResult.draftBasics);
            this.issue = basics.issue;
        }

        const conclusionResult = window.electronAPI.getConclusionRedacted(this.projectId);
        if (conclusionResult.conclusionRedacted) {
            const conclusion = JSON.parse(conclusionResult.conclusionRedacted);
            this.summary = conclusion.summary;
            this.issueAnswer = conclusion.issueAnswer;
            this.opening = conclusion.opening;
        }

        this.$emit('uncompleteStep', 'StepRedacConclusion');
    }

});
</script>
