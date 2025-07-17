// HeaderPage.jsx
import './headerPage.css'

export default function HeaderPage({ title, subtitle, theme = 'default', icon }) {
  const themes = {
    default: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    collection: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    guide: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    boutique: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    catch: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
  };

  return (
    <div
      className="headerPageContainer"
      style={{
        background: themes[theme],
      }}
    >
      <div className="headerPageContent">
        <div className="headerPageLeft">
          {icon && (
            <div className="headerPageIcon">
              {icon}
            </div>
          )}
          <div className="headerPageText">
            <h1 className="h1Header">{title}</h1>
            {subtitle && <p className="headerPageSubtitle">{subtitle}</p>}
          </div>
        </div>
        <div className="headerPageDecorations">
          <div className="decorationCircle"></div>
          <div className="decorationCircle decorationCircle2"></div>
          <div className="decorationCircle decorationCircle3"></div>
        </div>
      </div>
    </div>
  )
}