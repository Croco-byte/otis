<template>
    <!-- Header -->
    <div class="p-2 text-center bg-light">
      <h1 class="mb-3">Le plan: les parties</h1>
    </div>
    <!-- Header -->
    <div class=" text-start align-self-center">
        <h5>Passons désormais aux parties de ton plan. Choisis ci-dessous si tu souhaites avoir 2 ou 3 parties (ne t'inquiète pas, tu pourras à tout moment revenir sur cette page pour changer le nombre de parties).</h5>
        <div class="d-flex justify-content-center">
              <span class="me-5"><MDBRadio label="Deux parties" id="2" v-model="partsNumber" value="2" /></span>
              <MDBRadio label="Trois parties" id="3" v-model="partsNumber" value="3" />
        </div>
        <br/>
        <br/>
        <h5>Tu peux maintenant, ci-dessous, organiser les éléments que tu avais repérés à l'étape précédente dans tes parties. Utilise la souris pour déplacer les éléments dans les différentes colonnes.</h5>
        <h5>N'oublie pas également de donner un titre à tes parties dans les encadrés du tableau ci-dessous !</h5>
        <br/>
        <div class="d-flex flex-column border">
            <div class="border text-center">
                <h4> Éléments non-catégorisés </h4>
                <div class="border border-2 border-dark" style="min-height: 100px;">
                <draggable
                class="d-flex"
                group="parts"
                :list="uncategorized"
                item-key="1"
                >
                <template #item="{ element }">
                <div class="m-1 p-1 border border-danger rounded" v-if="element.length >= 40">{{ element.substr(0, 37) }}...</div>
                <div class="m-1 p-1 border border-danger rounded" v-else>{{ element }}</div>
                </template>
                </draggable>
                </div>
            </div>
        <br/>
        <div class="border text-center">
        <h4> Parties </h4>
        <div class="text-center d-flex justify-content-around">
            <div class="border border-2 border-dark" style="min-width: 200px; min-height: 200px;">
                <h6 class="border-bottom border-2 border-dark"><MDBInput type="text" v-model="partOneTitle" /></h6>
                <draggable class="list-group" group="parts" :list="partOne" item-key="1">
                    <template #item="{ element }">
                    <div class="list-group-item border border-danger m-1" v-if="element.length >= 40">{{ element.substr(0, 37) }}...</div>
                    <div class="list-group-item border border-danger m-1" v-else>{{ element }}</div>
                    </template>
                </draggable>
            </div>

            <div class="border border-2 border-dark" style="min-width: 200px; min-height: 200px;">
                <h6  class="border-bottom border-2 border-dark"><MDBInput type="text" v-model="partTwoTitle" /></h6>
                <draggable class="list-group" :list="partTwo" group="parts" item-key="1">
                    <template #item="{ element }">
                    <div class="list-group-item border border-danger m-1" v-if="element.length >= 40">{{ element.substr(0, 37) }}...</div>
                    <div class="list-group-item border border-danger m-1" v-else>{{ element }}</div>
                    </template>
                </draggable>
            </div>

            <div class="border border-2 border-dark" style="min-width: 200px; min-height: 200px;" v-if="partsNumber === '3'">
                <h6  class="border-bottom border-2 border-dark"><MDBInput type="text" v-model="partThreeTitle" /></h6>
                <draggable class="list-group" :list="partThree" group="parts" item-key="1">
                    <template #item="{ element }">
                    <div class="list-group-item border border-danger m-1" v-if="element.length >= 40">{{ element.substr(0, 37) }}...</div>
                    <div class="list-group-item border border-danger m-1" v-else>{{ element }}</div>
                    </template>
                </draggable>
            </div>
        </div>


    </div>
  </div>

    </div>
    <br/>
    <div>
        <MDBBtn color="dark" block class="w-25 mb-4" v-on:click="saveStep()">Sauvegarder</MDBBtn>
        <MDBBtn color="danger" block class="w-25 mb-4" v-on:click="completeStep()">Confirmer ➤</MDBBtn>
    </div>
</template>

<script lang="ts">
import draggable from "vuedraggable";
import { defineComponent } from '@vue/runtime-core';
import { MDBBtn, MDBRadio, MDBInput } from 'mdb-vue-ui-kit'

/*interface StepDraftPlanPartsVueData
{
    
}*/

export default defineComponent ({
    emits: ['stepCompleted', 'uncompleteStep'],
    props: ['projectId'],
    components: {
        MDBBtn,
        MDBRadio,
        MDBInput,
        draggable
    },
    data(): any {
        return {
            partsNumber: "",
            elements: [],
            uncategorized: [],
            partOne: [],
            partTwo: [],
            partThree: [],

            structure: {},
            partOneTitle: "",
            partTwoTitle: "",
            partThreeTitle: ""
        }
    },

    methods: {
        completeStep: function() {
            this.saveStep();
            this.$emit('stepCompleted', 'StepDraftPlanParts');
        },

        saveStep: function() {
            for (var i = 0; i < this.elements.length; i++) {
                if (this.uncategorized.includes(this.elements[i].data)) { this.elements[i].category = "uncategorized" }
                if (this.partOne.includes(this.elements[i].data) && this.elements[i].category.startsWith('p1') !== true) { this.elements[i].category = "p1" }
                if (this.partTwo.includes(this.elements[i].data) && this.elements[i].category.startsWith('p2') !== true) { this.elements[i].category = "p2" }
                if (this.partThree.includes(this.elements[i].data) && this.elements[i].category.startsWith('p3') !== true) { this.elements[i].category = "p3" }
            }
            var allElements = JSON.parse(JSON.stringify(this.elements))
            const result1 = window.electronAPI.saveDraftPlanElements(this.projectId, { "elements": allElements });

            this.structure.parts = this.partsNumber;
            this.structure.partOne.title = this.partOneTitle;
            this.structure.partTwo.title = this.partTwoTitle;
            this.structure.partThree.title = this.partThreeTitle;
            const result2 = window.electronAPI.saveDraftPlanStructure(this.projectId, JSON.parse(JSON.stringify(this.structure)));
            if (result1 > 0 && result2 > 0) { this.$toast.success('Sauvegardé avec succès !'); }
            else { this.$toast.error('Erreur lors de la sauvegarde :('); }
        },
    },

    watch: {
        partsNumber(newNumber, oldNumber) {
            if (oldNumber == 3 && newNumber == 2) {
                this.uncategorized.push.apply(this.uncategorized, this.partThree);
                this.partThree = [];
            }
        }
    },

    created() {
        const elementsResult = window.electronAPI.getDraftPlanElements(this.projectId);
        if (elementsResult.draftPlanElements) {
            const draftPlanElements = JSON.parse(elementsResult.draftPlanElements);
            this.elements = draftPlanElements.elements;
        }
        for (var i = 0; i < this.elements.length; i++) {
            if (this.elements[i].category == 'uncategorized' ) { this.uncategorized.push(this.elements[i].data); }
            if (this.elements[i].category.startsWith('p1') ) { this.partOne.push(this.elements[i].data); }
            if (this.elements[i].category.startsWith('p2') ) { this.partTwo.push(this.elements[i].data); }
            if (this.elements[i].category.startsWith('p3') ) { this.partThree.push(this.elements[i].data); }
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
        this.partsNumber = this.structure.parts;
        this.partOneTitle = this.structure.partOne.title;
        this.partTwoTitle = this.structure.partTwo.title;
        this.partThreeTitle = this.structure.partThree.title;

        /*console.log(this.uncategorized);
        console.log(this.partOne);
        console.log(this.partTwo);
        console.log(this.partThree); */

        this.$emit('uncompleteStep', 'StepDraftPlanParts');
    }

});
</script>
