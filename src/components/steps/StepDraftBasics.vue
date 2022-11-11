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
        <div class="d-flex flex-column" v-if="tries > 2">
            <br/>
            <MDBBtn class="align-self-center" color="danger" v-on:click="collapseSolution = !collapseSolution" aria-controls="collapsibleContentSolution" :aria-expanded="collapseSolution">Afficher/cacher la solution</MDBBtn>
            <MDBCollapse id="collapsibleContentSolution" v-model="collapseSolution" >
                <br/>
                <p class="text-center">Le bon ordre est : auteur, oeuvre, texte/extrait, problématique, annonce de plan.</p>
            </MDBCollapse>
        </div>
      </div>
    </div>

    <div v-else class="text-start w-75 align-self-center">
        <h6 class="text-success" v-if="orderCheckConfirm">{{ orderCheckConfirm }}</h6>
        <br/><h5>Indique maintenant ci-dessous les différentes informations de base dont tu auras besoin pour ton introduction :</h5>
        <br/>

        <div class="d-flex justify-content-between">
        <span><i class="fas fa-chevron-circle-right"></i> <b>Auteur</b></span>
            <MDBPopover v-model="popoverAuthor" dismissible direction="top">
                <template #reference>
                    <span class="float-end" v-on:click="popoverAuthor = !popoverAuthor"><i>Clique ici pour obtenir de l'aide </i><i class="fas fa-question-circle"></i></span>
                </template>
                <template #header>L'auteur du texte</template>
                <template #body>Indique ici des informations relatives à l'auteur. Tu peux par exemple commencer par son nom, éventuellement le mouvement littéraire auquel il appartient, et toute information pertinente relative à l'auteur.</template>
            </MDBPopover>
        </div>
        <MDBTextarea rows="2" v-model="author" wrapperClass="mb-4"/>
        
        
        <div class="border p-2 mb-2 mt-2">
        <div class="d-flex justify-content-between">
        <span><i class="fas fa-chevron-circle-right"></i> <b>Oeuvre</b></span>
            <MDBPopover v-model="popoverWork" dismissible direction="top">
                <template #reference>
                    <span class="float-end" v-on:click="popoverWork = !popoverWork"><i>Clique ici pour obtenir de l'aide </i><i class="fas fa-question-circle"></i></span>
                </template>
                <template #header>L'oeuvre de laquelle est tirée le texte</template>
                <template #body>Indique ici des informations relatives à l'oeuvre de laquelle est tirée le texte. Il s'agit principalement du genre et du type de l'oeuvre (appuie-toi sur ce que tu as déjà noté à ce sujet, et qui est affiché en aide ci-dessous), ainsi que de toute autre information utile relative à l'oeuvre (le titre du livre, la date de publication ...).</template>
            </MDBPopover>
        </div>
        <MDBTextarea v-model="work" wrapperClass="mb-4"/>
        <p>Pour t'aider, voici les informations que tu avais précédemment indiquées relatives au type et au genre du texte :</p>
        <div class="d-flex justify-content-evenly">
            <div>
                <MDBTextarea rows="6" v-model="genre" disabled id="themeHelper" />
                <div id="themeHelper" class="form-text">
                    Ce que tu as noté pour le genre du texte.
                </div>
            </div>
            <div>
                <MDBTextarea rows="6" v-model="type" disabled id="genreHelper" />
                <div id="genreHelper" class="form-text">
                    Ce que tu as noté pour le type du texte.
                </div>
            </div>
        </div>
        </div>

        <br/>
        <div class="border p-2 mb-2 mt-2">
        <div class="d-flex justify-content-between">
        <span><i class="fas fa-chevron-circle-right"></i> <b>Texte/extrait</b></span>
            <MDBPopover v-model="popoverText" dismissible direction="top">
                <template #reference>
                    <span class="float-end" v-on:click="popoverText = !popoverText"><i>Clique ici pour obtenir de l'aide </i><i class="fas fa-question-circle"></i></span>
                </template>
                <template #header>Le texte lui-même</template>
                <template #body>Indique ici des informations relatives au texte lui-même. Tu peux par exemple reprendre le thème du texte, résumer le texte, donner les registres littéraires utilisés, et toute autre information utile qui se rapporte au texte.</template>
            </MDBPopover>
        </div>
        <MDBTextarea v-model="text" wrapperClass="mb-4"/>
        <p>Pour t'aider, voici les informations que tu avais précédemment indiquées relatives au thème du texte :</p>
        <div class="d-flex justify-content-evenly">
            <div>
                <MDBTextarea rows="6" v-model="theme" disabled id="themeHelper" />
                <div id="themeHelper" class="form-text">
                    Ce que tu as noté pour le thème du texte.
                </div>
            </div>
        </div>
        </div>


        <br/>
        <div class="border p-2 mb-2 mt-2">
        <div class="d-flex justify-content-between">
        <span><i class="fas fa-chevron-circle-right"></i> <b>Problématique</b></span>
            <MDBPopover v-model="popoverIssue" dismissible direction="top">
                <template #reference>
                    <span class="float-end" v-on:click="popoverIssue = !popoverIssue"><i>Clique ici pour obtenir de l'aide </i><i class="fas fa-question-circle"></i></span>
                </template>
                <template #header>La problématique</template>
                <template #body>En t'appuyant sur les différents éléments renseignés précédemment, rédige ici une première problématique. Celle-ci pourrait par exemple avoir le format : "Comment [nom de l'auteur] [but du texte] ?".</template>
            </MDBPopover>
        </div>
        <MDBTextarea rows="2" v-model="issue" wrapperClass="mb-4"/>
        <p>Pour t'aider, voici les informations que tu avais précédemment indiquées relatives au but du texte :</p>
        <div class="d-flex justify-content-evenly">
            <div>
                <MDBTextarea rows="6" v-model="goal" disabled id="goalHelper" />
                <div id="goalHelper" class="form-text">
                    Ce que tu as noté pour le but du texte.
                </div>
            </div>
        </div>
        </div>
    </div>


    <div v-if="orderChecked">
        <MDBBtn color="dark" v-on:click="saveStep()">Sauvegarder</MDBBtn>
        <MDBBtn color="danger" v-on:click="completeStep()">Confirmer ➤</MDBBtn>
    </div>
    

</div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { defineComponent } from '@vue/runtime-core';
import draggable from 'vuedraggable'
import { MDBBtn, MDBTextarea, MDBPopover, MDBCollapse } from 'mdb-vue-ui-kit'

/*interface StepDraftBasicsVueData
{
    
}*/

export default defineComponent ({
    emits: ['stepCompleted', 'uncompleteStep'],
    props: ['projectId'],
    components: {
        draggable,
        MDBBtn,
        MDBTextarea,
        MDBPopover,
        MDBCollapse,
    },
    setup() {
      const popoverAuthor = ref(false);
      const popoverWork = ref(false);
      const popoverText = ref(false);
      const popoverIssue = ref(false);
      const collapseSolution = ref(false);
      return {
        popoverAuthor,
        popoverWork,
        popoverText,
        popoverIssue,
        collapseSolution
      }
    },

    data(): any {
        return {

            // Order minigame data
            dragging: false,
            enabled: true,
            tries: 0,
            orderCheckError: "",
            orderCheckConfirm: "",
            list: [ {name: "Oeuvre"},
                    {name: "Annonce de plan"},
                    {name: "Problématique"},
                    {name: "Auteur"},
                    {name: "Texte/extrait"}
                  ],
            
            // Step data
            orderChecked: false,
            author: "",
            work: "",
            text: "",
            issue: "",

            // Helpers data - from StepPrelimBasics
            theme: "",
            genre: "",
            type: "",
            goal: ""

        }
    },

    methods: {
        completeStep: function() {
            this.saveStep();
            this.$emit('stepCompleted', 'StepDraftBasics');
        },

        saveStep: function() {
            const draftBasics = {   "orderChecked": this.orderChecked,
                                    "author": this.author,
                                    "work": this.work,
                                    "text": this.text,
                                    "issue": this.issue
                                };
            const result = window.electronAPI.saveDraftBasics(this.projectId, draftBasics);
            if (result > 0) { this.$toast.success('Sauvegardé avec succès !'); }
            else { this.$toast.error('Erreur lors de la sauvegarde :('); }
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
                this.orderCheckError = "Cet ordre n'est pas le bon !";
                this.tries += 1;
            }
        }
    },

    created() {
        const result = JSON.parse(window.electronAPI.getDraftBasics(this.projectId).draftBasics);
        if (result) {
            this.orderChecked = result.orderChecked;
            this.author = result.author;
            this.work = result.work;
            this.text = result.text;
            this.issue = result.issue;
        }

        // Loading helper data
        const basicInfo = JSON.parse(window.electronAPI.getBasicInfo(this.projectId).prelimBasics);
        if (basicInfo) {
            this.theme = basicInfo.theme;
            this.genre = basicInfo.genre;
            this.type = basicInfo.type;
            this.goal = basicInfo.goal;
        }

        this.$emit('uncompleteStep', 'StepDraftBasics');
    }

});
</script>
