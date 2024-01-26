/**
 * permet d'alterner la couleur des éléments d'une liste
 * @param index indice de l'élément
 * @returns {`border-t border-[#CECDFD]  ${string}`}
 */
const getRowColor = (index) => {
    return `border-t border-[#CECDFD]  ${index % 2 == 0 ? 'bg-[#EBECF9]' : 'bg-[#F1F3FA]'}`
}

export { getRowColor };