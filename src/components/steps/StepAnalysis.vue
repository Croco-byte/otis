<template>
    <div class="p-2 text-center bg-light">
      <h1 class="mb-3">Analyser le texte</h1>
    </div>

    <h5>Tu as défini l'ensemble des éléments nécessaires à la structure de ton commentaire de texte : le plus dur est fait !
        Il nous faut maintenant un peu de contenu avant de passer à la rédaction. Remplis le tableau ci-dessous pour rassembler, pour chaque partie de ton travail,
        des éléments directement liés au texte dont tu pourras parler.
    </h5>
    <br/>
    <h4>Répartition des éléments</h4>
    <MDBTable dark responsive>
        <thead>
            <tr>
                <th scope="col">I. 1.</th>
                <th scope="col">I. 2.</th>
                <th v-if="structure.partOne.subparts === '3'" scope="col">I. 3.</th>
                <th scope="col">II. 1.</th>
                <th scope="col">II. 2.</th>
                <th v-if="structure.partTwo.subparts === '3'" scope="col">II. 3.</th>
                <th v-if="structure.parts === '3'" scope="col">III. 1.</th>
                <th v-if="structure.parts === '3'" scope="col">III. 2.</th>
                <th v-if="structure.parts === '3' && structure.partThree.subparts === '3'" scope="col">III. 3.</th>
            </tr>
        </thead>
        <tbody>
            <td>{{ getAnalysisElementsRepartition.p1s1 }}</td>
            <td>{{ getAnalysisElementsRepartition.p1s2 }}</td>
            <td v-if="structure.partOne.subparts === '3'">{{ getAnalysisElementsRepartition.p1s3 }}</td>
            <td>{{ getAnalysisElementsRepartition.p2s1 }}</td>
            <td>{{ getAnalysisElementsRepartition.p2s2 }}</td>
            <td v-if="structure.partTwo.subparts === '3'">{{ getAnalysisElementsRepartition.p2s3 }}</td>
            <td v-if="structure.parts === '3'">{{ getAnalysisElementsRepartition.p3s1 }}</td>
            <td v-if="structure.parts === '3'">{{ getAnalysisElementsRepartition.p3s2 }}</td>
            <td v-if="structure.parts === '3' && structure.partThree.subparts === '3'">{{ getAnalysisElementsRepartition.p3s3 }}</td>
        </tbody>
    </MDBTable>
    <br/>
    <h4>Éléments</h4>
    <MDBTable striped responsive class="border border-danger">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Citation</th>
                <th scope="col">Procédé</th>
                <th scope="col">Interprétation</th>
                <th scope="col">Partie associée</th>
                <th scope="col">Suppr</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(element, index) in analysisElements" v-bind:key="index">
                <td>{{ index + 1 }}</td>
                <td><MDBInput type="text" v-model="analysisElements[index].citation" wrapperClass="mb-4" /></td>
                <td><MDBInput type="text" v-model="analysisElements[index].process" wrapperClass="mb-4" /></td>
                <td><MDBInput type="text" v-model="analysisElements[index].interpretation" wrapperClass="mb-4" /></td>
                <td>
                    <select v-model="analysisElements[index].part">
                        <option value="uncategorized">Aucune</option>
                        <optgroup label="Partie 1">
                            <option value="p1s1">I. Sous-partie 1</option>
                            <option value="p1s2">I. Sous-partie 2</option>
                            <option value="p1s3" v-if="structure.partOne.subparts === '3'">I. Sous-partie 3</option>
                        </optgroup>
                        <optgroup label="Partie 2">
                            <option value="p2s1">II. Sous-partie 1</option>
                            <option value="p2s2">II. Sous-partie 2</option>
                            <option value="p2s3" v-if="structure.partTwo.subparts === '3'">II. Sous-partie 3</option>
                        </optgroup>
                        <optgroup v-if="structure.parts === '3'" label="Partie 3">
                            <option value="p3s1">III. Sous-partie 1</option>
                            <option value="p3s2">III. Sous-partie 2</option>
                            <option value="p3s3" v-if="structure.partOne.subparts === '3'">III. Sous-partie 3</option>
                        </optgroup>
                    </select>
                </td>
                <td><i v-on:click="deleteAnalysisElement(index)" class="fa fa-minus-circle fa-2x"></i></td>
            </tr>
        </tbody>
    </MDBTable>
    <p class="text-center" v-on:click="addAnalysisElement()"><i class="fa fa-plus-circle fa-3x"></i></p>
    <br/><br/>

    <div>
    <MDBBtn color="success" v-on:click="collapsePlan = !collapsePlan" aria-controls="collapsibleContentPlan" :aria-expanded="collapsePlan">Afficher/cacher le plan</MDBBtn>
    <MDBCollapse id="collapsibleContentPlan" v-model="collapsePlan" >
        <br/><br/>
        <DisplayPlan :projectId="projectId"/>
    </MDBCollapse>
    </div>
    <br/><br/>
    <div class="text-start">
    <h6 >Tu as fini d'ajouter les éléments du texte et de les associer à tes parties ? Passons à la rédaction !</h6>
    </div>
    <br/>
    <div>
        <MDBBtn color="danger" block class="w-25 mb-4" v-on:click="completeStep()">Confirmer</MDBBtn>
    </div>
</template>

<script lang="ts">
import {ref } from 'vue';
import { defineComponent } from '@vue/runtime-core';
import { MDBBtn, MDBTable, MDBInput, MDBCollapse } from 'mdb-vue-ui-kit';
import DisplayPlan from '../tools/DisplayPlan.vue';

/*interface StepAnalysisVueData
{
    
} */

export default defineComponent ({
    emits: ['stepCompleted', 'uncompleteStep'],
    props: ['projectId'],
    components: {
        MDBBtn,
        MDBTable,
        MDBInput,
        MDBCollapse,
        DisplayPlan
    },
    setup() {
      const collapsePlan = ref(false);
      return {
        collapsePlan
      }
    },

    data(): any {
        return {
            structure: {},
            analysisElements: []
        }
    },

    methods: {
        completeStep: function() {
            console.log(this.analysisElements);
            window.electronAPI.saveAnalysis(this.projectId, JSON.parse(JSON.stringify(this.analysisElements)));
            this.$emit('stepCompleted', 'StepAnalysis');
        },

        addAnalysisElement: function() {
            let blankElement = { "citation": "", "process": "", "interpretation": "", "part": "" }
            this.analysisElements.push(blankElement);
        },

        deleteAnalysisElement: function(index: number) {
            if (index >= this.analysisElements.length || index < 0) {
                return
            }
            this.analysisElements.splice(index, 1);
        }
    },

    computed: {
        getAnalysisElementsRepartition: function() {
            let result = { "p1s1": 0, "p1s2": 0, "p1s3": 0, "p2s1": 0, "p2s2": 0, "p2s3": 0, "p3s1": 0, "p3s2": 0, "p3s3": 0 };
            for (var i = 0; i < this.analysisElements.length; i++) {
                if (this.analysisElements[i].part == "p1s1") { result.p1s1 += 1; continue; }
                if (this.analysisElements[i].part == "p1s2") { result.p1s2 += 1; continue; }
                if (this.analysisElements[i].part == "p1s3") { result.p1s3 += 1; continue; }
            }
            return result;
        }
    },

    created() {
        const structureResult = window.electronAPI.getDraftPlanStructure(this.projectId);
        if (structureResult.draftPlanStructure) {
            const draftPlanStructure = JSON.parse(structureResult.draftPlanStructure);
            this.structure = draftPlanStructure;
        } else {
            this.structure = { "parts": '2', "partOne": { "title": "Première partie", "subparts": '2', "subpartOneTitle": "Sous-partie 1", "subpartTwoTitle": "Sous-partie 2", "subpartThreeTitle": "Sous-partie 3" },
                                           "partTwo": { "title": "Deuxième partie", "subparts": '2', "subpartOneTitle": "Sous-partie 1", "subpartTwoTitle": "Sous-partie 2", "subpartThreeTitle": "Sous-partie 3" },
                                           "partThree": { "title": "Troisième partie", "subparts": '2', "subpartOneTitle": "Sous-partie 1", "subpartTwoTitle": "Sous-partie 2", "subpartThreeTitle": "Sous-partie 3" }}
        }

        const analysisResult = window.electronAPI.getAnalysis(this.projectId);
        if (analysisResult.analysis) {
            const analysis = JSON.parse(analysisResult.analysis);
            this.analysisElements = analysis;
        } else {
            this.analysisElements = [];
        }

        this.$emit('uncompleteStep', 'StepAnalysis');
    }

});
</script>
