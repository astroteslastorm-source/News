# Actu du jour

Un site d'actualités statique, léger et sans dépendances. Pas d'outils de build —
uniquement du HTML, du CSS et du JavaScript vanilla.

## Fonctionnalités

- Mise en page responsive avec un hero épuré façon presse écrite
- Bascule thème clair/sombre (persistance via `localStorage`)
- Articles rendus dynamiquement depuis `news.json`
- Solution de repli avec articles d'exemple si le JSON ne peut être chargé

## Fichiers

| Fichier | Rôle |
| --- | --- |
| `index.html` | Structure et balisage de la page |
| `styles.css` | Variables de thème, mise en page et styles des composants |
| `script.js` | Bascule de thème, affichage de la date et chargement des articles |
| `news.json` | Source des articles en cours |

## Lancement en local

`script.js` récupère `news.json` via `fetch`, il faut donc ouvrir le site via
un serveur local plutôt qu'en `file://` :

```bash
# Python 3
python3 -m http.server 8000

# Ou Node
npx serve .
```

Puis rendez-vous sur <http://localhost:8000>.

## Ajouter un article

Modifiez `news.json` et ajoutez une entrée au tableau `stories` :

```json
{
  "category": "Tech",
  "title": "Votre titre ici",
  "summary": "Une ou deux phrases qui résument l'article.",
  "author": "Signature",
  "date": "2026-04-15"
}
```

## Licence

MIT
