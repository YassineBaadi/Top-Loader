import Card from "@/src/components/card/Card";
import HeaderPage from "@/src/components/headerPage/HeaderPage";




export default function Guide(){


    return(


        <>
        
            <div className="containerGuidePage">
                <HeaderPage/>

                <div className="cardDiv">
                    <Card/>
                </div>
                
            </div>
        
        </>
    )
}