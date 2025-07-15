import './headerPage.css'

export default function HeaderPage({ title, backgroundImage }) {
  return (
    <div
      className="headerPageContainer"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <h1 className="h1Header">{title}</h1>
    </div>
  )
}
