const btn_add_cardboard         = document.querySelector('#btn_add_cardboard');
const open_display_cardboard    = document.querySelector('.container__display_input_cardboard');
const close_display_cardboard   = document.querySelector('#close_display_cardboard');
const input_cardboard_name      = document.querySelector('#input__cardboard_name');
const btn_send_cardboard        = document.querySelector('.btn_send_cardboard');
const container__cardboard      = document.querySelector('.container__cardboard');


//ativando o display de adicionar cardboards
btn_add_cardboard.addEventListener('click', (e) =>
{
    open_display_cardboard.classList.toggle('active');
});

//fechando o display de adicionar cardboard
close_display_cardboard.addEventListener('click', (e) => 
{
    open_display_cardboard.classList.toggle('active');
});


const cardBoard  = new Map();
let id_cardBoard = 0;

btn_send_cardboard.addEventListener('click', (e) =>
{
    if(!input_cardboard_name.value) //valida se tem titulo para o novo cardboard
    {
        alert('Insira um título para criar um novo cardBoard');
        return;
    }
    
    cardBoard.set(id_cardBoard, `${input_cardboard_name.value}`); //cria uma nova key e value para o cardboard.

    container__cardboard.innerHTML += 
        `<div class="cardboard" id="cardBoard${id_cardBoard}">
            <button class="btn_close_cardboard" onclick="delete_cardBoard(cardBoard${id_cardBoard}, ${id_cardBoard})">
                <span class="material-symbols-outlined">close</span>
            </button>
            <h1>${cardBoard.get(id_cardBoard)}</h1>
            <ul class="card__content_ul">
                <p>Nenhum card adicionado!</p>
            </ul>
            <button type="button" class="btn__plus" onclick="openDisplayInputCard(cardBoard${id_cardBoard})">
                <span class="material-symbols-outlined">add_circle</span>
                adicionar outro card
            </button>
        </div>`;
        
    id_cardBoard++;
    input_cardboard_name.value = '';
});

function delete_cardBoard(cardBoardId, cardBoardId_Map)
{
    cardBoardId.remove(); //remove da DOM;
    cardBoard.delete(cardBoardId_Map); //remove do map();
};