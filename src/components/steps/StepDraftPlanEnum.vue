<template>
    <!-- Header -->
    <div class="p-5 text-center bg-light">
      <h1 class="mb-3">Brouillon introduction: repérage pour le plan</h1>
    </div>
    <!-- Header -->
    <div class="w-75 text-start align-self-center">
        <br/>
        <h5>Il est maintenant temps d'élaborer ton plan. Pour cela, commençons par faire un peu de repérage.</h5>
        <br/>
        <span><i class="fas fa-chevron-circle-right"></i> Liste ci-dessous, en vrac, tout ce qui te paraît important dans le texte (thèmes, registre, énonciation, etc.), sous la forme d'un mot ou d'une courte phrase qui représente l'élément. Essaie d'avoir une liste d'environ <b>6-10 éléments</b>. Tu peux avoir besoin de relire le texte plusieurs fois.
        <br/><br/> Appuie sur le bouton <i class="fa fa-plus-circle"></i> pour ajouter des éléments, et sur le bouton <i class="fa fa-minus-circle"></i> pour en supprimer.</span>
        <br/>
        <br/>
        <div class="d-flex align-items-center" v-for="(element, index) in elements" :key="`${index}`">
            <div class="flex-grow-1 me-2" >
                <MDBTextarea :label="`Élément n°${index + 1}`" rows="2" v-model="elements[index].data" wrapperClass="mb-4"/>
            </div>
            <i v-on:click="deleteDraftPlanElement(index)" class="fa fa-minus-circle fa-2x"></i>
        </div>
        <p class="text-center" v-on:click="addDraftPlanElement()"><i class="fa fa-plus-circle fa-3x"></i></p>
    </div>
    <h6 v-if="errorMsg" class="text-danger">Erreur: {{ errorMsg }}</h6>
    <br/>
     <MDBBtn color="danger" block class="w-25 mb-4" v-on:click="completeStep()">Confirmer</MDBBtn>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { MDBBtn, MDBTextarea } from 'mdb-vue-ui-kit'

/*interface StepDraftPlanVueData
{
    
} */

export default defineComponent ({
    emits: ['stepCompleted', 'uncompleteStep'],
    props: ['projectId'],
    components: {
        MDBBtn,
        MDBTextarea,
    },
    data(): any {
        return {
            elements: [],
            errorMsg: ""
        }
    },

    methods: {
        completeStep: function() {
            if (this.elements.length < 3 || this.elements.length > 20) {
                this.errorMsg = "Pour compléter cette étape, tu dois avoir entre 3 et 20 éléments dans ta liste."
            } else {
                var allElements = JSON.parse(JSON.stringify(this.elements))
                allElements = allElements.filter(function(el: any) { if (el.data) {return el} })
                window.electronAPI.saveDraftPlanElements(this.projectId, { "elements": allElements });
                this.$emit('stepCompleted', 'StepDraftPlanEnum');
            }
        },

        addDraftPlanElement: function() {
            if (this.elements.length > 20) {
                this.errorMsg = "Tu ne peux pas avoir plus de 20 éléments !";
            } else {
                this.elements.push({ "data": "", "category": "uncategorized" });
            }
        },

        deleteDraftPlanElement: function(index: number) {
            if (index >= this.elements.length || index < 0) {
                return
            }
            this.elements.splice(index, 1);
        }
    },

    created() {
        const result = window.electronAPI.getDraftPlanElements(this.projectId);
        if (result.draftPlanElements) {
            const draftPlanElements = JSON.parse(result.draftPlanElements);
            this.elements = draftPlanElements.elements;
        }
        this.$emit('uncompleteStep', 'StepDraftPlanEnum');
    }

});
</script>
