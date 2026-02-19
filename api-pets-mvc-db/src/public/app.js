// URL base da sua API (back-end)
const API = "/api/pets";

// Atalho para pegar elementos pelo id
const $ = (id) => document.getElementById(id);

// Elementos do formulário
const form = $("formPet");
const idEl = $("id");
const nomeEl = $("nome");
const especieEl = $("especie");
const idadeEl = $("idade");
const tutorEl = $("tutor");

// Elementos da tela
const tbody = $("tbodyPets");
const msg = $("msg");
const tituloForm = $("tituloForm");
const btnCancelar = $("btnCancelar");

// ==========================
// Funções auxiliares (helpers)
// ==========================

// Mostra mensagem na tela (verde sucesso, vermelho erro)
function setMsg(texto, ok = true) {
  msg.textContent = texto || "";
  msg.style.color = ok ? "green" : "crimson";
}

// Reseta formulário e volta para modo "cadastro"
function resetForm() {
  idEl.value = "";                 // limpa id (sem id = cadastro)
  form.reset();                    // limpa inputs
  idadeEl.value = 0;               // volta idade para 0
  tituloForm.textContent = "Cadastrar Pet";
  btnCancelar.hidden = true;       // esconde cancelar
  setMsg("");                      // limpa mensagem
}

// Monta uma linha <tr> de um pet (HTML)
function montarLinha(p) {
  return `
    <tr>
      <td>${p.id}</td>
      <td>${p.nome}</td>
      <td>${p.especie}</td>
      <td>${p.idade}</td>
      <td>${p.tutor}</td>
      <td>
        <!-- ✅ Agora tem class="btn" e pega o CSS -->
        <button class="btn" onclick="editar(${p.id})">Editar</button>

        <!-- ✅ Agora tem class="btn danger" e pega o CSS -->
        <button class="btn danger" onclick="excluir(${p.id})">Excluir</button>
      </td>
    </tr>
  `;
}

// ==========================
// CRUD (fetch)
// ==========================

// Lista todos os pets e coloca na tabela
async function carregarLista() {
  const resp = await fetch(API);
  const pets = await resp.json();

  // map -> transforma cada pet em uma linha HTML
  // join -> junta tudo em uma string só
  tbody.innerHTML = pets.map(montarLinha).join("");
}

// Cadastrar ou atualizar (dependendo se tem id)
form.onsubmit = async (e) => {
  e.preventDefault(); // impede o reload automático da página

  // Monta o objeto que será enviado para a API
  const pet = {
    nome: nomeEl.value,
    especie: especieEl.value,
    idade: Number(idadeEl.value),
    tutor: tutorEl.value,
  };

  // Se id tiver preenchido -> edição
  const id = idEl.value;

  // Se não tem id: POST (criar)
  if (!id) {
    const resp = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pet),
    });

    if (!resp.ok) {
      const erro = await resp.json().catch(() => ({}));
      return setMsg(erro.erro || "Erro ao cadastrar.", false);
    }

    setMsg("✅ Pet cadastrado!");
  }

  // Se tem id: PUT (atualizar)
  else {
    const resp = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pet),
    });

    if (!resp.ok) {
      const erro = await resp.json().catch(() => ({}));
      return setMsg(erro.erro || "Erro ao atualizar.", false);
    }

    setMsg("✅ Pet atualizado!");
  }

  // Depois de salvar:
  resetForm();        // limpa formulário
  carregarLista();    // atualiza tabela
};

// Excluir pet pelo id
async function excluir(id) {
  const ok = confirm("Deseja excluir este pet?");
  if (!ok) return;

  const resp = await fetch(`${API}/${id}`, { method: "DELETE" });

  if (resp.status === 204) {
    setMsg("🗑️ Pet excluído!");
    carregarLista();
    resetForm();
  } else {
    setMsg("Erro ao excluir.", false);
  }
}

// Editar: busca pet no back e preenche o form
async function editar(id) {
  const resp = await fetch(`${API}/${id}`);
  const p = await resp.json();

  // Preenche o formulário
  idEl.value = p.id;
  nomeEl.value = p.nome;
  especieEl.value = p.especie;
  idadeEl.value = p.idade;
  tutorEl.value = p.tutor;

  // Ajusta interface para modo "edição"
  tituloForm.textContent = "Editar Pet";
  btnCancelar.hidden = false;
  setMsg("");
}

// Botão cancelar: volta para modo cadastro
btnCancelar.onclick = () => resetForm();

// ==========================
// Inicialização (quando abre a página)
// ==========================
carregarLista();
