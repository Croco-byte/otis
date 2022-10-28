<template>
<div class="d-flex flex-column mb-3 border h-100">
    <!-- Header -->
    <div class="p-2 text-center bg-light">
      <h1 class="mb-3">Brouillon introduction: éléments de base</h1>
    </div>
    <!-- Header -->
    <div class="text-start w-75 align-self-center" v-if="!orderChecked">
    <br/>
    <h5>Tu trouveras ci-dessous les différents éléments de base dont tu auras besoin pour rédiger le brouillon de ton introduction. Ils sont cependant mélangés : commence par les remettre dans l'ordre en les déplaçant à l'aide de ta souris !</h5>
    <br/>
    <draggable
        :list="list"
        :disabled="!enabled"
        item-key="name"
        class="list-group"
        ghost-class="ghost"
        @start="dragging = true"
        @end="dragging = false"
      >
        <template #item="{ element }">
          <span class="list-group-item" :class="{ 'not-draggable': !enabled }">
            {{ element.name }}
          </span>
        </template>
      </draggable>

      <div class="d-flex flex-column">
        <br/>
        <MDBBtn class="w-25 align-self-center" outline="dark" v-on:click="checkOrder()">Vérifier l'ordre !</MDBBtn>
        <h6 class="text-danger align-self-center mt-2" v-if="orderCheckError">{{ orderCheckError }}</h6>
      </div>
    </div>

    <div v-else class="text-start w-75 align-self-center">
        <h6 class="text-success" v-if="orderCheckConfirm">{{ orderCheckConfirm }}</h6>
        <br/><h5>Indique maintenant ci-dessous les différentes informations de base dont tu auras besoin pour ton introduction :</h5>
        <br/>
        <span>Auteur</span>
        <MDBInput type="text" v-model="author" wrapperClass="mb-4"/>

    </div>


    <div v-if="orderChecked">
        <MDBBtn color="danger" v-on:click="completeStep()">Confirmer ➤</MDBBtn>
    </div>
    

</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import draggable from 'vuedraggable'
import { MDBBtn, MDBInput } from 'mdb-vue-ui-kit'

/*interface StepDraftBasicsVueData
{
    
}*/

export default defineComponent ({
    emits: ['stepCompleted', 'uncompleteStep'],
    props: ['projectId'],
    components: {
        draggable,
        MDBBtn,
        MDBInput
    },
    data(): any {
        return {
            dragging: false,
            enabled: true,
            orderChecked: false,
            orderCheckError: "",
            orderCheckConfirm: "",
            list: [ {name: "Oeuvre"},
                    {name: "Annonce de plan"},
                    {name: "Problématique"},
                    {name: "Auteur"},
                    {name: "Texte/extrait"}
                  ],

            author: ""

        }
    },

    methods: {
        completeStep: function() {
            console.log(this.list);
            //this.$emit('stepCompleted', 'StepDraftBasics');
        },

        checkOrder: function() {
            if (this.list[0].name === "Auteur" &&
                this.list[1].name === "Oeuvre" &&
                this.list[2].name === "Texte/extrait" &&
                this.list[3].name === "Problématique" &&
                this.list[4].name === "Annonce de plan") {
                    this.orderChecked = true;
                    this.orderCheckConfirm = "Bien joué ! Tu as trouvé le bon ordre.";
                }
            else {
                this.orderCheckError = "Cet ordre n'est pas le bon !"
            }
        }
    },

    created() {
        // If there is already data in the draftBasics column, don't do the 'order' minigame.
        this.$emit('uncompleteStep', 'StepDraftBasics');
    }

});
</script>
