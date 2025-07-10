import './cards.css'

type CardProps = {
  name: string
  image: string
  types: string[]
}

export default function Cards({ name, image, types }: CardProps) {
  return (
    <div className='pokemon-card-container'>
      <div className='pokemon-card'>
        <div className='background'>
          <img src={image} alt={name} className='image' />
        </div>

        <div className='content'>
          <h1 className='pokemon-name'>{name}</h1>

          {types.map((type) => (
            <span className='pokemon-type' key={type}>
              {type}
            </span>
          ))}

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
  )
}
