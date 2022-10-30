<template>
    <!-- Header -->
    <div class="p-3 text-center bg-light border d-flex justify-content-evenly">
      <h3 class="mb-3 w-75">{{ projectName }} </h3>
      <div>
      <div class="d-flex">
        <div v-for="step in completedSteps" :key="step[0]">
            <p v-if="!step" style="border:solid; padding-top:6px; padding-bottom:6px; margin:0px; width:30px; background: #D3D3D3;"></p>
            <p v-else style="border:solid; padding-top:6px; padding-bottom:6px; margin:0px; width:30px; background: green;"></p>
        </div>
      </div>
      <p> Progression : {{ computeProgression() }}%</p>
      </div>
    </div>
    <!-- Header -->

    <div class="d-flex" style="margin: 10px;">
        <div class="p-2 w-25 border border-danger border-3 rounded text-start" style="margin-right: 5px; margin-left: 5px;">
            <h5 style="text-align: center"><b>Le projet, étape par étape</b></h5>
            <br/>
            <MDBListGroup light>
                <MDBListGroupItem tag="label" class="list-group-item-danger">
                    <input class="form-check-input me-1" disabled type="checkbox" :checked="completedSteps['StepStart'] ? true : undefined" value="" />
                    <a href="javascript:void(0)" style="color: #A8213D;" v-on:click="changeCurrentStep('StepStart')">Départ !
                    <span v-if="currentStep === 'StepStart'" style="float: right;"><i class="fas fa-edit"></i></span></a>
                </MDBListGroupItem>
                <MDBListGroupItem tag="label" class="list-group-item-danger">
                <b>Travail préliminaire</b>
                    <MDBListGroup light>
                        <MDBListGroupItem tag="label" class="list-group-item-danger">
                            <input class="form-check-input me-1" disabled type="checkbox" :checked="completedSteps['StepPrelimApproach'] ? true : undefined" value="" />
                            <a href="javascript:void(0)" style="color: #A8213D;" v-on:click="changeCurrentStep('StepPrelimApproach')">Aborder le texte
                            <span v-if="currentStep === 'StepPrelimApproach'" style="float: right;"><i class="fas fa-edit"></i></span></a>
                        </MDBListGroupItem>
                        <MDBListGroupItem tag="label" class="list-group-item-danger">
                            <input class="form-check-input me-1" disabled type="checkbox" :checked="completedSteps['StepPrelimUnderstand'] ? true : undefined" value="" />
                            <a href="javascript:void(0)" style="color: #A8213D;" v-on:click="changeCurrentStep('StepPrelimUnderstand')">Comprendre le texte
                            <span v-if="currentStep === 'StepPrelimUnderstand'" style="float: right;"><i class="fas fa-edit"></i></span></a>
                        </MDBListGroupItem>
                        <MDBListGroupItem tag="label" class="list-group-item-danger">
                            <input class="form-check-input me-1" disabled type="checkbox" :checked="completedSteps['StepPrelimBasics'] ? true : undefined" value="" />
                            <a href="javascript:void(0)" style="color: #A8213D;" v-on:click="changeCurrentStep('StepPrelimBasics')">Les bases
                            <span v-if="currentStep === 'StepPrelimBasics'" style="float: right;"><i class="fas fa-edit"></i></span></a>
                        </MDBListGroupItem>
                    </MDBListGroup>
                </MDBListGroupItem>
                <MDBListGroupItem tag="label" class="list-group-item-danger">
                <b>Brouillon</b>
                    <MDBListGroup light>
                        <MDBListGroupItem tag="label" class="list-group-item-danger">
                            <input class="form-check-input me-1" disabled type="checkbox" :checked="completedSteps['StepDraftBasics'] ? true : undefined" value="" />
                            <a href="javascript:void(0)" style="color: #A8213D;" v-on:click="changeCurrentStep('StepDraftBasics')">Éléments de base
                            <span v-if="currentStep === 'StepDraftBasics'" style="float: right;"><i class="fas fa-edit"></i></span></a>
                        </MDBListGroupItem>
                        <MDBListGroupItem tag="label" class="list-group-item-danger">
                            <input class="form-check-input me-1" disabled type="checkbox" :checked="completedSteps['StepDraftPlanEnum'] ? true : undefined" value="" />
                            <a href="javascript:void(0)" style="color: #A8213D;" v-on:click="changeCurrentStep('StepDraftPlanEnum')">Le plan: repérage
                            <span v-if="currentStep === 'StepDraftPlanEnum'" style="float: right;"><i class="fas fa-edit"></i></span></a>
                        </MDBListGroupItem>
                        <MDBListGroupItem tag="label" class="list-group-item-danger">
                            <input class="form-check-input me-1" disabled type="checkbox" :checked="completedSteps['StepDraftPlanParts'] ? true : undefined" value="" />
                            <a href="javascript:void(0)" style="color: #A8213D;" v-on:click="changeCurrentStep('StepDraftPlanParts')">Le plan: les parties
                            <span v-if="currentStep === 'StepDraftPlanParts'" style="float: right;"><i class="fas fa-edit"></i></span></a>
                        </MDBListGroupItem>
                        <MDBListGroupItem tag="label" class="list-group-item-danger">
                            <input class="form-check-input me-1" disabled type="checkbox" :checked="completedSteps['StepDraftPlanSubparts'] ? true : undefined" value="" />
                            <a href="javascript:void(0)" style="color: #A8213D;" v-on:click="changeCurrentStep('StepDraftPlanSubparts')">Le plan: les sous-parties
                            <span v-if="currentStep === 'StepDraftPlanSubparts'" style="float: right;"><i class="fas fa-edit"></i></span></a>
                        </MDBListGroupItem>
                        <MDBListGroupItem tag="label" class="list-group-item-danger">
                            <input class="form-check-input me-1" disabled type="checkbox" :checked="completedSteps['StepDraftAnnounce'] ? true : undefined" value="" />
                            <a href="javascript:void(0)" style="color: #A8213D;" v-on:click="changeCurrentStep('StepDraftAnnounce')">L'annonce de plan
                            <span v-if="currentStep === 'StepDraftAnnounce'" style="float: right;"><i class="fas fa-edit"></i></span></a>
                        </MDBListGroupItem>
                    </MDBListGroup>
                </MDBListGroupItem>
                <MDBListGroupItem tag="label" class="list-group-item-danger">
                    <input class="form-check-input me-1" disabled type="checkbox" :checked="completedSteps['StepAnalysis'] ? true : undefined" value="" />
                    <a href="javascript:void(0)" style="color: #A8213D;" v-on:click="changeCurrentStep('StepAnalysis')">Analyse du texte
                    <span v-if="currentStep === 'StepAnalysis'" style="float: right;"><i class="fas fa-edit"></i></span></a>
                </MDBListGroupItem>
                <MDBListGroupItem tag="label" class="list-group-item-danger">
                <b>Rédaction</b>
                    <MDBListGroup light>
                        <MDBListGroupItem tag="label" class="list-group-item-danger">
                            <input class="form-check-input me-1" disabled type="checkbox" :checked="completedSteps['StepRedacAdvices'] ? true : undefined" value="" />
                            <a href="javascript:void(0)" style="color: #A8213D;" v-on:click="changeCurrentStep('StepRedacAdvices')">Quelques conseils ...
                            <span v-if="currentStep === 'StepRedacAdvices'" style="float: right;"><i class="fas fa-edit"></i></span></a>
                        </MDBListGroupItem>
                        <MDBListGroupItem tag="label" class="list-group-item-danger">
                            <input class="form-check-input me-1" disabled type="checkbox" :checked="completedSteps['StepRedacIntro'] ? true : undefined" value="" />
                            <a href="javascript:void(0)" style="color: #A8213D;" v-on:click="changeCurrentStep('StepRedacIntro')">Rédiger son introduction
                            <span v-if="currentStep === 'StepRedacIntro'" style="float: right;"><i class="fas fa-edit"></i></span></a>
                        </MDBListGroupItem>
                        <MDBListGroupItem tag="label" class="list-group-item-danger">
                            <input class="form-check-input me-1" disabled type="checkbox" :checked="completedSteps['StepRedacParts'] ? true : undefined" value="" />
                            <a href="javascript:void(0)" style="color: #A8213D;" v-on:click="changeCurrentStep('StepRedacParts')">Rédiger ses parties
                            <span v-if="currentStep === 'StepRedacParts'" style="float: right;"><i class="fas fa-edit"></i></span></a>
                        </MDBListGroupItem>
                        <MDBListGroupItem tag="label" class="list-group-item-danger">
                            <input class="form-check-input me-1" disabled type="checkbox" :checked="completedSteps['StepRedacConclusion'] ? true : undefined" value="" />
                            <a href="javascript:void(0)" style="color: #A8213D;" v-on:click="changeCurrentStep('StepRedacConclusion')">Rédiger sa conclusion
                            <span v-if="currentStep === 'StepRedacConclusion'" style="float: right;"><i class="fas fa-edit"></i></span></a>
                        </MDBListGroupItem>
                    </MDBListGroup>
                </MDBListGroupItem>
                <MDBListGroupItem tag="label" class="list-group-item-danger">
                        <input class="form-check-input me-1" disabled type="checkbox" :checked="completedSteps['StepProofReading'] ? true : undefined" value="" />
                        <a href="javascript:void(0)" style="color: #A8213D;" v-on:click="changeCurrentStep('StepProofReading')"><b>Relecture</b>
                        <span v-if="currentStep === 'StepProofReading'" style="float: right;"><i class="fas fa-edit"></i></span></a>
                </MDBListGroupItem>
                <MDBListGroupItem tag="label" class="list-group-item-danger">
                    <input class="form-check-input me-1" disabled type="checkbox" :checked="completedSteps['StepEnd'] ? true : undefined" value="" />
                    <a href="javascript:void(0)" style="color: #A8213D;" v-on:click="changeCurrentStep('StepEnd')">Arrivée !
                    <span v-if="currentStep === 'StepEnd'" style="float: right;"><i class="fas fa-edit"></i></span></a>
                </MDBListGroupItem>
            </MDBListGroup>
        </div>
        <div class="p-2 w-75 border border-danger border-3 rounded">
            <component :is="currentStep" :projectId="projectId" v-on:stepCompleted="completeStep" v-on:uncompleteStep="uncompleteStep"></component>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { MDBListGroup, MDBListGroupItem } from 'mdb-vue-ui-kit';
import StepStart from '../components/steps/StepStart.vue';
import StepPrelimApproach from '../components/steps/StepPrelimApproach.vue';
import StepPrelimUnderstand from '../components/steps/StepPrelimUnderstand.vue';
import StepPrelimBasics from '../components/steps/StepPrelimBasics.vue';
import StepDraftBasics from '../components/steps/StepDraftBasics.vue';
import StepDraftPlanEnum from '../components/steps/StepDraftPlanEnum.vue';
import StepDraftPlanParts from '../components/steps/StepDraftPlanParts.vue';
import StepDraftPlanSubparts from '../components/steps/StepDraftPlanSubparts.vue';
import StepDraftAnnounce from '../components/steps/StepDraftAnnounce.vue';
import StepAnalysis from '../components/steps/StepAnalysis.vue';
import StepRedacAdvices from '../components/steps/StepRedacAdvices.vue';
import StepRedacIntro from '../components/steps/StepRedacIntro.vue';
import StepRedacParts from '../components/steps/StepRedacParts.vue';
import StepRedacConclusion from '../components/steps/StepRedacConclusion.vue';
import StepProofReading from '../components/steps/StepProofReading.vue';
import StepEnd from '../components/steps/StepEnd.vue';

interface ProjectData
{
    projectId: number,
    projectName: string,
    currentStep: string,
    completedSteps: {[key: string]: boolean},

}

export default defineComponent ({
    components: {
        MDBListGroup,
        MDBListGroupItem,
        StepStart,
        StepPrelimApproach,
        StepPrelimUnderstand,
        StepPrelimBasics,
        StepDraftBasics,
        StepDraftPlanEnum,
        StepDraftPlanParts,
        StepDraftPlanSubparts,
        StepDraftAnnounce,
        StepAnalysis,
        StepRedacAdvices,
        StepRedacIntro,
        StepRedacParts,
        StepRedacConclusion,
        StepProofReading,
        StepEnd
    },
    data(): ProjectData {
        return {
            projectId: parseInt(this.$route.params.projectId as string),
            projectName: "",
            currentStep: "",
            completedSteps: {}
        }
    },

    methods: {
        testMethod: function() {
            console.log("hello");
        },

        changeCurrentStep: function(step: string) {
            this.currentStep = step;
            window.electronAPI.updateCurrentStep(this.projectId, this.currentStep);
        },

        completeStep: function(completed: string) {
            let nextStep = false;
            for (var step in this.completedSteps) {
                if (nextStep && this.completedSteps[step] != true) {
                    this.currentStep = step;
                    window.electronAPI.updateCurrentAndCompletedSteps(this.projectId, step, JSON.stringify(this.completedSteps));
                    return
                }
                if (step === completed) {
                    this.completedSteps[step] = true;
                    nextStep = true;
                }
            }
            this.currentStep = "StepEnd";
            window.electronAPI.updateCurrentAndCompletedSteps(this.projectId, this.currentStep, JSON.stringify(this.completedSteps));
        },

        uncompleteStep: function(step: string) {
            this.completedSteps[step] = false;
            window.electronAPI.updateCompletedSteps(this.projectId,  JSON.stringify(this.completedSteps));
        },

        computeProgression: function() {
            const totalSteps = Object.keys(this.completedSteps).length;
            let completedSteps = 0;
            for (var step in this.completedSteps) {
                if (this.completedSteps[step]) { completedSteps++; }
            }
            return (100 * completedSteps / totalSteps).toPrecision(3);
        }

    },

    computed: {

    },

    created() {
        this.projectName = window.electronAPI.getProjectNameFromId(this.projectId);
        const stepInfo = window.electronAPI.getProjectStepInfoFromId(this.projectId);
        this.currentStep = stepInfo.currentStep;
        this.completedSteps = JSON.parse(stepInfo.completedSteps);
    }

});
</script>
