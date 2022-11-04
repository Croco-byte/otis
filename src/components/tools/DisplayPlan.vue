<template>
    <div class="d-flex justify-content-evenly">
    <div class="border text-start">
        <h3>I. {{ structure.partOne.title }}</h3>
        <hr/>
            <h5>    1. {{ structure.partOne.subpartOneTitle }}</h5>
            <ul>
                <div v-for="element in p1s1" v-bind:key="element">
                <li v-if="element.length >= 40">{{ element.substr(0, 37) }}...</li>
                <li v-else>{{ element }}</li>
                </div>
            </ul>
            <h5>    2. {{ structure.partOne.subpartTwoTitle }}</h5>
            <ul>
                <div v-for="element in p1s2" v-bind:key="element">
                <li v-if="element.length >= 40">{{ element.substr(0, 37) }}...</li>
                <li v-else>{{ element }}</li>
                </div>
            </ul>
            <h5 v-if="structure.partOne.subparts === '3'">    3. {{ structure.partOne.subpartThreeTitle }}</h5>
            <ul>
                <div v-for="element in p1s3" v-bind:key="element">
                <li v-if="element.length >= 40">{{ element.substr(0, 37) }}...</li>
                <li v-else>{{ element }}</li>
                </div>
            </ul>
    </div>

    <div class="border text-start">
        <h3>II. {{ structure.partTwo.title }}</h3>
        <hr/>
            <h5>    1. {{ structure.partTwo.subpartOneTitle }}</h5>
            <ul>
                <div v-for="element in p2s1" v-bind:key="element">
                <li v-if="element.length >= 40">{{ element.substr(0, 37) }}...</li>
                <li v-else>{{ element }}</li>
                </div>
            </ul>
            <h5>    2. {{ structure.partTwo.subpartTwoTitle }}</h5>
            <ul>
                <div v-for="element in p2s2" v-bind:key="element">
                <li v-if="element.length >= 40">{{ element.substr(0, 37) }}...</li>
                <li v-else>{{ element }}</li>
                </div>
            </ul>
            <h5 v-if="structure.partTwo.subparts === '3'">    3. {{ structure.partTwo.subpartThreeTitle }}</h5>
            <ul>
                <div v-for="element in p2s3" v-bind:key="element">
                <li v-if="element.length >= 40">{{ element.substr(0, 37) }}...</li>
                <li v-else>{{ element }}</li>
                </div>
            </ul>
    </div>

    <div v-if="structure.parts === '3'" class="border text-start">
        <h3>III. {{ structure.partThree.title }}</h3>
        <hr/>
            <h5>    1. {{ structure.partThree.subpartOneTitle }}</h5>
            <ul>
                <div v-for="element in p3s1" v-bind:key="element">
                <li v-if="element.length >= 40">{{ element.substr(0, 37) }}...</li>
                <li v-else>{{ element }}</li>
                </div>
            </ul>
            <h5>    2. {{ structure.partThree.subpartTwoTitle }}</h5>
            <ul>
                <div v-for="element in p3s2" v-bind:key="element">
                <li v-if="element.length >= 40">{{ element.substr(0, 37) }}...</li>
                <li v-else>{{ element }}</li>
                </div>
            </ul>
            <h5 v-if="structure.partThree.subparts === '3'">    3. {{ structure.partThree.subpartThreeTitle }}</h5>
            <ul>
                <div v-for="element in p3s3" v-bind:key="element">
                <li v-if="element.length >= 40">{{ element.substr(0, 37) }}...</li>
                <li v-else>{{ element }}</li>
                </div>
            </ul>
    </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

/*interface StepDraftAnnounceVueData
{
    
}*/

export default defineComponent ({
    props: ['projectId'],
    components: {
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
    }

});
</script>
