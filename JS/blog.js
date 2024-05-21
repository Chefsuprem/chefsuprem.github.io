const post1 = document.getElementById("post1");
const postBtn1 = document.getElementById("togArt1");
const postActif1 = document.getElementById("postActive1");
const postActifBtn1 = document.getElementById("togArtAct1");


postBtn1.addEventListener("click", () => {
	post1.classList.toggle("d-none");

	postActif1.classList.toggle("d-none");
	postActif1.classList.toggle("d-flex");
})

postActifBtn1.addEventListener("click", () => {
	post1.classList.toggle("d-none");

	postActif1.classList.toggle("d-none");
	postActif1.classList.toggle("d-flex");
})



const post2 = document.getElementById("post2");
const postBtn2 = document.getElementById("togArt2");
const postActif2 = document.getElementById("postActive2");
const postActifBtn2 = document.getElementById("togArtAct2");


postBtn2.addEventListener("click", () => {
	post2.classList.toggle("d-none");

	postActif2.classList.toggle("d-none");
	postActif2.classList.toggle("d-flex");
})

postActifBtn2.addEventListener("click", () => {
	post2.classList.toggle("d-none");

	postActif2.classList.toggle("d-none");
	postActif2.classList.toggle("d-flex");
})