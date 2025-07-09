import './card.css'
import Pikachu from '@/public/assets/img/pikachuTest.png'

export default function Card(){


    return(


        <>
            <div className='pokemon-card-container'>
                <div className='pokemon-card'>
                    <div className='background'>
                        <img src={Pikachu.src} alt="" className='image'/>

                    </div>

                     <div className='content'>
                        <h1 className='pokemon-name'>Pikachu</h1>
                        <span className='pokemon-type'>Electric</span>

                        <div className='pokemon-stats'>
                            <p>Power : 75</p>
                            <p>Power : 75</p>
                            <p>Power : 75</p>
                            <p>Power : 75</p>
                            
                        </div>

                        
                        <div className='rarity'>
                            <span>⭐</span>
                        </div>

                        <h1 className='pokemon-logo'>Pokémon cards</h1>
                    </div>

                </div>
            </div>

           
        </>
    )
}