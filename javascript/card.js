const input__card = document.getElementById('input__card');
const container__display_input_card = document.querySelector('.container__display_input_card');
const btn_send_input_card = document.querySelector('.btn_send_input_card');
const close_display_card = document.getElementById('close_display_card');
let whoElementOpen;
const p_emptyCardboard = '<p>Nenhum card adicionado!</p>';

//fechando o display de adicionar card
close_display_card.addEventListener('click', (e) => 
{
    container__display_input_card.classList.toggle('active');
});
 
//ativando o display de adicionar card
function openDisplayInputCard(cardBoardElement)
{
    //Indicando qual cardboard abriu a tela de input card
    whoElementOpen = cardBoardElement;

    //Ativando o display de adicionar card
    container__display_input_card.classList.toggle('active');
};

//Adicionando card.
function addCard()
{
    const whoOpen               = whoElementOpen; //Pegando qual cardboard abriu o display
    const cardBoard_Id          = whoOpen.id;     //Pegando o id do cardboard que abriu o display
    const cardBoard_Ul          = document.querySelector(`#${cardBoard_Id} > ul`); //Pegando o ul do cardboard que abriu o display

    if (!input__card.value) return; //Validando se o card vai ter valor

    if (whoOpen.querySelector(`#${cardBoard_Id} > ul > p`)) //Removendo elemento <p>Nenhum card adicionado!</p>
    {
        whoOpen.querySelector(`#${cardBoard_Id} > ul > p`).remove();
    }

    cardBoard_Ul.insertAdjacentHTML("beforeend", 
    `<li>
        <p>${input__card.value}</p>
        <div class="container__btn_action__card">
            <button type="button" class="btn_action__card" onclick="deleteCard()">
                <span class="material-symbols-outlined">backspace</span>
            </button>
            <button type="button" class="btn_action__card" onclick="moveCard('backward')">
                <span class="material-symbols-outlined" id="returnItem">move_item</span>
            </button>
            <button type="button" class="btn_action__card" onclick="moveCard('forward')">
                <span class="material-symbols-outlined">move_item</span>
            </button>
        </div>
    </li>`); //adicionando o novo card (<li>) depois do ultimo (beforeend) filho do elemento Ul

    input__card.value = '';
    container__display_input_card.classList.toggle('active'); //fechando o display de input depois de adicionar um <li>
};


//funçao de mover o card
function moveCard(direction)
{
    const movedClicked          = event.target; //pega qual icone de mover foi clicado
    const liWillMoved           = movedClicked.parentNode.parentNode.parentNode;
    const div_liIsCurrently     = liWillMoved.parentNode.parentNode;
    let div_WillGoTo            = undefined;

    switch (direction) 
    {

        case 'forward': //Caso for para frente
            div_WillGoTo = div_liIsCurrently.nextElementSibling; //Pega o próximo elemento irmão da div atual

            if(verificaProxElement(div_liIsCurrently, "forward") === true) return; //Valida se tem proximo elemento, se não tiver irá dar um return e sairá do 'case'

            if(verificaTag_P(div_WillGoTo) === true) //Valida se o proximo elemento, tem o paragráfo de cardboard vazio
                {
                    div_WillGoTo.querySelector(`#${div_WillGoTo.id} > ul > p`).remove(); //Se tiver, remove
                }
    
            liWillMoved.remove(); //remove o card a ser movido do cardboard em que estava
    
            div_WillGoTo.querySelector(`#${div_WillGoTo.id} > ul`).insertAdjacentElement('beforeend', 
            liWillMoved); //adiciona o card a ser movido depois do ultimo filho do cardboard que ele está indo
            break;
        
        case 'backward': //Caso for para tras
            div_WillGoTo = div_liIsCurrently.previousElementSibling; //Pega o elemento irmão anterior da div atual

            if(verificaProxElement(div_liIsCurrently, "backward") === true) return; //Valida se tem elemento anterior, se não tiver irá dar um return e sairá do 'case'

            if(verificaTag_P(div_WillGoTo) === true) //Valida se o proximo elemento, tem o paragráfo de cardboard vazio
            {
                document.querySelector(`#${div_WillGoTo.id} > ul > p`).remove(); //Se tiver, remove
            }
    
            liWillMoved.remove(); //remove o card a ser movido do cardboard em que estava
    
            document.querySelector(`#${div_WillGoTo.id} > ul`).insertAdjacentElement('beforeend', 
            liWillMoved); //adiciona o card a ser movido depois do ultimo filho do cardboard que ele está indo
            break;
            
        default:
            break;
    }
    
    if(verificaTag_P(div_liIsCurrently) === false && div_liIsCurrently.querySelector(`#${div_liIsCurrently.id} > ul > li`) === null)
    { //Se NÃO tiver a tag <p> && NÃO tiver <li> (querySelector retornara 'null') então será executado o bloco de comandos abaixo
        document.querySelector(`#${div_liIsCurrently.id} > ul`).insertAdjacentHTML('afterbegin', p_emptyCardboard);
    }

    return;
}


//Deletando card. 
function deleteCard()
{
    const backspaceClicked  = event.target; //pega qual backspace foi clicado
    const liWillDeleted     = backspaceClicked.parentNode.parentNode.parentNode;
    const ul_OfliDeleted    = liWillDeleted.parentNode;

    liWillDeleted.remove(); //remove da DOM o li do backspace clicado;

    if(ul_OfliDeleted.children.length === 0) //Valida se tem <li>, se não tiver adiciona o paragráfo de cardboard vazio
    {
        ul_OfliDeleted.insertAdjacentHTML('afterbegin', p_emptyCardboard);
    }
};

//Verifica se o elemento que o card (<li>) vai existe
function verificaProxElement(ActuallyCardboardElement, direction)
{
    switch (direction) 
    {

        case 'forward':     //Se NÃO tiver o proximo elemento retornara TRUE, se tiver retornara FALSE
            return ActuallyCardboardElement.nextElementSibling     === null ? true : false;
        
        case 'backward':    //Se NÃO tiver o elemento anterior retornara TRUE, se tiver retornara FALSE 
            return ActuallyCardboardElement.previousElementSibling === null ? true : false;
            
        default:
            break;
    }
}

//Verifica se o card (<li>) já tem o paragráfo de cardboard vazio
function verificaTag_P(cardboardElement)
{
    const checkedElement = cardboardElement.querySelector(`#${cardboardElement.id} > ul > p`);
    let hasP;

    checkedElement === null ? hasP = false : hasP = true;

    return hasP; //true se tiver a tag <p>, false se NÃO tiver a tag <p>
}