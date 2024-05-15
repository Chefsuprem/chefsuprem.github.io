
import { db } from "./require.js";
import { doc, getDocs, collection, setDoc, deleteDoc} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

//====== Roles Create ======

function assignMember(user, nom, prenom){

	//Supprimer le doc de la collection "Pending"
	deleteDoc(doc(collection()))

	setDoc(doc(collection(db, "Membres"), user.uid), {
		name: user.displayName,
		role: "Membre",
		email: user.email
	})
}


export { assignMember };