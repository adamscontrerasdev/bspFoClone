import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface MusicItem {
    audio: string;
    nombre: string;
    pic: string;
    bpm: string;
    key: string;
    genero: string;
    favorite:boolean;
    id: any;
}

export interface MusicInPlay {
    audio: string;
    nombre: string;
    pic: string;
    bpm: string;
    key: string;
    genero: string;
    favorite:boolean;
    id: any;
}


interface InitialState {
    allMusic: MusicItem[],
    musicPlay: {}
}


export const generalSlice = createSlice({
    name: 'general',
    initialState: {
        allMusic: [],
        musicPlay: {}
    } as InitialState,
    reducers: {
        addMusic: (state, action: PayloadAction<MusicItem[]>) => {
            state.allMusic = action.payload;
        },
        removeMusic: (state) => {
            state.musicPlay = {};
        },
        playMusic: (state, action: PayloadAction<string>) => {
            const music = state.allMusic.find((music) => music.id == action.payload)
            state.musicPlay = music || {};
        },
    }
});

export const { addMusic, playMusic, removeMusic } = generalSlice.actions;
export default generalSlice.reducer;

