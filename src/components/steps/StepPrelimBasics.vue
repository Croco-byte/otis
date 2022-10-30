<template>
<div class="d-flex flex-column mb-3 border h-100 justify-content-between">
    <!-- Header -->
    <div class="p-2 text-center bg-light">
      <h1 class="mb-3">Les basiques</h1>
    </div>
    <!-- Header -->
    <div class="w-75 text-start align-self-center">
        <br/>
        <h5>Repère et note ci-dessous quelques informations basiques relatives au texte !</h5>
        <br/>

        <div class="d-flex justify-content-between">
        <span><i class="fas fa-chevron-circle-right"></i> <b>De quoi parle le texte ?</b></span>
            <MDBPopover v-model="popoverTheme" dismissible direction="top">
                <template #reference>
                    <span class="float-end" v-on:click="popoverTheme = !popoverTheme"><i>Clique ici pour obtenir de l'aide </i><i class="fas fa-question-circle"></i></span>
                </template>
                <template #header>Le thème du texte</template>
                <template #body>Il s'agit ici assez simplement de résumer tout ce que tu comprends. Le thème du texte fait donc référence à ce dont le texte parle, de manière générale, pour toi.</template>
            </MDBPopover>
        </div>
        <MDBTextarea rows="4" v-model="theme" wrapperClass="mb-4" />

        <div class="d-flex justify-content-between">
        <span><i class="fas fa-chevron-circle-right"></i> <b>Quel est le genre du texte ?</b></span>
            <MDBPopover v-model="popoverGenre" dismissible direction="top">
                <template #reference>
                    <span class="float-end" v-on:click="popoverGenre = !popoverGenre"><i>Clique ici pour obtenir de l'aide </i><i class="fas fa-question-circle"></i></span>
                </template>
                <template #header>Le genre du texte</template>
                <template #body>Par exemple s'agit-il de poésie ? De théâtre ? D'un roman ? De littérature d'idée ?</template>
            </MDBPopover>
        </div>
        <MDBInput type="text" v-model="genre" wrapperClass="mb-4"/>

        <div class="d-flex justify-content-between">
        <span><i class="fas fa-chevron-circle-right"></i> <b>Quel est le type du texte ?</b></span>
            <MDBPopover v-model="popoverType" dismissible direction="top">
                <template #reference>
                    <span class="float-end" v-on:click="popoverType = !popoverType"><i>Clique ici pour obtenir de l'aide </i><i class="fas fa-question-circle"></i></span>
                </template>
                <template #header>Le type du texte</template>
                <template #body>[demander à Solène]</template>
            </MDBPopover>
        </div>
        <MDBInput type="text" v-model="type" wrapperClass="mb-4"/>

        <div class="d-flex justify-content-between">
        <span><i class="fas fa-chevron-circle-right"></i> <b>Quel est le but du texte ?</b></span>
            <MDBPopover v-model="popoverGoal" dismissible direction="top">
                <template #reference>
                    <span class="float-end" v-on:click="popoverGoal = !popoverGoal"><i>Clique ici pour obtenir de l'aide </i><i class="fas fa-question-circle"></i></span>
                </template>
                <template #header>Le but du texte</template>
                <template #body>[demander à Solène]</template>
            </MDBPopover>
        </div>
        <MDBInput type="text" v-model="goal" wrapperClass="mb-4"/>
        
        
        <br/>
        <p>Tu as repéré les différentes informations demandées ? Passe à la suite !</p>
    </div>

    <div>
        <MDBBtn color="danger" v-on:click="completeStep()">Confirmer ➤</MDBBtn>
    </div>
</div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { defineComponent } from '@vue/runtime-core';
import { MDBBtn, MDBInput, MDBTextarea, MDBPopover } from 'mdb-vue-ui-kit'

interface StepPrelimBasicsVueData
{
    theme: string,
    genre: string,
    type: string,
    goal: string
}

export default defineComponent ({
    emits: ['stepCompleted', 'uncompleteStep'],
    props: ['projectId'],
    components: {
        MDBBtn,
        MDBInput,
        MDBTextarea,
        MDBPopover
    },
    setup() {
      const popoverTheme = ref(false);
      const popoverGenre = ref(false);
      const popoverType = ref(false);
      const popoverGoal = ref(false);
      return {
        popoverTheme,
        popoverGenre,
        popoverType,
        popoverGoal
      }
    },

    data(): StepPrelimBasicsVueData {
        return {
            theme: "",
            genre: "",
            type: "",
            goal: ""
        }
    },

    methods: {
        completeStep: function() {
            const basicInfo = { "theme": this.theme, "genre": this.genre, "type": this.type, "goal": this.goal };
            window.electronAPI.saveBasicInfo(this.projectId, basicInfo);
            this.$emit('stepCompleted', 'StepPrelimBasics');
        },
    },

    created() {
        this.$emit('uncompleteStep', 'StepPrelimBasics');
        const basicInfo = JSON.parse(window.electronAPI.getBasicInfo(this.projectId).prelimBasics);
        if (basicInfo) {
            this.theme = basicInfo.theme;
            this.genre = basicInfo.genre;
            this.type = basicInfo.type;
            this.goal = basicInfo.goal;
        }
    }

});
</script>
