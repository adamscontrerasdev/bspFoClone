import style from "./sample.module.css";

export function SampleOfList() {
    return(
        <div className={style.father}>
            <div className={style.title}>
                <h2>Sample Packs</h2>
            </div>
            <img src="./Assets Bsp/LineaBeat1.png" alt="" className={style.line} />
            <div className={style.sampleList}>
                <h5>Proximamente...</h5>
            </div>
        </div>
    )
}