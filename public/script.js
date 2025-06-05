// ✅ Function to fetch and display all items
async function loadItems() {
  const res = await fetch('/items');
  const data = await res.json();
  const list = document.getElementById('itemList');
  list.innerHTML = '';
  data.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} `;
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => deleteItem(item.id);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

// ✅ Function to add a new item
async function addItem() {
  const name = document.getElementById('itemName').value;
  await fetch('/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  document.getElementById('itemName').value = '';
  loadItems();
}

// ✅ Function to delete an item
async function deleteItem(id) {
  await fetch(`/items/${id}`, { method: 'DELETE' });
  loadItems();
}

// ✅ Initial load
loadItems();
