// Map category keys to their dataset and display mode
import {
    animals, corps, nourriture, habillement, famille, materiaux, articles,
    temps, transport, sport, nature, weather, metiers, couleurs, verbes, vandertramp, 
    futurSimple, futurProche, passeComposé, imparfait, present, pronominaux, 
    prepositions, demonstratifs, pronoms, imperatif
  } from '../wordDatabase'
  
  const mix = [...animals, ...corps, ...nourriture, ...habillement, ...famille, ...materiaux, ...temps, ...transport, ...sport, ...nature, ...weather, ...metiers, ...couleurs]
  const mixVerbes = [...verbes, ...vandertramp, ...futurSimple, ...futurProche, ...passeComposé, ...imparfait, ...present, ...pronominaux, ...imperatif]
  const mixGrammaire = [...articles, ...prepositions, ...demonstratifs, ...pronoms]
  
  // Some categories show a clue + french (prepositions/demonstratifs/pronoms), others show english
  export const CATEGORY_MODE = {
    prepositions: 'clue',
    demonstratifs: 'clue',
    pronoms: 'clue',
    default: 'english'
  }
  
  export const CATEGORIES = {
    // mots
    animals, corps, nourriture, habillement, famille, materiaux, temps, transport, sport, nature, weather, metiers, couleurs, mix,
    // verbes
    verbes, vandertramp, futurSimple, futurProche, passeComposé, imparfait, present, pronominaux, imperatif, mixVerbes,
    // grammaire
    articles, prepositions, demonstratifs, pronoms, mixGrammaire
  }
  