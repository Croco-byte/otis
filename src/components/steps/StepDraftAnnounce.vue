<template>
    <!-- Header -->
    <div class="p-5 text-center bg-light">
      <h1 class="mb-3">Brouillon: l'annonce de plan</h1>
    </div>
    <h5>Voici un résumé de ton plan !</h5>
    
    <div>
        <h3>I. {{ structure.partOne.title }}</h3>
            <h5>    1. {{ structure.partOne.subpartOneTitle }}</h5>
                <div v-for="element in p1s1" v-bind:key="element">
                <p v-if="element.length >= 40">{{ element.substr(0, 37) }}...</p>
                <p v-else>{{ element }}</p>
                </div>
            <h5>    2. {{ structure.partOne.subpartTwoTitle }}</h5>
                <div v-for="element in p1s2" v-bind:key="element">
                <p v-if="element.length >= 40">{{ element.substr(0, 37) }}...</p>
                <p v-else>{{ element }}</p>
                </div>
            
            <h5 v-if="structure.partOne.subparts === '3'">    3. {{ structure.partOne.subpartThreeTitle }}</h5>
                <div v-for="element in p1s3" v-bind:key="element">
                <p v-if="element.length >= 40">{{ element.substr(0, 37) }}...</p>
                <p v-else>{{ element }}</p>
                </div>
    </div>
    <!-- Header -->


     <MDBBtn color="danger" block class="w-25 mb-4" v-on:click="completeStep()">Confirmer</MDBBtn>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { MDBBtn } from 'mdb-vue-ui-kit'

/*interface StepDraftAnnounceVueData
{
    
}*/

export default defineComponent ({
    emits: ['stepCompleted', 'uncompleteStep'],
    props: ['projectId'],
    components: {
        MDBBtn
    },
    data(): any {
        return {
            structure: {},
            elements: [],

            p1s1: [],
            p1s2: [],
            p1s3: [],

            p2s1: [],
            p2s2: [],
            p2s3: [],

            p3s1: [],
            p3s2: [],
            p3s3: []
        }
    },

    methods: {
        completeStep: function() {
            this.$emit('stepCompleted', 'StepDraftAnnounce');
        }
    },

    created() {
        const elementsResult = window.electronAPI.getDraftPlanElements(this.projectId);
        if (elementsResult.draftPlanElements) {
            const draftPlanElements = JSON.parse(elementsResult.draftPlanElements);
            this.elements = draftPlanElements.elements;
        }

        for (var i = 0; i < this.elements.length; i++) {
            if (this.elements[i].category === 'p1s1' ) { this.p1s1.push(this.elements[i].data); continue }
            if (this.elements[i].category === 'p1s2' ) { this.p1s2.push(this.elements[i].data); continue }
            if (this.elements[i].category === 'p1s3' ) { this.p1s3.push(this.elements[i].data); continue }

            if (this.elements[i].category === 'p2s1' ) { this.p2s1.push(this.elements[i].data); continue }
            if (this.elements[i].category === 'p2s2' ) { this.p2s2.push(this.elements[i].data); continue }
            if (this.elements[i].category === 'p2s3' ) { this.p2s3.push(this.elements[i].data); continue }

            if (this.elements[i].category === 'p3s1' ) { this.p3s1.push(this.elements[i].data); continue }
            if (this.elements[i].category === 'p3s2' ) { this.p3s2.push(this.elements[i].data); continue }
            if (this.elements[i].category === 'p3s3' ) { this.p3s3.push(this.elements[i].data); continue }
        }

        const structureResult = window.electronAPI.getDraftPlanStructure(this.projectId);
        if (structureResult.draftPlanStructure) {
            const draftPlanStructure = JSON.parse(structureResult.draftPlanStructure);
            this.structure = draftPlanStructure;
        } else {
            this.structure = { "parts": '2', "partOne": { "title": "Première partie", "subparts": '2', "subpartOneTitle": "Sous-partie 1", "subpartTwoTitle": "Sous-partie 2", "subpartThreeTitle": "Sous-partie 3" },
                                           "partTwo": { "title": "Deuxième partie", "subparts": '2', "subpartOneTitle": "Sous-partie 1", "subpartTwoTitle": "Sous-partie 2", "subpartThreeTitle": "Sous-partie 3" },
                                           "partThree": { "title": "Troisième partie", "subparts": '2', "subpartOneTitle": "Sous-partie 1", "subpartTwoTitle": "Sous-partie 2", "subpartThreeTitle": "Sous-partie 3" }}
        }

        this.$emit('uncompleteStep', 'StepDraftAnnounce');
    }

});
</script>
