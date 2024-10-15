import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ListOfBeatsInterface {
    id: string;
    fields: {
        audio: { stringValue: string };
        nombre: { stringValue: string };
        pic: { stringValue: string };
        bpm: { stringValue: string };
        key: { stringValue: string };
        genero: { stringValue: string };
        id: { stringValue: string }
        favorite: { booleanValue: boolean };
    };
}

export interface ListaParaNewListOfBeats {
    documents: [{
        name: string,
        fields: {
            audio: { stringValue: string };
            bpm: { stringValue: string };
            genero: {
                [x: string]: any; stringValue: string
            };
            key: { stringValue: string };
            nombre: { stringValue: string };
            pic: { stringValue: string };
            favorite:{booleanValue:boolean}
        },
        createTime: string,
        updateTime: string;
    }];
}
export interface Favorite {
    id: string;
    beatId: string;
  }

  export interface ListOfFavoritesInterface {
    favorites: Favorite[]; // Definir como un array de objetos `Favorite`
  }
  

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://firestore.googleapis.com/v1/projects/bspstore-edddc/databases/(default)/documents/beats?key=AIzaSyC-tyxWI53wicroqnaBEYDRlpyuYJMj2Zw',
    }),
    endpoints: (builder) => ({
        getBeats: builder.query<ListOfBeatsInterface[], null>({
            query: () => "beats",
        }),
        getMusicById: builder.query<ListOfBeatsInterface, { id: string }>({
            query: ({ id }) => `users/${id}`, // Esto también construirá la URL completa
        }),
        getInitialBeats: builder.query<ListaParaNewListOfBeats, null>({
            query: () => "beats",
        }),
    }),
});

export const favoritesApi = createApi({
    reducerPath: "favoritesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://firestore.googleapis.com/v1/projects/bspstore-edddc/databases/(default)/documents/', // Base URL para Firestore
    }),
    endpoints: (builder) => ({
        getFavoritesByUserId: builder.query<ListOfFavoritesInterface | null, { userId: string }>({
            query: ({ userId }) => `users/${userId}/favorites`,
            transformResponse: async (response: any, meta, arg) => {
                // Si el usuario no existe o no tiene favoritos
                if (response.error?.status === 404) {
                    return null; // Retornar null si no existe la colección del usuario
                }
                return response; // Devolver la respuesta en caso de éxito
            }
        }),
        getAllFavorites: builder.query<ListOfFavoritesInterface[], null>({
            query: () => "users/favorites",
        }),
        addFavoriteBeat: builder.mutation<{ success: boolean }, { userId: string, beatId: string }>({
            query: ({ userId, beatId }) => ({
                url: `users/${userId}/favorites`,
                method: 'POST',
                body: { beatId },
            }),
        }),
        removeFavoriteBeat: builder.mutation<{ success: boolean }, { userId: string, favoriteId: string }>({
            query: ({ userId, favoriteId }) => ({
                url: `users/${userId}/favorites/${favoriteId}`,
                method: 'DELETE',
            }),
        }),
    }),
});
// Hooks para usar en los componentes
export const {
    useGetFavoritesByUserIdQuery,
    useGetAllFavoritesQuery,
    useAddFavoriteBeatMutation,
    useRemoveFavoriteBeatMutation,
} = favoritesApi;

export const { useGetBeatsQuery, useGetInitialBeatsQuery } = userApi;
export const userApiReducer = userApi.reducer;
