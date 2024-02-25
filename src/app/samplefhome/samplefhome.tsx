
import { SampleOfList } from "./sample-list";
import style from "./sample.module.css";

export function SampleFHome(){
    return(
        <div className={style.bgDynamic}>
            <SampleOfList></SampleOfList>
        </div>
    )
}