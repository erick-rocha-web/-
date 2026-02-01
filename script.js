const form = document.querySelector(".form")

const masc = document.querySelector(".masc")

function AbrirForm(){
    form.style.left = "50%"
    form.style.transform = "translateX(-50%)"
    masc.style.visibility = "visible"
    form.style.transition = "1s"
}
function FecharForm(){
    form.style.left = "-350px"
    form.style.transform = "translateX(0%)"
    masc.style.visibility = "hidden"
    form.style.transition = "1s"

}
const btn = document.getElementById('meubotão');
const secao = document.getElementById('destino');

btn.addEventListener('click', () => {
  secao.scrollIntoView({ behavior: 'smooth' });
});

