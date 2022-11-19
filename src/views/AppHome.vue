<template>

    <!-- Header -->
    <div class="p-5 text-center bg-light">
      <h1 class="mb-3">OTIS</h1>
      <h4 class="mb-3">Commentaires de texte guidés</h4>
    </div>
    <!-- Header -->
    
    <div class="d-flex justify-content-center" style="width: 70%; margin: auto;">
        <div class="align-self-center me-3"><img width="500" height="350" src="../assets/otis.gif"/></div>
        <div>
            <div style="text-align: left; margin-left: 25px;">
            <h5 class="text-center"><q>Mais vous savez, moi je ne crois pas qu'il y ait de bonne ou de mauvaise situation... Par contre, il peut y avoir de bons ou mauvais commentaires de texte.</q></h5>
            <p class="text-center"><i>Otis, Asterix & Cléopatre (s'il avait été prof de français)</i></p>
                <p>L'objectif de cette application est de vous guider pas à pas dans l'application de la méthode qui vous permettra de rédiger facilement de bons commentaires de texte, structurés et clairs.</p>
            <p>Le fonctionnement de l'application est simple : vous pouvez commencer un nouveau commentaire de texte en cliquant sur le bouton "Nouveau projet" dans le menu ci-dessus. Donnez un titre et une description à votre commentaire, puis laissez-vous guider par l'application pour le rédiger. Vous aurez la possibilité de sauvegarder votre travail, puis de le retrouver en cliquant sur l'onglet "Mes Projets" dans le menu.</p>
            <p class="text-center"> 📜📜📜📜📜 </p>
            </div>
        </div>
    </div>
<br/><br/><br/>
</template>

<script lang="ts">
  import { defineComponent } from '@vue/runtime-core';

  export default defineComponent ({
    components: {
    },

    methods: {
    },

    async mounted(): Promise<void> {
    }
  });

</script>
