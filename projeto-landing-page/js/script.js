// Validação simples do formulário
document.getElementById("formContato").addEventListener("submit", function(e) {
  e.preventDefault();

  let nome = document.getElementById("nome").value.trim();
  let email = document.getElementById("email").value.trim();
  let mensagem = document.getElementById("mensagem").value.trim();
  let msgRetorno = document.getElementById("msgRetorno");

  if (nome === "" || email === "" || mensagem === "") {
    msgRetorno.textContent = "Por favor, preencha todos os campos!";
    msgRetorno.style.color = "red";
  } else {
    msgRetorno.textContent = "Mensagem enviada com sucesso!";
    msgRetorno.style.color = "green";
    this.reset();
  }
});

// Voltar ao topo
const botaoTopo = document.createElement("button");
botaoTopo.textContent = "↑ Topo";
botaoTopo.id = "btnTopo";
document.body.appendChild(botaoTopo);

botaoTopo.style.position = "fixed";
botaoTopo.style.bottom = "20px";
botaoTopo.style.right = "20px";
botaoTopo.style.display = "none";
botaoTopo.style.padding = "10px";
botaoTopo.style.border = "none";
botaoTopo.style.background = "#1e293b";
botaoTopo.style.color = "white";
botaoTopo.style.borderRadius = "5px";
botaoTopo.style.cursor = "pointer";

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    botaoTopo.style.display = "block";
  } else {
    botaoTopo.style.display = "none";
  }
});

botaoTopo.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
