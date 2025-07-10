import './headerPage.css'

type HeaderPageProps = {
  title: string
  backgroundImage: string
}

export default function HeaderPage({ title, backgroundImage }: HeaderPageProps): JSX.Element {
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
