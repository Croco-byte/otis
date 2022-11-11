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
            <h5>Déplace les éléments comme tu l'as fait dans l'étape précédente pour les parties.</h5>
            <h5>N'oublie pas de donner un titre à tes sous-parties dans les encadrés du tableau ci-dessous !</h5>
            <br/>
            <div class="border text-center">
                <h4> Éléments non-catégorisés </h4>
                <div class="border border-2 border-dark" style="min-height: 100px;">
                <draggable
                class="d-flex"
                group="parts"
                :list="p1su"
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
            <h4> Sous-parties </h4>
            <div class="text-center d-flex justify-content-around">
                <div class="border border-2 border-dark" style="min-width: 200px; min-height: 200px;">
                    <p class="border-bottom border-2 border-dark p-1"><MDBInput type="text" v-model="structure.partOne.subpartOneTitle" /></p>
                    <draggable class="list-group" group="parts" :list="p1s1" item-key="1">
                        <template #item="{ element }">
                        <div class="list-group-item border border-danger m-1" v-if="element.length >= 40">{{ element.substr(0, 37) }}...</div>
                    <div class="list-group-item border border-danger m-1" v-else>{{ element }}</div>
                        </template>
                    </draggable>
                </div>

                <div class="border border-2 border-dark" style="min-width: 200px; min-height: 200px;">
                    <p class="border-bottom border-2 border-dark p-1"><MDBInput type="text" v-model="structure.partOne.subpartTwoTitle" /></p>
                    <draggable class="list-group" :list="p1s2" group="parts" item-key="1">
                        <template #item="{ element }">
                        <div class="list-group-item border border-danger m-1" v-if="element.length >= 40">{{ element.substr(0, 37) }}...</div>
                    <div class="list-group-item border border-danger m-1" v-else>{{ element }}</div>
                        </template>
                    </draggable>
                </div>

                <div class="border border-2 border-dark" style="min-width: 200px; min-height: 200px;" v-if="structure.partOne.subparts === '3'">
                    <p class="border-bottom border-2 border-dark p-1"><MDBInput type="text" v-model="structure.partOne.subpartThreeTitle" /></p>
                    <draggable class="list-group" :list="p1s3" group="parts" item-key="1">
                        <template #item="{ element }">
                        <div class="list-group-item border border-danger m-1" v-if="element.length >= 40">{{ element.substr(0, 37) }}...</div>
                    <div class="list-group-item border border-danger m-1" v-else>{{ element }}</div>
                        </template>
                    </draggable>
                </div>
            </div>


        </div>
        </MDBTabPane>

        <MDBTabPane tabId="ex1-2">
            <h5> Partie n°2 : {{ structure.partTwo.title }} </h5>
            <br/>
            <h6>Combien de sous-parties veux-tu pour cette partie ?</h6>
            <div class="d-flex justify-content-center">
              <span class="me-5"><MDBRadio label="Deux sous-parties" id="2" v-model="structure.partTwo.subparts" value="2" /></span>
              <MDBRadio label="Trois sous-parties" id="3" v-model="structure.partTwo.subparts" value="3" />
            </div>
            <br/><br/>
            <div class="border text-center">
                <h4> Éléments non-catégorisés </h4>
                <div class="border border-2 border-dark" style="min-height: 100px;">
                <draggable
                class="d-flex"
                group="parts"
                :list="p2su"
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
            <h4> Sous-parties </h4>
            <div class="text-center d-flex justify-content-around">
                <div class="border border-2 border-dark" style="min-width: 200px; min-height: 200px;">
                    <p class="border-bottom border-2 border-dark p-1"><MDBInput type="text" v-model="structure.partTwo.subpartOneTitle" /></p>
                    <draggable class="list-group" group="parts" :list="p2s1" item-key="1">
                        <template #item="{ element }">
                        <div class="list-group-item border border-danger m-1" v-if="element.length >= 40">{{ element.substr(0, 37) }}...</div>
                        <div class="list-group-item border border-danger m-1" v-else>{{ element }}</div>
                        </template>
                    </draggable>
                </div>

                <div class="border border-2 border-dark" style="min-width: 200px; min-height: 200px;">
                    <p class="border-bottom border-2 border-dark p-1"><MDBInput type="text" v-model="structure.partTwo.subpartTwoTitle" /></p>
                    <draggable class="list-group" :list="p2s2" group="parts" item-key="1">
                        <template #item="{ element }">
                        <div class="list-group-item border border-danger m-1" v-if="element.length >= 40">{{ element.substr(0, 37) }}...</div>
                        <div class="list-group-item border border-danger m-1" v-else>{{ element }}</div>
                        </template>
                    </draggable>
                </div>

                <div class="border border-2 border-dark" style="min-width: 200px; min-height: 200px;" v-if="structure.partTwo.subparts === '3'">
                    <p class="border-bottom border-2 border-dark p-1"><MDBInput type="text" v-model="structure.partTwo.subpartThreeTitle" /></p>
                    <draggable class="list-group" :list="p2s3" group="parts" item-key="1">
                        <template #item="{ element }">
                        <div class="list-group-item border border-danger m-1" v-if="element.length >= 40">{{ element.substr(0, 37) }}...</div>
                        <div class="list-group-item border border-danger m-1" v-else>{{ element }}</div>
                        </template>
                    </draggable>
                </div>
            </div>
            </div>
        </MDBTabPane>
        
        <MDBTabPane tabId="ex1-3">
            <h5> Partie n°3 : {{ structure.partThree.title }} </h5>
            <br/>
            <h6>Combien de sous-parties veux-tu pour cette partie ?</h6>
            <div class="d-flex justify-content-center">
              <span class="me-5"><MDBRadio label="Deux sous-parties" id="2" v-model="structure.partThree.subparts" value="2" /></span>
              <MDBRadio label="Trois sous-parties" id="3" v-model="structure.partThree.subparts" value="3" />
            </div>
            <br/><br/>
            <div class="border text-center">
                <h4> Éléments non-catégorisés </h4>
                <div class="border border-2 border-dark" style="min-height: 100px;">
                <draggable
                class="d-flex"
                group="parts"
                :list="p3su"
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
            <h4> Sous-parties </h4>
            <div class="text-center d-flex justify-content-around">
                <div class="border border-2 border-dark" style="min-width: 200px; min-height: 200px;">
                    <p class="border-bottom border-2 border-dark p-1"><MDBInput type="text" v-model="structure.partThree.subpartOneTitle" /></p>
                    <draggable class="list-group" group="parts" :list="p3s1" item-key="1">
                        <template #item="{ element }">
                        <div class="list-group-item border border-danger m-1" v-if="element.length >= 40">{{ element.substr(0, 37) }}...</div>
                        <div class="list-group-item border border-danger m-1" v-else>{{ element }}</div>
                        </template>
                    </draggable>
                </div>

                <div class="border border-2 border-dark" style="min-width: 200px; min-height: 200px;">
                    <p class="border-bottom border-2 border-dark p-1"><MDBInput type="text" v-model="structure.partThree.subpartTwoTitle" /></p>
                    <draggable class="list-group" :list="p3s2" group="parts" item-key="1">
                        <template #item="{ element }">
                        <div class="list-group-item border border-danger m-1" v-if="element.length >= 40">{{ element.substr(0, 37) }}...</div>
                        <div class="list-group-item border border-danger m-1" v-else>{{ element }}</div>
                        </template>
                    </draggable>
                </div>

                <div class="border border-2 border-dark" style="min-width: 200px; min-height: 200px;" v-if="structure.partThree.subparts === '3'">
                    <p class="border-bottom border-2 border-dark p-1"><MDBInput type="text" v-model="structure.partThree.subpartThreeTitle" /></p>
                    <draggable class="list-group" :list="p3s3" group="parts" item-key="1">
                        <template #item="{ element }">
                        <div class="list-group-item border border-danger m-1" v-if="element.length >= 40">{{ element.substr(0, 37) }}...</div>
                        <div class="list-group-item border border-danger m-1" v-else>{{ element }}</div>
                        </template>
                    </draggable>
                </div>
            </div>
            </div>
        </MDBTabPane>

        </MDBTabContent>
    </MDBTabs>
    <br/><br/>
    <div>
        <MDBBtn color="dark" block class="w-25 mb-4" v-on:click="saveStep()">Sauvegarder</MDBBtn>
        <MDBBtn color="danger" block class="w-25 mb-4" v-on:click="completeStep()">Confirmer ➤</MDBBtn>
    </div>
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
            structure: { "parts": '', "partOne": { "title": "", "subparts": '', "subpartOneTitle": "", "subpartTwoTitle": "", "subpartThreeTitle": "" },
                                           "partTwo": { "title": "", "subparts": '', "subpartOneTitle": "", "subpartTwoTitle": "", "subpartThreeTitle": "" },
                                           "partThree": { "title": "", "subparts": '', "subpartOneTitle": "", "subpartTwoTitle": "", "subpartThreeTitle": "" }},
            elements: [],

            p1su: [],
            p1s1: [],
            p1s2: [],
            p1s3: [],

            p2su: [],
            p2s1: [],
            p2s2: [],
            p2s3: [],

            p3su: [],
            p3s1: [],
            p3s2: [],
            p3s3: []
        }
    },

    methods: {
        completeStep: function() {
            this.saveStep();
            this.$emit('stepCompleted', 'StepDraftPlanSubparts');
        },

        saveStep: function() {
            for (var i = 0; i < this.elements.length; i++) {
                if (this.p1su.includes(this.elements[i].data)) { this.elements[i].category = "p1"; continue }
                if (this.p1s1.includes(this.elements[i].data)) { this.elements[i].category = "p1s1"; continue }
                if (this.p1s2.includes(this.elements[i].data)) { this.elements[i].category = "p1s2"; continue }
                if (this.p1s3.includes(this.elements[i].data)) { this.elements[i].category = "p1s3"; continue }

                if (this.p2su.includes(this.elements[i].data)) { this.elements[i].category = "p2"; continue }
                if (this.p2s1.includes(this.elements[i].data)) { this.elements[i].category = "p2s1"; continue }
                if (this.p2s2.includes(this.elements[i].data)) { this.elements[i].category = "p2s2"; continue }
                if (this.p2s3.includes(this.elements[i].data)) { this.elements[i].category = "p2s3"; continue }

                if (this.p3su.includes(this.elements[i].data)) { this.elements[i].category = "p3"; continue }
                if (this.p3s1.includes(this.elements[i].data)) { this.elements[i].category = "p3s1"; continue }
                if (this.p3s2.includes(this.elements[i].data)) { this.elements[i].category = "p3s2"; continue }
                if (this.p3s3.includes(this.elements[i].data)) { this.elements[i].category = "p3s3"; continue }
            }
            var allElements = JSON.parse(JSON.stringify(this.elements))
            window.electronAPI.saveDraftPlanElements(this.projectId, { "elements": allElements });

            const result = window.electronAPI.saveDraftPlanStructure(this.projectId, JSON.parse(JSON.stringify(this.structure)));
            if (result > 0) { this.$toast.success('Sauvegardé avec succès !'); }
            else { this.$toast.error('Erreur lors de la sauvegarde :('); }
        },
    },

    computed: {
        getPartOneSubparts: function() {
            return this.structure.partOne.subparts;
        },

        getPartTwoSubparts: function() {
            return this.structure.partTwo.subparts;
        },

        getPartThreeSubparts: function() {
            return this.structure.partThree.subparts;
        },
    },

    watch: {
        getPartOneSubparts(newNumber, oldNumber) {
            if (oldNumber == 3 && newNumber == 2) {
                this.p1su.push.apply(this.p1su, this.p1s3);
                this.p1s3 = [];
            }
        },

        getPartTwoSubparts(newNumber, oldNumber) {
            if (oldNumber == 3 && newNumber == 2) {
                this.p2su.push.apply(this.p2su, this.p2s3);
                this.p2s3 = [];
            }
        },

        getPartThreeSubparts(newNumber, oldNumber) {
            if (oldNumber == 3 && newNumber == 2) {
                this.p3su.push.apply(this.p3su, this.p3s3);
                this.p3s3 = [];
            }
        },
    },

    created() {
        const elementsResult = window.electronAPI.getDraftPlanElements(this.projectId);
        if (elementsResult.draftPlanElements) {
            const draftPlanElements = JSON.parse(elementsResult.draftPlanElements);
            this.elements = draftPlanElements.elements;
        }
        for (var i = 0; i < this.elements.length; i++) {
            if (this.elements[i].category === 'p1' ) { this.p1su.push(this.elements[i].data); continue }
            if (this.elements[i].category === 'p1s1' ) { this.p1s1.push(this.elements[i].data); continue }
            if (this.elements[i].category === 'p1s2' ) { this.p1s2.push(this.elements[i].data); continue }
            if (this.elements[i].category === 'p1s3' ) { this.p1s3.push(this.elements[i].data); continue }

            if (this.elements[i].category === 'p2' ) { this.p2su.push(this.elements[i].data); continue }
            if (this.elements[i].category === 'p2s1' ) { this.p2s1.push(this.elements[i].data); continue }
            if (this.elements[i].category === 'p2s2' ) { this.p2s2.push(this.elements[i].data); continue }
            if (this.elements[i].category === 'p2s3' ) { this.p2s3.push(this.elements[i].data); continue }

            if (this.elements[i].category === 'p3' ) { this.p3su.push(this.elements[i].data); continue }
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

        this.$emit('uncompleteStep', 'StepDraftPlanSubparts');
    }

});
</script>
