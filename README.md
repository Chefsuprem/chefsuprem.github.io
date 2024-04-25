
# Repo GitHub du projet 1RIS WEB

<img src="images\readme\banniere_IRIS_WEB.png">

## Introduction

- **[ Valable que jusqu'au 26/05 ]** <br> Bienvenu dans l'équipe de dev de l'agence 1RIS! <br> Un gros travail nous attend, on doit se serrer les coudes et être efficace dans notre organisation et nos travaux. C'est pourquoi on va revoir ce qu'il faut impérativement savoir pour bien travailler ensemble et être sur les mêmes bases:
  
  1. [Bien débuter dans le travail](#bien-débuter-dans-le-travail)
  2. [Les fondamentaux de Git](#les-fondamentaux-de-git)
  3. [L'intéret des branches](#lintéret-des-branches)
  4. [Les nomenclatures à adopter](#les-nomenclatures-à-adopter)
  5. [L'espace projet](#lespace-projet)

- **[ Valable après le déploiement du site soit après le 26/05 ]** <br> ...

## Bien débuter dans le travail

Pour bien débuter notre collaboration, on aura besoin de travailler facilement sans se mélanger les pinceaux. C'est pourquoi on à besoin de prendre son temps et pas se précipiter sur comment ajouter nos modifications.
> [!IMPORTANT]
> Dans tout les cas, on a besoin de copier le travail déjà existant en ligne sur notre ordinateur; pourquoi ? -> Parce que la manière de travail va se décomposer en plusieurs temps:
> 1. L'ajout de modifications ***(en local sur notre PC)***
> 2. L'enregistrement de ces modifications ***(en local sur notre PC)***
> 3. Une fois une tâche finie -> Envoie de ces modifications sur le dépôt distant ***(en ligne)***

> [!WARNING]
> Tout ceci se fait en même temps des autres; ce qui fait que si plusieurs envoient ses modifications en même temps, on peut avoir des conflits qui devront se gérer en vitesse vu que les autres collaborateurs peuvent envoyer eux aussi leur modifications.

C'est pourquoi il a été décidé de ne pas travailler en liaison direct avec le repo original pour ne pas se taper dessus si des conflits arrivent mais de travailler avec des copies du repo original sur votre compte GitHub qui sera toujours liée à l'original lorsque l'on aura besoin d'envoyer les modifications mais au moins votre travail reste sur votre compte et si problèmes ou modifs tierces il y a vous pourrez le modifier de votre côté sans reenvoyer des modifs de modifs au repo original.

### 1. Installer les logiciels requis

<a href="https://code.visualstudio.com">
	<img src="images\readme\VSCODE.png" alt="Page d'installation de VSCODE">
</a>

> [!NOTE]
> Pour installer VSCODE rien de plus simple; après avoir cliquer sur la page au dessus vous cliquez sur "download for Windows" puis vous suivez les étapes.<br>
> Faites juste bien attention à cocher *"ouvrir avec code dans l'explorer de fichiers"* (et tout outils du même type) quand il vous est demandé si vous le voulez parce que c'est très utile.

<a href="https://git-scm.com">
	<img src="images\readme\GitMainPage.png" alt="Page d'installation générale de Git">
</a>

> [!NOTE]
> Ici vous aurez besoin de bien cliquer sur la version *setup* car la version *portable* est comme son nom l'indique une version compressée pour être fonctionelle dans une clé USB ou un disque externe pour pouvoir être transporter d'un appareil à l'autre.

<a href="https://git-scm.com/download/win">
	<img src="images\readme\GitWin.png" alt="Page d'installation de Git Windows">
</a>

### 2. Quelques extensions

Une fois ceci fait, pour nous faciliter la vie, on va avoir besoin de quelques extensions:

> [!NOTE]
> <img src="images\readme\Page des extensions VSCODE.png" alt="Page des extentions VSCODE">

#### Git graph

<img src="images\readme\gitgraph.png" alt="Extention git graph.">

#### Live Server

<img src="images\readme\liveServer.png" alt="Extension Live Server.">

## Les fondamentaux de Git

> [!IMPORTANT]
> Pour apporter vos modifications au repo principal il faudra se familiariser avec les commandes git parce que c'est plus rapide que d'utiliser l'interface graphique.

### 1. Git add

Pour envoyer les modifications, Git a besoin de savoir quelles sont les modifications à prendre en compte.<br>
On a premièrement besoin d'accéder à la console de git pour rentrer nos commandes:

```git
git add .
```
"Git add ." permet de lister **Toutes** les modifications apportés au commit que vous allez envoyer.<br> Si vous ne voulez apporter que certaines modifications au commit, alors tapez "git add" puis le nom du fichier en question.

> [!NOTE]
> Un commit est un "paquet" qui contiendra des modifications faites par rapport au repo.

### 2. Git stash

Git stash permet de mettre toutes les modifications apportées actuellement pas encore envoyée/"commitées" de côté et de remettre la branche actuelle à l'état de dernier commit.

```git
git stash list
```
permet de récupérer tout vos stash que vous avez créé et vous le réutilisez/reprenez les modifications mises de côté en remplaçant "list" par le nom du stash.

### 3. Git commit

Git commit permet donc de faire le commit avec tout les fichiers modifiés et listés.

> [!WARNING]
> Il est formelement obligatoire pour nous pour s'y retrouver de rajouter
> ```git
> git commit -m "La courte description du commit"
> ```
> Ca permet donc d'avoir plus rapidement les informations de ce que contient ce commit pour ne pas à avoir à aller dedans pour savoir ce qui a été rajouté.
> Ca permet aussi et surtout de lier les commits aux tâches en cours en mettant le code de la tâche dans la description.

### 4. Git push

Une fois le commit éffectué, on peut en faire plusieurs avant de les envoyer pour pouvoir être efficace et faire rapidement les choses avant de toutes les envoyer d'un coup.<br> Git push permet donc d'envoyer sur le dépôt distant les commits créés sur **UNE** branche.

### 5. Git pull

Git pull permet de récupérer les modifications envoyés au repo original par le biai de **pull request** ou de simples commits si c'est le propriétaire qui travail encore sur le repo lui même. 

## L'intéret des branches

> [!IMPORTANT]
> Sur ce projet il y a 3 branches différentes
> <img src="images\readme\branchesGit.png" alt="Image des branches git du projet.">

### La branche main

La branche main c'est très simple -> elle est la branche principale du projet. C'est la branche que l'on va utiliser pour sortir les "releases" du projet: elles vont être les pages complètement finies et les grosses fonctionnalités finies pour la base de donnée.

### La branche développement

La branche developpement est, comme elle l'indique, la branche où les modifications vont être envoyées, où le travail va être fait et où les choses vont avancer.

### La branche hotfix

La branche hotfix est la branche qui va être uniquement utilisée pour "réparer" les gros bugs qui peuvent apparaître par la suite.<br> Elle va être utilisée uniquement quand le bug est rêglé -> les fichiers de modifs sont apportés dans la branche hotfix pour dire que le bug est règlé et de la même manière une tache de bug qui a été créée pour l'occasion sera liée au commit dans la branche hotfix puis fermée ou terminée.

## Les nomenclatures à adopter

Ce chapitre est surtout là pour expliquer comment faire une release quand une étape de l'échéancier est terminée.

> [!NOTE]
> A retenir que dans le cas où c'est la branche master qui doit accueillir les releases -> on a besoin de fusionner les tout derniers commits avant pour les envoyer sur la branche master puis ensuite faire la release.

Pour faire une release c'est assez simple, il faut faire au moins 1 commit final puis avant de l'envoyer faire un tag (il permettera d'affecter la release)

```git
git tag v0.1.0
```
Ici le tag s'appel v0.1.0 => v pour indiquer que c'est une version et ensuite on arrive sur le principe de versionning.

> [!IMPORTANT]
> Le versionning c'est simple et pratique, il permet d'indiquer au grand public généralement qu'une nouvelle version est sortie d'un produit.
> 
> - Le 1er espace est réservé aux ajouts majeurs (généralement expliqué que quand un ajout majeur est présent, si l'on revient sur l'ajout majeur précédent le produit n'est pratiquement pas le même. Et donc par conséquent on ne peut pas revenir sur l'ajout précédent car actuellement le produit a été amélioré complètement grâce au dernier ajout majeur).
> 
> - Le 2e espace réservé après le 1er point est pour les ajouts mineurs -> des ajouts qui n'affectent pas énormément le produit si l'on revient à l'ajout mineur précédent.
>
> - Le dernier espace est réservé pour les patchs (un bug fixé, des petits problèmes de stabilité réglés, des textures recorrigées etc).
>
> C'est pour cette raison qu'il faut bien être sur de la version que l'on va ajouter quand on fait une nouvelle release.

Une fois le tag créé, on va l'ajouter grâce à "git add" puis, pour envoyer les commits créés précédement sous ce tag pour qu'ils soient considérés dans la release.

```git
git push origin v0.1.0
```
Git push pour l'envoyer au repo original, v0.1.0 pour initialiser la release sous le tag et "origin" pour spécifier vers quel dépôt l'envoyer.

> [!NOTE]
> Le repo est automatiquement désigné comme "origin" donc pas d'inquiétude.

## L'espace projet

L'espace projet est là pour suivre toutes les tâches à faire et à terminer (c'est comme un trello mais en mieux).<br> Un gantt est fait à partir des dates de fin des tâches créées et des dates des milestones/jalons créés également.
Et surtout ça permet d'assigner clairement une tâche à quelqu'un et à suivre sa progression.

> [!IMPORTANT]
> Le mieux est que au moins tout le groupe mette à jour le projet ou ses dates comme ça les devs peuvent être plus efficaces :grin::ok_hand: