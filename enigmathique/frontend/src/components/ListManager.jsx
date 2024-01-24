const getRowColor = (index) => {
    return `border-t border-[#CECDFD]  ${index % 2 == 0 ? 'bg-[#EBECF9]' : 'bg-[#F1F3FA]'}`
}

export { getRowColor };