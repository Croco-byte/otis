<template>
    <!-- Header -->
    <div class="p-5 text-center bg-light">
      <h1 class="mb-3">Rédaction: l'introduction</h1>
    </div>
    <!-- Header -->
    <h5 class="text-start">Voici d'abord un petit rappel de tous les éléments de ton brouillon qui concernent l'introduction.</h5>
    <br/>

    <div class="border border-2 border-dark p-1">
    <h6>Les éléments de base pour commencer l'introduction.</h6>
    <div class="d-flex justify-content-evenly">
        <div>
            <MDBTextarea rows="4" v-model="author" disabled id="authorHelper" />
            <div id="authorHelper" class="form-text">
                Les informations relatives à l'auteur.
            </div>
        </div>
        <div>
            <MDBTextarea rows="4" v-model="work" disabled id="workHelper" />
            <div id="workHelper" class="form-text">
                Les informations relatives à l'oeuvre.
            </div>
        </div>
        <div>
            <MDBTextarea rows="4" v-model="text" disabled id="textHelper" />
            <div id="textHelper" class="form-text">
                Les informations relatives au texte.
            </div>
        </div>
    </div>
    <br/>
    <h6>Ta problématique</h6>
    <div class="">
            <MDBTextarea disabled rows="2" v-model="issue" wrapperClass="mb-4"/>
    </div>
    <br/>
    <h6>Ton annonce de plan</h6>
    <div class="">
            <MDBTextarea disabled rows="4" v-model="announce" wrapperClass="mb-4"/>
    </div>
    </div>
    <br/><br/>
    <h5 class="text-start">Les éléments ci-dessus sont <b>dans l'ordre</b>. Tu n'as maintenant plus qu'à former des phrases pour rédiger proprement ton introduction ci-dessous.</h5>
    <br/>
    <div class="">
        <MDBTextarea rows="10" label="Mon introduction" v-model="intro" wrapperClass="mb-4"/>
    </div>

    <br/>

    <br/><br/>
     <MDBBtn color="danger" block class="w-25 mb-4" v-on:click="completeStep()">Confirmer</MDBBtn>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { MDBBtn, MDBTextarea } from 'mdb-vue-ui-kit'

/* interface StepRedacIntroVueData
{
    
} */

export default defineComponent ({
    emits: ['stepCompleted', 'uncompleteStep'],
    props: ['projectId'],
    components: {
        MDBBtn,
        MDBTextarea
    },
    data(): any {
        return {
            // Draft intro basics
            author: "",
            work: "",
            text: "",

            // Problématique
            issue: "",

            // Annonce de plan
            announce: "",

            // Introduction rédigée
            intro: ""
        }
    },

    methods: {
        completeStep: function() {
            window.electronAPI.saveIntroRedacted(this.projectId, this.intro);
            this.$emit('stepCompleted', 'StepRedacIntro');
        }
    },

    created() {
        const basicsResult = window.electronAPI.getDraftBasics(this.projectId);
        if (basicsResult.draftBasics) {
            const basics = JSON.parse(basicsResult.draftBasics);
            this.author = basics.author;
            this.work = basics.work;
            this.text = basics.text;
            this.issue = basics.issue;
        }

        const announceResult = window.electronAPI.getDraftAnnounce(this.projectId);
        if (announceResult.draftAnnounce) {
            this.announce = announceResult.draftAnnounce;
        }

        const introResult = window.electronAPI.getIntroRedacted(this.projectId);
        if (introResult.introRedacted) {
            this.intro = introResult.introRedacted;
        }

        this.$emit('uncompleteStep', 'StepRedacIntro');
    }

});
</script>
