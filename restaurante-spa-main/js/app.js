// Navegación SPA
function navigateTo(sectionId) {
  document.querySelectorAll('.page-section').forEach(sec => sec.classList.add('d-none'));
  document.getElementById(sectionId).classList.remove('d-none');
}

// Datos de platos y reservas (local temporario)
let dishes = [];
let reservations = [];

// Agregar plato
document.getElementById('dishForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const dish = {
    name: document.getElementById('dishName').value,
    desc: document.getElementById('dishDesc').value,
    price: document.getElementById('dishPrice').value,
    category: document.getElementById('dishCategory').value,
    available: document.getElementById('dishAvailable').value
  };
  dishes.push(dish);
  updateDishTable();
  updateReserveOptions();
  this.reset();
  // mantiene alert aquí; si quieres reemplazar por alerta en DOM, lo cambio también
  alert('Plato agregado con éxito');
});

// Mostrar platos en tabla (Admin)
function updateDishTable() {
  const tbody = document.getElementById('dishTableBody');
  tbody.innerHTML = '';
  dishes.forEach(dish => {
    const row = `<tr>
      <td>${dish.name}</td>
      <td>${dish.desc}</td>
      <td>$${dish.price}</td>
      <td>${dish.category}</td>
      <td>${dish.available}</td>
    </tr>`;
    tbody.innerHTML += row;
  });

  // también actualizar la vista "Lista de platos"
  const listBody = document.getElementById('dishListBody');
  listBody.innerHTML = '';
  dishes.forEach(dish => {
    const row = `<tr>
      <td>${dish.name}</td>
      <td>${dish.desc}</td>
      <td>$${dish.price}</td>
      <td>${dish.category}</td>
      <td>${dish.available}</td>
    </tr>`;
    listBody.innerHTML += row;
  });
}

// Actualizar opciones en reserva
function updateReserveOptions() {
  const select = document.getElementById('reserveDish');
  select.innerHTML = '';
  dishes.forEach(dish => {
    if (dish.available === "Sí") {
      const option = document.createElement('option');
      option.value = dish.name;
      option.textContent = dish.name;
      select.appendChild(option);
    }
  });
}

// Reserva: muestra alerta en la página (Bootstrap) y se oculta a los 3s
document.getElementById('reserveForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // capturar valores (si deseas guardarlos también)
  const reservation = {
    dish: document.getElementById('reserveDish').value,
    date: document.getElementById('reserveDate').value,
    people: document.getElementById('reservePeople').value,
    phone: document.getElementById('reservePhone').value,
    email: document.getElementById('reserveEmail').value,
    createdAt: new Date().toISOString()
  };
  reservations.push(reservation);
  // mostrar mensaje de éxito en DOM
  const successMsg = document.getElementById('reserveSuccess');
  successMsg.classList.remove('d-none');

  // ocultar automáticamente después de 3 segundos
  setTimeout(() => {
    successMsg.classList.add('d-none');
  }, 3000);

  this.reset();
});

