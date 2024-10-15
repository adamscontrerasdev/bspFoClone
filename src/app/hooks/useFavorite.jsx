// useFavorite.js
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { useAddFavoriteBeatMutation } from "../redux/service/music";
import { collection, getDocs, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRemoveFavoriteBeatMutation } from "../redux/service/music";

export const useFavorites = () => {
  const { data: session } = useSession();
  const [addFavoriteBeat] = useAddFavoriteBeatMutation();
  const [favorites, setFavorites] = useState([]);
  const [removeFavoriteBeat] = useRemoveFavoriteBeatMutation();
  const [loading, setLoading] = useState({}); // Objeto para manejar la carga por beatId

  useEffect(() => {
    if (session?.user?.id) {
      const fetchFavorites = async () => {
        const favoritesRef = collection(
          db,
          `users/${session.user.id}/favorites`
        );
        const q = query(favoritesRef);
        const querySnapshot = await getDocs(q);
        const favoritesList = querySnapshot.docs.map((doc) => doc.id);
        setFavorites(favoritesList);
      };
      fetchFavorites();
    }
  }, [session]);

  const addFavoriteCall = async (beatId) => {
    if (session?.user?.id) {
      setLoading((prev) => ({ ...prev, [beatId]: true })); // Inicia la carga para este beatId
      try {
        await addFavoriteBeat({ userId: session.user.id, beatId });
        setFavorites((prev) => [...prev, beatId]);
      } catch (error) {
        console.error("Error adding favorite: ", error);
      } finally {
        setLoading((prev) => ({ ...prev, [beatId]: false })); // Finaliza la carga
      }
    }
  };

  const removeFavorite = async (beatId) => {
    if (session?.user?.id) {
      setLoading((prev) => ({ ...prev, [beatId]: true })); // Inicia la carga para este beatId
      try {
        await removeFavoriteBeat({
          userId: session.user.id,
          favoriteId: beatId,
        });
        setFavorites((prev) => prev.filter((id) => id !== beatId));
      } catch (error) {
        console.error("Error removing favorite: ", error);
      } finally {
        setLoading((prev) => ({ ...prev, [beatId]: false })); // Finaliza la carga
      }
    }
  };

  return { favorites, addFavoriteCall, removeFavorite, loading }; // Retorna loading
};
