// useFavorite.js
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, doc, getDocs, setDoc, deleteDoc, addDoc, query, where } from "firebase/firestore";
import { useSession } from "next-auth/react";

export const useFavorites = () => {
  const { data: session } = useSession();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (session?.user?.id) {
      const fetchFavorites = async () => {
        const favoritesRef = collection(db, `users/${session.user.id}/favorites`);
        const q = query(favoritesRef);
        const querySnapshot = await getDocs(q);
        const favoritesList = querySnapshot.docs.map(doc => doc.id); // Obtener solo los IDs de los documentos
        setFavorites(favoritesList);
      };
      fetchFavorites();
    }
  }, [session]);

  const addFavorite = async (beatId) => {
    if (session?.user?.id) {
      try {
        const docRef = doc(db, `users/${session.user.id}/favorites`, beatId);
        await setDoc(docRef, { beatId }); // Crea el documento si no existe
        setFavorites((prev) => [...prev, beatId]);
      } catch (error) {
        console.error("Error adding favorite: ", error);
      }
    }
  };

  const removeFavorite = async (beatId) => {
    if (session?.user?.id) {
      try {
        const docRef = doc(db, `users/${session.user.id}/favorites`, beatId);
        await deleteDoc(docRef); // Elimina el documento
        setFavorites((prev) => prev.filter((id) => id !== beatId));
      } catch (error) {
        console.error("Error removing favorite: ", error);
      }
    }
  };

  return { favorites, addFavorite, removeFavorite };
};
