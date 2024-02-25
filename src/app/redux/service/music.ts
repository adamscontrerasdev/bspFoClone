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
        },
        createTime: string,
        updateTime: string;
    }];
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

export const { useGetBeatsQuery, useGetInitialBeatsQuery } = userApi;
export const userApiReducer = userApi.reducer;
