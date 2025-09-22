const breedInput = document.getElementById("breedInput");
const searchBtn = document.getElementById("searchBtn");
const resultDiv = document.getElementById("result");

searchBtn.addEventListener("click", async () => {
  const breedName = breedInput.value.trim().toLowerCase();
  if (!breedName) {
    resultDiv.innerHTML = "<p>Please enter a breed name.</p>";
    return;
  }

  resultDiv.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch("https://api.thecatapi.com/v1/breeds");
    const data = await res.json();

    // Najdi pasmo po imenu
    const breed = data.find((b) => b.name.toLowerCase().includes(breedName));

    if (breed) {
      resultDiv.innerHTML = `
        <h2>${breed.name}</h2>
        <p><strong>Origin:</strong> ${breed.origin}</p>
        <p><strong>Temperament:</strong> ${breed.temperament}</p>
        <p><strong>Description:</strong> ${breed.description}</p>
      `;
    } else {
      resultDiv.innerHTML = "<p>No breed found. Try another name.</p>";
    }
  } catch (error) {
    console.error(error);
    resultDiv.innerHTML =
      "<p>Something went wrong. Please try again later.</p>";
  }
});
