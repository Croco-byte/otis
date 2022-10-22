<template>
    <!-- Header -->
    <div class="p-5 text-center bg-light">
      <h1 class="mb-3">Great Helper Onizuka</h1>
      <h4 class="mb-3">Commentaires de texte guidés</h4>
    </div>
    <!-- Header -->
    
    <div class="d-flex justify-content-center" style="width: 70%; margin: auto;">
        <div><img  src="../assets/onizuka.jpg"/></div>
        <div>
            <div style="text-align: left; padding-left: 25px;">
            <p>Salut les nazes. Ceci est une application pour vous aider à faire des commentaires de texte. Great Helper Onizuka va vous accompagner pas-à-pas pour que vous pondiez enfin un devoir à peu près potable. Et éviter à Solène de tomber définitivement dans la dépression à force de vous filer des notes de merde.</p>
            <p>PS: Si Onizuka ça vous dit rien et que vous avez pas la ref du titre de l'appli, allez lire GTO, bande d'incultes.</p>
            <p> Le fonctionnement de l'application est assez simple : vous pouvez commencer un nouveau commentaire, ou en poursuivre un que vous avez déjà commencé. Si tout ça n'est pas clair, cliquez sur le bouton ci-dessous pour accéder au tutoriel de l'application.</p>
            </div>
            <MDBBtn color='danger' style="text-align: centered;">Tutoriel</MDBBtn>
        </div>
    </div>
</template>

<script>
  import { MDBBtn } from 'mdb-vue-ui-kit';

  export default {
    components: {
        MDBBtn
    },
  };

</script>
