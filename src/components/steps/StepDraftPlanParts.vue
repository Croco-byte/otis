<template>
    <!-- Header -->
    <div class="p-2 text-center bg-light">
      <h1 class="mb-3">Le plan: les parties</h1>
    </div>
    <!-- Header -->
    <div class="w-75 text-start align-self-center">
        <h5>Passons désormais aux parties de ton plan. Choisis ci-dessous si tu souhaites avoir 2 ou 3 parties (ne t'inquiètes pas, tu pourras à tout moment changer le nombre de parties).</h5>
        <div class="w-50">
              <MDBRadio label="Deux parties" id="2" v-model="partsNumber" value="2" />
              <MDBRadio label="Trois parties" id="3" v-model="partsNumber" value="3" />
        </div>
        <br/>
        <h5>Tu peux maintenant, ci-dessous, organiser les éléments que tu avais repéré à l'étape précédente dans tes parties, auxquelles tu peux donner un titre. Utilise la souris pour déplacer les éléments dans les différentes colonnes.</h5>
        <draggable
        class="d-flex"
        group="parts"
        :list="uncategorized"
        >
        <template #item="{ element }">
          <div class="m-2 p-1 border border-danger">{{ element }}</div>
        </template>
      </draggable>
      <br/>
      <div class="row">
      <div class="col-3">
      <h3>Partie 1</h3>
      <draggable
        class="list-group"
        group="parts"
        :list="partOne"
      >
        <template #item="{ element }">
          <div class="list-group-item">{{ element }}</div>
        </template>
      </draggable>
    </div>

    <div class="col-3">
      <h3>Partie 2</h3>
      <draggable
        :list="partTwo"
        group="parts"
      >
        <template #item="{ element }">
          <div class="list-group-item">{{ element}}</div>
        </template>
      </draggable>
    </div>

    <div class="col-3" v-if="partsNumber === '3'">
      <h3>Partie 3</h3>
      <draggable
        :list="partThree"
        group="parts"
      >
        <template #item="{ element }">
          <div class="list-group-item">{{ element }}</div>
        </template>
      </draggable>
    </div>



  </div>

    </div>
    <br/>
    <MDBBtn color="danger" block class="w-25 mb-4" v-on:click="completeStep()">Confirmer</MDBBtn>
</template>

<script lang="ts">
import draggable from "vuedraggable";
import { defineComponent } from '@vue/runtime-core';
import { MDBBtn, MDBRadio } from 'mdb-vue-ui-kit'

/*interface StepDraftPlanPartsVueData
{
    
}*/

export default defineComponent ({
    emits: ['stepCompleted', 'uncompleteStep'],
    props: ['projectId'],
    components: {
        MDBBtn,
        MDBRadio,
        draggable
    },
    data(): any {
        return {
            partsNumber: "",
            elements: [],
            uncategorized: [],
            partOne: [],
            partTwo: [],
            partThree: []
        }
    },

    methods: {
        completeStep: function() {
            //console.log(this.partsNumber);
            /*console.log(this.uncategorized);
            console.log(this.partOne);
            console.log(this.partTwo);
            console.log(this.partThree); */

            for (var i = 0; i < this.elements.length; i++) {
                if (this.uncategorized.includes(this.elements[i].data)) { this.elements[i].category = "uncategorized" }
                if (this.partOne.includes(this.elements[i].data) && this.elements[i].data.startsWith('p1') === false) { this.elements[i].category = "p1" }
                if (this.partTwo.includes(this.elements[i].data) && this.elements[i].data.startsWith('p2') === false) { this.elements[i].category = "p2" }
                if (this.partThree.includes(this.elements[i].data) && this.elements[i].data.startsWith('p3') === false) { this.elements[i].category = "p3" }
            }
            console.log(this.elements);
            var allElements = JSON.parse(JSON.stringify(this.elements))
            window.electronAPI.saveDraftPlanElements(this.projectId, { "elements": allElements });
            this.$emit('stepCompleted', 'StepDraftPlanParts');
        }
    },

    created() {
        const result = window.electronAPI.getDraftPlanElements(this.projectId);
        if (result.draftPlanElements) {
            const draftPlanElements = JSON.parse(result.draftPlanElements);
            this.elements = draftPlanElements.elements;
        }
        console.log("STARTING...");
        for (var i = 0; i < this.elements.length; i++) {
            if (this.elements[i].category == 'uncategorized' ) { this.uncategorized.push(this.elements[i].data); }
            if (this.elements[i].category.startsWith('p1') ) { this.partOne.push(this.elements[i].data); }
            if (this.elements[i].category.startsWith('p2') ) { this.partTwo.push(this.elements[i].data); }
            if (this.elements[i].category.startsWith('p3') ) { this.partThree.push(this.elements[i].data); }
        }
        /*console.log(this.uncategorized);
        console.log(this.partOne);
        console.log(this.partTwo);
        console.log(this.partThree); */

        this.$emit('uncompleteStep', 'StepDraftPlanParts');
    }

});
</script>
