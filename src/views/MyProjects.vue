<template>
<div style="height: 80vh">
    <!-- Header -->
    <div class="p-5 text-center bg-light">
      <h1 class="mb-3">Mes projets</h1>
    </div>
    <!-- Header -->
        <div v-if="allProjects.length == 0" class="w-50 justify-content-center" style="margin: auto;">
            <h4> <b><i class="fas fa-robot fa-1,5x pr-5" aria-hidden="true"></i>  Tu n'as pas encore de projets. Clique sur le bouton ci-dessous pour en créer un !</b></h4>
            <br/>
            <router-link to="/new-project"><MDBBtn outline="danger" class="me-2">Nouveau Projet </MDBBtn></router-link>
        </div>
        <div v-else class="d-flex p-2 justify-content-evenly flex-wrap">
            <div v-for="project in allProjects" :key="project.projectId">
                <MDBCard text="center" style="margin: 15px;" border="danger" shadow="0" bg="white" class="mb-3">
                    <MDBCardHeader>Commentaire de texte n°{{project.projectId}}</MDBCardHeader>
                    <MDBCardBody>
                        <MDBCardTitle>{{project.projectName}}</MDBCardTitle>
                        <MDBCardText v-if="project.projectDescription.length == 0">
                            <i>Pas de description</i>
                        </MDBCardText>
                        <MDBCardText v-else-if="project.projectDescription.length >= 40">
                            {{ project.projectDescription.substr(0, 37) }}...
                        </MDBCardText>
                        <MDBCardText v-else>
                            {{ project.projectDescription}}
                        </MDBCardText>
                        <router-link :to="{path: '/project/' + project.projectId }"><MDBBtn outline="success">Ouvrir</MDBBtn></router-link>
                        <MDBBtn outline="danger" v-on:click="deleteProject(project.projectId)">Supprimer</MDBBtn>
                    </MDBCardBody>
                    <MDBCardFooter class="text-muted">Date de création - <b>{{ project.projectDate }}</b></MDBCardFooter>
                </MDBCard>
            </div>

        </div>

</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { MDBCard, MDBCardHeader, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter, MDBBtn } from 'mdb-vue-ui-kit';

interface MyProjectsVueData
{
    allProjects: []
}

export default defineComponent ({
    components: {
        MDBBtn,
        MDBCard,
        MDBCardHeader,
        MDBCardBody,
        MDBCardTitle,
        MDBCardText,
        MDBCardFooter
    },
    data(): MyProjectsVueData {
        return {
            allProjects: []
        }
    },

    methods: {
        deleteProject: async function(projectId: number) {
            if (confirm("Es-tu sûr que tu souhaites supprimer ce projet ?")) {
                const result: any = await window.electronAPI.deleteProjectFromId(projectId);
                console.log(result);

                // Reload projects after deletion
                this.allProjects = await window.electronAPI.getAllProjectsMeta();
            }
        }
    },

    created() {
        this.allProjects = window.electronAPI.getAllProjectsMeta();
        console.log(this.allProjects);
    }


});
</script>
