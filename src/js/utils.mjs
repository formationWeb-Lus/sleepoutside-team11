// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localStorage
export function getLocalStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  const el = qs(selector);
  if (!el) return;

  el.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });

  el.addEventListener("click", callback);
}
