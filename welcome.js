const welcome = () => {
    setTimeout(() => {
        document.getElementById('intro').style.display = 'none';
        document.getElementById('game').style.display = 'block';
    }, 300);
}

document.getElementById('welcome-begin').addEventListener('click', welcome)



const welcomeChoice = () => {
    document.getElementById('ushur').style.display = 'block';
    document.getElementById('tisu').style.display = 'none';
    setTimeout(() => {
        document.getElementById('ushur-t').textContent = 'Just joking. No one cares. Welcome to the game.'
        document.getElementById('ushur-b').style.display = 'none';
    }, 5500);

    setTimeout(() => {
        document.getElementById('ushur').style.display = 'none';
        document.getElementById('game-container').style.display = 'flex';
    }, 8500);
}

const charF = () => {
    setTimeout(() => {
        welcomeChoice();
        document.getElementById('char-img').src = 'pics/elff.png';
    }, 500);
}

const charM = () => {
    setTimeout(() => {
        welcomeChoice();
        document.getElementById('char-img').src = 'pics/elfm.png';
    }, 500);
}

document.getElementById('f-choice').addEventListener('click', charF);

document.getElementById('m-choice').addEventListener('click', charM);