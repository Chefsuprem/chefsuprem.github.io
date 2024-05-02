
//Post Trigger
const post = document.getElementById("postTemp");
const postBtn = document.getElementById("togArt");
const postActif = document.getElementById("postActive");
const postActifBtn = document.getElementById("togArtAct");

postBtn.addEventListener("click", () => {
	post.classList.toggle("d-none");

	postActif.classList.toggle("d-none");
	postActif.classList.toggle("d-flex");
})

postActifBtn.addEventListener("click", () => {
	post.classList.toggle("d-none");

	postActif.classList.toggle("d-none");
	postActif.classList.toggle("d-flex");
})