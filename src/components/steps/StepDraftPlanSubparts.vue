<template>
    <!-- Header -->
    <div class="p-2 text-center bg-light">
      <h1 class="mb-3">Le plan: les sous-parties</h1>
    </div>
    <!-- Header -->
    <MDBTabs v-model="activeTabId1">
    <!-- Tabs navs -->
    <h6 class="text-start"> Définissons maintenant les sous-parties pour chacune de tes parties. Utilise les boutons ci-dessous pour naviguer entre tes différentes parties. </h6>
        <MDBTabNav pills tabsClasses="mb-3" class="d-flex justify-content-center">
            <MDBTabItem tabId="ex1-1" href="ex1-1">Partie 1</MDBTabItem>
            <MDBTabItem tabId="ex1-2" href="ex1-2">Partie 2</MDBTabItem>
            <MDBTabItem v-if="structure.parts === '3'" tabId="ex1-3" href="ex1-3">Partie 3</MDBTabItem>
        </MDBTabNav>
        <!-- Tabs navs -->

        
        <MDBTabContent>
        <MDBTabPane tabId="ex1-1">
            <h5> Partie n°1 : {{ structure.partOne.title }} </h5>
            <br/>
            <h6>Combien de sous-parties veux-tu pour cette partie ?</h6>
            <div class="d-flex justify-content-center">
              <span class="me-5"><MDBRadio label="Deux sous-parties" id="2" v-model="structure.partOne.subparts" value="2" /></span>
              <MDBRadio label="Trois sous-parties" id="3" v-model="structure.partOne.subparts" value="3" />
            </div>
            <br/><br/>
            <div class="border text-center">
                <h4> Éléments non-catégorisés </h4>
                <div class="border border-2 border-dark" style="min-height: 100px;">
                <draggable
                class="d-flex"
                group="parts"
                :list="p1su"
                >
                <template #item="{ element }">
                <div class="m-1 p-1 border border-danger rounded">{{ element }}</div>
                </template>
                </draggable>
                </div>
            </div>
            
            <br/>
            <div class="border text-center">
            <h4> Sous-parties </h4>
            <div class="text-center d-flex justify-content-around">
                <div class="border border-2 border-dark" style="min-width: 200px; min-height: 200px;">
                    <p class="border-bottom border-2 border-dark p-1"><MDBInput type="text" v-model="structure.partOne.subpartOneTitle" /></p>
                    <draggable class="list-group" group="parts" :list="p1s1">
                        <template #item="{ element }">
                        <div class="list-group-item border border-danger m-1">{{ element }}</div>
                        </template>
                    </draggable>
                </div>

                <div class="border border-2 border-dark" style="min-width: 200px; min-height: 200px;">
                    <p class="border-bottom border-2 border-dark p-1"><MDBInput type="text" v-model="structure.partOne.subpartTwoTitle" /></p>
                    <draggable class="list-group" :list="p1s2" group="parts" >
                        <template #item="{ element }">
                        <div class="list-group-item border border-danger m-1">{{ element }}</div>
                        </template>
                    </draggable>
                </div>

                <div class="border border-2 border-dark" style="min-width: 200px; min-height: 200px;" v-if="structure.partOne.subparts === '3'">
                    <p class="border-bottom border-2 border-dark p-1"><MDBInput type="text" v-model="structure.partOne.subpartThreeTitle" /></p>
                    <draggable class="list-group" :list="p1s3" group="parts">
                        <template #item="{ element }">
                        <div class="list-group-item border border-danger m-1">{{ element }}</div>
                        </template>
                    </draggable>
                </div>
            </div>


        </div>
            
        </MDBTabPane>
        <MDBTabPane tabId="ex1-2">Content #2</MDBTabPane>
        <MDBTabPane tabId="ex1-3">Content #3</MDBTabPane>
        </MDBTabContent>
    </MDBTabs>
    <br/><br/>
     <MDBBtn color="danger" block class="w-25 mb-4" v-on:click="completeStep()">Confirmer</MDBBtn>
</template>

<script lang="ts">
import { ref } from 'vue';
import draggable from "vuedraggable";
import { defineComponent } from '@vue/runtime-core';
import { MDBBtn, MDBTabs, MDBTabNav, MDBTabContent, MDBTabItem, MDBTabPane, MDBRadio, MDBInput } from 'mdb-vue-ui-kit'

/*interface StepDraftPlanSubpartsVueData
{
    
}*/

export default defineComponent ({
    emits: ['stepCompleted', 'uncompleteStep'],
    props: ['projectId'],
    components: {
        MDBBtn,
        MDBTabs,
        MDBTabNav,
        MDBTabContent,
        MDBTabItem,
        MDBTabPane,
        MDBRadio,
        MDBInput,
        draggable
    },
    setup() {
        const activeTabId1 = ref('ex1-1');

        return { activeTabId1 }
    },
    data(): any {
        return {
            structure: {},
            elements: [],

            p1su: [],
            p1s1: [],
            p1s2: [],
            p1s3: []
        }
    },

    methods: {
        completeStep: function() {
            for (var i = 0; i < this.elements.length; i++) {
                if (this.p1su.includes(this.elements[i].data)) { this.elements[i].category = "p1" }
                if (this.p1s1.includes(this.elements[i].data)) { this.elements[i].category = "p1s1" }
                if (this.p1s2.includes(this.elements[i].data)) { this.elements[i].category = "p1s2" }
                if (this.p1s3.includes(this.elements[i].data)) { this.elements[i].category = "p1s3" }
            }
            var allElements = JSON.parse(JSON.stringify(this.elements))
            window.electronAPI.saveDraftPlanElements(this.projectId, { "elements": allElements });

            window.electronAPI.saveDraftPlanStructure(this.projectId, JSON.parse(JSON.stringify(this.structure)));

            this.$emit('stepCompleted', 'StepDraftPlanSubparts');
        }
    },

    created() {
        const elementsResult = window.electronAPI.getDraftPlanElements(this.projectId);
        if (elementsResult.draftPlanElements) {
            const draftPlanElements = JSON.parse(elementsResult.draftPlanElements);
            this.elements = draftPlanElements.elements;
        }
        for (var i = 0; i < this.elements.length; i++) {
            if (this.elements[i].category == 'p1' ) { this.p1su.push(this.elements[i].data); }
            if (this.elements[i].category == 'p1s1' ) { this.p1s1.push(this.elements[i].data); }
            if (this.elements[i].category == 'p1s2' ) { this.p1s2.push(this.elements[i].data); }
            if (this.elements[i].category == 'p1s3' ) { this.p1s3.push(this.elements[i].data); }
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

        this.$emit('uncompleteStep', 'StepDraftPlanSubparts');
    }

});
</script>
