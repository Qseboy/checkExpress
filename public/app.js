document.querySelectorAll(".price").forEach(node => {
    node.textContent = new Intl.NumberFormat("ru-RU", {
        currency: "uan",
        style: "currency"
    }).format(node.textContent)
});
