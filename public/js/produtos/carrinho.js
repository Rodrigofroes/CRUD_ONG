document.addEventListener("DOMContentLoaded", function() {

    var btnAddCarrinho = document.querySelectorAll(".btnAddCarrinho");

    let carrinho = [];

    for(let i = 0; i < btnAddCarrinho.length; i++) {
        btnAddCarrinho[i].addEventListener("click", adicionarAoCarrinho);
    }

    function adicionarItemCarrinho(item) {
        let lista = localStorage.getItem("carrinho");

        if(lista != null) {
            carrinho = JSON.parse(lista);
            let achou = false;
            for(let i = 0; i < carrinho.length; i++){
                if(carrinho[i].produtoId == item.produtoId) {
                    carrinho[i].quantidade++;
                    achou = true;
                }
            }

            if(achou == false) {
                item.quantidade = 1;
                carrinho.push(item);
            }

            localStorage.setItem("carrinho", JSON.stringify(carrinho));
        }
        else{
            item.quantidade = 1;
            carrinho.push(item);
            localStorage.setItem("carrinho", JSON.stringify(carrinho));
        }
    }

    function adicionarAoCarrinho() {
        let id = this.dataset.produtoid;
        console.log(id);

        fetch("/produtos/obter/" + id)
        .then(r=> {
            return r.json();
        })
        .then(r=> {
            if(r.produtoEncontrado != null) {
                adicionarItemCarrinho(r.produtoEncontrado);

                this.innerHTML = "<i class='fas fa-check'> Adicionado";
                
                let that = this;
                setTimeout(function() {
                    that.innerHTML = `<i class="fas fa-cart-plus">`;
                }, 5000);
            }
        })
    }

})