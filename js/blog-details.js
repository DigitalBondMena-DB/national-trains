function createContactBox() {
  const contactDiv = document.createElement("div");
  contactDiv.innerHTML = `
    <div class="contact-box flex flex-col lg:flex-row text-center justify-between items-center mt-6 px-10 p-6 border border-main-green rounded-2xl">
      <div>
        <h5>You want to study abroad</h5>
        <p class="text-lg !text-main-text font-medium">Contact an academic expert now</p>
      </div>
      <div class="mt-3 gap-2 flex items-center justify-center">
        <a href="https://wa.me/201022810069" target="_blank" class="px-6 py-2 bg-main-green rounded-full text-main-white">WhatsApp</a>
        <a href="tel:+201022810069" class="px-6 py-2 bg-main-text rounded-full text-main-white">Contact us</a>
      </div>
    </div>
  `;
  return contactDiv;
}
function generateRandomId() {
  return "id-" + Math.random().toString(36).substring(2, 9);
}
function generateTableOfContents() {
  const container = document.getElementById("articleContainer");
  const tocContainer = document.querySelectorAll(".tableOfContents ul");
  tocContainer.forEach((con) => {
    con.innerHTML = "";
    const headings = container.querySelectorAll("h2");
    headings.forEach((heading, index) => {
      const id = generateRandomId();
      heading.setAttribute("id", id);
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.textContent = `${index + 1}- ${heading.textContent}`;
      a.href = "#";
      a.className = `line-clamp-2`;
      a.addEventListener("click", (e) => {
        e.preventDefault();
        heading.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      });
      li.appendChild(a);
      con.appendChild(li);
    });
  });
}
function insertContactBox() {
  const container = document.getElementById("articleContainer");
  const paragraphs = [...container.querySelectorAll("p")].filter((p) => {
    return !p.closest("table");
  });
  paragraphs.forEach((h2, index) => {
    if ((index + 1) % 8 === 0) {
      const contactDiv = createContactBox();
      h2.insertAdjacentElement("beforebegin", contactDiv);
    }
  });
}
insertContactBox();
generateTableOfContents();
