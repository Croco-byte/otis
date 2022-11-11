<template>
<div class="d-flex flex-column mb-3 border h-100">
    <!-- Header -->
    <div class="p-2 text-center bg-light">
      <h1 class="mb-3">Rédaction: les parties</h1>
    </div>

    <MDBTabs v-model="activeTabId1">
        <h5>C'est l'heure du d-d-d-DUEL. Enfin de rédiger les parties quoi. Clique sur les icônes ci-dessous pour accéder à la rédaction des différents éléments de ton commentaire de texte.
            <br/><br/>Pour chacune des parties de ton plan, il te faut l'annoncer, rédiger les sous-parties, et rédiger une transition si ce n'est pas la dernière partie.</h5>
        <br/>
        <MDBTabNav pills tabsClasses="mb-3" class="d-flex justify-content-start">
                <MDBTabItem tabId="p1A" href="p1A">I. Annonce</MDBTabItem>
                <i class="fas fa-arrow-alt-circle-right align-self-center"></i>
                <MDBTabItem tabId="p1s1" href="p1s1">I. Sous-partie 1</MDBTabItem>
                <i class="fas fa-arrow-alt-circle-right align-self-center"></i>
                <MDBTabItem tabId="p1s2" href="p1s2">I. Sous-partie 2</MDBTabItem>
                <i class="fas fa-arrow-alt-circle-right align-self-center"></i>
                <MDBTabItem v-if="structure.partOne.subparts === '3'" tabId="p1s3" href="p1s3">I. Sous-partie 3</MDBTabItem>
                <i v-if="structure.partOne.subparts === '3'" class="fas fa-arrow-alt-circle-right align-self-center"></i>
                <MDBTabItem tabId="p1T" href="p1T">I. Transition</MDBTabItem>
                <i class="fas fa-arrow-alt-circle-right align-self-center"></i>
                <MDBTabItem tabId="p2A" href="p2A">II. Annonce</MDBTabItem>
                <i class="fas fa-arrow-alt-circle-right align-self-center"></i>
                <MDBTabItem tabId="p2s1" href="p2s1">II. Sous-partie 1</MDBTabItem>
                <i class="fas fa-arrow-alt-circle-right align-self-center"></i>
                <MDBTabItem tabId="p2s2" href="p2s2">II. Sous-partie 2</MDBTabItem>
                <i class="fas fa-arrow-alt-circle-right align-self-center"></i>
                <MDBTabItem v-if="structure.partTwo.subparts === '3'" tabId="p2s3" href="p2s3">II. Sous-partie 3</MDBTabItem>
                <i v-if="structure.partTwo.subparts === '3'" class="fas fa-arrow-alt-circle-right align-self-center"></i>
                <MDBTabItem v-if="structure.parts === '3'" tabId="p2T" href="p2T">II. Transition</MDBTabItem>
                <i v-if="structure.parts === '3'" class="fas fa-arrow-alt-circle-right align-self-center"></i>
                <MDBTabItem v-if="structure.parts === '3'" tabId="p3A" href="p3A">III. Annonce</MDBTabItem>
                <i v-if="structure.parts === '3'" class="fas fa-arrow-alt-circle-right align-self-center"></i>
                <MDBTabItem v-if="structure.parts === '3'" tabId="p3s1" href="p3s1">III. Sous-partie 1</MDBTabItem>
                <i v-if="structure.parts === '3'" class="fas fa-arrow-alt-circle-right align-self-center"></i>
                <MDBTabItem v-if="structure.parts === '3'" tabId="p3s2" href="p3s2">III. Sous-partie 2</MDBTabItem>
                <i v-if="structure.parts === '3'" class="fas fa-arrow-alt-circle-right align-self-center"></i>
                <MDBTabItem v-if="structure.parts === '3' && structure.partThree.subparts === '3'" tabId="p3s3" href="p3s3">III. Sous-partie 3</MDBTabItem>
                <i v-if="structure.parts === '3' && structure.partThree.subparts === '3'" class="fas fa-arrow-alt-circle-right align-self-center"></i>
                <MDBTabItem tabId="end" href="end">Fin rédaction parties <i class="fas fa-flag-checkered"></i></MDBTabItem>

        </MDBTabNav>
        
        <MDBTabContent>
            <MDBTabPane tabId="p1A">
                <p>Première partie : <b>"{{ structure.partOne.title }}"</b></p>
                <span><b>Annoncer la partie</b></span>
                <br/><br/>
                <div class="d-flex justify-content-end">
                <MDBPopover v-model="popoverAnnounce" dismissible direction="top">
                    <template #reference>
                        <span class="float-end" v-on:click="popoverAnnounce = !popoverAnnounce"><i>Clique ici pour obtenir de l'aide </i><i class="fas fa-question-circle"></i></span>
                    </template>
                    <template #header>Annoncer ses parties</template>
                    <template #body>Fais une phrase pour annoncer de quoi va parler ta première partie (essaie de ne pas formuler exactement comme dans le plan pour ne pas te répéter). Pense à commencer par un connecteur logique du type "tout d'abord", "premièrement", "dans un premier temps"...</template>
                </MDBPopover>
                </div>
                <MDBTextarea rows="5" label="Annonce de la 1ère partie" v-model="p1A" wrapperClass="mb-4"/>
                <MDBBtn color="dark" v-on:click="activeTabId1 = getNextRedacStep('p1A')">Suivant</MDBBtn>
            </MDBTabPane>

            <MDBTabPane tabId="p1s1">
                <p>Première partie : <b>"{{ structure.partOne.title }}"</b></p>
                <span><b>Rédiger la première sous-partie : "{{ structure.partOne.subpartOneTitle }}"</b></span>
                <br/><br/>
                <p class="text-start"><i>Rappel des éléments d'analyse que tu as associé à cette sous-partie :</i></p>
                <MDBTable striped responsive class="border border-danger">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Citation</th>
                            <th scope="col">Procédé</th>
                            <th scope="col">Interprétation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(element, index) in getPartAnalysisElements.p1s1" v-bind:key="index">
                            <td>{{ index + 1 }}</td>
                            <td><MDBInput disabled type="text" v-model="element.citation" /></td>
                            <td><MDBInput disabled type="text" v-model="element.process" /></td>
                            <td><MDBInput disabled type="text" v-model="element.interpretation" /></td>
                        </tr>
                    </tbody>
                </MDBTable>
                <br/>
                <p class="text-start"><i>Espace de rédaction :</i></p>
                <MDBTextarea rows="8" label="Rédaction première sous-partie" v-model="p1s1" wrapperClass="mb-4"/>
                <MDBBtn color="dark" v-on:click="activeTabId1 = getNextRedacStep('p1s1')">Suivant</MDBBtn>
            </MDBTabPane>

            <MDBTabPane tabId="p1s2">
                <p>Première partie : <b>"{{ structure.partOne.title }}"</b></p>
                <span><b>Rédiger la seconde sous-partie : "{{ structure.partOne.subpartTwoTitle }}"</b></span>
                <br/><br/>
                <p class="text-start"><i>Rappel des éléments d'analyse que tu as associé à cette sous-partie :</i></p>
                <MDBTable striped responsive class="border border-danger">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Citation</th>
                            <th scope="col">Procédé</th>
                            <th scope="col">Interprétation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(element, index) in getPartAnalysisElements.p1s2" v-bind:key="index">
                            <td>{{ index + 1 }}</td>
                            <td><MDBInput disabled type="text" v-model="element.citation" /></td>
                            <td><MDBInput disabled type="text" v-model="element.process" /></td>
                            <td><MDBInput disabled type="text" v-model="element.interpretation" /></td>
                        </tr>
                    </tbody>
                </MDBTable>
                <br/>
                <p class="text-start"><i>Espace de rédaction :</i></p>
                <MDBTextarea rows="8" label="Rédaction seconde sous-partie" v-model="p1s2" wrapperClass="mb-4"/>
                <MDBBtn color="dark" v-on:click="activeTabId1 = getNextRedacStep('p1s2')">Suivant</MDBBtn>
            </MDBTabPane>

            <MDBTabPane tabId="p1s3">
                <p>Première partie : <b>"{{ structure.partOne.title }}"</b></p>
                <span><b>Rédiger la troisième sous-partie : "{{ structure.partOne.subpartThreeTitle }}"</b></span>
                <br/><br/>
                <p class="text-start"><i>Rappel des éléments d'analyse que tu as associé à cette sous-partie :</i></p>
                <MDBTable striped responsive class="border border-danger">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Citation</th>
                            <th scope="col">Procédé</th>
                            <th scope="col">Interprétation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(element, index) in getPartAnalysisElements.p1s3" v-bind:key="index">
                            <td>{{ index + 1 }}</td>
                            <td><MDBInput disabled type="text" v-model="element.citation" /></td>
                            <td><MDBInput disabled type="text" v-model="element.process" /></td>
                            <td><MDBInput disabled type="text" v-model="element.interpretation" /></td>
                        </tr>
                    </tbody>
                </MDBTable>
                <br/>
                <p class="text-start"><i>Espace de rédaction :</i></p>
                <MDBTextarea rows="8" label="Rédaction troisième sous-partie" v-model="p1s3" wrapperClass="mb-4"/>
                <MDBBtn color="dark" v-on:click="activeTabId1 = getNextRedacStep('p1s3')">Suivant</MDBBtn>
            </MDBTabPane>

            <MDBTabPane tabId="p1T">
                <p>Première partie : <b>"{{ structure.partOne.title }}"</b></p>
                <span><b>Transition (partie 1 -> partie 2)</b></span>
                <br/><br/>
                <div class="d-flex justify-content-end">
                <MDBPopover v-model="popoverTransition" dismissible direction="top">
                    <template #reference>
                        <span class="float-end" v-on:click="popoverTransition = !popoverTransition"><i>Clique ici pour obtenir de l'aide </i><i class="fas fa-question-circle"></i></span>
                    </template>
                    <template #header>Rédiger une transition</template>
                    <template #body>Une transition se déroule en deux temps : d'abord, résume en une phrase ou deux ce que tu as démontré dans la partie qui vient de se terminer. Ensuite, également en une phrase ou deux, essaie de faire un lien avec la partie suivante.</template>
                </MDBPopover>
                </div>
                <MDBTextarea rows="5" label="Transition première partie" v-model="p1T" wrapperClass="mb-4"/>
                <MDBBtn color="dark" v-on:click="activeTabId1 = getNextRedacStep('p1T')">Suivant</MDBBtn>
            </MDBTabPane>

            <MDBTabPane tabId="p2A">
                <p>Deuxième partie : <b>"{{ structure.partTwo.title }}"</b></p>
                <span><b>Annoncer la partie</b></span>
                <br/><br/>
                <div class="d-flex justify-content-end">
                <MDBPopover v-model="popoverAnnounce" dismissible direction="top">
                    <template #reference>
                        <span class="float-end" v-on:click="popoverAnnounce = !popoverAnnounce"><i>Clique ici pour obtenir de l'aide </i><i class="fas fa-question-circle"></i></span>
                    </template>
                    <template #header>Annoncer ses parties</template>
                    <template #body>Fais une phrase pour annoncer de quoi va parler ta première partie (essaie de ne pas formuler exactement comme dans le plan pour ne pas te répéter). Pense à commencer par un connecteur logique du type "tout d'abord", "premièrement", "dans un premier temps"...</template>
                </MDBPopover>
                </div>
                <MDBTextarea rows="5" label="Annonce de la seconde partie" v-model="p2A" wrapperClass="mb-4"/>
                <MDBBtn color="dark" v-on:click="activeTabId1 = getNextRedacStep('p2A')">Suivant</MDBBtn>
            </MDBTabPane>

            <MDBTabPane tabId="p2s1">
                <p>Seconde partie : <b>"{{ structure.partTwo.title }}"</b></p>
                <span><b>Rédiger la première sous-partie : "{{ structure.partTwo.subpartOneTitle }}"</b></span>
                <br/><br/>
                <p class="text-start"><i>Rappel des éléments d'analyse que tu as associé à cette sous-partie :</i></p>
                <MDBTable striped responsive class="border border-danger">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Citation</th>
                            <th scope="col">Procédé</th>
                            <th scope="col">Interprétation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(element, index) in getPartAnalysisElements.p2s1" v-bind:key="index">
                            <td>{{ index + 1 }}</td>
                            <td><MDBInput disabled type="text" v-model="element.citation" /></td>
                            <td><MDBInput disabled type="text" v-model="element.process" /></td>
                            <td><MDBInput disabled type="text" v-model="element.interpretation" /></td>
                        </tr>
                    </tbody>
                </MDBTable>
                <br/>
                <p class="text-start"><i>Espace de rédaction :</i></p>
                <MDBTextarea rows="8" label="Rédaction première sous-partie" v-model="p2s1" wrapperClass="mb-4"/>
                <MDBBtn color="dark" v-on:click="activeTabId1 = getNextRedacStep('p2s1')">Suivant</MDBBtn>
            </MDBTabPane>

            <MDBTabPane tabId="p2s2">
                <p>Seconde partie : <b>"{{ structure.partTwo.title }}"</b></p>
                <span><b>Rédiger la seconde sous-partie : "{{ structure.partTwo.subpartTwoTitle }}"</b></span>
                <br/><br/>
                <p class="text-start"><i>Rappel des éléments d'analyse que tu as associé à cette sous-partie :</i></p>
                <MDBTable striped responsive class="border border-danger">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Citation</th>
                            <th scope="col">Procédé</th>
                            <th scope="col">Interprétation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(element, index) in getPartAnalysisElements.p2s2" v-bind:key="index">
                            <td>{{ index + 1 }}</td>
                            <td><MDBInput disabled type="text" v-model="element.citation" /></td>
                            <td><MDBInput disabled type="text" v-model="element.process" /></td>
                            <td><MDBInput disabled type="text" v-model="element.interpretation" /></td>
                        </tr>
                    </tbody>
                </MDBTable>
                <br/>
                <p class="text-start"><i>Espace de rédaction :</i></p>
                <MDBTextarea rows="8" label="Rédaction seconde sous-partie" v-model="p2s2" wrapperClass="mb-4"/>
                <MDBBtn color="dark" v-on:click="activeTabId1 = getNextRedacStep('p2s2')">Suivant</MDBBtn>
            </MDBTabPane>

            <MDBTabPane tabId="p2s3">
                <p>Seconde partie : <b>"{{ structure.partTwo.title }}"</b></p>
                <span><b>Rédiger la troisième sous-partie : "{{ structure.partTwo.subpartTwoTitle }}"</b></span>
                <br/><br/>
                <p class="text-start"><i>Rappel des éléments d'analyse que tu as associé à cette sous-partie :</i></p>
                <MDBTable striped responsive class="border border-danger">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Citation</th>
                            <th scope="col">Procédé</th>
                            <th scope="col">Interprétation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(element, index) in getPartAnalysisElements.p2s3" v-bind:key="index">
                            <td>{{ index + 1 }}</td>
                            <td><MDBInput disabled type="text" v-model="element.citation" /></td>
                            <td><MDBInput disabled type="text" v-model="element.process" /></td>
                            <td><MDBInput disabled type="text" v-model="element.interpretation" /></td>
                        </tr>
                    </tbody>
                </MDBTable>
                <br/>
                <p class="text-start"><i>Espace de rédaction :</i></p>
                <MDBTextarea rows="8" label="Rédaction troisième sous-partie" v-model="p2s3" wrapperClass="mb-4"/>
                <MDBBtn color="dark" v-on:click="activeTabId1 = getNextRedacStep('p2s3')">Suivant</MDBBtn>
            </MDBTabPane>

            <MDBTabPane tabId="p2T">
                <p>Seconde partie : <b>"{{ structure.partTwo.title }}"</b></p>
                <span><b>Transition (partie 2 -> partie 3)</b></span>
                <br/><br/>
                <div class="d-flex justify-content-end">
                <MDBPopover v-model="popoverTransition" dismissible direction="top">
                    <template #reference>
                        <span class="float-end" v-on:click="popoverTransition = !popoverTransition"><i>Clique ici pour obtenir de l'aide </i><i class="fas fa-question-circle"></i></span>
                    </template>
                    <template #header>Rédiger une transition</template>
                    <template #body>Une transition se déroule en deux temps : d'abord, résume en une phrase ou deux ce que tu as démontré dans la partie qui vient de se terminer. Ensuite, également en une phrase ou deux, essaie de faire un lien avec la partie suivante.</template>
                </MDBPopover>
                </div>
                <MDBTextarea rows="5" label="Transition première partie" v-model="p2T" wrapperClass="mb-4"/>
                <MDBBtn color="dark" v-on:click="activeTabId1 = getNextRedacStep('p2T')">Suivant</MDBBtn>
            </MDBTabPane>

            <MDBTabPane tabId="p3A">
                <p>Troisième partie : <b>"{{ structure.partThree.title }}"</b></p>
                <span><b>Annoncer la partie</b></span>
                <br/><br/>
                <div class="d-flex justify-content-end">
                <MDBPopover v-model="popoverAnnounce" dismissible direction="top">
                    <template #reference>
                        <span class="float-end" v-on:click="popoverAnnounce = !popoverAnnounce"><i>Clique ici pour obtenir de l'aide </i><i class="fas fa-question-circle"></i></span>
                    </template>
                    <template #header>Annoncer ses parties</template>
                    <template #body>Fais une phrase pour annoncer de quoi va parler ta première partie (essaie de ne pas formuler exactement comme dans le plan pour ne pas te répéter). Pense à commencer par un connecteur logique du type "tout d'abord", "premièrement", "dans un premier temps"...</template>
                </MDBPopover>
                </div>
                <MDBTextarea rows="5" label="Annonce de la troisième partie" v-model="p3A" wrapperClass="mb-4"/>
                <MDBBtn color="dark" v-on:click="activeTabId1 = getNextRedacStep('p3A')">Suivant</MDBBtn>
            </MDBTabPane>

            <MDBTabPane tabId="p3s1">
                <p>Troisième partie : <b>"{{ structure.partThree.title }}"</b></p>
                <span><b>Rédiger la première sous-partie : "{{ structure.partThree.subpartOneTitle }}"</b></span>
                <br/><br/>
                <p class="text-start"><i>Rappel des éléments d'analyse que tu as associé à cette sous-partie :</i></p>
                <MDBTable striped responsive class="border border-danger">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Citation</th>
                            <th scope="col">Procédé</th>
                            <th scope="col">Interprétation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(element, index) in getPartAnalysisElements.p3s1" v-bind:key="index">
                            <td>{{ index + 1 }}</td>
                            <td><MDBInput disabled type="text" v-model="element.citation" /></td>
                            <td><MDBInput disabled type="text" v-model="element.process" /></td>
                            <td><MDBInput disabled type="text" v-model="element.interpretation" /></td>
                        </tr>
                    </tbody>
                </MDBTable>
                <br/>
                <p class="text-start"><i>Espace de rédaction :</i></p>
                <MDBTextarea rows="8" label="Rédaction première sous-partie" v-model="p3s1" wrapperClass="mb-4"/>
                <MDBBtn color="dark" v-on:click="activeTabId1 = getNextRedacStep('p3s1')">Suivant</MDBBtn>
            </MDBTabPane>

            <MDBTabPane tabId="p3s2">
                <p>Troisième partie : <b>"{{ structure.partThree.title }}"</b></p>
                <span><b>Rédiger la seconde sous-partie : "{{ structure.partThree.subpartTwoTitle }}"</b></span>
                <br/><br/>
                <p class="text-start"><i>Rappel des éléments d'analyse que tu as associé à cette sous-partie :</i></p>
                <MDBTable striped responsive class="border border-danger">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Citation</th>
                            <th scope="col">Procédé</th>
                            <th scope="col">Interprétation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(element, index) in getPartAnalysisElements.p3s2" v-bind:key="index">
                            <td>{{ index + 1 }}</td>
                            <td><MDBInput disabled type="text" v-model="element.citation" /></td>
                            <td><MDBInput disabled type="text" v-model="element.process" /></td>
                            <td><MDBInput disabled type="text" v-model="element.interpretation" /></td>
                        </tr>
                    </tbody>
                </MDBTable>
                <br/>
                <p class="text-start"><i>Espace de rédaction :</i></p>
                <MDBTextarea rows="8" label="Rédaction seconde sous-partie" v-model="p3s2" wrapperClass="mb-4"/>
                <MDBBtn color="dark" v-on:click="activeTabId1 = getNextRedacStep('p3s2')">Suivant</MDBBtn>
            </MDBTabPane>

            <MDBTabPane tabId="p3s3">
                <p>Troisième partie : <b>"{{ structure.partThree.title }}"</b></p>
                <span><b>Rédiger la troisième sous-partie : "{{ structure.partThree.subpartTwoTitle }}"</b></span>
                <br/><br/>
                <p class="text-start"><i>Rappel des éléments d'analyse que tu as associé à cette sous-partie :</i></p>
                <MDBTable striped responsive class="border border-danger">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Citation</th>
                            <th scope="col">Procédé</th>
                            <th scope="col">Interprétation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(element, index) in getPartAnalysisElements.p3s3" v-bind:key="index">
                            <td>{{ index + 1 }}</td>
                            <td><MDBInput disabled type="text" v-model="element.citation" /></td>
                            <td><MDBInput disabled type="text" v-model="element.process" /></td>
                            <td><MDBInput disabled type="text" v-model="element.interpretation" /></td>
                        </tr>
                    </tbody>
                </MDBTable>
                <br/>
                <p class="text-start"><i>Espace de rédaction :</i></p>
                <MDBTextarea rows="8" label="Rédaction troisième sous-partie" v-model="p3s3" wrapperClass="mb-4"/>
                <MDBBtn color="dark" v-on:click="activeTabId1 = getNextRedacStep('p3s3')">Suivant</MDBBtn>
            </MDBTabPane>

            <MDBTabPane tabId="end">
                <br/><br/>
                <h3><i class="fas fa-flag-checkered"></i> Félicitations, tu as fini la rédaction des parties de ton commentaire de texte ! Tu peux maintenant finaliser cette étape en cliquant sur le bouton "Confirmer" ci-dessous. <i class="fas fa-flag-checkered"></i></h3>
            </MDBTabPane>

        </MDBTabContent>
    
    </MDBTabs>
     
     <br/><br/>
     <div class="mt-auto">
         <hr/>
         <div class="d-flex justify-content-center">
         <MDBBtn color="dark" class="w-25 mb-4" v-on:click="saveEverything()">Sauvegarder</MDBBtn>
         <MDBBtn color="danger" block class="w-25 mb-4" v-on:click="completeStep()">Confirmer ➤</MDBBtn>
        </div>
     </div>
</div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { defineComponent } from '@vue/runtime-core';
import { MDBBtn, MDBTextarea, MDBTabNav, MDBTabs, MDBTabItem, MDBTabContent, MDBTabPane, MDBPopover, MDBInput, MDBTable } from 'mdb-vue-ui-kit'

/* interface StepRedacPartsVueData
{
    
} */

export default defineComponent ({
    emits: ['stepCompleted', 'uncompleteStep'],
    props: ['projectId'],
    components: {
        MDBBtn,
        MDBTabNav,
        MDBTabs,
        MDBTabItem,
        MDBTabContent,
        MDBTabPane,
        MDBTextarea,
        MDBPopover,
        MDBInput,
        MDBTable
    },

    setup() {
        const activeTabId1 = ref('p1A');
        const popoverAnnounce = ref(false);
        const popoverTransition = ref(false);

        return { activeTabId1,
                 popoverAnnounce,
                 popoverTransition }
    },

    data(): any {
        return {
            structure: {},
            analysisElements: [],

            p1A: "",
            p1s1: "",
            p1s2: "",
            p1s3: "",
            p1T: "",

            p2A: "",
            p2s1: "",
            p2s2: "",
            p2s3: "",
            p2T: "",

            p3A: "",
            p3s1: "",
            p3s2: "",
            p3s3: ""
        }
    },

    methods: {
        completeStep: function() {
            this.saveEverything();
            this.$emit('stepCompleted', 'StepRedacParts');
        },

        saveEverything: function() {
            const result = window.electronAPI.saveRedacParts(this.projectId, [this.p1A, this.p1s1, this.p1s2, this.p1s3, this.p1T, this.p2A, this.p2s1, this.p2s2, this.p2s3, this.p2T, this.p3A, this.p3s1, this.p3s2, this.p3s3 ]);
            if (result > 0) { this.$toast.success('Sauvegardé avec succès !'); }
            else { this.$toast.error('Erreur lors de la sauvegarde :('); }
            
        },
        getNextRedacStep: function(currentStep: string) {
            if (currentStep === 'p1A') return 'p1s1';
            if (currentStep === 'p1s1') return 'p1s2';
            if (currentStep === 'p1s2') {
                if (this.structure.partOne.subparts === '3') return 'p1s3';
                else return 'p1T';
            }
            if (currentStep === 'p1s3') return 'p1T';
            if (currentStep === 'p1T') return 'p2A';
            if (currentStep === 'p2A') return 'p2s1';
            if (currentStep === 'p2s1') return 'p2s2';
            if (currentStep === 'p2s2') {
                if (this.structure.partTwo.subparts === '3') return 'p2s3';
                else {
                    if (this.structure.parts === '2') return 'end';
                    else return 'p2T';
                }
            }
            if (currentStep === 'p2s3') {
                if (this.structure.parts === '2') return 'end';
                else return 'p2T';
            }
            if (currentStep === 'p2T') return 'p3A';
            if (currentStep === 'p3A') return 'p3s1';
            if (currentStep === 'p3s1') return 'p3s2';
            if (currentStep === 'p3s2') {
                if (this.structure.partThree.subparts === '3') return 'p3s3'
                else return 'end'
            }
            return 'end';
        }
    },

    computed: {
        getPartAnalysisElements: function() {
            let p1s1 = [];
            let p1s2 = [];
            let p1s3 = [];

            let p2s1 = [];
            let p2s2 = [];
            let p2s3 = [];

            let p3s1 = [];
            let p3s2 = [];
            let p3s3 = [];

            for (var i = 0; i < this.analysisElements.length; i++) {
                if (this.analysisElements[i].part === 'p1s1') { p1s1.push(this.analysisElements[i]); continue; }
                if (this.analysisElements[i].part === 'p1s2') { p1s2.push(this.analysisElements[i]); continue; }
                if (this.analysisElements[i].part === 'p1s3') { p1s3.push(this.analysisElements[i]); continue; }
                if (this.analysisElements[i].part === 'p2s1') { p2s1.push(this.analysisElements[i]); continue; }
                if (this.analysisElements[i].part === 'p2s2') { p2s2.push(this.analysisElements[i]); continue; }
                if (this.analysisElements[i].part === 'p2s3') { p2s3.push(this.analysisElements[i]); continue; }
                if (this.analysisElements[i].part === 'p3s1') { p3s1.push(this.analysisElements[i]); continue; }
                if (this.analysisElements[i].part === 'p3s2') { p3s2.push(this.analysisElements[i]); continue; }
                if (this.analysisElements[i].part === 'p3s3') { p3s3.push(this.analysisElements[i]); continue; }
            }

            return { "p1s1": p1s1, "p1s2": p1s2, "p1s3": p1s3, "p2s1": p2s1, "p2s2": p2s2, "p2s3": p2s3, "p3s1": p3s1, "p3s2": p3s2, "p3s3": p3s3 }
        },
    },

    created() {
        const structureResult = window.electronAPI.getDraftPlanStructure(this.projectId);
        if (structureResult.draftPlanStructure) {
            const draftPlanStructure = JSON.parse(structureResult.draftPlanStructure);
            this.structure = draftPlanStructure;
        } else {
            this.structure = { "parts": '2', "partOne": { "title": "Première partie", "subparts": '2', "subpartOneTitle": "Sous-partie 1", "subpartTwoTitle": "Sous-partie 2", "subpartThreeTitle": "Sous-partie 3" },
                                           "partTwo": { "title": "Deuxième partie", "subparts": '2', "subpartOneTitle": "Sous-partie 1", "subpartTwoTitle": "Sous-partie 2", "subpartThreeTitle": "Sous-partie 3" },
                                           "partThree": { "title": "Troisième partie", "subparts": '2', "subpartOneTitle": "Sous-partie 1", "subpartTwoTitle": "Sous-partie 2", "subpartThreeTitle": "Sous-partie 3" }}
        }

        const analysisResult = window.electronAPI.getAnalysis(this.projectId);
        if (analysisResult.analysis) {
            const analysis = JSON.parse(analysisResult.analysis);
            this.analysisElements = analysis;
        } else {
            this.analysisElements = [];
        }

        const redacPartsResult = window.electronAPI.getRedacParts(this.projectId);
        if (redacPartsResult.p1Announce) { this.p1A = redacPartsResult.p1Announce; }
        if (redacPartsResult.p1s1Redacted) { this.p1s1 = redacPartsResult.p1s1Redacted; }
        if (redacPartsResult.p1s2Redacted) { this.p1s2 = redacPartsResult.p1s2Redacted; }
        if (redacPartsResult.p1s3Redacted) { this.p1s3 = redacPartsResult.p1s3Redacted; }
        if (redacPartsResult.p1Transition) { this.p1T = redacPartsResult.p1Transition; }

        if (redacPartsResult.p2Announce) { this.p2A = redacPartsResult.p2Announce; }
        if (redacPartsResult.p2s1Redacted) { this.p2s1 = redacPartsResult.p2s1Redacted; }
        if (redacPartsResult.p2s2Redacted) { this.p2s2 = redacPartsResult.p2s2Redacted; }
        if (redacPartsResult.p2s3Redacted) { this.p2s3 = redacPartsResult.p2s3Redacted; }
        if (redacPartsResult.p2Transition) { this.p2T = redacPartsResult.p2Transition; }

        if (redacPartsResult.p3Announce) { this.p3A = redacPartsResult.p3Announce; }
        if (redacPartsResult.p3s1Redacted) { this.p3s1 = redacPartsResult.p3s1Redacted; }
        if (redacPartsResult.p3s2Redacted) { this.p3s2 = redacPartsResult.p3s2Redacted; }
        if (redacPartsResult.p3s3Redacted) { this.p3s3 = redacPartsResult.p3s3Redacted; }

        this.$emit('uncompleteStep', 'StepRedacParts');
    }

});
</script>
