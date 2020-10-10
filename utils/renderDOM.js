export function render(query, block) {
    console.log('test', query);
    const root = document.querySelector(query);

    // Можно завязаться на реализации вашего класса Block
    root.appendChild(block.getContent());
    return root;
}