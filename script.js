const typewriter = document.getElementById("typewriter");
const button = document.getElementById("startBtn");
const intro = document.getElementById("inicio");
const letter = document.getElementById("letter");
const letterText = document.getElementById("letterText");
const toAlbumBtn = document.getElementById("toAlbum");
const album = document.getElementById("album");
const playBtn = document.getElementById("playBtn");
const audio = document.getElementById("audio");
const progress = document.querySelector(".progress");

const introText = "CENA 1 — Véspera de Natal e dia do nascimento da minha pessoa favorita no mundo inteiro";
const letterContent = `
PLANO GERAL.
[Cenário: um site feito para expressar o meu amor por você]

Paloma,

Você é luz.
Você é cor.
Você é arte.

Você é a parte mais bonita do meu coração.

Em toda a imensidão do universo,
sinto que os átomos que nos formaram
estavam destinados a se encontrar,
porque sem você,
a minha vida perde cor.
Os meus dias ficam cinzentos.

Há partículas de arte em toda a sua forma.
Em tudo o que você faz,
em tudo o que diz,
em tudo o que você é.

Você é mais que poesia.
Você é natureza.
E é lar.
`;

let i = 0;

function typeIntro() {
  if (i < introText.length) {
    typewriter.innerHTML += introText.charAt(i);
    i++;
    setTimeout(typeIntro, 50);
  } else {
    button.style.opacity = "1";
    button.style.pointerEvents = "auto";
  }
}
typeIntro();

function typeLetter(text, element, speed = 35, callback) {
  let index = 0;
  element.innerHTML = "";
  function write() {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
      setTimeout(write, speed);
    } else if (callback) {
      callback();
    }
  }
  write();
}

button.addEventListener("click", () => {
  intro.style.display = "none";
  letter.classList.remove("hidden");
  toAlbumBtn.style.display = "none";
  typeLetter(letterContent, letterText, 35, () => {
    toAlbumBtn.style.display = "inline-block";
  });
});

toAlbumBtn.addEventListener("click", () => {
  letter.style.display = "none";
  album.classList.remove("hidden");
});

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸️";
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
  }
});

audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = percent + "%";
});

document.querySelector(".progress-container").addEventListener("click", (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  audio.currentTime = (clickX / rect.width) * audio.duration;
});
