export function render(query: string, block) {
    console.log('test', query);
    const root = document.querySelector(query);

    root.appendChild(block.getContent());
    return root;
}