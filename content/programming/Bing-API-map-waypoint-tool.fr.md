---
title: "Outil de balisage"
subtitle: "Dessinez un sentier et exportez ses coordonnées vers un fichier JSON."
headline: "Outil de balisage utilisant l'API Bing Maps pour obtenir des coordonnées et créér des sentiers."
image: "Waypoint_Tool_vehicle.gif"
date: 2021-03-31T00:00:00-00:00
ctaLink: "/programming/waypointMapTool.html"
ctaTitle: "Carte"
draft: false
---
Cet outil a été conçu pour programmer un véhicule autonome à suivre des balises en utilisant un microcontrôleur Arduino avec un module GPS.

<iframe src="/programming/waypointMapTool.html" style="width:100%; height: 500px; border: none;"></iframe>

Pour faciliter l'édition, utilisez <a href="/programming/waypointMapTool.html">la vue pleine page</a>.

## Créer et charger des balises
* **Pour créer un sentier:** cliquez sur la carte.
* **Pour enlever une balise:** cliquez sur la balise et cliquez *remove*.
* **Pour modifier un balise:** cliquez et faites glisser.
* **Pour enregistrer ou effacer les coordonnées:** cliquez de droite sur la carte; le nom de la localisation est le point d'interêt le plus proche de la première balise, ce qui est le nom de fichier par défaut.
* **Pour charger les coordonnées d'un fichier:** cliquez de droite sur la carte pour charger un fichier JSON compatible et en visialiser le sentier. Le fichier doit être une liste de latitudes et de longitudes.
* **Pour ajouter un véhicule:** cliquez de droite sur la carte et cliquez *place*. Un petit robot se mouvera heureusement entre les balises via un algorithme simple à vitesse constante.

{{< image "Waypoint_Tool_vehicle.gif" "Véhicule suivant les balises sur la carte" >}}